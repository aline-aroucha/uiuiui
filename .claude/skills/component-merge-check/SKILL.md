---
name: component-merge-check
description: Merge checklist for UIUIUI components (consistency and accessibility). Use it automatically whenever you finish creating or changing a component — files in registry/uiuiui/ui, docs/components, docs/api.json, preview/ or the tokens — before you commit, push or report the work as done. Also use it when asked to review or check a component.
---

# UIUIUI component merge check

Run this protocol every time a component is finished, without waiting to be asked. The full checklist is in
`docs/component-checklist.md`; read it once per session before the first check.

## Steps

1. **Static check.** Run `npm run check:component -- <name>` for each component you created or changed (kebab-case,
   e.g. `password-input`). If you changed shared files (tokens, `preview/uiuiui.js`, `docs/api.json`), use `--all`.
   Fix every `FAIL` and run it again until it passes.
2. **Build.** Run `npm run build`.
3. **Rendered check.** Run `npm run check:a11y -- <name>` (or `--all`). It needs Playwright with Chromium; if it is
   missing, install it as the script says. Fix every `FAIL` (axe, focus ring, reflow, reduced motion, rendering) and rerun.
4. **Review.** Go through section 2 of `docs/component-checklist.md`. For behavior, check the component's Magoo page
   (the Magoo MCP, or https://magoo.cc/en) and test the keyboard yourself in the built site: Tab order, `Enter`/`Space`,
   arrows in composite widgets, `Esc` and focus return for overlays.
5. **Report.** In your final message, list the commands with their result (`PASS <name> (n/n)`) and each review item
   with how you checked it. Never report a component as done, commit it or push it while a check fails; if something
   can't be fixed, say exactly what and why.

## Notes

- The project hooks run the static check on their own before `git commit`/`git push` and when a turn ends with component
  changes; a hook that blocks prints the failing checks. Treat that output as this checklist's step 1.
