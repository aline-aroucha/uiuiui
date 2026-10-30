var P = window.UIUIUI, h = React.createElement;
  var countries = [{ value: 'ar', label: 'Argentina' }, { value: 'au', label: 'Australia' }, { value: 'br', label: 'Brazil' }, { value: 'ca', label: 'Canada' }, { value: 'cl', label: 'Chile' }, { value: 'de', label: 'Germany' }, { value: 'mx', label: 'Mexico' }, { value: 'pt', label: 'Portugal' }, { value: 'gb', label: 'United Kingdom' }, { value: 'us', label: 'United States' }];
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { style: { minHeight: 300 } }, h(P.Card, { style: { maxWidth: 420 } }, h(P.CardContent, null,
    h(P.Field, { required: true },
      h(P.FieldLabel, null, 'Country'),
      h(P.FieldControl, null, h(P.Combobox, { options: countries, defaultValue: 'br', listLabel: 'Countries' })),
      h(P.FieldDescription, null, 'Type to filter, then choose from the list.'))))));
