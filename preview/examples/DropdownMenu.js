var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { style: { minHeight: 230 } },
    h(P.DropdownMenu, null,
      h(P.DropdownMenuTrigger, null, h(P.Button, { variant: 'ghost', size: 'icon', 'aria-label': 'More actions for Q3 sales' }, h(P.Icon, { name: 'ellipsis-horizontal' }))),
      h(P.DropdownMenuContent, null,
        h(P.DropdownMenuItem, null, h(P.Icon, { name: 'pencil-square' }), 'Edit'),
        h(P.DropdownMenuItem, null, h(P.Icon, { name: 'document-duplicate' }), 'Duplicate'),
        h(P.DropdownMenuItem, null, h(P.Icon, { name: 'arrow-down-tray' }), 'Download CSV', h(P.DropdownMenuShortcut, null, '⌘D')),
        h(P.DropdownMenuSeparator),
        h(P.DropdownMenuItem, { variant: 'destructive' }, h(P.Icon, { name: 'trash' }), 'Delete')))));
