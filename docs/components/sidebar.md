# Sidebar

The app's main navigation: a column of links next to the content, with the current page marked. On small screens the same links open in a panel from the left.

```bash
npx @aline-aroucha/uiuiui add sidebar
```

## What you provide
- `SidebarProvider` around the whole layout: the `Sidebar` and the content (a `<main id="content">` with the page).
- `Sidebar` with a `label` that names the navigation ("Main"), holding an optional `SidebarHeader` (product or workspace), one or more `SidebarGroup` with a `label`, and an optional `SidebarFooter` (settings, account).
- One `SidebarItem` per page with `href`, `active` on the page being shown and a Heroicons Outline `icon` (`@heroicons/react/24/outline`). With Next.js, `asChild` around your `<Link>`.
- `SidebarTrigger` in the page header: it shows under 768px and opens the links in a `Sheet`.

## Usage
- For apps with 5 or more top-level sections people move between often. With 2 to 5 sections, `Tabs` or links in the header are enough; inside one section, use `Tabs` or a `Breadcrumb`.
- Name items after the pages they open ("Reports"), in the same words as each page's title. Keep the order stable; group them with short, visible labels.
- Exactly one item is `active`: the page being shown, as a `secondary` (glass) button; the rest are `ghost`. Don't mark a section active only because one of its pages is open, unless that page has no item of its own.
- Add a "Skip to content" link before the layout that targets `<main id="content" tabIndex={-1}>`, and keep the sidebar's scroll position between pages.

## Accessibility
- It is a navigation landmark named by `label` ("Main navigation"), so people jump to it from the landmarks list. Groups are lists named by their visible labels.
- Items are links: `Tab` and `Shift+Tab` move between them and `Enter` opens them. Hover, pressed and a solid 2px focus ring are visible. The current page has `aria-current="page"` and shows as a bold glass button, not only a color.
- Under 768px, `SidebarTrigger` is an icon button named "Open main navigation" with `aria-haspopup="dialog"` and `aria-expanded`. It opens the same links in a left `Sheet`: focus moves inside and stays there, `Esc` or "Close main navigation" closes it, and focus returns to the trigger. Choosing a link closes it.
- It is not an ARIA menu: no arrow-key menu behavior is added to plain links, as Magoo's Menu page recommends for site navigation.
- With a "Skip to content" link first, keyboard users reach the page without going through every item.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Menu](https://magoo.cc/en/components/navigation/menu.html) (`menu`), [Page regions](https://magoo.cc/en/components/structure/page-regions.html) (`regioes-pagina`). Magoo is educational guidance; test the behavior in your implementation._
