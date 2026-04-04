import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// System prompt — insurance-focused AAMS sales assistant
const SYSTEM_PROMPT = `You are Jack, the AI sales assistant for Metro Point Technology, an insurance technology company in Cape Coral, Florida. You are built BY insurance pros, FOR insurance pros. Your founder has 30 years of hands-on insurance agency experience.

IMPORTANT: This website (metropointtech.com) is focused on insurance agents, agencies, and producers. Every response must be relevant to the insurance industry. You are NOT a generic software company chatbot.

COMPANY:
- Metro Point Technology LLC, Cape Coral, Florida
- Phone: (239) 426-7058
- Website: metropointtech.com
- Founded by a 30-year insurance industry veteran

PRODUCT — AAMS (Autonomous Agency Management System):
- An AI-powered back office that works 24/7
- NOT just another AMS — it is a digital employee that acts on data, not just stores it
- Handles commission tracking, reconciliation, market shopping, compliance monitoring autonomously
- AI agents that read PDFs, match policy numbers, detect underpayments, and flag commission leakage
- Handles the 20-40% of commission data that IVANS cannot process (MGAs, wholesale brokers, regional carriers)
- Reduces commission leakage by catching errors humans miss

PRICING:
- Solo Agent Plan: $19.99/month — for individual producers tracking their own commissions
- Agency Plans: $99 to $999/month depending on agency size and features
- CRM Add-on: $29/month
- No setup fees, no exit fees, cancel anytime, full data portability
- Free trial available, no credit card required

KEY DIFFERENTIATORS vs Applied Epic, Vertafore, HawkSoft:
- 73% cheaper than legacy platforms
- Zero setup fees vs $2,500+ competitors charge
- AI-powered autonomous reconciliation vs manual processes
- Full data portability, export all data in minutes
- Every carrier supported, not just IVANS-connected ones
- Built for the modern agent, not a 1990s architecture

FREE TOOLS:
- Commission Leak Calculator at metropointtech.com/commission-calculator — shows agents how much they may be losing
- Cost Savings Calculator — shows how much agencies save replacing manual back office with AI

VOICE AGENT — NICO:
- AI sales agent that calls insurance agencies
- Can answer questions about the product if asked about "the AI that called me" or "Nico called me"

LEAD QUALIFICATION:
- Ask what type of insurance they write
- Ask if they are a solo agent or agency owner
- Ask about their current AMS/commission tracking system
- Ask about their biggest pain point: commissions, staffing, sales, or back office admin

PERSONALITY:
- Warm, confident, conversational — not scripted or robotic
- Genuinely interested in the visitor's business challenges
- Never pushy — you are there to help, not pressure
- Use plain conversational language, no jargon
- Built by insurance professionals who lived the commission tracking nightmare firsthand
- You understand what it is like to chase carrier statements and wonder if you got paid right

WHEN ASKED ABOUT DEMOS OR TRIALS:
- Direct them to metropointtech.com/AAMS for product info
- Free trial at the website, no credit card required
- For a live demo, suggest calling (239) 426-7058

WHEN VISITOR SEEMS UNINTERESTED:
- Mention the free Commission Leak Calculator — takes 30 seconds, no signup
- "Find out if you're underpaid in 30 seconds"

ALWAYS RESPOND IN CONTEXT OF THE PAGE:
- If the visitor is on a page related to "AAMS" or "ams-app" — focus on the AAMS product details
- If the visitor is on a page related to "commission-calculator" — focus on commission leakage and the calculator
- Otherwise — introduce Metro Point and ask qualifying questions

DO NOT:
- Talk about generic software development, web design, or non-insurance services
- Say you are a general technology company
- Use corporate jargon like "synergy" or "digital transformation"
- Give long walls of text — keep responses conversational and concise (2-4 sentences max)`;

