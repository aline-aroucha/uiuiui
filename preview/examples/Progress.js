var P = window.UIUIUI, h = React.createElement;
  function Upload() {
    var s = React.useState(64), v = s[0];
    React.useEffect(function () { if (v >= 100) return; var t = setTimeout(function () { s[1](Math.min(100, v + 4)); }, 700); return function () { clearTimeout(t); }; }, [v]);
    // content on a solid surface: the progress sits in a Card, never straight on color
    return h(P.Card, { style: { maxWidth: 440 } }, h(P.CardContent, { style: { display: 'grid', gap: 20 } },
      h('div', { style: { display: 'grid', gap: 8 } },
        h('div', { className: 'uiuiui-row', style: { justifyContent: 'space-between' } }, h('span', { id: 'upload-label', style: { fontWeight: 500 } }, 'Uploading q3-sales.csv'), h('span', { className: 'uiuiui-muted' }, v + '%')),
        h(P.Progress, { value: v, 'aria-labelledby': 'upload-label' }),
        h('div', { role: 'status', className: 'uiuiui-muted' }, v >= 100 ? 'Upload complete. Checking the file…' : '')),
      h('div', { style: { display: 'grid', gap: 8 } },
        h('span', { id: 'import-label', style: { fontWeight: 500 } }, 'Importing orders from the ERP'),
        h(P.Progress, { 'aria-labelledby': 'import-label' }))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(Upload));
