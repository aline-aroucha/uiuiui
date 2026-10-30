var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { style: { display: 'grid', gap: 24, maxWidth: 560 } },
    h(P.Card, null, h(P.CardHeader, null, h(P.CardTitle, null, 'Invoices')), h(P.CardContent, null,
      h(P.EmptyState, null,
        h(P.EmptyStateMedia, null, h(P.Icon, { name: 'document-text' })),
        h(P.EmptyStateHeader, null, h(P.EmptyStateTitle, { level: 3 }, 'No invoices yet'),
          h(P.EmptyStateDescription, null, 'Invoices you send show up here, with their status and due date.')),
        h(P.EmptyStateActions, null, h(P.Button, null, 'Create invoice'), h(P.Button, { variant: 'outline' }, 'Import invoices'))))),
    h(P.EmptyState, { variant: 'outline' },
      h(P.EmptyStateMedia, null, h(P.Icon, { name: 'magnifying-glass' })),
      h(P.EmptyStateHeader, null, h(P.EmptyStateTitle, null, 'No orders match \u201cacme\u201d'),
        h(P.EmptyStateDescription, null, 'Check the spelling or search by order number, such as #4821.')),
      h(P.EmptyStateActions, null, h(P.Button, { variant: 'secondary' }, 'Clear search')))));
