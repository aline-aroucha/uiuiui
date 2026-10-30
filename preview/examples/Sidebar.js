var P = window.UIUIUI, h = React.createElement;
  function Links(props) {
    return h(React.Fragment, null,
      h(P.SidebarHeader, null, 'Acme Inc.'),
      h(P.SidebarGroup, { label: 'Workspace' }, [['Overview', 'home', true], ['Inbox', 'inbox'], ['Reports', 'chart-bar'], ['Customers', 'users']].map(function (l) {
        return h(P.SidebarItem, { key: l[0], href: '#' + l[0].toLowerCase(), active: !!l[2], icon: h(P.Icon, { name: l[1] }) }, l[0]);
      })),
      h(P.SidebarFooter, null, h('ul', { style: { margin: 0, padding: 0, listStyle: 'none' } }, h(P.SidebarItem, { href: '#settings', icon: h(P.Icon, { name: 'cog-6-tooth' }) }, 'Settings'))));
  }
  function App(props) {
    return h(P.SidebarProvider, { compact: props.compact, style: { maxWidth: props.compact ? 380 : 720 } },
      h(P.Sidebar, { label: 'Main' }, h(Links)),
      h('div', { style: { flex: 1, minWidth: 0 } },
        h('header', { className: 'uiuiui-row', style: { padding: '8px 16px', borderBottom: '1px solid var(--border)', gap: 8 } }, h(P.SidebarTrigger), h('span', { style: { fontWeight: 600 } }, props.compact ? 'Overview (small screen)' : 'Overview')),
        h('div', { style: { padding: 16 } }, h('p', { className: 'uiuiui-muted', style: { margin: 0 } }, '12 open orders, $14,820.00 this month.'))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { style: { display: 'grid', gap: 24 } }, h(App), h(App, { compact: true })));
