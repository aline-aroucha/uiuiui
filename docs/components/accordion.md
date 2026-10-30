# Accordion

Sections that open and close under their titles, so people can scan the titles and read only what they need.

```bash
npx @aline-aroucha/uiuiui add accordion
```

## What you provide
- `type="single"` (one section open at a time; add `collapsible` so it can also be closed) or `type="multiple"` (any number), with `defaultValue` / `value` + `onValueChange`.
- One `AccordionItem` per section with a `value`, an `AccordionTrigger` with the section title and an `AccordionContent` with its body.
- `level` on `AccordionTrigger` (default `3`) so the titles fit the page's heading outline.

## Usage
- For related, optional content: FAQs, settings groups, details of an order. Titles say exactly what each section holds.
- Don't hide what everyone needs (prices, errors, required fields) inside a closed section. Panels of the same kind of content shown one at a time are `Tabs`.
- Prefer `type="single"` with `collapsible`, or `type="multiple"`, so every section can be closed. Keep it inside a `Card` or on the page background, never on glass.

## Accessibility
- Each title is a heading (`level`, h3 by default) holding a button, so screen readers say "How do refunds work?, button, collapsed" and people can jump between sections by heading.
- `Tab` and `Shift+Tab` move between titles and the links inside open sections; `Enter` or `Space` opens or closes the focused section. Hover underlines the title, and focus shows a solid 2px ring.
- The button exposes `aria-expanded` and points to its panel with `aria-controls`; the chevron turns as well, so the state isn't only an icon.
- Closed sections are removed from the page, so their content takes no focus and isn't read. With `type="single"` opening one section closes the other, predictably; without `collapsible` the open title reports `aria-disabled`.
- With Reduce motion sections open and close at once, without the slide.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Accordion](https://magoo.cc/en/components/hidden-elements/accordion.html) (`accordion`). Magoo is educational guidance; test the behavior in your implementation._
