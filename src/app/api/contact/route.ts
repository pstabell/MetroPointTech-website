import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('=== BASIC TEST API Started ===');
    
    // Test 1: Can we even get here?
    console.log('✅ Test 1: API function started successfully');
    
    // Test 2: Can we parse JSON?
    let body;
    try {
      body = await request.json();
      console.log('✅ Test 2: JSON parsing successful');
      console.log('Received data:', JSON.stringify(body));
    } catch (parseError) {
      console.error('❌ Test 2 FAILED: JSON parse error:', parseError);
      return NextResponse.json({
        error: 'JSON parse failed',
        details: parseError.message
      }, { status: 400 });
    }

    // Test 3: Can we access environment variables?
    console.log('Environment test:', {
      nodeEnv: process.env.NODE_ENV,
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
      envKeys: Object.keys(process.env).filter(k => k.includes('SUPABASE') || k.includes('SENDGRID'))
    });

    // Test 4: Basic validation
    if (!body.name || !body.email) {
      console.log('❌ Test 4 FAILED: Missing required fields');
      return NextResponse.json({
        error: 'Missing required fields',
        received: Object.keys(body)
      }, { status: 400 });
    }
    console.log('✅ Test 4: Basic validation passed');

    // Test 5: Return success
    console.log('✅ All basic tests passed - returning success');
    return NextResponse.json({
      success: true,
      message: 'Basic API test successful',
      receivedData: body,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ FATAL: Unexpected error in basic test:', error);
    return NextResponse.json({
      error: 'Fatal error in basic test',
      message: error.message,
      stack: error.stack,
      name: error.name
    }, { status: 500 });
  }
}