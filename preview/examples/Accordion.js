var P = window.UIUIUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('preview')).render(h(P.Card, { style: { maxWidth: 520 } }, h(P.CardContent, null,
    h(P.Accordion, { type: 'single', collapsible: true, defaultValue: 'refunds' },
      h(P.AccordionItem, { value: 'refunds' }, h(P.AccordionTrigger, null, 'How do refunds work?'),
        h(P.AccordionContent, null, 'Refunds go back to the original payment method within 5 business days. You get an email when the money is on its way.')),
      h(P.AccordionItem, { value: 'invoices' }, h(P.AccordionTrigger, null, 'Where can I find my invoices?'),
        h(P.AccordionContent, null, 'Open Billing, then Invoices. Each invoice can be downloaded as a PDF.')),
      h(P.AccordionItem, { value: 'plan' }, h(P.AccordionTrigger, null, 'Can I change my plan later?'),
        h(P.AccordionContent, null, 'Yes. Changes take effect on your next billing date, Nov 1, 2026.'))))));
