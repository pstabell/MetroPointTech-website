import { NextResponse } from 'next/server';

// Next.js 14 prerendered this GET at build time (static). Next.js 15 makes GET route handlers dynamic by
// default; force-static keeps the response exactly as it was on Next.js 14.
export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ 
    message: 'Test API route works!',
    timestamp: new Date().toISOString()
  });
}