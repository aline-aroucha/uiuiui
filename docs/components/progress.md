# Progress

Shows how far an operation has gone, or that it is still running when the total isn't known.

```bash
npx @aline-aroucha/uiuiui add progress
```

## What you provide
- `value` from 0 to `max` (default 100) when the total is known; no `value` when it isn't (indeterminate).
- A name: `aria-labelledby` pointing to the visible label ("Uploading q3-sales.csv"), or `aria-label`.
- Next to it, the operation's name, the percentage in text when it helps, and a Cancel button when the operation can stop.

## Usage
- Use a measured value only when there is one; never invent a percentage or a time left. Unknown totals use the indeterminate bar.
- Say what the bar measures. Reaching 100% of a transfer isn't success: say "Checking the file…" until the work is really done.
- Every wait ends in content, an error with "Try again", or a canceled state. For a short wait inside a button or a row, use `Spinner`; for content still loading, `Skeleton`.

## Accessibility
- It is a `role="progressbar"` with a name (from `aria-labelledby` or `aria-label`), its range and, when known, its value as a percentage. Without a value it is indeterminate and exposes no number.
- It never takes focus, and updates don't move focus: Cancel and "Try again" stay ordinary buttons in the `Tab` order.
- Screen readers don't announce every change. Announce the start and the outcome ("Upload complete", "Upload failed") in a `role="status"` region; use `role="alert"` only for a failure that needs action now.
- The bar's fill reaches 3:1 against its track, and the percentage is also written as text where it matters.
- With Reduce motion the indeterminate bar stops pulsing and the fill stops animating; the text keeps saying what is happening.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Loading and progress](https://magoo.cc/en/components/messages/loading-progress.html) (`carregamento-progresso`). Magoo is educational guidance; test the behavior in your implementation._
