# EmptyState

Fills an empty list, table or page: says what will appear there and how to add the first item.

```bash
npx @aline-aroucha/uiuiui add empty-state
```

## What you provide
- `EmptyState`, with `variant="outline"` (a dashed outline) when it sits straight on the page; the default has no outline, for use inside a `Card`.
- `EmptyStateMedia` with one Heroicons Outline icon (`@heroicons/react/24/outline`) that matches the content: decorative, hidden from screen readers.
- `EmptyStateHeader` holding `EmptyStateTitle` (an `h2` by default; set `level` to fit the page) and `EmptyStateDescription`.
- `EmptyStateActions` with the action that fills the list (`Button`) and, at most, one supporting action (`outline` or `secondary`).

## Usage
- Use it when a list or table has nothing to show: first use ("No invoices yet"), no results ("No orders match \u201cacme\u201d") or everything done ("You're all caught up").
- The title says what is empty, in plain words; the description says what will appear and how. The main action is the one that adds the first item; for no results, offer "Clear search" or "Clear filters".
- It isn't an error: when loading fails, show an `Alert` with what happened and "Try again". It isn't a wait either: while loading, show `Skeleton` or `Progress`.
- Keep the table's `Card` and title around it, so people still know where they are. No illustrations with text in them, no emoji.

## Accessibility
- The title is a real heading (`level`, h2 by default), so people find the empty area by heading and hear what is missing before the actions.
- The icon is decorative and hidden from screen readers; the words carry the meaning, never the picture alone.
- The actions are ordinary buttons or links with clear verbs ("Create invoice", "Clear search"), in the `Tab` order after the text.
- When the list empties after a search or a filter, also say it in a `role="status"` region that already exists on the page ("No orders match \u201cacme\u201d"), so the result is announced without moving focus. A wait always ends here, in content or in an error with "Try again".
- Text meets 4.5:1 in both themes; the dashed outline is decoration, not the only cue that the area is empty.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Loading and progress](https://magoo.cc/en/components/messages/loading-progress.html) (`carregamento-progresso`), [Cards](https://magoo.cc/en/components/structure/cards.html) (`cards`). Magoo is educational guidance; test the behavior in your implementation._
