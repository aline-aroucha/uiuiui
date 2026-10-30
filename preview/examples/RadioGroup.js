var P = window.UIUIUI, h = React.createElement;
  function Option(props) {
    return h('div', { className: 'uiuiui-inline', style: { alignItems: 'flex-start' } },
      h(P.RadioGroupItem, { value: props.value, id: 'speed-' + props.value }),
      h('label', { htmlFor: 'speed-' + props.value, style: { display: 'grid', gap: 2, cursor: 'pointer' } },
        h('span', { className: 'uiuiui-label' }, props.label), h('span', { className: 'uiuiui-muted' }, props.detail)));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Card, { style: { maxWidth: 420 } }, h(P.CardContent, { style: { display: 'grid', gap: 12 } },
    h('div', { id: 'speed-label', className: 'uiuiui-label' }, 'Delivery speed'),
    h(P.RadioGroup, { defaultValue: 'standard', 'aria-labelledby': 'speed-label' },
      h(Option, { value: 'standard', label: 'Standard', detail: 'Free, 5–7 business days' }),
      h(Option, { value: 'express', label: 'Express', detail: '$9.90, 2 business days' }),
      h(Option, { value: 'overnight', label: 'Overnight', detail: '$24.90, next business day' })))));
