# Toggle

A button that stays pressed or not, for an option that takes effect at once, such as bold text.

```bash
npx @aline-aroucha/uiuiui add toggle
```

## What you provide
- `defaultPressed` (or `pressed` + `onPressedChange`).
- `variant`: `default` (no border) | `outline` (glass with a border); `size`: `sm` | `default` | `lg`.
- A Heroicons Micro icon and a label; for icon-only toggles, `aria-label` with the option's name ("Bold"), never a state ("Bold on").

## Usage
- For formatting and view options that apply immediately. A setting that is on or off in a list of settings is a `Switch`; one option out of several is a `ToggleGroup`.
- The name stays the same when pressed; the pressed state is shown by the brand highlight and announced as pressed.
- Don't use it to start an action ("Save"): that is a `Button`.

## Accessibility
- It is a `<button>` with `aria-pressed`, so screen readers say "Bold, toggle button, pressed". Its name never changes with the state.
- `Enter` and `Space` press and release it; hover, pressed and focus are all visible (brand highlight when pressed, solid 2px ring on focus).
- Icon-only toggles need `aria-label`; the pressed state is shown by the highlight and announced, not only by color.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Button](https://magoo.cc/en/components/forms/button.html) (`botao`). Magoo is educational guidance; test the behavior in your implementation._
