# Spinner

A small turning icon for a short wait of unknown length, inside a button, a row or next to a message.

```bash
npx @aline-aroucha/uiuiui add spinner
```

## What you provide
- `label` (default "Loading"): names the wait for screen readers, e.g. "Loading orders". The spinner is a `role="status"`.
- `aria-hidden` instead, when visible text next to it already says what is happening (a "Saving…" button).
- `className` for size (`size-4` in buttons and fields, `size-6` on its own) and color (`text-muted-foreground`).

## Usage
- For waits under a few seconds with no measurable progress; for longer or measurable ones, use `Progress`.
- Always say what is loading, in text or in `label`. A spinner alone doesn't say whether the page or an action is busy.
- Never leave it spinning: end in the content, an error with "Try again", or an empty state.

## Accessibility
- It is a `role="status"` named by `label`, so screen readers hear "Loading orders" once, without moving focus. When visible text already says it, set `aria-hidden` and put that text in the status region instead.
- It is never the only sign of a wait: the button or message around it says what is busy ("Saving…").
- With Reduce motion it stops turning; the words still carry the state.
- A busy button keeps its place and says what it is doing ("Saving…"). Disabling it while it works prevents a double submit, but the status region, not the disabled look, tells people it is working; end the wait with a result they can perceive.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Loading and progress](https://magoo.cc/en/components/messages/loading-progress.html) (`carregamento-progresso`). Magoo is educational guidance; test the behavior in your implementation._
