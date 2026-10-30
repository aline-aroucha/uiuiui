var P = window.UIUIUI, h = React.createElement;
  // A file browser: the path is named "Folder path", and the middle levels sit in a menu named for what it hides
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Breadcrumb, { 'aria-label': 'Folder path' }, h(P.BreadcrumbList, null,
    h(P.BreadcrumbItem, null, h(P.BreadcrumbLink, { href: '#' }, 'Documents')), h(P.BreadcrumbSeparator),
    h(P.BreadcrumbItem, null, h(P.DropdownMenu, null,
      h(P.DropdownMenuTrigger, null, h(P.Button, { variant: 'ghost', size: 'icon', 'aria-label': 'Show 2 more levels' }, h(P.BreadcrumbEllipsis))),
      h(P.DropdownMenuContent, { align: 'start' }, h(P.DropdownMenuItem, null, 'Legal'), h(P.DropdownMenuItem, null, 'Contracts')))),
    h(P.BreadcrumbSeparator),
    h(P.BreadcrumbItem, null, h(P.BreadcrumbLink, { href: '#' }, '2026')), h(P.BreadcrumbSeparator),
    h(P.BreadcrumbItem, null, h(P.BreadcrumbPage, null, 'Office lease.pdf')))));
