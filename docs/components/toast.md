# Toast

A short message about the result of an action, shown in a corner without interrupting the task. Built on Sonner.

```bash
npx @aline-aroucha/uiuiui add toast
```

## What you provide
- `<Toaster />` once, near the root of the app.
- `toast("Changes saved")` after an action, or `toast.success`, `toast.info`, `toast.warning`, `toast.error`, `toast.promise`.
- `description` for one more sentence; `action: { label, onClick }` for one quick follow-up such as "Undo".
- `duration` in ms (default 6000). With an action, give people time: `duration: 10000` or more, or `Infinity` with `closeButton`.

## Usage
- Use it for feedback after an action: saved, sent, copied, archived. One sentence, past tense, no period after a single sentence.
- Never for critical errors, for confirming something destructive (use `AlertDialog`) or for anything the person must read later (use `Alert`).
- At most one action, and only one that can be done later too: "Undo" on a toast, "View" on the page.
- Status comes from the icon and the words ("Payment failed"), not only from color.

## Accessibility
- Toasts appear in a polite live region (`role="status"`, `aria-live="polite"`): screen readers announce them without interrupting, and focus never moves to them.
- A toast with an action stays reachable: `Alt+T` (Sonner) or `Tab` moves into the notifications region, and the timer pauses while the pointer or focus is on a toast.
- `Enter` and `Space` activate its buttons, which have clear names ("Undo", "Close").
- They don't vanish before they can be read: 6 seconds by default, longer when there is an action.
- The type is shown by an icon and the words, not only by color. Toasts stop animating with Reduce motion and turn solid with Reduce transparency.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Toasts](https://magoo.cc/en/components/messages/toasts.html) (`toasts`). Magoo is educational guidance; test the behavior in your implementation._
