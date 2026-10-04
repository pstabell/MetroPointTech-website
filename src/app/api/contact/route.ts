import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qgtjpdviboxxlrivwcan.supabase.co';
// Server-only CRM key (Vercel env, production). Never hardcode a key here: this repo is public.
const supabaseKey = process.env.CRM_SUPABASE_SERVICE_KEY || '';

export async function GET() {
  return NextResponse.json({
    message: 'Contact API is working with GET',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  console.log('=== Contact API POST Started ===');
  
  try {
    // Parse body
    const body = await request.json();
    console.log('Received:', body);
    
    // Validate required fields
    if (!body.name || !body.email || !body.product || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, product, message' },
        { status: 400 }
      );
    }

    // Initialize Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to database
    const nameParts = body.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: body.email.toLowerCase(),
        phone: body.phone || null,
        company: body.company || null,
        type: 'lead',
        source: 'Website',
        source_detail: `MetroPointTech.com Contact Form - ${body.product}`,
        notes: `Product Interest: ${body.product}\nMessage: ${body.message}\nSMS consent: ${body.smsConsent ? `YES (opted in via website contact form on ${new Date().toISOString()})` : 'no'}`,
        tags: body.smsConsent
          ? ['website-lead', 'product-inquiry', 'sms-opt-in']
          : ['website-lead', 'product-inquiry'],
        email_status: 'active'
      })
      .select('id')
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save contact', details: error.message },
        { status: 500 }
      );
    }

    console.log('Contact saved successfully:', data.id);

    return NextResponse.json({
      success: true,
      message: 'Contact saved successfully',
      contactId: data.id
    });

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}