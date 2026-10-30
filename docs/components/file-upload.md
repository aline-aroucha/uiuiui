# FileUpload

Lets people choose files with a button or drop them in, and shows each file's name, size and upload state.

```bash
npx @aline-aroucha/uiuiui add file-upload field
```

## What you provide
- `accept` (".pdf,.png,.jpg"), `maxSize` in bytes and `maxFiles`: the same limits written in the `FieldDescription`, before the picker opens.
- `onUpload(file, report, signal)` to upload each file as it is added: call `report(percent)` as it goes and stop when `signal` aborts. Without it, files are only selected and you send them with the form.
- `onFilesChange(files)` with the files kept; `chooseLabel` / `dropLabel` to translate the texts.
- Inside a `Field` for the label, the limits and errors.

## Usage
- State what is needed and the limits up front ("PDF, PNG or JPG, up to 10 MB each"). Accept checks here are for people; validate type, size and content on the server too.
- Each problem names the file and the fix ("Not added: larger than 10 MB. Choose a smaller file."); valid files are kept.
- Remove, Cancel and Try again are separate actions; a failed upload keeps the file so it can be retried.
- Don't promise to resume uploads after a reload unless your server supports it.

## Accessibility
- "Choose files" is a real button, named by the `FieldLabel` and described by the limits; `Enter` or `Space` open the system picker. Dropping files is an extra, never the only way, and runs the same checks.
- The list names each file with its size and state in text ("Uploading, 40%", "Uploaded", "Upload failed…"), with an icon that is never the only signal; each upload has a progress bar named after the file.
- Actions carry the file's name: "Remove receipt.pdf", "Cancel upload of receipt.pdf", "Try again: receipt.pdf". They are ordinary buttons in the `Tab` order.
- Added, uploaded, failed, canceled and removed files are announced once in a status region, without moving focus or reading every percentage.
- After removing a file, focus goes to the next file's action, the previous one, or back to "Choose files".

_Adapted from Magoo 1.6.0 by Marcelo Sales: [File upload](https://magoo.cc/en/components/forms/file-upload.html) (`upload-arquivos`). Magoo is educational guidance; test the behavior in your implementation._
