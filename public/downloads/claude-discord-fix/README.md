# Claude Code Discord MCP Server Template

## The Problem

Claude Code v2.1.85 has a confirmed bug (GitHub Issue #36477) where the official Discord channels plugin stops processing messages after the first response. Your bot connects, handles one message, and goes silent. No error, no crash — just dead.

This template provides a replacement: a custom MCP (Model Context Protocol) server that connects directly to the Discord gateway and feeds messages into Claude Code. It bypasses the broken channels plugin entirely.

## How It Works

```
Discord Gateway (WebSocket)
        │
        ▼
  Custom MCP Server
   ├── Receives Discord messages (event-driven, not polling)
   ├── Filters for DMs and @mentions
   ├── Pushes notifications to Claude Code via MCP protocol
   └── Exposes tools: reply, fetch_messages, react, edit_message
        │
        ▼
   Claude Code
   (processes messages and calls tools to respond)
```

**Key architectural decisions:**
- **Event-driven via Discord gateway** — no polling, no state management bugs
- **Standard MCP protocol** — fully compatible with Claude Code's channel notification system
- **Direct connection** — no middleman plugin to fail
- **Auto-restart wrapper** — recovers from crashes and reboots automatically

## Prerequisites

- Node.js 18 or later
- A Discord bot token (from Discord Developer Portal)
- Claude Code CLI installed

## Setup

### 1. Install dependencies

```bash
cd claude-discord-mcp-server
npm install
```

### 2. Configure your bot token

Open `server.mjs` and replace the placeholder values:

```javascript
const BOT_TOKEN = 'YOUR_DISCORD_BOT_TOKEN_HERE'
const BOT_USER_ID = 'YOUR_BOT_USER_ID_HERE'
```

**Security note:** In production, use environment variables instead of hardcoded tokens.

### 3. Register as an MCP server in Claude Code

Add this to your Claude Code MCP server configuration (`.claude/settings.json` or equivalent):

```json
{
  "mcpServers": {
    "my-discord-bot": {
      "command": "node",
      "args": ["path/to/server.mjs"]
    }
  }
}
```

### 4. Launch Claude Code with the MCP server

```bash
claude --dangerously-load-development-channels server:my-discord-bot
```

### 5. (Optional) Auto-restart wrapper

For production use, wrap the launch command in a restart loop:

**Linux/Mac (bash):**
```bash
#!/bin/bash
while true; do
  claude --dangerously-load-development-channels server:my-discord-bot
  echo "Claude Code exited. Restarting in 10 seconds..."
  sleep 10
done
```

**Windows (CMD):**
```cmd
:loop
claude --dangerously-load-development-channels server:my-discord-bot
echo Claude Code exited. Restarting in 10 seconds...
timeout /t 10
goto loop
```

## Customization

### Filtering messages

By default, the server delivers DMs and @mentions. Modify the `messageCreate` handler in `server.mjs` to change which messages reach Claude Code.

### Adding tools

You can add custom tools by extending the `ListToolsRequestSchema` handler and adding cases to the `CallToolRequestSchema` handler. Each tool becomes available to Claude Code as a callable function.

### Channel restrictions

To limit which channels the bot listens to, add a channel allowlist in the message filter logic.

## Troubleshooting

**Bot shows online but doesn't respond:** The Discord bot token connects independently of the Claude Code brain. A green dot does not mean the AI is processing. Check if the Claude Code process is running.

**Messages not arriving:** Ensure your bot has the following gateway intents enabled in the Discord Developer Portal:
- Guilds
- Guild Messages
- Direct Messages
- Message Content (requires verification for bots in 100+ servers)

**First message works, then stops:** You are likely still using the official channels plugin. Make sure you are launching with `--dangerously-load-development-channels server:your-server-name`, not `--channels plugin:discord@...`.

## Architecture Notes

This server uses three key libraries:
- `@modelcontextprotocol/sdk` — Official MCP SDK for server implementation
- `discord.js` — Discord gateway client
- Standard Node.js stdio for MCP transport

The MCP server communicates with Claude Code over stdin/stdout using the MCP protocol. Discord messages are pushed as channel notifications, and Claude Code calls the exposed tools (reply, fetch, react, edit) to interact with Discord.

## License

MIT License. Use, modify, and distribute freely.

## About

Built by Metro Point Technology. We run 13 AI agents on Discord using this architecture in production.

If you need help building AI infrastructure, multi-agent systems, or custom integrations, visit [www.MetroPointTechnology.com](https://www.MetroPointTechnology.com) or reach out to us directly.
