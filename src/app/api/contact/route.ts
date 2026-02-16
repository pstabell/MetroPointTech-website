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
    console.log('=== Contact Form API Request Started ===');
    console.log('Environment check:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
      hasSendGridKey: !!process.env.SENDGRID_API_KEY,
      hasEmailTo: !!process.env.EMAIL_TO,
      hasFromEmail: !!process.env.SENDGRID_FROM_EMAIL,
    });

    let body;
    try {
      body = await request.json();
      console.log('✓ Request body parsed successfully');
    } catch (parseError) {
      console.error('❌ FAIL: Request body parsing failed:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    console.log('Request fields present:', {
      hasName: !!body.name,
      hasEmail: !!body.email,
      hasProduct: !!body.product,
      hasMessage: !!body.message,
      hasPhone: !!body.phone,
      hasCompany: !!body.company,
    });

    // Validate required fields (adjusted for MetroPointTech.com form fields)
    if (!body.name || !body.email || !body.product || !body.message) {
      console.error('❌ FAIL: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('✓ Field validation passed');
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
      console.log('✓ Supabase client initialized, starting database operations...');
      try {
        // Parse name into first/last
        const nameParts = body.name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        console.log('✓ Name parsed:', { firstName, lastName });

        console.log('Checking for existing contact with email:', body.email.toLowerCase());
        // Check if contact already exists by email
        const { data: existing, error: existingError } = await supabase
          .from('contacts')
          .select('id')
          .eq('email', body.email.toLowerCase())
          .single();

        if (existingError && existingError.code !== 'PGRST116') {
          console.error('❌ FAIL: Error checking existing contact:', existingError);
          throw new Error(`Existing contact lookup failed: ${existingError.message}`);
        }

        if (existing) {
          console.log('✓ Found existing contact:', existing.id);
          contactId = existing.id;
          try {
            // Update existing contact with new info
            const { error: updateError } = await supabase
              .from('contacts')
              .update({
                last_contacted: timestamp,
                notes: `[Product Inquiry ${new Date().toLocaleDateString()}] ${projectType} - ${body.message.substring(0, 200)}`,
              })
              .eq('id', contactId);

            if (updateError) {
              console.error('❌ FAIL: Error updating existing contact:', updateError);
              throw new Error(`Contact update failed: ${updateError.message}`);
            }
            console.log('✓ Existing contact updated successfully');
          } catch (updateErr) {
            console.error('❌ FAIL: Contact update error:', updateErr);
            throw updateErr;
          }
        } else {
          console.log('Creating new contact...');
          const contactData = {
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
          };
          console.log('Contact data to insert:', contactData);

          // Create new contact
          const { data: newContact, error } = await supabase
            .from('contacts')
            .insert(contactData)
            .select('id')
            .single();

          if (error) {
            console.error('❌ FAIL: Supabase contact insert error:', error);
            throw new Error(`Contact insert failed: ${error.message}`);
          }

          if (newContact) {
            contactId = newContact.id;
            console.log('✓ New contact created with ID:', contactId);
          } else {
            console.error('❌ FAIL: Contact insert returned no data');
            throw new Error('Contact insert returned no data');
          }
        }

        // Log activity
        if (contactId) {
          console.log('Logging activity for contact:', contactId);
          try {
            const { error: activityError } = await supabase
              .from('activities')
              .insert({
                contact_id: contactId,
                type: 'form_submission',
                description: `Product inquiry: ${projectType}`,
                created_at: timestamp,
              });

            if (activityError) {
              console.error('❌ WARNING: Activity insert failed (non-blocking):', activityError);
            } else {
              console.log('✓ Activity logged successfully');
            }
          } catch (activityErr) {
            console.error('❌ WARNING: Activity insert error (non-blocking):', activityErr);
          }
        }

        // ========================================
        // 1b. Auto-enroll in Lead Drip Campaign
        // ========================================
        if (contactId && !existing) {
          console.log('Enrolling new contact in drip campaign...');
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

            const { error: enrollError } = await supabase.from('campaign_enrollments').insert({
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

            if (enrollError) {
              console.error('❌ WARNING: Drip enrollment failed (non-blocking):', enrollError);
            } else {
              console.log('✓ Drip campaign enrollment successful');
            }

            // Log campaign enrollment activity
            const { error: campaignActivityError } = await supabase.from('activities').insert({
              contact_id: contactId,
              type: 'campaign_enrolled',
              description: 'Auto-enrolled in Lead Nurture (4 Week) drip campaign from product inquiry form.',
              created_at: timestamp,
            });

            if (campaignActivityError) {
              console.error('❌ WARNING: Campaign activity log failed (non-blocking):', campaignActivityError);
            } else {
              console.log('✓ Campaign enrollment activity logged');
            }
          } catch (enrollError) {
            console.error('❌ WARNING: Drip enrollment error (non-blocking):', enrollError);
          }

          // ========================================
          // 1c. Auto-create Deal in Sales Pipeline
          // ========================================
          console.log('Creating deal in sales pipeline...');
          try {
            const { error: dealError } = await supabase.from('deals').insert({
              title: `Product Lead: ${body.name} - ${projectType}`,
              contact_id: contactId,
              stage: 'lead',
              source: 'Website',
              contact_name: body.name,
              company_name: body.company || null,
              description: `Product Interest: ${projectType}\nMessage: ${body.message}`,
              priority: 'medium',
            });

            if (dealError) {
              console.error('❌ WARNING: Deal creation failed (non-blocking):', dealError);
            } else {
              console.log('✓ Deal created successfully');
            }
          } catch (dealError) {
            console.error('❌ WARNING: Deal creation error (non-blocking):', dealError);
          }
        }
      } catch (dbError) {
        console.error('❌ FAIL: Database operation failed:', dbError);
        throw new Error(`Database error: ${dbError.message || dbError}`);
      }
    } else {
      console.log('⚠️ Supabase client not initialized - skipping database operations');
    }

    // ========================================
    // 2. Send Notification Email to Sales Team
    // ========================================
    console.log('Starting notification email process...');
    try {
      if (process.env.SENDGRID_API_KEY) {
        console.log('✓ SendGrid API key found, sending notification email...');
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
        console.log('✓ Notification email sent successfully');
      } else {
        console.log('⚠️ SendGrid API key not found - skipping notification email');
      }
    } catch (emailError) {
      console.error('❌ WARNING: Notification email failed (non-blocking):', emailError);
    }

    // ========================================
    // 3. Send Confirmation Email to Prospect
    // ========================================
    console.log('Starting confirmation email process...');
    try {
      if (process.env.SENDGRID_API_KEY) {
        console.log('Sending confirmation email to prospect...');
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
        console.log('✓ Confirmation email sent successfully');
      } else {
        console.log('⚠️ SendGrid API key not found - skipping confirmation email');
      }
    } catch (confirmError) {
      console.error('❌ WARNING: Confirmation email failed (non-blocking):', confirmError);
    }

    console.log('=== Contact Form API Request Completed Successfully ===');
    return NextResponse.json(
      { success: true, message: 'Form submitted successfully', contactId },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ FATAL ERROR: Contact form processing failed:', error);
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    );
  }
}