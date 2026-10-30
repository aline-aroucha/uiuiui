var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'uiuiui-row', style: { gap: 16 } },
    h(P.ToggleGroup, { type: 'multiple', defaultValue: ['bold'], 'aria-label': 'Text style' },
      h(P.ToggleGroupItem, { value: 'bold', 'aria-label': 'Bold' }, h(P.Icon, { name: 'bold' })),
      h(P.ToggleGroupItem, { value: 'italic', 'aria-label': 'Italic' }, h(P.Icon, { name: 'italic' })),
      h(P.ToggleGroupItem, { value: 'underline', 'aria-label': 'Underline' }, h(P.Icon, { name: 'underline' }))),
    h(P.ToggleGroup, { type: 'single', defaultValue: 'list', 'aria-label': 'View' },
      h(P.ToggleGroupItem, { value: 'list' }, h(P.Icon, { name: 'list-bullet' }), 'List'),
      h(P.ToggleGroupItem, { value: 'grid' }, h(P.Icon, { name: 'squares-2x2' }), 'Grid'))));
