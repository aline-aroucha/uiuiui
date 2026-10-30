var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Card, { style: { maxWidth: 440 } }, h(P.CardContent, { style: { display: 'grid', gap: 16 } },
    h('div', { className: 'uiuiui-inline' }, h(P.Spinner, { label: 'Loading orders' }), h('span', { className: 'uiuiui-muted', 'aria-hidden': true }, 'Loading orders…')),
    h('div', { className: 'uiuiui-row' },
      h(P.Button, { disabled: true }, h(P.Spinner, { 'aria-hidden': true }), 'Saving…'),
      h('span', { role: 'status', className: 'uiuiui-muted' }, 'Saving your changes')))));
