var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'uiuiui-row' },
    h(P.Badge, null, 'New'),
    h(P.Badge, { variant: 'secondary' }, 'Draft'),
    h(P.Badge, { variant: 'outline' }, 'v2.4.0'),
    h(P.Badge, { variant: 'success' }, '✓ Paid'),
    h(P.Badge, { variant: 'warning' }, '! Pending'),
    h(P.Badge, { variant: 'destructive' }, '× Declined')));
