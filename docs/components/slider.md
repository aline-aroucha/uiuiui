# Slider

Sets a value, or a range with two thumbs, by moving along a track between a minimum and a maximum.

```bash
npx @aline-aroucha/uiuiui add slider
```

## What you provide
- `defaultValue` (or `value` + `onValueChange`) as an array: `[1200]` for one thumb, `[200, 800]` for a range.
- `min`, `max` and `step`; `minStepsBetweenThumbs` for ranges.
- A name: `aria-labelledby` pointing to the visible label (or `aria-label`); `thumbLabels` for two thumbs ("Minimum price", "Maximum price").
- `formatValue` to read the value with its unit (`(n) => "$" + n.toLocaleString("en-US")`), and the same text shown next to the label.

## Usage
- For approximate values where moving and seeing the result helps: budget, volume, a price range. Show the current value, the unit and the limits.
- When an exact number matters, add a number `Input` next to it, kept in sync; never make the slider the only way to enter it.
- Keep steps meaningful (100 for a budget, 5 for a percentage) and the range realistic.

## Accessibility
- Each thumb is a `role="slider"` with its own name (`aria-labelledby`, `aria-label` or `thumbLabels`), its minimum, maximum and current value, read with its unit through `formatValue` (`aria-valuetext`).
- Arrow keys change the value by one step, `Page Up` and `Page Down` by larger steps, `Home` and `End` jump to the minimum and maximum. Dragging and clicking the track work too.
- The visible value next to the label follows every change, so nobody has to watch the thumb.
- The thumb is 20px with a hover halo, and keyboard focus shows a solid 2px ring; the filled part of the track reaches 3:1 against the rest.
- When precision matters, a number field next to it gives another way to enter the value.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Slider](https://magoo.cc/en/components/forms/slider.html) (`slider`). Magoo is educational guidance; test the behavior in your implementation._
