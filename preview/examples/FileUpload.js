var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Card, { style: { maxWidth: 460 } }, h(P.CardContent, null,
    h(P.Field, { required: true },
      h(P.FieldLabel, null, 'Receipts'),
      h(P.FieldDescription, null, 'PDF, PNG or JPG, up to 10 MB each, up to 3 files.'),
      h(P.FieldControl, null, h(P.FileUpload, { accept: '.pdf,.png,.jpg', maxSize: 10 * 1024 * 1024, maxFiles: 3 }))))));
