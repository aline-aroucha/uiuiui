// UIUIUI merge checklist, rendered part: opens each component's documentation page from the built site (_site/) and checks
// axe (WCAG 2.2 AA + best practices) in both themes on desktop and phone, the keyboard focus ring on every Tab stop, reflow at
// 320px, that the playground and the examples render, no Card inside a Card, and no JavaScript errors.
// Needs `npm run build` first and Playwright with Chromium (`npx playwright install chromium` where it isn't preinstalled).
// Usage: node scripts/check-a11y.mjs <name...> | --all
import { createServer } from "node:http"
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs"
import { join, dirname, extname } from "node:path"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const site = join(root, "_site")
const require = createRequire(import.meta.url)
const args = process.argv.slice(2)
const all = readdirSync(join(root, "registry/uiuiui/ui")).filter((f) => f.endsWith(".tsx")).map((f) => f.slice(0, -4)).sort()
const targets = args.includes("--all") ? all : args.filter((a) => !a.startsWith("--"))
if (!targets.length) { console.error("Usage: node scripts/check-a11y.mjs <name...> | --all"); process.exit(1) }
if (!existsSync(join(site, "components"))) { console.error("No _site/ yet: run `npm run build` first."); process.exit(1) }

let chromium
try { ({ chromium } = require("playwright")) } catch {
  console.error("Playwright is not installed. Run `npm i --no-save playwright && npx playwright install chromium`.")
  process.exit(1)
}
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8")

// A small static server for _site/
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".md": "text/markdown", ".txt": "text/plain" }
const server = createServer((req, res) => {
  let path = join(site, decodeURIComponent(new URL(req.url, "http://x").pathname))
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html")
  if (!path.startsWith(site) || !existsSync(path)) { res.writeHead(404); res.end(); return }
  res.writeHead(200, { "content-type": types[extname(path)] || "application/octet-stream" })
  res.end(readFileSync(path))
}).listen(0)
const base = `http://localhost:${server.address().port}/`

