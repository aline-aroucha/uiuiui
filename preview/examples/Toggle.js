var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'uiuiui-row' },
    h(P.Toggle, { 'aria-label': 'Bold', defaultPressed: true }, h(P.Icon, { name: 'bold' })),
    h(P.Toggle, { 'aria-label': 'Italic' }, h(P.Icon, { name: 'italic' })),
    h(P.Toggle, { variant: 'outline' }, h(P.Icon, { name: 'list-bullet' }), 'Show totals')));
