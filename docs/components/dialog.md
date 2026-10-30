# Dialog

A window over the page for a short task that must be finished or canceled before going back.

```bash
npx @aline-aroucha/uiuiui add dialog
```

## What you provide
- `Dialog` with `open` + `onOpenChange` (or `defaultOpen`); `DialogTrigger asChild` around the `Button` that opens it.
- `DialogContent` with a `DialogHeader` (`DialogTitle` + `DialogDescription`), the body, and a `DialogFooter` with the actions.
- `showCloseButton` (default `true`) and `closeLabel` (default "Close") for the corner button.
- For a confirmation of something irreversible, use `AlertDialog` instead.

## Usage
- Use it only when the task has to interrupt the flow; prefer inline editing or a new page for long tasks.
- The title names the task ("Edit profile"); the trigger's label says the same thing.
- Footer: the main action on the right (`Button`), "Cancel" to its left (`variant="ghost"`). One `default` button.
- Dialog content sits on dense glass (`glass-strong`) over a dimmed page; never put a Card or more glass inside it.
- When closing could lose typed data, ask first, or keep the dialog open on outside clicks (`onInteractOutside={(e) => e.preventDefault()}`).

## Accessibility
- It is announced as a dialog (`role="dialog"`) named by `DialogTitle`, with `DialogDescription` as its description. While it is open, the rest of the page is hidden from screen readers.
- Opening moves focus inside the dialog, to the first control; `Tab` and `Shift+Tab` cycle only through its controls, and the page behind is inert for the keyboard and screen readers.
- `Esc` closes it, and so does the corner button, which stays visible and has an accessible name ("Close").
- Closing returns focus to the control that opened it, or to a predictable point in the flow.
- `Enter` and `Space` activate its buttons. Clicking outside closes it only when no typed data can be lost; otherwise confirm or prevent it.
- The open and close animation stops with Reduce motion, and the glass turns solid with Reduce transparency.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Modal](https://magoo.cc/en/components/hidden-elements/modal.html) (`modal`), [Dialogs](https://magoo.cc/en/components/messages/dialogs.html) (`dialogs`). Magoo is educational guidance; test the behavior in your implementation._
