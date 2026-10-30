# Popover

Shows extra content or a few quick controls next to the button that opened it, without leaving the page.

```bash
npx @aline-aroucha/uiuiui add popover
```

## What you provide
- `Popover` (controlled with `open` + `onOpenChange`, or not), `PopoverTrigger asChild` around a `Button`, and `PopoverContent`.
- `PopoverHeader` with `PopoverTitle` and `PopoverDescription`; any short content or form controls below.
- `PopoverClose asChild` around a button that closes it ("Done").
- `align` (`start` | `center` | `end`) and `side` on `PopoverContent` to place it.

## Usage
- Good for a link to share, a short filter, a color or date choice. For a task with several steps, use `Dialog`; for the name of an icon button, use `Tooltip`.
- The trigger's label says what opens ("Share link"), and the popover's title repeats it.
- Keep it short: a title, a sentence and up to three controls. It sits on dense glass; never put a Card or more glass inside.
- On small screens prefer a `Dialog` or an inline section: a popover can cover what the person is reading.

## Accessibility
- The trigger is a button whose name says what opens; it exposes `aria-haspopup="dialog"` and `aria-expanded`.
- It opens with a click, a tap, `Enter` or `Space`, never on hover alone. Focus moves into the popover so its content is read; it is labelled by its title.
- `Esc`, a click outside or the trigger again close it, and focus returns to the trigger. A close button, when there is one, is the next `Tab` stop.
- It is not modal: the page stays available, so don't put anything in it that the person must answer before going on.
- It stops animating with Reduce motion, and the glass turns solid with Reduce transparency.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Tooltip and Popover](https://magoo.cc/en/components/hidden-elements/tooltip-popover.html) (`tooltip-popover`). Magoo is educational guidance; test the behavior in your implementation._
