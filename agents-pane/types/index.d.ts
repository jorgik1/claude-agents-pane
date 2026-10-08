export type AgentEntry = {
  name: string
  description: string
  color?: string
  model?: string
  source?: string
}

declare module 'claude-code' {
  interface PluginState {
    'agents-pane': { offered: AgentEntry[]; isOpen: boolean }
  }
}
