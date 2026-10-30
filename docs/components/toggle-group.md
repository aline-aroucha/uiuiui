# ToggleGroup

A set of toggles in a glass track: one choice (a segmented control) or several, applied at once.

```bash
npx @aline-aroucha/uiuiui add toggle-group
```

## What you provide
- `type="single"` (one choice, like a segmented control) or `type="multiple"` (any number), with `defaultValue` / `value` + `onValueChange`.
- A name for the group: `aria-label` ("Text style", "View") or `aria-labelledby`.
- One `ToggleGroupItem` per option with a `value`; icon-only items need `aria-label`.
- `size` and `variant` apply to every item.

## Usage
- Views and formatting that change the screen at once: list or grid, text alignment, bold/italic/underline.
- Two to five short options. Switching between panels of content is `Tabs`; a choice saved with a form is a `RadioGroup`.
- In `single` mode the selected item can be pressed again to clear it; set a value from your state if one must always be chosen.

## Accessibility
- The group is named (`aria-label` or `aria-labelledby`). With `type="multiple"` each item is a toggle button (`aria-pressed`); with `type="single"` the items work like radio buttons (`role="radio"`, `aria-checked`).
- `Tab` enters the group once and leaves it; arrow keys move between items; `Enter` or `Space` presses the focused item.
- The pressed item takes the brand highlight inside the glass track, and focus shows a solid 2px ring.
- Icon-only items need `aria-label` ("Bold", "Align left").

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Button](https://magoo.cc/en/components/forms/button.html) (`botao`), [Radio Button](https://magoo.cc/en/components/forms/radio-button.html) (`radio-button`). Magoo is educational guidance; test the behavior in your implementation._
