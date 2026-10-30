var P = window.UIUIUI, h = React.createElement;
  function Demo() {
    var s = React.useState(false);
    return h(P.Dialog, { open: s[0], onOpenChange: s[1] },
      h(P.DialogTrigger, null, h(P.Button, { variant: 'outline' }, 'Edit profile')),
      h(P.DialogContent, null,
        h(P.DialogHeader, null, h(P.DialogTitle, null, 'Edit profile'), h(P.DialogDescription, null, 'Changes show on your public page. Save when you are done.')),
        h(P.Field, { required: true }, h(P.FieldLabel, null, 'Name'), h(P.FieldControl, null, h(P.Input, { defaultValue: 'Maya Chen' }))),
        h(P.Field, null, h(P.FieldLabel, null, 'Job title'), h(P.FieldControl, null, h(P.Input, { defaultValue: 'Product designer' }))),
        h(P.DialogFooter, null, h(P.DialogClose, null, h(P.Button, { variant: 'ghost' }, 'Cancel')), h(P.DialogClose, null, h(P.Button, null, 'Save changes')))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(Demo));
