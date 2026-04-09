import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qgtjpdviboxxlrivwcan.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndGpwZHZpYm94eGxyaXZ3Y2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNzc0MzIsImV4cCI6MjA4NDg1MzQzMn0.c4HugHTbj1FJ79pLnJ3an45Kg9nOjGDNmH00pv0foJA';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, company' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const nameParts = body.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: body.email.toLowerCase(),
        company: body.company,
        type: 'lead',
        source: 'Website',
        source_detail: 'Claude Discord Fix Download - metropointtechnology.com/claude-discord-fix',
        notes: `Downloaded Claude Code Discord MCP Server Fix Template.\nCompany: ${body.company}\nUse case: AI infrastructure / Discord integration`,
        tags: ['claude-fix-download', 'ai-builder', 'website-lead'],
        email_status: 'active'
      })
      .select('id')
      .single();

    if (error) {
      console.error('Lead gate database error:', error);
      return NextResponse.json(
        { error: 'Failed to save contact', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      downloadUrl: '/downloads/claude-discord-fix.zip',
      contactId: data.id
    });

  } catch (error) {
    console.error('Lead gate API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
