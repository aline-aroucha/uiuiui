// UIUIUI merge checklist, static part: files, registry, docs, tokens, material and accessibility rules for each component.
// The protocol (what this checks and what still needs a person or an agent) is in docs/component-checklist.md.
// Usage:
//   node scripts/check-component.mjs <name...>   check these components (kebab-case, e.g. password-input)
//   node scripts/check-component.mjs --all       check every component in registry/uiuiui/ui
//   node scripts/check-component.mjs --changed   check every component when component files changed (uncommitted or unpushed)
//   --hook=stop | --hook=pre-commit              run as a Claude Code hook: read the hook input on stdin, exit 2 to block
import { readFileSync, existsSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const read = (p) => readFileSync(join(root, p), "utf8")
const exists = (p) => existsSync(join(root, p))
const args = process.argv.slice(2)
const hook = (args.find((a) => a.startsWith("--hook=")) || "").slice(7)

const UI = "registry/uiuiui/ui"
const all = readdirSync(join(root, UI)).filter((f) => f.endsWith(".tsx")).map((f) => f.slice(0, -4)).sort()
const pascal = (slug) => slug.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())

// Content stays solid; only controls and floating layers may use glass
const CONTENT = ["alert", "avatar", "badge", "card", "field", "input", "label", "separator", "skeleton", "table", "textarea"]
// Controls that take focus and must show a visible focus ring
const INTERACTIVE = ["alert-dialog", "button", "checkbox", "combobox", "date-picker", "dialog", "dropdown-menu", "input", "password-input", "popover", "radio-group", "select", "slider", "switch", "tabs", "textarea", "toggle", "toggle-group"]
// Form controls validated with the form, so they style the invalid state (a Switch acts at once and is never invalid)
const FORM = ["checkbox", "combobox", "date-picker", "input", "radio-group", "select", "textarea"]
// The 17 components of the first release; every later one needs an "added" date
const FIRST_RELEASE = ["alert", "avatar", "badge", "button", "card", "checkbox", "field", "input", "label", "password-input", "select",
  "separator", "skeleton", "switch", "table", "tabs", "textarea"]
const PALETTE = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose"

