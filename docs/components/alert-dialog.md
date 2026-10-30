# AlertDialog

Asks the person to confirm before something irreversible or important happens, and waits for an answer.

```bash
npx @aline-aroucha/uiuiui add alert-dialog
```

## What you provide
- `AlertDialog` with `open` + `onOpenChange` (or uncontrolled), `AlertDialogTrigger asChild` around the `Button` that asks for it.
- `AlertDialogContent` with `AlertDialogHeader` (`AlertDialogTitle` + `AlertDialogDescription`) and `AlertDialogFooter`.
- `AlertDialogCancel` (ghost by default) and `AlertDialogAction` with `variant="destructive"` for deletions.
- `size="sm"` on `AlertDialogContent` for a short, centered confirmation; `AlertDialogMedia` for an icon above the title.

## Usage
- Use it only for decisions that need an answer now: deleting, discarding unsaved work, signing out everywhere. For a task, use `Dialog`.
- The title is the question ("Delete “Website redesign”?"); the description says what is lost and that it can't be undone.
- The action repeats the verb of the title ("Delete project"), never "OK" or "Yes". Cancel is always there.
- Don't stack it on top of another dialog; close the first one, or confirm inside it.

## Accessibility
- It is announced as an alert dialog (`role="alertdialog"`), named by its title and described by its description, so the question and its consequence are read together.
- Focus starts on Cancel, the safe choice; `Tab` and `Shift+Tab` stay inside, and the page behind is hidden from screen readers.
- `Esc` cancels. Clicking outside does nothing: the person has to answer.
- Closing returns focus to the control that opened it. After a deletion that removes that control, move focus to a sensible place (the list, its heading) and confirm with a toast.
- The action and Cancel differ in more than color: their labels say what each does.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Dialogs](https://magoo.cc/en/components/messages/dialogs.html) (`dialogs`), [Modal](https://magoo.cc/en/components/hidden-elements/modal.html) (`modal`). Magoo is educational guidance; test the behavior in your implementation._
