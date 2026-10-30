# UIUIUI guidelines

UIUIUI is a design system built on [shadcn/ui](https://ui.shadcn.com): the same components and CSS variable names, with the UIUIUI identity. A neutral base in a slightly cool gray and the three primary colors as the brand: blue `primary`, yellow `highlight` and red `emphasis`. Everything here is written to be followed by people and by AI agents alike.

## Rules for AI agents

Read this section before generating any UIUIUI interface.

1. **Use the UIUIUI components** from `@/components/ui/*`. Install what is missing with `npx @aline-aroucha/uiuiui add <name>`. Don't hand-build Button, Input, Select and so on.
2. **Color only through tokens.** Use the semantic Tailwind classes generated from the tokens: `bg-background`, `text-foreground`, `bg-primary text-primary-foreground`, `text-muted-foreground`, `border-border`, `bg-success text-success-foreground`. **Never** use hex, `rgb()` or the Tailwind palette (`bg-teal-600`, `text-gray-500`, `bg-white`, `text-black`).
3. **Every background has its text pair.** `bg-primary` → `text-primary-foreground`; `bg-accent` → `text-accent-foreground`. Don't put `text-white` on a color: in the dark theme the pair is dark text.
4. **Dark mode is automatic** through the `.dark` class on `<html>`. Don't write `dark:` color overrides; the tokens already switch.
5. **Spacing on the 4px scale:** `gap-2` (8), `gap-4` (16), `gap-6` (24), `gap-8` (32), `py-12` (48). No arbitrary values (`p-[13px]`).
6. **Radii:** `rounded-full` on buttons, badges, tab tracks, switches and avatars; `rounded-lg` on fields; `rounded-xl` on alerts, menus and popovers; `rounded-2xl` on cards.
12. **Material is Liquid Glass, on the controls layer.** Glass is for what floats above content: buttons, the tab track, toolbars, menus, popovers. Content (cards, fields, tables, alerts, badges) stays solid. Use `glass` over neutral surfaces, `glass-strong` for menus, popovers and anything over color, `glass-clear` on a `bg-glass-dim` layer over photos and video. Always add `shadow-glass`; never raw `backdrop-blur` or `bg-white/60`.
7. **One primary action per area.** The others are `secondary`, `outline` or `ghost`.
8. **UI copy in US English**, sentence case, en-US formats (`$1,280.00`, `Oct 21, 2026`, `9:42 AM`).
9. **Accessibility:** every control has a `Label`; icon-only buttons have an `aria-label`; status is never conveyed by color alone (add an icon or a word).
10. **Icons:** [Heroicons](https://heroicons.com) from `@heroicons/react`, at the size each style was drawn for: Micro (`16/solid`, `size-4`) in buttons, fields and badges; Mini (`20/solid`, `size-5`) in menus, lists and next to headings; Outline (`24/outline`, `size-6`) in navigation and empty states. Never `lucide-react`. Decorative icons stay hidden from screen readers (Heroicons sets `aria-hidden` by default).
11. **Behavior follows [Magoo](https://magoo.cc/en).** Before building or changing a component, read its Magoo page (or ask the Magoo MCP) and meet its keyboard, screen reader, touch and acceptance criteria.

## Behavior and accessibility

UIUIUI defines how things look; how they behave follows **[Magoo](https://magoo.cc/en)** 1.6.0, the interaction-behavior library by Marcelo Sales (MIT). Every component page has an **Accessibility** section adapted from its Magoo entry, with the Magoo IDs it is based on.

- **Every interactive state is visible:** hover, pressed, keyboard focus (solid 2px ring), selected, disabled, invalid. None depends on color alone.
- **Keyboard:** `Tab` / `Shift+Tab` follow the visual order; `Enter` and `Space` act like the native element; `Esc` closes overlays; focus is never trapped outside dialogs and always lands somewhere predictable after an element closes.
- **Screen readers** hear a name, a role and a state for every control. Messages are announced by urgency: `role="alert"` only for critical ones, `role="status"` for the rest, never on every keystroke.
- **Forms:** persistent labels, instructions and errors tied to the field (`Field`), values kept after an invalid submit, concrete error text.
- **Touch:** labels are part of the target; controls keep comfortable touch areas, also with zoom.
- **Motion:** animations stop when the person prefers reduced motion; a loader never replaces the final message.
- Components UIUIUI doesn't ship yet (Modal, Dialogs, Toasts, Accordion, Menu, Tooltip, Radio button, Slider, Autocomplete, Dates, File upload, Breadcrumb, Pagination, Step indicator, Carousel, Drag and drop, Links, Lists, Headings, Page regions, Tabbar) still follow their Magoo page when you build them.

Agents can query Magoo directly through its read-only MCP server (Node.js 20.19+):

```json
{
  "mcpServers": {
    "magoo": { "command": "npx", "args": ["-y", "@acessibilidade/magoo-mcp@1.6.0"] }
  }
}
```

Magoo is educational guidance, not a certification: verify each behavior in the implementation.

## Color

The brand is the three primary colors. **Blue** (`primary`) is the main one: main action, active item, focus, links, chart series 1. **Yellow** (`highlight`, with dark text) and **red** (`emphasis`, the same red as `destructive`) mark supporting actions and labels that need to stand out, and lead the chart palette. Neutrals lean slightly cool so the three colors stay clean.

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `background` | `#ffffff` | `#0a0d14` | Page background. Tailwind: bg-background. |
| `foreground` | `#0f1420` | `#e7eaf0` | Primary text on background, card and popover (18:1 light, 16:1 dark). |
| `card` | `#ffffff` | `#10141c` | Card and raised panel background. Tailwind: bg-card. |
| `card-foreground` | `{foreground}` | `{foreground}` | Text inside a card. |
| `popover` | `#ffffff` | `#10141c` | Background of popovers, menus, the open Select and tooltips. |
| `popover-foreground` | `{foreground}` | `{foreground}` | Text inside a popover. |
| `primary` | `#1d4ed8` | `#7aa2ff` | The UIUIUI brand color (primary blue). Primary action, active item, focus, links. As text it reads on background and card (6.7:1 / 7.4:1). One primary action per area. |
| `primary-foreground` | `#ffffff` | `#0a1433` | Text and icons on primary (6.7:1 / 7.3:1). Dark text in the dark theme: never hard-code white on primary. |
| `secondary` | `#f1f3f7` | `#1a202b` | Secondary buttons and surfaces. Tailwind: bg-secondary. |
| `secondary-foreground` | `#141a26` | `#e7eaf0` | Text on secondary. |
| `muted` | `#f1f3f7` | `#1a202b` | Quiet backgrounds: table row hover, Skeleton, empty areas. |
| `muted-foreground` | `#5a6475` | `#98a1b2` | Secondary text, descriptions, placeholders, metadata. Reads on background, card and muted (≥5.3:1). |
| `accent` | `#e6edfb` | `#18264a` | Hover and highlight for menu items, ghost buttons and selected rows. |
| `accent-foreground` | `#132a63` | `#c9d8fb` | Text on accent (10:1). |
| `highlight` | `#f7c51e` | `#ffd84d` | The second brand color (primary yellow). Highlighted supporting actions and badges: `bg-highlight text-highlight-foreground`. Never as text on background: it does not reach 4.5:1. |
| `highlight-foreground` | `#241a00` | `#241a00` | Text and icons on highlight (10.6:1 / 12.4:1). Always dark text: never white on yellow. |
| `emphasis` | `{destructive}` | `{destructive}` | The third brand color (primary red), shared with destructive. Attention-grabbing actions that are not destructive (Go live, Record): `bg-emphasis text-emphasis-foreground`. For deletion use `destructive` inside an AlertDialog. |
| `emphasis-foreground` | `{destructive-foreground}` | `{destructive-foreground}` | Text and icons on emphasis. |
| `destructive` | `#c8231a` | `#ff7a6b` | Destructive actions and errors (primary red). As text it reads on background (5.7:1 / 7.6:1). |
| `destructive-foreground` | `#ffffff` | `#2a0804` | Text on destructive (≥5:1 in both themes). |
| `success` | `#13734a` | `#4cc38a` | Success and confirmation states. Always pair it with an icon or a word. |
| `success-foreground` | `#ffffff` | `#03200f` | Text on success. |
| `warning` | `#a35a00` | `#f0a54a` | Warnings and pending states. Always pair it with an icon or a word. |
| `warning-foreground` | `#ffffff` | `#2a1600` | Text on warning. |
| `border` | `#dde2ea` | `#252c39` | Dividers and card borders. Decorative: carries no meaning on its own. |
| `input` | `#838c9c` | `#5c6880` | Field borders (Input, Select, Checkbox, Switch off). Strong enough to reach 3:1. |
| `ring` | `{primary}` | `{primary}` | Focus ring: 2px solid + 2px offset on background. ≥6:1 in both themes. |
| `glass` | `#ffffff99` | `#161b2599` | Regular Liquid Glass (60% fill, strong blur): controls that float over page and card surfaces, such as secondary, outline and ghost buttons and the tab track. Utility: `glass`. Text keeps ≥4.5:1 over the neutral surfaces; over color or media use `glass-strong` or `glass-clear`. |

- Checked text pairs: every text color is ≥ 4.5:1 on the backgrounds its usage names, in both themes; field borders (`input`) and the focus ring (`ring`) are ≥ 3:1.
- `success`, `warning`, `destructive-foreground` and the matching Badge variants are **UIUIUI additions** to shadcn, for record status.
- `highlight` and `emphasis` (with their `-foreground` pairs) are **UIUIUI additions** too: the Button and Badge variants of the same names use them. Yellow never works as text on a light background; always put it behind `text-highlight-foreground`.
- `border` is decorative (≈1.3:1). When a border outlines a control, use `input`.
- Charts: `chart-1` … `chart-5` in order; they also differ in lightness, not only in hue.

## Typography

**Inter** for UI and headings, the closest Google Fonts match to Apple's SF Pro; its optical sizes (`opsz` 14–32) switch to the display cut at large sizes, like SF Pro Text and SF Pro Display. **Geist Mono** for code and aligned numbers. The UI base is 14px (`text-sm`); content pages use 16px with `leading-7`. On Apple devices the stack falls back to the system font if Inter can't load.

- Headings `h1`–`h4` in `tracking-tight`, with `text-wrap: balance`. One `h1` per screen.
- UI: `body` (14/20). Labels: `label` (14/14, 500). Captions and badges: `caption` (12/16).
- Numbers in columns: `font-mono tabular-nums`, right-aligned.

## Spacing, radius and shadow

- 4px scale (`space-1` to `space-12`). Lay out with `flex`/`grid` and `gap`, not with margins on each child.
- `--radius` = 0.5rem; `radius-sm` 4px, `radius-md` 6px, `radius-lg` 8px, `radius-xl` 12px, `radius-2xl` 16px, `radius-full` for capsules.
- Depth comes from the glass material: `shadow-glass` (top highlight + soft drop shadow) on every surface and button. `shadow-lg` is reserved for dialogs and sheets above glass.

## Material: Liquid Glass

UIUIUI follows Apple's Liquid Glass model: **glass is the controls and navigation layer that floats above content; content stays solid.** Glass bends what is behind it into a soft, saturated blur, catches light on its rim and lifts off the page. Keeping it to the layer above content is what lets it be very transparent and still readable.

| Layer | UIUIUI pieces | Material |
| --- | --- | --- |
| Controls and navigation | secondary, outline and ghost buttons; the tab track; toolbars and app bars you build | `glass` + `shadow-glass` |
| Floating layers with text | menus, select lists, popovers; the selected tab; hover on glass buttons | `glass-strong` + `shadow-glass` |
| Controls over photos and video | play, close, share and similar icon buttons on media | `glass-clear` + `shadow-glass` on a `bg-glass-dim` layer |
| Content | cards, fields, tables, alerts, badges, checkboxes, skeletons | solid (`bg-card`, `bg-background`, `bg-muted`) |
| Prominent actions | primary and destructive buttons | solid color + `shadow-glass` |

| Utility | Fill | Text stays readable over |
| --- | --- | --- |
| `glass` | 60%, `blur(24px) saturate(200%)` | page, card, muted, accent and secondary surfaces (≥4.5:1) |
| `glass-strong` | 89% / 90% | any surface, including brand and chart colors (≥4.5:1) |
| `glass-clear` | 12%, white content | media under a 50% `glass-dim` layer, white icons and bold labels (≥3:1, even over white) |

The build checks every pair above in both themes.

- **The rim makes it glass.** `shadow-glass` stacks a bright top rim, a faint bottom rim, a hairline all around and a soft drop shadow. Use it on every glass control and on solid buttons; it composes with the focus ring.
- **Shapes are soft and concentric:** capsules (`rounded-full`) for controls, `rounded-lg` fields, `rounded-xl` menus and alerts, `rounded-2xl` cards.
- **Never glass on glass,** never glass with small text directly over media (use `glass-clear` with the dim layer), and never glass for a whole content area.
- **Scroll edge effect:** a scroll container that runs under a glass bar gets `scroll-edge`, so content fades instead of colliding with the bar.
- **Glass needs something behind it.** It shines over imagery, charts or a branded header; over a plain page it reads as a light, lifted control.
- **Accessibility settings win.** With Reduce transparency (`prefers-reduced-transparency`) or Increase contrast (`prefers-contrast: more`), every glass surface becomes solid (`glass-solid`, `glass-clear-solid`) with no blur.

## States

- **Focus:** solid 2px ring in `ring` with a 2px offset (`focus-visible:ring-2 ring-ring ring-offset-2`), keyboard only.
- **Hover:** primary darkens 10%; ghost and outline get `bg-accent text-accent-foreground`.
- **Disabled:** `opacity-50` and `pointer-events-none`. Explain nearby why it is disabled.
- **Error:** `aria-invalid` + `destructive` border + a message in `text-destructive` below the field.
- **Loading:** a `Skeleton` shaped like the content; in buttons, a spinning `Loader2` icon + label ("Saving…").

## Voice and content

- Direct and calm, like an experienced colleague. Address the reader as "you".
- Buttons use verbs that name the result: "Save changes", "Delete project", "Export CSV". Avoid "OK", "Submit", "Click here".
- Errors say what happened and how to fix it, without apologizing: "The card ending in 4821 has expired. Update your payment method."
- Sentence case in headings and buttons ("Account details", not "Account Details"). No emoji in the UI.
- Empty states say what will appear and how to start: "No orders yet. Orders from the ERP show up here after the first sync."

## Iconography

Icons come from [Heroicons](https://heroicons.com) (MIT), by the makers of Tailwind CSS, through `@heroicons/react`. Each style is drawn for one size, so pick the style by size instead of scaling:

| Style | Import | Size | Use |
| --- | --- | --- | --- |
| Micro | `@heroicons/react/16/solid` | 16px, `size-4` | Inside buttons, fields, badges, alerts, table cells |
| Mini | `@heroicons/react/20/solid` | 20px, `size-5` | Menus, lists, next to `h3`/`h4` headings |
| Outline | `@heroicons/react/24/outline` | 24px, `size-6` | Primary navigation, empty states, large actions |
| Solid | `@heroicons/react/24/solid` | 24px, `size-6` | Selected state of an Outline icon (e.g. active tab bar item) |

- Icons inherit `currentColor`; color them with text tokens (`text-muted-foreground`, `text-destructive`), never with hex.
- An icon next to text is decorative: Heroicons renders `aria-hidden="true"` by default. An icon-only button needs `aria-label` on the button.
- Status icons pair with a word: `CheckCircleIcon` + "Paid", `ExclamationTriangleIcon` + "Pending", `ExclamationCircleIcon` + "Declined".
- Components from shadcn/ui that UIUIUI doesn't ship import `lucide-react`; replace those icons with their Heroicons match before using them:

| lucide-react | Heroicons |
| --- | --- |
| `Check` | `CheckIcon` |
| `ChevronDown` / `ChevronUp` / `ChevronRight` | `ChevronDownIcon` / `ChevronUpIcon` / `ChevronRightIcon` |
| `X` | `XMarkIcon` |
| `Search` | `MagnifyingGlassIcon` |
| `Plus` / `Minus` | `PlusIcon` / `MinusIcon` |
| `CircleAlert` / `TriangleAlert` / `Info` | `ExclamationCircleIcon` / `ExclamationTriangleIcon` / `InformationCircleIcon` |
| `Eye` / `EyeOff` | `EyeIcon` / `EyeSlashIcon` |
| `Loader2` | `ArrowPathIcon` with `motion-safe:animate-spin` |
| `MoreHorizontal` | `EllipsisHorizontalIcon` |
| `Calendar` | `CalendarIcon` |

UIUIUI has no logo yet: the name is set in type. When a mark exists, it goes in the "Logos" asset group.

## Components

UIUIUI ships 37 components: Accordion, Alert, AlertDialog, Avatar, Badge, Breadcrumb, Button, Card, Checkbox, Combobox, DatePicker, Dialog, DropdownMenu, EmptyState, Field, FileUpload, Input, Label, Pagination, PasswordInput, Popover, Progress, RadioGroup, Select, Separator, Skeleton, Slider, Spinner, Stepper, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip. They start from the shadcn/ui source, adjusted to the UIUIUI tokens (destructive text pairs, solid focus ring, badge radius, `success` and `warning` variants) and to the Magoo behavior rules (urgency-based alert roles, hover and pressed feedback, mixed checkbox, keyboard-scrollable tables, reduced motion). Any other shadcn/ui component (Dialog, DropdownMenu, Sheet, Sonner, Command…) also works: it inherits the UIUIUI tokens automatically.

## Using it in code

In a React project with Tailwind v4 (Next.js or Vite):

```bash
npx @aline-aroucha/uiuiui init
npx @aline-aroucha/uiuiui add button input label card
```

`init` sets up the project, installs the UIUIUI theme and writes `AGENTS.md` + `CLAUDE.md`, the files that make Claude, Cursor and Copilot follow these rules.
