var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'uiuiui-field' },
    h(P.Label, { htmlFor: 'country' }, 'Country'),
    h(P.Select, { id: 'country', defaultValue: 'US', options: [
      { value: 'BR', label: 'Brazil' }, { value: 'CA', label: 'Canada' },
      { value: 'MX', label: 'Mexico' }, { value: 'US', label: 'United States' }] })));
