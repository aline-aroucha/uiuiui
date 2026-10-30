var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { style: { minHeight: 200 } },
    h(P.Popover, null,
      h(P.PopoverTrigger, null, h(P.Button, { variant: 'outline' }, 'Share link')),
      h(P.PopoverContent, null,
        h(P.PopoverHeader, null, h(P.PopoverTitle, null, 'Share link'), h(P.PopoverDescription, null, 'Anyone with the link can view this report.')),
        h(P.Field, { required: true }, h(P.FieldLabel, null, 'Link'), h(P.FieldControl, null, h(P.Input, { readOnly: true, defaultValue: 'acme.app/r/q3-sales' }))),
        h(P.PopoverClose, null, h(P.Button, { size: 'sm' }, 'Done'))))));
