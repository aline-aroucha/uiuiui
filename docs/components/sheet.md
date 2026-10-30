# Sheet

A panel that slides in from an edge of the screen, over the page, for filters, details of an item or the navigation on small screens.

```bash
npx @aline-aroucha/uiuiui add sheet
```

## What you provide
- `Sheet` with `open` + `onOpenChange` (or `defaultOpen`); `SheetTrigger asChild` around the `Button` that opens it.
- `SheetContent` with `side`: `right` (default) | `left` | `top` | `bottom`, plus `showCloseButton` (default `true`) and `closeLabel` (default "Close").
- A `SheetHeader` with `SheetTitle` and `SheetDescription`, the body, and a `SheetFooter` with the actions, main action first.

## Usage
- Right: filters, settings and an item's details next to the list it came from. Left: the app navigation on small screens (`Sidebar` does this for you). Bottom: short choices on phones.
- It is modal like `Dialog`: the page behind is dimmed and can't be used until the sheet closes. For a short task in the middle of the flow use `Dialog`; for a few quick controls next to a button, `Popover`.
- The title names the panel ("Filters") and matches the trigger's label. Keep one `default` button in the footer.
- The panel is dense glass (`glass-strong`) over the dimmed page; put fields and text straight in it, never a Card or more glass.

## Accessibility
- It is a modal dialog (`role="dialog"`, `aria-modal`) named by `SheetTitle` and described by `SheetDescription`. While it is open the page behind is inert and hidden from screen readers.
- The trigger exposes `aria-haspopup="dialog"` and `aria-expanded`. Opening it moves focus inside; `Tab` and `Shift+Tab` stay inside until it closes.
- `Esc`, the close button (named "Close", or `closeLabel`) and a click on the dimmed page close it, and focus returns to the control that opened it.
- The close button and every control show a solid 2px focus ring; hover and pressed are visible.
- With Reduce motion it appears without sliding; with Reduce transparency the glass turns solid.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Modal](https://magoo.cc/en/components/hidden-elements/modal.html) (`modal`). Magoo is educational guidance; test the behavior in your implementation._
