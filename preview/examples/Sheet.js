var P = window.UIUIUI, h = React.createElement;
  function Filters() {
    var open = React.useState(false), sort = React.useState('newest'), stock = React.useState(true);
    return h('div', null, h(P.Sheet, { open: open[0], onOpenChange: open[1] },
      h(P.SheetTrigger, null, h(P.Button, { variant: 'outline' }, h(P.Icon, { name: 'adjustments-horizontal' }), 'Filters')),
      h(P.SheetContent, { side: 'right' },
        h(P.SheetHeader, null, h(P.SheetTitle, null, 'Filters'), h(P.SheetDescription, null, 'Results update when you choose Show results.')),
        h('div', { style: { display: 'grid', gap: 24 } },
          h('div', { style: { display: 'grid', gap: 12 } }, h('span', { id: 'sort-label', className: 'uiuiui-label' }, 'Sort by'),
            h(P.RadioGroup, { value: sort[0], onValueChange: sort[1], 'aria-labelledby': 'sort-label' },
              [['newest', 'Newest first'], ['price-low', 'Price, low to high'], ['price-high', 'Price, high to low']].map(function (o) {
                return h('div', { key: o[0], className: 'uiuiui-inline' }, h(P.RadioGroupItem, { value: o[0], id: 'sort-' + o[0] }), h(P.Label, { htmlFor: 'sort-' + o[0] }, o[1]));
              }))),
          h('div', { className: 'uiuiui-inline' }, h(P.Switch, { id: 'in-stock', checked: stock[0], onCheckedChange: stock[1] }), h(P.Label, { htmlFor: 'in-stock' }, 'In stock only'))),
        h(P.SheetFooter, null, h(P.SheetClose, null, h(P.Button, null, 'Show 24 results')), h(P.Button, { variant: 'ghost', onClick: function () { sort[1]('newest'); stock[1](false); } }, 'Clear filters')))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(Filters));
