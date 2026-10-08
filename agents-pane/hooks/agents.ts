import type { AgentEntry } from '../types'

// The agent colors Claude Code accepts in an agent's `color` frontmatter, as hex so every surface draws them.
const HEX: Record<string, string> = {
  red: '#e5484d',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  purple: '#a855f7',
  orange: '#f97316',
  pink: '#ec4899',
  cyan: '#06b6d4',
}

export const toHex = (color?: string): string | undefined =>
  color?.startsWith('#') ? color : color ? HEX[color.toLowerCase()] : undefined

// Section heading and the path shown beside it, per agent source.
export const SECTIONS: Record<string, { label: string; path?: string }> = {
  project: { label: 'PROJECT', path: '.claude/agents' },
  user: { label: 'USER', path: '~/.claude/agents' },
  'built-in': { label: 'BUILT-IN' },
  plugin: { label: 'PLUGIN' },
  other: { label: 'OTHER' },
}

// The section of an offered agent, from the engine's source name (`userSettings`, `built-in`, ...).
export const sourceOf = (source: string): string =>
  /user/i.test(source) ? 'user'
  : /project|local/i.test(source) ? 'project'
  : source === 'built-in' || source === 'plugin' ? source
  : 'other'

// Frontmatter `name`, `description`, `color`, `model` of an agent .md file.
export const parseAgent = (text: string, source: string): AgentEntry | undefined => {
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1]
  if (!fm) return undefined
  const get = (key: string) =>
    new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(fm)?.[1]?.trim().replace(/^(['"])(.*)\1$/, '$2')
  const name = get('name')
  if (!name) return undefined

  return { name, description: summary(get('description') ?? ''), color: get('color'), model: get('model'), source }
}

// First line of a description, before the escaped newlines and examples.
export const summary = (text: string): string =>
  (text.split(/\\n|\n|<example>|Examples?:/)[0] ?? '').trim()
