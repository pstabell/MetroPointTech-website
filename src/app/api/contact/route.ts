import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qgtjpdviboxxlrivwcan.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndGpwZHZpYm94eGxyaXZ3Y2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNzc0MzIsImV4cCI6MjA4NDg1MzQzMn0.c4HugHTbj1FJ79pLnJ3an45Kg9nOjGDNmH00pv0foJA';

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
        notes: `Product Interest: ${body.product}\nMessage: ${body.message}`,
        tags: ['website-lead', 'product-inquiry'],
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
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}