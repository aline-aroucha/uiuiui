# DatePicker

A date typed in the field (MM/DD/YYYY) or chosen in a calendar, for deadlines, deliveries and appointments.

```bash
npx @aline-aroucha/uiuiui add date-picker field
```

## What you provide
- `defaultValue` (or `value` + `onValueChange`) as `YYYY-MM-DD`, `""` when empty. Dates have no time and no time zone, so they never move to another day.
- `min`, `max` and `isDateDisabled(date)` for the dates people can choose.
- `onInvalidInput(reason, text)`: `"format"` for text that isn't a date, `"range"` for a date outside the limits. Show a concrete message in `FieldError`; the typed text stays.
- Inside a `Field`, with the format and the limits in `FieldDescription` ("Format: MM/DD/YYYY").

## Usage
- People can always type: a birthday or a far date shouldn't need dozens of clicks. The calendar helps when the weekday or nearby dates matter.
- For a period, use two DatePickers labelled "Start date" and "End date", and check that the end isn't before the start with a message on the end field.
- Dates shown elsewhere in the UI use the en-US format (`Oct 21, 2026`).

## Accessibility
- The field keeps its label, the format in its description and its error through `aria-describedby`; typed text is checked when the person leaves the field or presses `Enter`, and kept for correction.
- The calendar button is named "Choose date" and says the selected date ("Choose date, selected date is Oct 21, 2026"). It opens a modal dialog named by the month, with focus on the selected date (or today).
- In the grid, `←`/`→` move a day, `↑`/`↓` a week, `Home`/`End` to the start and end of the week, `Page Up`/`Page Down` a month (with `Shift`, a year). The grid is one `Tab` stop; the month buttons are the others.
- Each day is read in full ("Wednesday, October 21, 2026"). Today is marked with `aria-current="date"`, bold text and a dot; the selected day with `aria-selected` and the brand highlight; unavailable days are crossed out and can't be chosen.
- `Enter` or `Space` choose the focused day and return focus to the calendar button; `Esc` closes without changing the date. Moving through days never confirms one. The month heading announces the new month.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Dates and ranges](https://magoo.cc/en/components/forms/dates-ranges.html) (`datas-intervalos`). Magoo is educational guidance; test the behavior in your implementation._
