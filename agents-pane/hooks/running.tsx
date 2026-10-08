import type { ClientModule } from 'claude-code'

// A turning circle on the surface's own frame clock, so the pane never redraws to animate it.
const FRAMES = ['◜', '◠', '◝', '◞', '◡', '◟']
const TICK = 100

export type RunningProps = {
  label: string
  // Draw the circle here; the desktop draws its own ring beside this text instead.
  spin: boolean
  // When the agent started and the pane's clock at its draw, both epoch ms; absent, no timer.
  since?: number
  now: number
}
type State = { tick: number; base: number }

const Running: ClientModule<RunningProps, State> = (props, surface) => {
  const { Text } = surface.elements
  let state = surface.state
  if (state === undefined) {
    // Elapsed at mount, then the frame clock counts on from there.
    state = { tick: 0, base: props.since === undefined ? 0 : props.now - props.since }
    surface.setState(state)
    surface.every(TICK, () => {
      const s = surface.state
      if (s) surface.setState({ ...s, tick: s.tick + 1 })
    })
  }
  const frame = props.spin ? `${FRAMES[state.tick % FRAMES.length]} ` : ''
  const timer = props.since === undefined ? '' : ` · ${Math.floor((state.base + state.tick * TICK) / 1000)}s`

  return (
    <Text dimColor>
      {frame}
      {props.label}
      {timer}
    </Text>
  )
}

export default Running
