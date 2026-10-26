import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

// The page is a client component and cannot export metadata, so it inherited the home page's title with no
// canonical; Search Console flagged agenient.com for "Duplicate without user-selected canonical" (2026-10-25).
export const metadata: Metadata = pageMetadata({
  title: 'Claude Code Discord Channels Fix',
  description: 'GitHub Issue #36477 broke Discord channels in Claude Code v2.1.85. A custom MCP server that replaces the broken plugin entirely.',
  path: '/claude-discord-fix',
})

export default function ClaudeDiscordFixLayout({ children }: { children: React.ReactNode }) {
  return children
}
