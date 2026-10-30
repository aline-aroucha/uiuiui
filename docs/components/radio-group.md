# RadioGroup

Picks exactly one option from a short list where every option stays visible.

```bash
npx @aline-aroucha/uiuiui add radio-group label
```

## What you provide
- `RadioGroup` with `defaultValue` (or `value` + `onValueChange`) and a name: `aria-labelledby` pointing to the visible question ("Delivery speed").
- One `RadioGroupItem` per option, each with a `value`, an `id` and a `Label htmlFor` next to it. Extra detail goes in the label, in `text-muted-foreground`.
- `orientation` (`vertical` default, `horizontal`), `disabled` on the group or an item, `required`.
- `aria-describedby` for help or an error and `aria-invalid` after validation, as in a `Field`.

## Usage
- 2 to 5 options that people should compare side by side. More options, or space is tight: `Select`. Yes or no with an immediate effect: `Switch`; several choices: `Checkbox`es.
- Pre-select the safest or most common option when there is one; otherwise leave none selected and validate.
- Options are short and parallel ("Standard", "Express", "Overnight") and the group label asks the question.

## Accessibility
- The group is a `role="radiogroup"` named by its visible question (`aria-labelledby`); each option is a `role="radio"` with `aria-checked`, named by its `Label`, and its position in the group is announced.
- `Tab` enters the group once, on the selected option (or the first when none is); arrow keys move focus and select; `Space` selects the focused option; `Tab` leaves the group.
- Clicking or tapping the label selects the option, and a selected option is not cleared by a second click.
- Selection is shown by the filled dot, not by color alone; focus shows a solid 2px ring; disabled options are skipped.
- Help and errors are linked with `aria-describedby`, and `aria-invalid` is set only after validation finds a problem.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Radio Button](https://magoo.cc/en/components/forms/radio-button.html) (`radio-button`). Magoo is educational guidance; test the behavior in your implementation._
