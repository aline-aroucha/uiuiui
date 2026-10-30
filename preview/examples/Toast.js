var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h('div', { className: 'uiuiui-row' },
    h(P.Toaster),
    h(P.Button, { variant: 'outline', onClick: function () { P.toast.success('Changes saved', { description: 'Your profile is up to date.' }); } }, 'Save changes'),
    h(P.Button, { variant: 'outline', onClick: function () { P.toast('Report archived', { action: { label: 'Undo', onClick: function () { P.toast('Report restored'); } } }); } }, 'Archive report')));