const browser = await chromium.launch()
let failed = 0
for (const slug of targets) {
  const url = `${base}components/${slug}.html`
  const results = []
  const ok = (label, pass, detail = "") => results.push({ label, pass: Boolean(pass), detail })

  // 1. axe in both themes, desktop and phone
  for (const [width, height] of [[1280, 900], [390, 844]]) {
    for (const scheme of ["light", "dark"]) {
      const page = await browser.newPage({ viewport: { width, height }, colorScheme: scheme })
      const errors = []
      page.on("pageerror", (e) => errors.push(e.message))
      await page.goto(url, { waitUntil: "networkidle" })
      await page.addScriptTag({ content: axeSource })
      const violations = await page.evaluate(async () =>
        (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] })).violations
          .map((v) => `${v.id} (${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")})`))
      ok(`axe, ${scheme} theme, ${width}px`, !violations.length, violations.join("; "))
      ok(`no JavaScript errors, ${scheme} theme, ${width}px`, !errors.length, errors.join("; "))
      await page.close()
    }
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  await page.goto(url, { waitUntil: "networkidle" })

  // 2. The playground and the examples render, and no Card sits inside a Card
  const render = await page.evaluate(() => ({
    playground: document.querySelector(".vx-preview")?.childElementCount || 0,
    examples: document.querySelector("#preview")?.childElementCount || 0,
    nested: document.querySelectorAll("#preview .uiuiui-card .uiuiui-card, .vx-preview .uiuiui-card .uiuiui-card").length,
  }))
  ok("playground renders", render.playground)
  ok("examples render", render.examples)
  ok("no Card inside a Card", !render.nested)

  // 3. Keyboard: every Tab stop inside the playground and the examples shows a 2px focus indicator
  const stops = []
  for (let i = 0; i < 200; i++) {
    await page.keyboard.press("Tab")
    const stop = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const inExample = Boolean(el.closest(".vx-preview, .vx-controls, #preview"))
      const cs = getComputedStyle(el)
      const ring = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2) || /(^|,\s*)[^,]*\b0px 0px 0px [2-9]/.test(cs.boxShadow)
      return { id: el.outerHTML.slice(0, 120), inExample, ring, name: (el.getAttribute("aria-label") || el.textContent || el.tagName).trim().slice(0, 40), footer: Boolean(el.closest(".site-footer")) }
    })
    if (!stop) continue
    if (stops.some((s) => s.id === stop.id) || stop.footer) break
    stops.push(stop)
  }
  const own = stops.filter((s) => s.inExample)
  const noRing = own.filter((s) => !s.ring).map((s) => s.name)
  ok(`focus ring on every Tab stop in the playground and examples (${own.length} stops)`, own.length && !noRing.length, noRing.join(", "))
  await page.close()

  // 3b. Overlays (Magoo Modal, Menu, Tooltip and Popover): a playground trigger with aria-haspopup opens from the keyboard,
  // moves focus inside, keeps Tab inside a modal dialog, closes with Esc and returns focus to the trigger
  const overlay = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  await overlay.goto(url, { waitUntil: "networkidle" })
  const trigger = await overlay.$(".vx-preview [aria-haspopup]")
  if (trigger) {
    const kind = await trigger.getAttribute("aria-haspopup")
    await trigger.focus()
    await overlay.keyboard.press("Enter")
    await overlay.waitForTimeout(300)
    const inside = () => overlay.evaluate(() => {
      const layer = document.querySelector("dialog[open], [role=dialog]:not(dialog), [role=alertdialog]:not(dialog), [role=menu]")
      return Boolean(layer && layer.contains(document.activeElement))
    })
    ok(`${kind}: opens from the keyboard with focus inside`, await inside())
    if (kind === "dialog") {
      let trapped = true
      for (let i = 0; i < 8; i++) { await overlay.keyboard.press("Tab"); if (!(await inside())) trapped = false }
      ok("dialog: Tab stays inside while it is open", trapped)
      await overlay.addScriptTag({ content: axeSource })
      const open = await overlay.evaluate(async () => (await window.axe.run(document.querySelector("dialog[open]") || document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"] })).violations.map((v) => v.id))
      ok("dialog: axe passes while open", !open.length, open.join(", "))
    }
    await overlay.keyboard.press("Escape")
    await overlay.waitForTimeout(300)
    const back = await overlay.evaluate(() => ({ open: Boolean(document.querySelector("dialog[open], [role=menu]")), focus: document.activeElement?.getAttribute("aria-haspopup") }))
    ok(`${kind}: Esc closes it and focus returns to the trigger`, !back.open && back.focus === kind)
  }
  await overlay.close()

  // 4. Reflow at 320px (400% zoom): no horizontal scroll
  const narrow = await browser.newPage({ viewport: { width: 320, height: 640 } })
  await narrow.goto(url, { waitUntil: "networkidle" })
  const scrollWidth = await narrow.evaluate(() => document.documentElement.scrollWidth)
  ok("reflow at 320px without horizontal scroll", scrollWidth <= 320, `${scrollWidth}px wide`)
  await narrow.close()

  // 5. Reduced motion: transitions and animations stop
  const still = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" })
  await still.goto(url, { waitUntil: "networkidle" })
  const moving = await still.evaluate(() => [...document.querySelectorAll("#preview *, .vx-preview *")]
    .filter((el) => { const cs = getComputedStyle(el); return cs.animationName !== "none" && parseFloat(cs.animationDuration) > 0.01 && cs.animationIterationCount === "infinite" })
    .map((el) => el.className.toString().slice(0, 40)))
  ok("no endless animation with Reduce motion", !moving.length, moving.join(", "))
  await still.close()

  const bad = results.filter((r) => !r.pass)
  failed += bad.length
  console.log(`${bad.length ? "FAIL" : "PASS"} ${slug} (${results.length - bad.length}/${results.length})`)
  for (const r of results) console.log(`  ${r.pass ? "ok  " : "FAIL"} ${r.label}${!r.pass && r.detail ? `: ${r.detail}` : ""}`)
}
await browser.close()
server.close()
if (failed) { console.log(`\n${failed} rendered check(s) failed. Fix them before merging (protocol: docs/component-checklist.md).`); process.exit(1) }
console.log(`\nAll rendered checks passed for ${targets.length} component(s).`)
