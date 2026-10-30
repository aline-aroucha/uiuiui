# DropdownMenu

A list of actions that opens from a button, for commands that don't fit on the screen at once.

```bash
npx @aline-aroucha/uiuiui add dropdown-menu
```

## What you provide
- `DropdownMenu`, `DropdownMenuTrigger asChild` around a `Button`, and `DropdownMenuContent` with the items.
- `DropdownMenuItem` with `onSelect`, an optional Heroicons Mini icon (`@heroicons/react/20/solid`) before the label, and `variant="destructive"` for deletions.
- `DropdownMenuShortcut` for a keyboard shortcut, `DropdownMenuSeparator` between groups, `DropdownMenuLabel` for a group name.
- `DropdownMenuCheckboxItem` and `DropdownMenuRadioGroup` for options that change a view; `DropdownMenuSub` for one level of submenu.

## Usage
- For actions only ("Edit", "Duplicate", "Delete"). Navigation between pages is a list of links in a `nav`, not a menu.
- An icon-only trigger names its subject: "More actions for Q3 sales", not "More".
- Keep it to about seven items in up to three groups; put the destructive item last, after a separator, and confirm it with an `AlertDialog`.
- After an item runs, send focus where the result is: the dialog it opened, or a nearby control if the row was removed.

## Accessibility
- It follows the ARIA menu button pattern: the trigger exposes `aria-haspopup="menu"` and `aria-expanded`, and the list is a `role="menu"` named by its trigger.
- `Enter`, `Space` or `ArrowDown` open it with focus on the first item; `ArrowUp` and `ArrowDown` move between items (wrapping), `Home` and `End` jump to the ends, and typing a letter moves to the next item that starts with it.
- `Enter` or `Space` runs the focused item and closes the menu. `Esc` closes it without running anything and returns focus to the trigger; `Tab` leaves the menu instead of walking through every item.
- The focused item takes the brand highlight (`primary`, or `destructive` for destructive items), so focus is visible on glass in both themes; disabled items are skipped.
- Checkbox and radio items expose `menuitemcheckbox` / `menuitemradio` with `aria-checked`. Submenus open with `ArrowRight` and close with `ArrowLeft`.
- Hover is never the only way to open it or a submenu.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Menu](https://magoo.cc/en/components/navigation/menu.html) (`menu`). Magoo is educational guidance; test the behavior in your implementation._
