# Breadcrumb

Shows where the page sits in the hierarchy and links back to the levels above it.

```bash
npx @aline-aroucha/uiuiui add breadcrumb
```

## What you provide
- `Breadcrumb` (a `<nav>` named "Breadcrumb"; pass `aria-label` to name it otherwise) with a `BreadcrumbList`.
- One `BreadcrumbItem` per level, from the top down: a `BreadcrumbLink` with the `href` of each level above, and `BreadcrumbPage` for the current page, last.
- A `BreadcrumbSeparator` between items (a Heroicons chevron by default).
- For long paths, `BreadcrumbEllipsis` inside a `DropdownMenuTrigger` button named for what it hides ("Show 2 more levels"), with the hidden levels as links in the menu.

## Usage
- For pages two or more levels deep in a clear hierarchy (Home › Reports › Sales › Q3 sales). It doesn't replace the main navigation, and it isn't a history of where the person has been.
- Each link's text matches the title of the page it opens. The last item is the current page and is not a link.
- Put it at the top of the content, above the page title. On narrow screens keep the first level, the parent and the current page; collapse the middle into the ellipsis menu.

## Accessibility
- It is a navigation landmark named "Breadcrumb" with an ordered list, so screen readers announce "Breadcrumb, navigation, list, 4 items" and people can jump to it from the landmarks menu.
- Levels above are ordinary links: `Tab` and `Shift+Tab` move between them and `Enter` opens them. Hover underlines them, pressing darkens them and focus shows a solid 2px ring.
- The current page is text with `aria-current="page"`, read as "Q3 sales, current page". It isn't a link and doesn't act when clicked.
- Separators are drawn with `aria-hidden` and never take focus or get read. The ellipsis is drawn the same way; the button around it carries the name.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Breadcrumb](https://magoo.cc/en/components/navigation/breadcrumb.html) (`breadcrumb`). Magoo is educational guidance; test the behavior in your implementation._