// ------------------------------------------------------------ which components to check
function changedFiles() {
  const git = (cmd) => { try { return execSync(cmd, { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().split("\n").filter(Boolean) } catch { return [] } }
  return [
    ...git("git diff --name-only HEAD"),
    ...git("git ls-files --others --exclude-standard"),
    ...git("git diff --name-only @{upstream}..HEAD"),
  ]
}
const touchesComponents = (files) =>
  files.some((f) => /^(registry\/uiuiui\/|registry\.json$|docs\/components\/|docs\/api\.json$|preview\/|tokens\/|src\/styles\/)/.test(f))

let targets = args.filter((a) => !a.startsWith("--"))
if (args.includes("--all")) targets = all
if (args.includes("--changed") || hook) {
  if (hook) {
    // Hook input arrives as JSON on stdin; a pre-commit hook only acts on git commit / git push
    let input = {}
    try { input = JSON.parse(readFileSync(0, "utf8") || "{}") } catch {}
    if (hook === "pre-commit" && !/\bgit\s+(commit|push)\b/.test(input.tool_input?.command || "")) process.exit(0)
    // A Stop hook that already blocked once lets the turn end, so a failure the agent can't fix never loops
    if (hook === "stop" && input.stop_hook_active) process.exit(0)
  }
  targets = touchesComponents(changedFiles()) ? all : []
  if (!targets.length) process.exit(0)
}
if (!targets.length) {
  console.error("Usage: node scripts/check-component.mjs <name...> | --all | --changed")
  process.exit(1)
}

// ------------------------------------------------------------ checks
const registry = JSON.parse(read("registry.json"))
const api = JSON.parse(read("docs/api.json"))
const previewJs = read("preview/uiuiui.js")
const playground = read("preview/playground.js")
const agents = read("AGENTS.md")

function check(slug) {
  const results = []
  const ok = (group, label, pass, detail = "") => results.push({ group, label, pass: Boolean(pass), detail })
  const name = Object.keys(api).find((k) => k.replace(/(?<!^)(?=[A-Z])/g, "-").toLowerCase() === slug) || pascal(slug)
  const file = `${UI}/${slug}.tsx`

  // 1. Files and registry
  ok("Files", `${file} exists`, exists(file))
  if (!exists(file)) return results
  const src = read(file)
  const classes = (src.match(/"[^"\n]*"|`[^`]*`|'[^'\n]*'/g) || []).join(" ")
  const item = registry.items.find((i) => i.name === slug)
  ok("Files", "registry.json has the item, type registry:ui, with its file", item && item.type === "registry:ui" && item.files?.some((f) => f.path === file))
  if (item) {
    const imports = [...src.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]).filter((m) => !m.startsWith("@/") && !m.startsWith(".") && m !== "react")
    const pkgs = [...new Set(imports.map((m) => (m.startsWith("@") ? m.split("/").slice(0, 2).join("/") : m.split("/")[0])))]
    const missing = pkgs.filter((p) => !(item.dependencies || []).includes(p))
    ok("Files", "registry.json lists every package the file imports", !missing.length, missing.join(", "))
    const localUi = [...src.matchAll(/from\s+"@\/components\/ui\/([^"]+)"/g)].map((m) => m[1])
    const regDeps = (item.registryDependencies || []).join(" ")
    const missingUi = localUi.filter((d) => !regDeps.includes(`/${d}.json`) && !regDeps.includes(`@uiuiui/${d}`))
    ok("Files", "registry.json lists the UIUIUI components it uses", !missingUi.length, missingUi.join(", "))
    ok("Files", "cn() comes from @/lib/utils and utils is a registry dependency", !/\bcn\(/.test(src) || (src.includes('from "@/lib/utils"') && regDeps.includes("utils")))
  }

  // 2. Documentation
  const doc = `docs/components/${slug}.md`
  ok("Docs", `${doc} exists`, exists(doc))
  if (exists(doc)) {
    const md = read(doc)
    ok("Docs", "install line uses the uiuiui CLI", md.includes(`npx @aline-aroucha/uiuiui add ${slug}`))
    const access = (md.split(/^## /m).find((s) => s.startsWith("Accessibility")) || "")
    ok("Docs", "has an Accessibility section", access.length > 40)
    ok("Docs", "the Accessibility section cites its Magoo page", /Magoo/.test(access) && /magoo\.cc/.test(access))
    if (INTERACTIVE.includes(slug)) ok("Docs", "the Accessibility section covers keyboard use", /keyboard|Tab\b|Enter|Space|arrow/i.test(access))
    ok("Docs", "no emoji", !/\p{Extended_Pictographic}/u.test(md.replace(/[✓×!]/g, "")))
  }
  const entry = api[name]
  // Components after the first release carry the date they were added: the docs navigation shows "New" for 60 days
  if (!FIRST_RELEASE.includes(slug)) ok("Docs", `docs/api.json "${name}" has its "added" date (YYYY-MM-DD)`, /^\d{4}-\d{2}-\d{2}$/.test(entry?.added || ""))
  ok("Docs", `docs/api.json has "${name}" with description, anatomy and props`, entry && entry.description && entry.anatomy && Object.keys(entry.parts || {}).length)
  if (entry) {
    const props = Object.values(entry.parts || {}).flat()
    const bare = props.filter((p) => !p.name || !p.type || !p.description).map((p) => p.name || "?")
    ok("Docs", "every prop has a name, a type and a description", !bare.length, bare.join(", "))
  }

  // 3. Live preview
  ok("Preview", `preview/examples/${name}.js exists`, exists(`preview/examples/${name}.js`))
  ok("Preview", `preview/uiuiui.js exports ${name}`, new RegExp(`\\b${name}: [A-Za-z]+\\b`).test(previewJs))
  ok("Preview", `preview/playground.js has a ${name} playground`, new RegExp(`\\n\\s{4}${name}: \\{`).test(playground))

  // 4. Tokens and style
  const hex = classes.match(/#[0-9a-fA-F]{3,8}\b/g)
  ok("Tokens", "no hex, rgb(), hsl() or oklch() colors", !hex && !/\b(rgb|rgba|hsl|hsla|oklch)\(/.test(src), (hex || []).join(" "))
  const palette = classes.match(new RegExp(`\\b[a-z-]*(bg|text|border|ring|fill|stroke|outline|divide|from|via|to|shadow|decoration|caret|accent)-(${PALETTE})-\\d{2,3}\\b|\\b(bg|text|border|fill|stroke)-(white|black)\\b`, "g"))
  ok("Tokens", "no Tailwind palette colors (bg-teal-600, text-white…)", !palette, (palette || []).join(" "))
  const dark = classes.match(/\bdark:[^\s"'`]+/g)
  ok("Tokens", "no dark: overrides (tokens switch themes)", !dark, (dark || []).join(" "))
  const arbitrary = classes.match(/\b(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|rounded(-[a-z]+)?)-\[[^\]]+\]/g)
  ok("Tokens", "no arbitrary spacing or radius (p-[13px], rounded-[10px])", !arbitrary, (arbitrary || []).join(" "))
  const radius = classes.match(/\brounded-(none|xs|sm|md|lg|xl|2xl|3xl|full)\b/g) || []
  ok("Tokens", "radius from the scale only", radius.every((r) => /rounded-(sm|md|lg|xl|2xl|full|none)$/.test(r)))

  // 5. Icons
  ok("Icons", "no lucide-react", !src.includes("lucide-react"))
  const icons = [...src.matchAll(/from\s+"(@heroicons\/react[^"]*)"/g)].map((m) => m[1])
  ok("Icons", "Heroicons Micro 16/solid, Mini 20/solid or Outline 24/outline only", icons.every((i) => /^@heroicons\/react\/(16\/solid|20\/solid|24\/outline)$/.test(i)), icons.join(", "))

  // 6. Material: Liquid Glass on controls, content solid
  const glass = /\bglass(-strong|-clear)?\b/.test(classes)
  if (CONTENT.includes(slug)) ok("Material", "content component stays solid (no glass)", !glass)
  if (glass) ok("Material", "glass is paired with shadow-glass", /\bshadow-glass\b/.test(classes))
  ok("Material", "no raw backdrop-blur or white overlays (use the glass utilities)", !/\bbackdrop-blur(-\w+)?\b|\bbg-white\/\d+/.test(classes))
  ok("Material", "no gradients", !/\bbg-(gradient|linear|radial|conic)-|\b(from|via|to)-(primary|secondary|accent|muted)/.test(classes))
  if (slug === "card") ok("Material", "card radius is rounded-2xl", /\brounded-2xl\b/.test(classes))
  if (slug === "button") ok("Material", "buttons are capsules (rounded-full)", /\brounded-full\b/.test(classes))

  // 7. Accessibility (static part; the rendered checks run in scripts/check-a11y.mjs)
  // A component built from Button, Input or Toggle inherits their focus ring
  const composed = /from "@\/components\/ui\/(button|input|toggle)"/.test(src)
  // Menu items show focus with the brand highlight instead of a ring (roving focus inside a composite widget)
  const highlight = /\bfocus:bg-primary\b/.test(classes) && /\bfocus:text-primary-foreground\b/.test(classes)
  if (INTERACTIVE.includes(slug)) ok("Accessibility", "visible focus (focus-visible:ring-2 + ring-ring, or the menu highlight)", composed || highlight || (/focus-visible:ring-2\b/.test(classes) && /focus-visible:ring-ring\b/.test(classes)))
  if (INTERACTIVE.includes(slug)) ok("Accessibility", "focus ring is solid, never faded (no ring-*/20)", !/focus-visible:ring-[a-z-]+\/\d+/.test(classes))
  if (FORM.includes(slug)) ok("Accessibility", "invalid state is styled (aria-invalid:)", /aria-invalid:/.test(classes))
  if (FORM.includes(slug)) ok("Accessibility", "disabled state is styled", /disabled:/.test(classes))
  if (/\banimate-/.test(classes)) ok("Accessibility", "animations stop with prefers-reduced-motion (motion-reduce:)", /motion-reduce:/.test(classes))
  ok("Accessibility", "no positive tabIndex", !/tabIndex=\{?["']?[1-9]/.test(src))
  ok("Accessibility", "no outline-none without a focus-visible replacement", !/\boutline-none\b/.test(classes) || /focus-visible:/.test(classes))
  const roleAlert = src.includes('"alert"')
  if (roleAlert) ok("Accessibility", 'role="alert" only for the destructive/critical variant', /destructive|critical/.test(src.slice(Math.max(0, src.indexOf('"alert"') - 200), src.indexOf('"alert"') + 50)))
  ok("Accessibility", "no emoji in the UI", !/\p{Extended_Pictographic}/u.test(src))
  return results
}

// ------------------------------------------------------------ report
let failed = 0
const lines = []
for (const slug of targets) {
  const results = check(slug)
  const bad = results.filter((r) => !r.pass)
  failed += bad.length
  if (hook && !bad.length) continue
  lines.push(`${bad.length ? "FAIL" : "PASS"} ${slug} (${results.length - bad.length}/${results.length})`)
  for (const r of hook ? bad : results) lines.push(`  ${r.pass ? "ok  " : "FAIL"} [${r.group}] ${r.label}${r.detail ? `: ${r.detail}` : ""}`)
}
// Checks that span every component
if (!hook || failed) {
  const intent = (agents.split("## Variants by intent")[1] || "").split("\n## ")[0]
  const known = new Set([...all.map(pascal), "AlertDialog", "Sonner", "FieldLabel", "FieldControl", "FieldDescription", "FieldError"])
  const used = [...intent.matchAll(/<([A-Z][A-Za-z]*)/g)].map((m) => m[1])
  const roadmap = ["AlertDialog"]
  const unknown = used.filter((u) => !known.has(u) && !roadmap.includes(u))
  if (unknown.length) { failed++; lines.push(`FAIL AGENTS.md "Variants by intent" names components UIUIUI doesn't have: ${unknown.join(", ")}`) }
}

const output = lines.join("\n")
if (failed) {
  const header = `UIUIUI merge checklist: ${failed} check(s) failed. Fix them before you commit or report the component as done (protocol: docs/component-checklist.md).`
  if (hook) { console.error(`${header}\n${output}`); process.exit(2) }
  console.log(`${output}\n\n${header}`)
  process.exit(1)
}
if (!hook) console.log(`${output}\n\nAll static checks passed for ${targets.length} component(s). Next: npm run build && npm run check:a11y -- ${targets.length === all.length ? "--all" : targets.join(" ")}`)
