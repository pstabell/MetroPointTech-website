#!/usr/bin/env node
/**
 * Custom Discord MCP Server for Claude Code
 *
 * Replaces the broken official channels plugin (GitHub Issue #36477).
 * Connects directly to Discord gateway and pushes messages to Claude Code
 * via MCP protocol.
 *
 * Setup:
 *   1. npm install
 *   2. Set BOT_TOKEN and BOT_USER_ID below (or use env vars)
 *   3. claude --dangerously-load-development-channels server:my-discord-bot
 *
 * Template by Metro Point Technology — www.MetroPointTechnology.com
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import {
  Client,
  GatewayIntentBits,
  Partials,
} from 'discord.js'

// ── Configuration ────────────────────────────────────────────────────────────
// Replace these with your own values, or set as environment variables.
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || 'YOUR_DISCORD_BOT_TOKEN_HERE'
const BOT_USER_ID = process.env.DISCORD_BOT_USER_ID || 'YOUR_BOT_USER_ID_HERE'

// Optional: restrict to specific channel IDs. Empty array = all channels.
const ALLOWED_CHANNELS = []

// ── MCP Server ───────────────────────────────────────────────────────────────
const mcp = new Server(
  { name: 'discord-mcp', version: '1.0.0' },
  {
    capabilities: {
      tools: {},
      experimental: {
        'claude/channel': {},
      },
    },
    instructions: [
      'Messages from Discord arrive as <channel> notifications.',
      'Reply with the reply tool — pass chat_id back.',
      'Use fetch_messages to check channel history.',
    ].join('\n'),
  },
)

// ── Tools ────────────────────────────────────────────────────────────────────
mcp.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'reply',
      description: 'Send a reply to a Discord channel.',
      inputSchema: {
        type: 'object',
        properties: {
          chat_id: { type: 'string', description: 'Channel or DM ID to reply in.' },
          text: { type: 'string', description: 'Message content to send.' },
          reply_to: { type: 'string', description: 'Optional message ID to thread under.' },
        },
        required: ['chat_id', 'text'],
      },
    },
    {
      name: 'fetch_messages',
      description: 'Fetch recent messages from a Discord channel.',
      inputSchema: {
        type: 'object',
        properties: {
          channel: { type: 'string', description: 'Channel ID to fetch from.' },
          limit: { type: 'number', description: 'Max messages to fetch (default 20, max 100).' },
        },
        required: ['channel'],
      },
    },
    {
      name: 'react',
      description: 'Add an emoji reaction to a message.',
      inputSchema: {
        type: 'object',
        properties: {
          chat_id: { type: 'string', description: 'Channel ID.' },
          message_id: { type: 'string', description: 'Message ID to react to.' },
          emoji: { type: 'string', description: 'Emoji to react with.' },
        },
        required: ['chat_id', 'message_id', 'emoji'],
      },
    },
    {
      name: 'edit_message',
      description: 'Edit a previously sent message.',
      inputSchema: {
        type: 'object',
        properties: {
          chat_id: { type: 'string', description: 'Channel ID.' },
          message_id: { type: 'string', description: 'Message ID to edit.' },
          text: { type: 'string', description: 'New message content.' },
        },
        required: ['chat_id', 'message_id', 'text'],
      },
    },
  ],
}))

// ── Tool Handlers ────────────────────────────────────────────────────────────
mcp.setRequestHandler(CallToolRequestSchema, async (req) => {
  const args = req.params.arguments ?? {}
  try {
    switch (req.params.name) {
      case 'reply': {
        const ch = await discord.channels.fetch(args.chat_id)
        if (!ch?.isTextBased() || !('send' in ch)) throw new Error('Channel not sendable')

        // Handle Discord's 2000-character limit
        const chunks = splitMessage(args.text)
        const sentIds = []

        for (let i = 0; i < chunks.length; i++) {
          const opts = { content: chunks[i] }
          if (i === 0 && args.reply_to) {
            opts.reply = { messageReference: args.reply_to, failIfNotExists: false }
          }
          const sent = await ch.send(opts)
          sentIds.push(sent.id)
        }

        return {
          content: [{
            type: 'text',
            text: sentIds.length === 1
              ? `sent (id: ${sentIds[0]})`
              : `sent ${sentIds.length} parts (ids: ${sentIds.join(', ')})`,
          }],
        }
      }

      case 'fetch_messages': {
        const ch = await discord.channels.fetch(args.channel)
        if (!ch?.isTextBased()) throw new Error('Channel not text-based')
        const limit = Math.min(args.limit ?? 20, 100)
        const msgs = await ch.messages.fetch({ limit })
        const arr = [...msgs.values()].reverse()
        const out = arr.length === 0
          ? '(no messages)'
          : arr.map(m => {
              const who = m.author.id === BOT_USER_ID ? 'me' : m.author.username
              return `[${m.createdAt.toISOString()}] ${who}: ${m.content.replace(/[\r\n]+/g, ' | ')}  (id: ${m.id})`
            }).join('\n')
        return { content: [{ type: 'text', text: out }] }
      }

      case 'react': {
        const ch = await discord.channels.fetch(args.chat_id)
        if (!ch?.isTextBased()) throw new Error('Channel not text-based')
        const msg = await ch.messages.fetch(args.message_id)
        await msg.react(args.emoji)
        return { content: [{ type: 'text', text: 'reacted' }] }
      }

      case 'edit_message': {
        const ch = await discord.channels.fetch(args.chat_id)
        if (!ch?.isTextBased()) throw new Error('Channel not text-based')
        const msg = await ch.messages.fetch(args.message_id)
        const edited = await msg.edit(args.text)
        return { content: [{ type: 'text', text: `edited (id: ${edited.id})` }] }
      }

      default:
        return { content: [{ type: 'text', text: `unknown tool: ${req.params.name}` }], isError: true }
    }
  } catch (err) {
    return { content: [{ type: 'text', text: `${req.params.name} failed: ${err.message}` }], isError: true }
  }
})

// ── Helpers ──────────────────────────────────────────────────────────────────
function splitMessage(text, maxLen = 2000) {
  const chunks = []
  let rest = text
  while (rest.length > maxLen) {
    let cut = rest.lastIndexOf('\n\n', maxLen)
    if (cut < 1000) cut = rest.lastIndexOf('\n', maxLen)
    if (cut < 1000) cut = rest.lastIndexOf(' ', maxLen)
    if (cut < 1) cut = maxLen
    chunks.push(rest.slice(0, cut))
    rest = rest.slice(cut).replace(/^\n+/, '')
  }
  if (rest) chunks.push(rest)
  return chunks
}

// ── Discord Client ───────────────────────────────────────────────────────────
const discord = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
})

discord.on('error', err => {
  process.stderr.write(`[discord-mcp] error: ${err}\n`)
})

discord.on('messageCreate', async (msg) => {
  // Skip own messages
  if (msg.author.id === BOT_USER_ID) return
  if (msg.author.bot) return
  if (!msg.content?.trim()) return

  const isDM = !msg.guild
  const mentionsBot =
    msg.content.includes(`<@${BOT_USER_ID}>`) ||
    msg.content.includes(`<@!${BOT_USER_ID}>`) ||
    msg.mentions.users?.has(BOT_USER_ID)

  // Only deliver DMs and @mentions
  if (!isDM && !mentionsBot) return

  // Optional: channel allowlist
  if (ALLOWED_CHANNELS.length > 0 && !ALLOWED_CHANNELS.includes(msg.channelId)) return

  const displayName = msg.member?.displayName || msg.author.displayName || msg.author.username
  const channelName = msg.channel.name || 'DM'

  process.stderr.write(`[discord-mcp] ${displayName} in ${channelName}: ${msg.content.slice(0, 80)}\n`)

  // Show typing indicator
  if ('sendTyping' in msg.channel) {
    msg.channel.sendTyping().catch(() => {})
  }

  // Push message to Claude Code as a channel notification
  mcp.notification({
    method: 'notifications/claude/channel',
    params: {
      content: msg.content,
      meta: {
        chat_id: msg.channelId,
        message_id: msg.id,
        user: displayName,
        user_id: msg.author.id,
        ts: msg.createdAt.toISOString(),
        source: 'discord',
        channel_name: channelName,
      },
    },
  }).catch(err => {
    process.stderr.write(`[discord-mcp] notification failed: ${err}\n`)
  })
})

discord.once('ready', (c) => {
  process.stderr.write(`[discord-mcp] Connected to Discord as ${c.user.tag}\n`)
})

// ── Start ────────────────────────────────────────────────────────────────────
process.on('unhandledRejection', err => {
  process.stderr.write(`[discord-mcp] unhandled rejection: ${err}\n`)
})

await mcp.connect(new StdioServerTransport())
await discord.login(BOT_TOKEN)

process.stderr.write('[discord-mcp] MCP server running\n')

// Graceful shutdown
let shuttingDown = false
function shutdown() {
  if (shuttingDown) return
  shuttingDown = true
  process.stderr.write('[discord-mcp] shutting down\n')
  Promise.resolve(discord.destroy()).finally(() => process.exit(0))
  setTimeout(() => process.exit(0), 3000)
}
process.stdin.on('end', shutdown)
process.stdin.on('close', shutdown)
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
