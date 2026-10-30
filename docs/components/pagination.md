# Pagination

Splits a long list or table into pages and moves between them.

```bash
npx @aline-aroucha/uiuiui add pagination
```

## What you provide
- `Pagination` (a `<nav>` named "Pagination"): give it a name that says what it pages through, such as `aria-label="Search results pages"`, when the page has other navigation.
- A `PaginationContent` list with one `PaginationItem` per control: `PaginationPrevious`, a `PaginationLink` per page (`isActive` on the current one), `PaginationEllipsis` for gaps, and `PaginationNext`.
- `href` on each control when every page has its own address (links). Without `href` they are buttons: use `onClick` to update the content in place.
- `disabled` on Previous for the first page and on Next for the last one. `paginationRange(page, total)` returns the numbers to show, with `"ellipsis"` for the gaps.

## Usage
- For long sets people browse in order: search results, orders, logs. A short list fits on one page; a feed people scroll through can load more at the end instead.
- Always show the current page, the first and last pages, and Previous and Next. On narrow screens show fewer numbers around the current page, never hide the current one.
- Say where people are next to the content ("Orders, page 3 of 12"). When the content updates in place, move focus to its start (a heading or caption with `tabIndex={-1}`) so people continue from the new page.
- Put it under the list or table, outside the `Card` that holds the table or inside it after the table, never on glass of its own.

## Accessibility
- It is a navigation landmark with a name; when there is more than one on the page, the name says what it pages through ("Orders pages").
- Page numbers are named "Page 3", and the current page has `aria-current="page"`, so screen readers say "Page 3, current page". It is also outlined and bold, not only colored.
- With `href` the controls are links that open with `Enter`; without `href` they are buttons that work with `Enter` and `Space`. `Tab` and `Shift+Tab` move between them, and each shows hover, pressed and a solid 2px focus ring.
- Previous on the first page and Next on the last look unavailable, do nothing and take no focus. The ellipsis is drawn only and never takes focus.
- Previous and Next keep their words as names on small screens, where only the chevrons show.
- When the content updates in place, focus moves to its start and the new page is perceivable ("Orders, page 3 of 12"); a full page load does the same through the page title.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Pagination](https://magoo.cc/en/components/navigation/pagination.html) (`paginacao`). Magoo is educational guidance; test the behavior in your implementation._
