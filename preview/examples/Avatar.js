var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'uiuiui-row' },
    h(P.Avatar, { fallback: 'MC', alt: 'Maya Chen' }),
    h(P.Avatar, { fallback: 'LP', alt: 'Leo Park' }),
    h('div', { className: 'uiuiui-inline' }, h(P.Avatar, { fallback: 'SD', alt: 'Sara Diaz' }),
      h('div', null, h('div', { style: { fontWeight: 500 } }, 'Sara Diaz'), h('div', { className: 'uiuiui-muted' }, 'sara@company.com')))));
