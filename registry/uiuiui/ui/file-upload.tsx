"use client"

// UIUIUI FileUpload (Magoo "File upload"): a "Choose files" button (drag and drop is only an extra), limits stated up front,
// a list where every file shows its name, size and state, and per-file Remove, Cancel upload and Try again named after the file.
import * as React from "react"
import { ArrowPathIcon, ArrowUpTrayIcon, CheckCircleIcon, DocumentIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/16/solid"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type UploadState = "ready" | "uploading" | "uploaded" | "failed" | "rejected"
type UploadItem = { id: string; file: File; state: UploadState; progress: number; message?: string }

type FileUploadProps = {
  id?: string
  /** File types for the system picker, e.g. ".pdf,.png,.jpg"; validate on the server too. */
  accept?: string
  /** Largest size per file, in bytes. */
  maxSize?: number
  /** Most files at once. */
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  /** Uploads one file; call report(0–100) as it goes and honor the signal to cancel. Without it, files are only selected. */
  onUpload?: (file: File, report: (percent: number) => void, signal: AbortSignal) => Promise<void>
  /** The files currently kept (not rejected, not removed). */
  onFilesChange?: (files: File[]) => void
  chooseLabel?: string
  dropLabel?: string
  className?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "true" | "false"
}

const size = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : bytes < 1024 ** 2 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 ** 2).toFixed(1)} MB`
const accepts = (file: File, accept?: string) =>
  !accept ||
  accept.split(",").some((rule) => {
    const r = rule.trim().toLowerCase()
    return r.startsWith(".") ? file.name.toLowerCase().endsWith(r) : r.endsWith("/*") ? file.type.startsWith(r.slice(0, -1)) : file.type === r
  })

function FileUpload({
  id,
  accept,
  maxSize,
  maxFiles,
  multiple = true,
  disabled,
  onUpload,
  onFilesChange,
  chooseLabel = "Choose files",
  dropLabel = "or drop them here",
  className,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
}: FileUploadProps) {
  const [items, setItems] = React.useState<UploadItem[]>([])
  const [announcement, setAnnouncement] = React.useState("")
  const [dragging, setDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const chooseRef = React.useRef<HTMLButtonElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const controllers = React.useRef(new Map<string, AbortController>())

  const update = (itemId: string, patch: Partial<UploadItem>) =>
    setItems((list) => list.map((item) => (item.id === itemId ? { ...item, ...patch } : item)))

  React.useEffect(() => {
    onFilesChange?.(items.filter((item) => item.state !== "rejected").map((item) => item.file))
  }, [items]) // eslint-disable-line react-hooks/exhaustive-deps

  const upload = async (item: UploadItem) => {
    if (!onUpload) return
    const controller = new AbortController()
    controllers.current.set(item.id, controller)
    update(item.id, { state: "uploading", progress: 0, message: undefined })
    try {
      await onUpload(item.file, (percent) => update(item.id, { progress: percent }), controller.signal)
      update(item.id, { state: "uploaded", progress: 100 })
      setAnnouncement(`${item.file.name} uploaded`)
    } catch {
      const canceled = controller.signal.aborted
      update(item.id, { state: canceled ? "ready" : "failed", message: canceled ? "Upload canceled" : "Upload failed. Check your connection and try again." })
      setAnnouncement(canceled ? `${item.file.name} upload canceled` : `${item.file.name} failed to upload`)
    } finally {
      controllers.current.delete(item.id)
    }
  }

  // The same checks for the picker and for drag and drop; a rejected file never drops the valid ones
  const add = (files: FileList | File[]) => {
    const kept = items.filter((item) => item.state !== "rejected")
    const added: UploadItem[] = []
    for (const file of Array.from(files)) {
      const item: UploadItem = { id: `${file.name}-${file.size}-${file.lastModified}`, file, state: onUpload ? "uploading" : "ready", progress: 0 }
      if (kept.concat(added).some((other) => other.id === item.id)) continue
      if (!accepts(file, accept)) Object.assign(item, { state: "rejected", message: `Not added: this file type isn't accepted (${accept}).` })
      else if (maxSize && file.size > maxSize) Object.assign(item, { state: "rejected", message: `Not added: larger than ${size(maxSize)}. Choose a smaller file.` })
      else if (maxFiles && kept.length + added.filter((a) => a.state !== "rejected").length >= maxFiles)
        Object.assign(item, { state: "rejected", message: `Not added: you can add up to ${maxFiles} files. Remove one first.` })
      added.push(item)
    }
    if (!added.length) return
    setItems((list) => [...list, ...added])
    const ok = added.filter((item) => item.state !== "rejected")
    const rejected = added.length - ok.length
    setAnnouncement(
      [ok.length && `${ok.length === 1 ? ok[0].file.name : `${ok.length} files`} added`, rejected && `${rejected} not added`].filter(Boolean).join(", ")
    )
    ok.forEach(upload)
  }

  // After a removal, focus moves to the next file's first action, the previous one, or "Choose files"
  const remove = (item: UploadItem) => {
    controllers.current.get(item.id)?.abort()
    const index = items.findIndex((other) => other.id === item.id)
    setItems((list) => list.filter((other) => other.id !== item.id))
    setAnnouncement(`${item.file.name} removed`)
    requestAnimationFrame(() => {
      const rows = listRef.current?.querySelectorAll<HTMLElement>("li") ?? []
      const target = rows[index] ?? rows[index - 1]
      ;(target?.querySelector<HTMLElement>("button") ?? chooseRef.current)?.focus()
    })
  }

  return (
    <div className={cn("grid gap-3", className)}>
      <div
        data-dragging={dragging || undefined}
        className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-input bg-background p-6 text-center text-sm text-muted-foreground transition-colors data-[dragging]:border-primary data-[dragging]:bg-accent"
        onDragOver={(event) => {
          if (disabled) return
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          if (!disabled) add(event.dataTransfer.files)
        }}
      >
        <ArrowUpTrayIcon className="size-6 text-muted-foreground" aria-hidden />
        <Button
          ref={chooseRef}
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          onClick={() => inputRef.current?.click()}
        >
          {chooseLabel}
        </Button>
        <span aria-hidden>{dropLabel}</span>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          accept={accept}
          multiple={multiple}
          onChange={(event) => {
            if (event.target.files) add(event.target.files)
            event.target.value = ""
          }}
        />
      </div>
      {items.length > 0 && (
        <ul ref={listRef} aria-label="Files" className="grid gap-2">
          {items.map((item) => (
            <li key={item.id} className="grid gap-2 rounded-lg border bg-card p-3 text-sm">
              <div className="flex items-center gap-3">
                {item.state === "uploaded" ? (
                  <CheckCircleIcon className="size-4 shrink-0 text-success" aria-hidden />
                ) : item.state === "failed" || item.state === "rejected" ? (
                  <ExclamationCircleIcon className="size-4 shrink-0 text-destructive" aria-hidden />
                ) : (
                  <DocumentIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                )}
                <div className="grid min-w-0 flex-1">
                  <span className="truncate font-medium" title={item.file.name}>
                    {item.file.name}
                  </span>
                  <span className={cn("text-xs text-muted-foreground", (item.state === "failed" || item.state === "rejected") && "text-destructive")}>
                    {size(item.file.size)} ·{" "}
                    {item.state === "uploading"
                      ? `Uploading, ${item.progress}%`
                      : item.state === "uploaded"
                        ? "Uploaded"
                        : item.state === "ready"
                          ? (item.message ?? "Ready to upload")
                          : item.message}
                  </span>
                </div>
                {item.state === "uploading" && (
                  <Button type="button" variant="ghost" size="sm" aria-label={`Cancel upload of ${item.file.name}`} onClick={() => controllers.current.get(item.id)?.abort()}>
                    Cancel
                  </Button>
                )}
                {item.state === "failed" && (
                  <Button type="button" variant="ghost" size="icon-sm" aria-label={`Try again: ${item.file.name}`} onClick={() => upload(item)}>
                    <ArrowPathIcon />
                  </Button>
                )}
                {item.state !== "uploading" && (
                  <Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove ${item.file.name}`} onClick={() => remove(item)}>
                    <XMarkIcon />
                  </Button>
                )}
              </div>
              {item.state === "uploading" && <Progress value={item.progress} aria-label={`Uploading ${item.file.name}`} />}
            </li>
          ))}
        </ul>
      )}
      <span role="status" className="sr-only">
        {announcement}
      </span>
    </div>
  )
}

export { FileUpload, type UploadItem }
