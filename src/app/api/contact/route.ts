import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sgMail from '@sendgrid/mail';

// Initialize Supabase (lazy — only when env vars are available)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields (adjusted for MetroPointTech.com form fields)
    if (!body.name || !body.email || !body.product || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // Map product field to project type for CRM compatibility
    const productMap: Record<string, string> = {
      'ams': 'AMS Platform (Agency Management)',
      'commission-tracker': 'Commission Tracker (Solo Agent)',
      'crm': 'CRM Lite',
      'multiple': 'Multiple Products',
      'other': 'Other Software Product'
    };
    const projectType = productMap[body.product] || body.product;

    // ========================================
    // 1. Save to MPT-CRM Supabase Database
    // ========================================
    let contactId: string | null = null;
    if (supabase) {
      try {
        // Parse name into first/last
        const nameParts = body.name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Check if contact already exists by email
        const { data: existing } = await supabase
          .from('contacts')
          .select('id')
          .eq('email', body.email.toLowerCase())
          .single();

        if (existing) {
          contactId = existing.id;
          // Update existing contact with new info
          await supabase
            .from('contacts')
            .update({
              last_contacted: timestamp,
              notes: `[Product Inquiry ${new Date().toLocaleDateString()}] ${projectType} - ${body.message.substring(0, 200)}`,
            })
            .eq('id', contactId);
        } else {
          // Create new contact
          const { data: newContact, error } = await supabase
            .from('contacts')
            .insert({
              first_name: firstName,
              last_name: lastName,
              email: body.email.toLowerCase(),
              phone: body.phone || null,
              company: body.company || null,
              type: 'lead',
              source: 'Website',
              source_detail: `MetroPointTech.com Contact Form - ${projectType}`,
              notes: `Product Interest: ${projectType}\nMessage: ${body.message}`,
              tags: ['website-lead', 'product-inquiry', body.product],
              email_status: 'active',
            })
            .select('id')
            .single();

          if (newContact) {
            contactId = newContact.id;
          }
          if (error) {
            console.error('Supabase insert error:', error);
          }
        }

        // Log activity
        if (contactId) {
          try {
            await supabase
              .from('activities')
              .insert({
                contact_id: contactId,
                type: 'form_submission',
                description: `Product inquiry: ${projectType}`,
                created_at: timestamp,
              });
          } catch {
            // Activity insert is non-blocking
          }
        }

        // ========================================
        // 1b. Auto-enroll in Lead Drip Campaign
        // ========================================
        if (contactId && !existing) {
          try {
            // Build drip schedule: Day 0, 2, 5, 10, 18, 28
            const dripDays = [0, 2, 5, 10, 18, 28];
            const dripPurposes = [
              'introduction',
              'product_demo',
              'case_study',
              'trial_offer',
              'overcome_objections',
              'final_push',
            ];
            const dripSubjects = [
              'Welcome to Metro Point Tech — Your Software Solution Awaits',
              `Ready to see ${projectType} in action?`,
              'How one agency increased efficiency by 40% with our software',
              'Start your free 14-day trial today',
              'Common questions about our software platform',
              'Last chance: Your free trial is waiting',
            ];

            const enrolledAt = new Date();
            const stepSchedule = dripDays.map((day, idx) => {
              const scheduledDate = new Date(enrolledAt);
              scheduledDate.setDate(scheduledDate.getDate() + day);
              return {
                step: idx,
                day,
                purpose: dripPurposes[idx],
                subject: dripSubjects[idx],
                scheduled_for: scheduledDate.toISOString(),
                sent_at: null,
              };
            });

            await supabase.from('campaign_enrollments').insert({
              contact_id: contactId,
              campaign_id: 'lead-drip',
              campaign_name: 'Lead Nurture (4 Week)',
              status: 'active',
              current_step: 0,
              total_steps: dripDays.length,
              step_schedule: JSON.stringify(stepSchedule),
              source: 'website_form',
              source_detail: `MetroPointTech.com Contact Form - ${projectType}`,
              emails_sent: 0,
              next_email_scheduled: stepSchedule[0].scheduled_for,
            });

            // Log campaign enrollment activity
            await supabase.from('activities').insert({
              contact_id: contactId,
              type: 'campaign_enrolled',
              description: 'Auto-enrolled in Lead Nurture (4 Week) drip campaign from product inquiry form.',
              created_at: timestamp,
            });
          } catch (enrollError) {
            console.error('Drip enrollment error (non-blocking):', enrollError);
          }

          // ========================================
          // 1c. Auto-create Deal in Sales Pipeline
          // ========================================
          try {
            await supabase.from('deals').insert({
              title: `Product Lead: ${body.name} - ${projectType}`,
              contact_id: contactId,
              stage: 'lead',
              source: 'Website',
              contact_name: body.name,
              company_name: body.company || null,
              description: `Product Interest: ${projectType}\nMessage: ${body.message}`,
              priority: 'medium',
            });
          } catch (dealError) {
            console.error('Deal creation error (non-blocking):', dealError);
          }
        }
      } catch (dbError) {
        console.error('Database error (non-blocking):', dbError);
        // Don't fail the form submission if DB fails
      }
    }

    // ========================================
    // 2. Send Notification Email to Sales Team
    // ========================================
    try {
      if (process.env.SENDGRID_API_KEY) {
        const notificationEmail = {
          to: process.env.EMAIL_TO || 'sales@metropointtech.com',
          from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'noreply@metropointtech.com',
            name: 'Metro Point Tech Website',
          },
          subject: `🚀 New Product Inquiry: ${body.name} — ${projectType}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 22px;">🚀 New Product Inquiry</h1>
                <p style="margin: 5px 0 0; opacity: 0.9;">MetroPointTech.com Contact Form</p>
              </div>
              
              <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
                <h2 style="color: #1e40af; margin-top: 0;">Contact Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${body.name}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${body.email}">${body.email}</a></td></tr>
                  ${body.phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${body.phone}">${body.phone}</a></td></tr>` : ''}
                  ${body.company ? `<tr><td style="padding: 8px 0; font-weight: bold;">Agency/Company:</td><td>${body.company}</td></tr>` : ''}
                </table>
                
                <h2 style="color: #1e40af;">Product Interest</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Product:</td><td>${projectType}</td></tr>
                </table>
                
                <h2 style="color: #1e40af;">Message</h2>
                <div style="background: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #10b981;">
                  <p style="margin: 0; white-space: pre-wrap;">${body.message}</p>
                </div>
                
                ${contactId ? `<p style="margin-top: 16px; padding: 8px 12px; background: #ecfdf5; border-radius: 4px; color: #065f46; font-size: 14px;">✅ Saved to MPT-CRM (Contact ID: ${contactId})</p>` : ''}
              </div>
              
              <div style="background: #f3f4f6; padding: 16px; border-radius: 0 0 8px 8px; text-align: center; font-size: 13px; color: #6b7280;">
                Metro Point Technology LLC — Cape Coral, FL<br/>
                Received ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
              </div>
            </div>
          `,
        };

        await sgMail.send(notificationEmail);
      }
    } catch (emailError) {
      console.error('Notification email error (non-blocking):', emailError);
    }

    // ========================================
    // 3. Send Confirmation Email to Prospect
    // ========================================
    try {
      if (process.env.SENDGRID_API_KEY) {
        const confirmationEmail = {
          to: body.email,
          from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'noreply@metropointtech.com',
            name: process.env.SENDGRID_FROM_NAME || 'Metro Point Tech Team',
          },
          subject: 'Thank you for your interest in Metro Point Tech',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 22px;">Thank You, ${body.name.split(' ')[0]}!</h1>
              </div>
              
              <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
                <p>Thank you for your interest in ${projectType}. We've received your inquiry and will get back to you within <strong>24 hours</strong> (business days).</p>
                
                <p>Here's what you're interested in:</p>
                <ul style="line-height: 1.8;">
                  <li><strong>Product:</strong> ${projectType}</li>
                </ul>
                
                <p>In the meantime, feel free to:</p>
                <ul style="line-height: 1.8;">
                  <li><a href="https://www.metropointtech.com/products" style="color: #10b981;">Explore our full product suite</a></li>
                  <li><a href="https://www.agentcommissiontracker.com" style="color: #10b981;">Start a free 14-day trial</a></li>
                  <li><a href="https://www.metropointtech.com/services" style="color: #10b981;">Learn about our implementation services</a></li>
                </ul>
                
                <p>Looking forward to helping you streamline your operations!</p>
                
                <p style="margin-top: 24px;">
                  <strong>Metro Point Tech Team</strong><br/>
                  Metro Point Technology LLC<br/>
                  <a href="mailto:sales@metropointtech.com" style="color: #10b981;">sales@metropointtech.com</a><br/>
                  Cape Coral, FL
                </p>
              </div>
              
              <div style="background: #f3f4f6; padding: 16px; border-radius: 0 0 8px 8px; text-align: center; font-size: 13px; color: #6b7280;">
                Metro Point Technology LLC — Cape Coral, FL<br/>
                <a href="https://www.metropointtech.com" style="color: #10b981;">www.MetroPointTech.com</a>
              </div>
            </div>
          `,
        };

        await sgMail.send(confirmationEmail);
      }
    } catch (confirmError) {
      console.error('Confirmation email error (non-blocking):', confirmError);
    }

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully', contactId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}