# Tooltip

Shows the name of a control, usually an icon-only button, while the pointer rests on it or it has keyboard focus.

```bash
npx @aline-aroucha/uiuiui add tooltip
```

## What you provide
- `TooltipProvider` once near the root of the app (it sets the shared delay).
- `Tooltip` with `TooltipTrigger asChild` around the control and `TooltipContent` with the label.
- The same words in the button's `aria-label`: the tooltip shows the name, the label gives it to screen readers.
- `side` (`top` default, `right`, `bottom`, `left`) on `TooltipContent`.

## Usage
- Use it to name icon-only buttons in toolbars and tables ("Download CSV"). A few words, one line, no links or buttons inside.
- Never put information the person needs only in a tooltip: touch screens have no hover. Write it on the page, or use a `Popover` that opens on click.
- Don't add a tooltip that repeats a visible label.

## Accessibility
- It appears when the control is hovered or receives keyboard focus, and it is linked to the control with `aria-describedby` (`role="tooltip"`).
- `Esc` hides it without moving focus; it stays visible while the pointer moves onto it, and until the pointer or focus leaves (WCAG 1.4.13).
- It holds no interactive content and is never the only way to get information: the control keeps its own accessible name (`aria-label` on icon-only buttons).
- Magoo notes that tooltip behavior has no consensus across libraries and advises against content that only appears on hover; UIUIUI limits Tooltip to short names of controls and uses `Popover`, opened on click, for anything longer.
- It stops animating with Reduce motion, and the glass turns solid with Reduce transparency.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Tooltip and Popover](https://magoo.cc/en/components/hidden-elements/tooltip-popover.html) (`tooltip-popover`). Magoo is educational guidance; test the behavior in your implementation._
