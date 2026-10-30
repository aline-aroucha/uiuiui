var P = window.UIUIUI, h = React.createElement;
  function Tip(props) {
    return h(P.Tooltip, null, h(P.TooltipTrigger, null, h(P.Button, { variant: 'ghost', size: 'icon', 'aria-label': props.label }, h(P.Icon, { name: props.icon }))),
      h(P.TooltipContent, null, props.label));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'uiuiui-row', style: { paddingTop: 40 } },
    h(Tip, { icon: 'pencil-square', label: 'Edit report' }), h(Tip, { icon: 'arrow-down-tray', label: 'Download CSV' }), h(Tip, { icon: 'trash', label: 'Delete report' })));
