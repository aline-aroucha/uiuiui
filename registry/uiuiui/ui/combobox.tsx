"use client"

// UIUIUI Combobox: an editable combobox with a list of suggestions (WAI-ARIA combobox pattern, Magoo "Autocomplete").
// Focus stays in the field; the active option is pointed to with aria-activedescendant; nothing is chosen until Enter or a click.
import * as React from "react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid"

import { cn } from "@/lib/utils"

type ComboboxOption = {
  value: string
  label: string
  /** Extra context shown under the label, for options with similar names. */
  description?: string
}

type ComboboxProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange"> & {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Shown when nothing matches what was typed. */
  emptyMessage?: string
  /** Accessible name of the list of suggestions. */
  listLabel?: string
  /** Turns a count into the message read after typing, e.g. "3 suggestions". */
  formatCount?: (count: number) => string
}

function Combobox({
  options,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  emptyMessage = "No matches",
  listLabel = "Suggestions",
  formatCount = (count) => (count === 1 ? "1 suggestion" : `${count} suggestions`),
  className,
  id,
  disabled,
  onKeyDown,
  onBlur,
  ...props
}: ComboboxProps) {
  const generated = React.useId()
  const inputId = id ?? generated
  const listId = `${inputId}-list`
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolled
  const selected = options.find((option) => option.value === value)
  const [query, setQuery] = React.useState(selected?.label ?? "")
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState(-1)
  const [status, setStatus] = React.useState("")
  const listRef = React.useRef<HTMLUListElement>(null)

  const setValue = (next: string) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }
  // When the confirmed value shows in the field, the whole list is offered; otherwise the typed text filters it
  const filtered =
    selected && query === selected.label
      ? options
      : options.filter((option) => option.label.toLowerCase().includes(query.trim().toLowerCase()))

  // The count is read once the person pauses, never on every key
  React.useEffect(() => {
    if (!open) return setStatus("")
    const timer = setTimeout(() => setStatus(filtered.length ? formatCount(filtered.length) : emptyMessage), 500)
    return () => clearTimeout(timer)
  }, [open, query]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (active < 0) return
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" })
  }, [active])

  const commit = (option: ComboboxOption) => {
    setValue(option.value)
    setQuery(option.label)
    setOpen(false)
    setActive(-1)
  }

  return (
    <div className={cn("relative w-full", className)}>
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        autoComplete="off"
        disabled={disabled}
        value={query}
        className="h-9 w-full min-w-0 rounded-lg border border-input bg-background py-1 pr-9 pl-3 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground hover:border-primary focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive md:text-sm"
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
          setActive(-1)
          // Editing the text after a choice drops that choice: no old value is sent as the new one
          if (value && event.target.value !== selected?.label) setValue("")
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault()
            if (!open) {
              // opening with an arrow lands on the confirmed option, or on the first (last with ArrowUp)
              const current = filtered.findIndex((option) => option.value === value)
              setOpen(true)
              return setActive(current >= 0 ? current : event.key === "ArrowDown" ? 0 : filtered.length - 1)
            }
            const step = event.key === "ArrowDown" ? 1 : -1
            setActive((current) => (filtered.length ? (current + step + filtered.length) % filtered.length : -1))
          } else if (event.key === "Enter" && open && active >= 0 && filtered[active]) {
            event.preventDefault()
            commit(filtered[active])
          } else if (event.key === "Escape") {
            if (open) {
              event.preventDefault()
              setOpen(false)
              setActive(-1)
            } else if (selected && query !== selected.label) {
              setQuery(selected.label)
            }
          } else if (event.key === "Tab") {
            setOpen(false)
            setActive(-1)
          }
        }}
        onBlur={(event) => {
          onBlur?.(event)
          setOpen(false)
          setActive(-1)
        }}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        disabled={disabled}
        className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground"
        onMouseDown={(event) => {
          event.preventDefault()
          document.getElementById(inputId)?.focus()
          setOpen((current) => !current)
        }}
      >
        <ChevronUpDownIcon className="size-4" />
      </button>
      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={listLabel}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl glass-strong p-1 text-sm text-popover-foreground shadow-glass"
        >
          {filtered.length === 0 && <li className="px-2 py-1.5 text-muted-foreground">{emptyMessage}</li>}
          {filtered.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              data-index={index}
              role="option"
              aria-selected={option.value === value}
              data-active={index === active || undefined}
              className="relative flex cursor-default flex-col rounded-lg py-1.5 pr-8 pl-2 select-none data-[active]:bg-primary data-[active]:text-primary-foreground"
              onMouseDown={(event) => event.preventDefault()}
              onMouseMove={() => setActive(index)}
              onClick={() => commit(option)}
            >
              <span>{option.label}</span>
              {option.description && <span className="text-xs opacity-80">{option.description}</span>}
              {option.value === value && <CheckIcon className="absolute top-2 right-2 size-4" />}
            </li>
          ))}
        </ul>
      )}
      <span role="status" className="sr-only">
        {status}
      </span>
    </div>
  )
}

export { Combobox, type ComboboxOption }
