import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sgMail from '@sendgrid/mail';

// Initialize Supabase with hardcoded credentials for debugging
const supabaseUrl = 'https://qgtjpdviboxxlrivwcan.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndGpwZHZpYm94eGxyaXZ3Y2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNzc0MzIsImV4cCI6MjA4NDg1MzQzMn0.c4HugHTbj1FJ79pLnJ3an45Kg9nOjGDNmH00pv0foJA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: Request) {
  try {
    console.log('=== SIMPLIFIED Contact Form API Started ===');
    
    // Step 1: Parse request body
    let body;
    try {
      body = await request.json();
      console.log('✅ Step 1: Request body parsed successfully');
      console.log('Request data:', JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error('❌ Step 1 FAILED: Request body parsing error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body', step: 1 },
        { status: 400 }
      );
    }

    // Step 2: Validate required fields
    if (!body.name || !body.email || !body.product || !body.message) {
      console.error('❌ Step 2 FAILED: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields', step: 2 },
        { status: 400 }
      );
    }
    console.log('✅ Step 2: Field validation passed');

    // Step 3: Test Supabase connection
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase
        .from('contacts')
        .select('count(*)')
        .single();
      
      if (error) {
        console.error('❌ Step 3 FAILED: Supabase connection error:', error);
        return NextResponse.json(
          { error: 'Database connection failed', details: error.message, step: 3 },
          { status: 500 }
        );
      }
      console.log('✅ Step 3: Supabase connection successful');
    } catch (dbTestError) {
      console.error('❌ Step 3 FAILED: Database test error:', dbTestError);
      return NextResponse.json(
        { error: 'Database test failed', details: dbTestError.message, step: 3 },
        { status: 500 }
      );
    }

    // Step 4: Simple contact insertion
    try {
      console.log('Inserting contact...');
      const nameParts = body.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const { data: newContact, error: insertError } = await supabase
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
          notes: `Product Interest: ${body.product}\nMessage: ${body.message}`,
          tags: ['website-lead'],
          email_status: 'active',
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('❌ Step 4 FAILED: Contact insertion error:', insertError);
        return NextResponse.json(
          { error: 'Failed to save contact', details: insertError.message, step: 4 },
          { status: 500 }
        );
      }

      console.log('✅ Step 4: Contact inserted successfully:', newContact.id);

      // Step 5: Success response
      console.log('✅ API completed successfully');
      return NextResponse.json(
        { 
          success: true, 
          message: 'Form submitted successfully (simplified)', 
          contactId: newContact.id,
          debug: 'All steps completed successfully'
        },
        { status: 200 }
      );

    } catch (insertError) {
      console.error('❌ Step 4 FAILED: Contact insertion exception:', insertError);
      return NextResponse.json(
        { error: 'Contact insertion failed', details: insertError.message, step: 4 },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ FATAL ERROR: Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error?.message || 'Unknown error',
        stack: error?.stack,
        step: 'unknown'
      },
      { status: 500 }
    );
  }
}