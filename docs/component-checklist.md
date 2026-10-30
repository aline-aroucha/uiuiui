# Component merge checklist

Every new or changed UIUIUI component passes this checklist before it is merged. It keeps the 17 components and every new one
consistent with the tokens, the Liquid Glass material and the Magoo behavior rules. AI agents run it on their own when they finish
a component (Claude Code through the `component-merge-check` skill and the project hooks); people run the same commands.

## 1. Run the automated checks

```bash
npm run check:component -- <name>   # static: files, registry, docs, tokens, icons, material, accessibility rules
npm run build                       # registry + documentation site
npm run check:a11y -- <name>        # rendered: axe, keyboard focus, reflow, reduced motion, examples
```

`<name>` is the kebab-case file name (`password-input`). Use `--all` to check every component; `npm run check` runs all three
steps for every component. Both scripts exit with an error when a check fails.

### What the static check covers (`scripts/check-component.mjs`)

| Group | Checks |
| --- | --- |
| Files | `registry/uiuiui/ui/<name>.tsx` exists; `registry.json` has the item (`registry:ui`) with its file, every imported package and every UIUIUI component it uses; `cn()` comes from `@/lib/utils` |
| Docs | `docs/components/<name>.md` with the `npx @aline-aroucha/uiuiui add` line and an Accessibility section that cites its Magoo page (and keyboard use for interactive components); `docs/api.json` entry with description, anatomy and a name, type and description for every prop; no emoji |
| Preview | an example in `preview/examples/`, the component exported by `preview/uiuiui.js`, a playground in `preview/playground.js` |
| Tokens | no hex, `rgb()`, `hsl()` or `oklch()`; no Tailwind palette colors or `bg-white`/`text-black`; no `dark:` overrides; no arbitrary spacing or radius; radius from the scale |
| Icons | Heroicons only: Micro `16/solid`, Mini `20/solid` or Outline `24/outline`; never `lucide-react` |
| Material | content components (Alert, Avatar, Badge, Card, Field, Input, Label, Separator, Skeleton, Table, Textarea) stay solid; glass always with `shadow-glass`; no raw `backdrop-blur`, white overlays or gradients; Card `rounded-2xl`, Button `rounded-full` |
| Accessibility | interactive components show a solid 2px focus ring; form controls style `aria-invalid` and `disabled`; animations stop with `motion-reduce:`; no positive `tabIndex`; no `outline-none` without a `focus-visible` replacement; `role="alert"` only for critical messages |
| Rules | the "Variants by intent" table in `AGENTS.md` names only components UIUIUI has (or the documented `AlertDialog` and `toast()`) |

### What the rendered check covers (`scripts/check-a11y.mjs`)

| Check | How |
| --- | --- |
| WCAG 2.2 AA and best practices | axe on the component's documentation page, light and dark themes, at 1280px and 390px |
| No runtime errors | no JavaScript error on the page in any of those four runs |
| Keyboard | every Tab stop in the playground and the examples shows a focus indicator of at least 2px |
| Reflow | no horizontal scroll at 320px (400% zoom) |
| Reduced motion | no endless animation with Reduce motion on |
| Composition | the playground and the examples render; no Card inside a Card |

## 2. Review what the scripts can't judge

Go through each item and say in the pull request (or in the agent's final message) how it was checked.

**Behavior (Magoo)**
- [ ] The component's Magoo page was read (site or Magoo MCP) and its keyboard, focus and screen reader criteria are implemented, with the Magoo IDs cited in the docs.
- [ ] `Enter` and `Space` act like the native control; arrow keys move inside composite widgets (tabs, menus, listboxes, radio groups).
- [ ] Overlays close with `Esc` and return focus to the control that opened them; focus is trapped only in modal dialogs.
- [ ] Name, role and state are exposed for every control (`aria-expanded`, `aria-pressed`, `aria-checked`, `aria-current`, `aria-invalid` only after validation).
- [ ] Status is never shown by color alone: an icon or a word goes with it. `role="alert"` only for critical messages, `role="status"` otherwise, and nothing is announced on every keystroke.
- [ ] Form controls sit in a `Field`, with a visible label and help and errors linked by `aria-describedby`; values are kept after an invalid submit.
- [ ] Loading ends in content, an error with "Try again", or an empty state.

**Visual consistency**
- [ ] Spacing on the 4px scale; radii as in `AGENTS.md` (`rounded-full` controls, `rounded-lg` fields, `rounded-xl` menus and dialogs, `rounded-2xl` cards).
- [ ] Hover, pressed, focus, disabled and invalid states are visible in both themes, and the glass states keep text at 4.5:1 over neutrals, brand and chart colors.
- [ ] Tables sit inside a Card; one `default` Button per area; no Card inside a Card, no glass on glass.

**Content**
- [ ] UI copy in US English, sentence case, clear verbs on buttons; numbers and dates in en-US format (`$1,280.00`, `Oct 21, 2026`).
- [ ] The docs page explains when to use each variant, with a do and a don't, and the example uses realistic data.
- [ ] A new intent gets a row in the "Variants by intent" table (in the generator that writes `AGENTS.md`, so the Cursor and Copilot rules follow).

## 3. Report

The pull request description, or the agent's final message, lists the commands it ran with their result (`PASS <name> (n/n)`),
and the review items above with how each was checked. A failing check is fixed, not skipped; if a rule has to be broken,
the exception and its reason are written in the component's docs page.
