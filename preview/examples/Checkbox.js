var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'uiuiui-stage', style: { padding: 0 } },
    h('div', { className: 'uiuiui-inline' }, h(P.Checkbox, { id: 'a', defaultChecked: true }), h(P.Label, { htmlFor: 'a' }, 'Send me a weekly summary')),
    h('div', { className: 'uiuiui-inline' }, h(P.Checkbox, { id: 'b' }), h(P.Label, { htmlFor: 'b' }, 'Send me partner offers')),
    h('div', { className: 'uiuiui-inline' }, h(P.Checkbox, { id: 'c', disabled: true }), h(P.Label, { htmlFor: 'c' }, 'Automatic export (Pro plan)'))));
