# UIUIUI

A design system on top of [shadcn/ui](https://ui.shadcn.com), ready to be used by people and AI agents.

**Documentation:** https://aline-aroucha.github.io/uiuiui

## What's inside

| File | Purpose |
| --- | --- |
| `tokens/tokens.json` | Source of truth: colors (light/dark), typography, spacing, radius, shadow. |
| `src/styles/globals.css` | The tokens as shadcn CSS variables + the Tailwind v4 `@theme`. |
| `components.json` | shadcn CLI config (new-york style). Icons are Heroicons; the shadcn CLI has no Heroicons option, so `iconLibrary` stays at its default. |
| `registry.json` + `registry/` | The UIUIUI registry: style, `cn()` and the source of the 27 components. |
| `.mcp.json` | Adds the Magoo MCP (behavior and accessibility guidance) to Claude Code. |
| `cli/uiuiui.mjs` | The `uiuiui` command: `init`, `add`, `list`. |
| `AGENTS.md` / `CLAUDE.md` | Rules that Claude Code, Codex and other agents read automatically. |
| `.cursor/rules/uiuiui.mdc`, `.github/copilot-instructions.md` | The same rules for Cursor and GitHub Copilot. |
| `llms.txt` | Short index that helps AI tools find the docs. |
| `docs/` | Guidelines and one page per component, in Markdown. |
| `preview/`, `site/`, `scripts/build-site.mjs` | The documentation site and its live component previews. |

## Use it in a project

In a React project with Tailwind v4 (Next.js or Vite):

```bash
npx @aline-aroucha/uiuiui init                 # style, cn(), AGENTS.md, CLAUDE.md, Magoo MCP
npx @aline-aroucha/uiuiui add button card input # any of the 27 components
npx @aline-aroucha/uiuiui list
```

The `uiuiui` CLI (`cli/uiuiui.mjs`, no dependencies) installs from the UIUIUI registry at https://aline-aroucha.github.io/uiuiui/r/ using the shadcn CLI under the hood.
Fonts (Next.js): `import { Inter, Geist_Mono } from "next/font/google"` (Inter with `axes: ["opsz"]`) and apply the `--font-sans` / `--font-mono` variables on `<html>`.

The CLI is published on npm as [`@aline-aroucha/uiuiui`](https://www.npmjs.com/package/@aline-aroucha/uiuiui). To release a new version: bump `version` in `package.json`, then `npm publish`.

## Component merge checklist

Every new or changed component passes `docs/component-checklist.md` before it is merged:

```bash
npm run check:component -- <name>   # files, registry, docs, tokens, icons, material, accessibility rules
npm run build
npm run check:a11y -- <name>        # axe in both themes, keyboard focus, reflow at 320px, reduced motion
npm run check                       # all of the above, for every component
```

Claude Code runs it on its own: the `component-merge-check` skill (`.claude/skills/`) tells it to, and the hooks in
`.claude/settings.json` block `git commit`, `git push` and the end of a turn while a static check fails. On GitHub, the
"Component checks" workflow runs the whole checklist on every pull request.

## Behavior and accessibility

Component behavior follows [Magoo](https://magoo.cc/en) 1.6.0 by Marcelo Sales (MIT). Each page in `docs/components/` has an
Accessibility section adapted from Magoo, with the Magoo IDs it is based on. `uiuiui init` adds the read-only Magoo MCP to your
project's `.mcp.json`, so AI agents can check keyboard, screen reader and acceptance criteria while they build.

## Documentation site (GitHub Pages)

`npm run build` generates the site in `_site/` from `tokens/`, `docs/` and `preview/`: overview, colors, typography, spacing,
one page per component with a live preview, and a "Use with AI" page. The same build publishes `llms.txt`, `llms-full.txt`,
`AGENTS.md`, `tokens.json`, `globals.css` and the registry under `/r/`.

1. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Every push to `main` runs `.github/workflows/pages.yml` and publishes to https://aline-aroucha.github.io/uiuiui/.

Run it locally: `npm install && npm run dev`.

## Registry

`registry.json` lists the style, `utils` and the 27 components; their source lives in `registry/uiuiui/`. `npm run build` turns it into
`/r/<name>.json` on the site, which is what the `uiuiui` CLI installs from. Any shadcn-compatible tool can use it too: add
`"registries": { "@uiuiui": "https://aline-aroucha.github.io/uiuiui/r/{name}.json" }` to `components.json`, and the shadcn MCP lets AI agents browse and install UIUIUI components from chat.

## Changing a token

1. Edit `tokens/tokens.json`.
2. Update the same values in `src/styles/globals.css` and `registry.json`.
3. Push to `main`; the site redeploys.
