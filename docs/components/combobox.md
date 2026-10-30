# Combobox

A text field that suggests options as the person types, for long lists such as countries, people or tags.

```bash
npx @aline-aroucha/uiuiui add combobox field
```

## What you provide
- `options`: `{ value, label, description? }[]`. `description` gives context to options with similar names.
- `defaultValue` (or `value` + `onValueChange`): the confirmed option's value; `""` when nothing is chosen.
- `emptyMessage` ("No matches"), `listLabel` (the list's name, e.g. "Countries"), `formatCount` for the message read after typing.
- Inside a `Field`: label, help and errors are linked to the input like any other field.

## Usage
- For lists too long to scan (more than about 10 options). Short lists: `Select` or `RadioGroup`.
- Only listed values can be chosen: typing filters, Enter or a click confirms. Editing the text afterwards clears the choice, so validate `value`, not the text.
- Keep labels distinct; add `description` when two options read alike ("Springfield", "Illinois").
- For results from a server, debounce the request and ignore answers that arrive out of order.

## Accessibility
- The field is an editable `role="combobox"` with `aria-expanded`, `aria-controls` and `aria-autocomplete="list"`; it is named by its `FieldLabel` and keeps its help and error through `aria-describedby`.
- Focus stays in the field. `ArrowDown` or `ArrowUp` open the list on the confirmed option (or the first) and move through the options (`aria-activedescendant`), `Enter` confirms the active option, `Esc` closes the list without confirming, and `Tab` leaves without choosing anything.
- Typing never chooses for the person; text editing keys (Home, End, selection, paste) keep working.
- After typing stops, the number of suggestions ("3 suggestions") or "No matches" is read once from a status region, not on every key.
- The active option takes the brand highlight and the confirmed one shows a check; options are `role="option"` with `aria-selected`.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Autocomplete](https://magoo.cc/en/components/forms/autocomplete.html) (`autocomplete`). Magoo is educational guidance; test the behavior in your implementation._
