var P = window.UIUIUI, h = React.createElement;
  function Demo() {
    var v = React.useState('2026-10-21'), err = React.useState('');
    return h('div', { style: { minHeight: 440 } }, h(P.Card, { style: { maxWidth: 420 } }, h(P.CardContent, null,
      h(P.Field, { required: true, invalid: !!err[0] },
        h(P.FieldLabel, null, 'Delivery date'),
        h(P.FieldControl, null, h(P.DatePicker, { value: v[0], min: '2026-10-01', max: '2026-12-31',
          onValueChange: function (x) { v[1](x); if (x) err[1](''); },
          onInvalidInput: function (reason) { err[1](reason === 'format' ? 'Enter a date like 10/21/2026.' : 'Choose a date between Oct 1 and Dec 31, 2026.'); } })),
        h(P.FieldDescription, null, 'Format: MM/DD/YYYY. Between Oct 1 and Dec 31, 2026.'),
        h(P.FieldError, null, err[0])))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(Demo));
