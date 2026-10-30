var P = window.UIUIUI, h = React.createElement;
  // Orders that update in place: the page buttons change the table, focus moves to its caption, and the status says which page is shown
  var orders = [];
  for (var i = 0; i < 48; i++) orders.push({ id: '#' + (4821 - i), customer: ['Maya Chen', 'Leo Park', 'Ana Souza', 'Sam Rivera'][i % 4], amount: '$' + (120 + i * 37).toLocaleString('en-US') + '.00' });
  function Orders() {
    var per = 4, total = Math.ceil(orders.length / per), st = React.useState(1), page = st[0], caption = React.useRef(null), first = React.useRef(true);
    React.useEffect(function () { if (first.current) { first.current = false; return; } caption.current.focus(); }, [page]);
    var go = function (n) { return function () { st[1](n); }; };
    var rows = orders.slice((page - 1) * per, page * per);
    return h(P.Card, { style: { maxWidth: 560 } }, h(P.CardContent, { style: { display: 'grid', gap: 16 } },
      h(P.Table, null,
        h('caption', { ref: caption, tabIndex: -1, className: 'uiuiui-muted', style: { captionSide: 'top', textAlign: 'left', paddingBottom: 8, outlineOffset: 2 } }, 'Orders, page ' + page + ' of ' + total),
        h(P.TableHeader, null, h(P.TableRow, null, h(P.TableHead, null, 'Order'), h(P.TableHead, null, 'Customer'), h(P.TableHead, { style: { textAlign: 'right' } }, 'Amount'))),
        h(P.TableBody, null, rows.map(function (o) { return h(P.TableRow, { key: o.id }, h(P.TableCell, null, o.id), h(P.TableCell, null, o.customer), h(P.TableCell, { style: { textAlign: 'right', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' } }, o.amount)); }))),
      h(P.Pagination, { 'aria-label': 'Orders pages' }, h(P.PaginationContent, null,
        h(P.PaginationItem, null, h(P.PaginationPrevious, { disabled: page === 1, onClick: go(page - 1) })),
        P.paginationRange(page, total).map(function (n, i) {
          return h(P.PaginationItem, { key: n === 'ellipsis' ? 'e' + i : n }, n === 'ellipsis' ? h(P.PaginationEllipsis) : h(P.PaginationLink, { isActive: n === page, onClick: go(n) }, n));
        }),
        h(P.PaginationItem, null, h(P.PaginationNext, { disabled: page === total, onClick: go(page + 1) }))))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(Orders));
