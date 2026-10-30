var P = window.UIUIUI, h = React.createElement;
  // Checkout: Continue checks the step and moves on; Back keeps what was typed; focus goes to the new step's title
  var steps = [{ label: 'Cart', href: '#cart' }, { label: 'Shipping' }, { label: 'Payment' }, { label: 'Review' }];
  function Checkout() {
    var st = React.useState(1), at = st[0], zip = React.useState('94107'), err = React.useState(''), title = React.useRef(null), first = React.useRef(true);
    React.useEffect(function () { if (first.current) { first.current = false; return; } title.current.focus(); }, [at]);
    var next = function () {
      if (at === 1 && !/^\d{5}$/.test(zip[0])) { err[1]('Enter a 5-digit ZIP code, such as 94107.'); return; }
      err[1](''); st[1](Math.min(at + 1, steps.length - 1));
    };
    return h(P.Card, { style: { maxWidth: 560 } }, h(P.CardContent, { style: { display: 'grid', gap: 24 } },
      h(P.Stepper, { steps: steps, current: at, label: 'Checkout progress' }),
      h('h3', { ref: title, tabIndex: -1, style: { margin: 0, fontSize: 20, lineHeight: '28px', fontWeight: 600, outlineOffset: 4 } }, steps[at].label),
      at === 1 ? h(P.Field, { required: true, invalid: !!err[0] }, h(P.FieldLabel, null, 'ZIP code'), h(P.FieldControl, null, h(P.Input, { value: zip[0], inputMode: 'numeric', autoComplete: 'postal-code', onChange: function (e) { zip[1](e.target.value); } })),
        err[0] ? h(P.FieldError, null, err[0]) : null) : h('p', { className: 'uiuiui-muted', style: { margin: 0 } }, at === 0 ? 'Your cart has 2 items, $1,280.00.' : at === 2 ? 'Payment details go here.' : 'Check your order, then place it.'),
      h('div', { className: 'uiuiui-row', style: { justifyContent: 'space-between' } },
        at > 0 ? h(P.Button, { variant: 'ghost', onClick: function () { err[1](''); st[1](at - 1); } }, 'Back') : h('span'),
        h(P.Button, { onClick: next }, at === steps.length - 1 ? 'Place order' : 'Continue'))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(Checkout));
