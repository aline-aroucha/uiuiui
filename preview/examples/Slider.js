var P = window.UIUIUI, h = React.createElement;
  function Budget() {
    var s = React.useState([1200]), usd = function (n) { return '$' + n.toLocaleString('en-US'); };
    return h(P.Card, { style: { maxWidth: 420 } }, h(P.CardContent, { style: { display: 'grid', gap: 12 } },
      h('div', { className: 'uiuiui-row', style: { justifyContent: 'space-between' } },
        h('label', { htmlFor: 'budget', id: 'budget-label', className: 'uiuiui-label' }, 'Monthly budget'), h('span', { className: 'uiuiui-muted', 'aria-hidden': true }, usd(s[0][0]))),
      h(P.Slider, { id: 'budget', value: s[0], onValueChange: s[1], min: 0, max: 5000, step: 100, 'aria-labelledby': 'budget-label', formatValue: usd }),
      h('div', { className: 'uiuiui-row uiuiui-muted', style: { justifyContent: 'space-between', fontSize: 12 }, 'aria-hidden': true }, h('span', null, '$0'), h('span', null, '$5,000'))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(Budget));
