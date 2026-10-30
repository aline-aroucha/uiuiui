var P = window.UIUIUI, h = React.createElement;
  function Demo() {
    var s = React.useState(false);
    return h(P.AlertDialog, { open: s[0], onOpenChange: s[1] },
      h(P.AlertDialogTrigger, null, h(P.Button, { variant: 'destructive' }, 'Delete project')),
      h(P.AlertDialogContent, null,
        h(P.AlertDialogHeader, null, h(P.AlertDialogTitle, null, 'Delete “Website redesign”?'),
          h(P.AlertDialogDescription, null, 'This permanently deletes the project and its 24 files. You can’t undo this.')),
        h(P.AlertDialogFooter, null, h(P.AlertDialogCancel, null, 'Cancel'), h(P.AlertDialogAction, { variant: 'destructive' }, 'Delete project'))));
  }
  ReactDOM.createRoot(document.getElementById('preview')).render(h(Demo));