// Get the Anthropic API key from environment variables
function getApiKey(): string | null {
  return (
    process.env.ANTHROPIC_API_KEY ||
    process.env.CLAUDE_API_KEY ||
    null
  );
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.error('Chat API: No Anthropic API key found in environment variables');
      return NextResponse.json(
        {
          success: false,
          response: "I'm having a technical issue right now. Please call us at (239) 426-7058 and we'll help you directly.",
          buttons: null,
          metadata: { error: 'API key not configured' },
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      message,
      context,
      userInfo,
      conversationHistory,
      action,
    } = body;

    if (!message && !action) {
      return NextResponse.json(
        {
          success: false,
          response: 'No message provided.',
          buttons: null,
          metadata: { error: 'Missing message field' },
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Build page context for the system prompt
    const page = context?.page || '';
    let pageContext = '';
    if (page.toLowerCase().includes('aams') || page.toLowerCase().includes('ams-app')) {
      pageContext = '\n\nThe visitor is currently on the AAMS product page. Focus on AAMS product details, features, and pricing.';
    } else if (page.toLowerCase().includes('commission-calculator')) {
      pageContext = '\n\nThe visitor is currently on the Commission Leak Calculator page. Focus on commission leakage, how the calculator works, and how AAMS solves commission tracking problems.';
    } else if (page) {
      pageContext = `\n\nThe visitor is currently on the ${page} page.`;
    }

    // Build action context
    let actionContext = '';
    if (action) {
      const actionMap: Record<string, string> = {
        commission_tracking: 'The visitor is interested in commission tracking. Focus on how AAMS handles commission reconciliation, detects underpayments, and catches leakage.',
        ams_platform: 'The visitor is interested in the AAMS platform overall. Give an overview of autonomous agency management features.',
        exploring: 'The visitor is just exploring. Be welcoming, ask what type of insurance they write, and gently qualify them.',
        pricing: 'The visitor wants to know about pricing. Share the pricing tiers clearly.',
        demo: 'The visitor wants a demo. Direct them to the free trial or suggest calling (239) 426-7058 for a live demo.',
      };
      actionContext = `\n\nVISITOR INTENT: ${actionMap[action] || `The visitor indicated interest in: ${action}`}`;
    }

    // Build user info context
    let userContext = '';
    if (userInfo) {
      const parts: string[] = [];
      if (userInfo.name) parts.push(`Name: ${userInfo.name}`);
      if (userInfo.company) parts.push(`Company: ${userInfo.company}`);
      if (userInfo.role) parts.push(`Role: ${userInfo.role}`);
      if (parts.length > 0) {
        userContext = `\n\nVISITOR INFO:\n${parts.join('\n')}`;
      }
    }

    const fullSystemPrompt = SYSTEM_PROMPT + pageContext + actionContext + userContext;

    // Build messages array with conversation history
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const entry of conversationHistory) {
        if (entry.role === 'user' || entry.role === 'assistant') {
          messages.push({
            role: entry.role,
            content: entry.content || entry.message || '',
          });
        }
      }
    }

    // Add current message
    const userMessage = message || (action ? `I'm interested in ${action.replace(/_/g, ' ')}` : '');
    if (userMessage) {
      messages.push({ role: 'user', content: userMessage });
    }

    // Call Claude API via Anthropic SDK
    const anthropic = new Anthropic({ apiKey });

    const completion = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: fullSystemPrompt,
      messages,
    });

    // Extract text response
    const responseText =
      completion.content
        .filter((block): block is Anthropic.TextBlock => block.type === 'text')
        .map((block) => block.text)
        .join('') || "I'd love to help! Could you tell me a bit more about what you're looking for?";

    return NextResponse.json(
      {
        success: true,
        response: responseText,
        buttons: null,
        metadata: {
          model: completion.model,
          usage: completion.usage,
          page: page || null,
          action: action || null,
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Chat API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Friendly fallback for users
    return NextResponse.json(
      {
        success: false,
        response: "I'm having a moment — sorry about that! Feel free to call us at (239) 426-7058 or try again in a sec.",
        buttons: null,
        metadata: { error: errorMessage },
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
