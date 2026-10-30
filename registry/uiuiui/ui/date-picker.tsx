"use client"

// UIUIUI DatePicker: a date typed in the field (MM/DD/YYYY) or chosen in a calendar dialog (WAI-ARIA date picker dialog,
// Magoo "Dates and ranges"). Dates are plain year-month-day values (YYYY-MM-DD): no time zone can move them to another day.
import * as React from "react"
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Day = { y: number; m: number; d: number } // m: 1–12

const pad = (n: number) => String(n).padStart(2, "0")
const toIso = (day: Day) => `${day.y}-${pad(day.m)}-${pad(day.d)}`
const fromIso = (iso?: string): Day | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? "")
  return match ? valid({ y: +match[1], m: +match[2], d: +match[3] }) : null
}
const daysIn = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate()
const valid = (day: Day) => (day.m >= 1 && day.m <= 12 && day.d >= 1 && day.d <= daysIn(day.y, day.m) ? day : null)
const utc = (day: Day) => new Date(Date.UTC(day.y, day.m - 1, day.d))
const fromUtc = (date: Date): Day => ({ y: date.getUTCFullYear(), m: date.getUTCMonth() + 1, d: date.getUTCDate() })
const addDays = (day: Day, n: number) => fromUtc(new Date(utc(day).getTime() + n * 864e5))
const addMonths = (day: Day, n: number) => {
  const first = new Date(Date.UTC(day.y, day.m - 1 + n, 1))
  const y = first.getUTCFullYear()
  const m = first.getUTCMonth() + 1
  return { y, m, d: Math.min(day.d, daysIn(y, m)) }
}
const same = (a: Day | null, b: Day | null) => !!a && !!b && a.y === b.y && a.m === b.m && a.d === b.d
const compare = (a: Day, b: Day) => utc(a).getTime() - utc(b).getTime()
const format = (day: Day) => `${pad(day.m)}/${pad(day.d)}/${day.y}`
const longLabel = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
const shortLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
const WEEKDAYS = [["Su", "Sunday"], ["Mo", "Monday"], ["Tu", "Tuesday"], ["We", "Wednesday"], ["Th", "Thursday"], ["Fr", "Friday"], ["Sa", "Saturday"]]
const today = () => {
  const now = new Date()
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() }
}
/** Reads MM/DD/YYYY (also M/D/YYYY); returns null for a date that doesn't exist. */
const parse = (text: string): Day | null => {
  const match = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(text)
  return match ? valid({ y: +match[3], m: +match[1], d: +match[2] }) : null
}

type DatePickerProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "min" | "max"> & {
  /** The confirmed date as YYYY-MM-DD, or "" when none. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Runs when the typed text isn't a date in the allowed range; show the message in FieldError. */
  onInvalidInput?: (reason: "format" | "range", text: string) => void
  min?: string
  max?: string
  isDateDisabled?: (date: string) => boolean
  /** Accessible name of the calendar button; the chosen date is added to it. */
  calendarLabel?: string
}

function DatePicker({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onInvalidInput,
  min,
  max,
  isDateDisabled,
  calendarLabel = "Choose date",
  className,
  id,
  disabled,
  onBlur,
  onKeyDown,
  ...props
}: DatePickerProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolled
  const selected = fromIso(value)
  const [text, setText] = React.useState(selected ? format(selected) : "")
  const [open, setOpen] = React.useState(false)
  const [focused, setFocused] = React.useState<Day>(selected ?? today())
  const gridRef = React.useRef<HTMLTableElement>(null)
  const headingId = React.useId()
  const minDay = fromIso(min)
  const maxDay = fromIso(max)

  React.useEffect(() => {
    if (selected) setText(format(selected))
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  const setValue = (next: string) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }
  const blocked = (day: Day) =>
    (minDay && compare(day, minDay) < 0) || (maxDay && compare(day, maxDay) > 0) || !!isDateDisabled?.(toIso(day))

  // Typed text is checked when the person leaves the field or presses Enter; it is never cleared
  const commitText = () => {
    if (!text.trim()) return setValue("")
    const day = parse(text)
    if (!day) {
      setValue("")
      return onInvalidInput?.("format", text)
    }
    if (blocked(day)) {
      setValue("")
      return onInvalidInput?.("range", text)
    }
    setText(format(day))
    setValue(toIso(day))
  }

  const choose = (day: Day) => {
    if (blocked(day)) return
    setText(format(day))
    setValue(toIso(day))
    setOpen(false)
  }

  // Focus follows the focused day inside the grid (one Tab stop, arrows move it)
  React.useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() =>
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${toIso(focused)}"]`)?.focus()
    )
    return () => cancelAnimationFrame(frame)
  }, [open, focused])

  const onGridKey = (event: React.KeyboardEvent) => {
    const moves: Record<string, () => Day> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      Home: () => addDays(focused, -utc(focused).getUTCDay()),
      End: () => addDays(focused, 6 - utc(focused).getUTCDay()),
      PageUp: () => addMonths(focused, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(focused, event.shiftKey ? 12 : 1),
    }
    if (moves[event.key]) {
      event.preventDefault()
      setFocused(moves[event.key]())
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      choose(focused)
    }
  }

  const first = { y: focused.y, m: focused.m, d: 1 }
  const lead = utc(first).getUTCDay()
  const cells: (Day | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: daysIn(focused.y, focused.m) }, (_, i) => ({ y: focused.y, m: focused.m, d: i + 1 })),
  ]
  while (cells.length % 7) cells.push(null)
  const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
  const now = today()

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setFocused(selected ?? parse(text) ?? today())
      }}
      modal
    >
      <div className={cn("relative w-full", className)}>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder="MM/DD/YYYY"
          autoComplete="off"
          disabled={disabled}
          value={text}
          className="h-9 w-full min-w-0 rounded-lg border border-input bg-background py-1 pr-10 pl-3 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground hover:border-primary focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive md:text-sm"
          onChange={(event) => setText(event.target.value)}
          onBlur={(event) => {
            onBlur?.(event)
            commitText()
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event)
            if (event.key === "Enter") commitText()
          }}
          {...props}
        />
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label={selected ? `${calendarLabel}, selected date is ${shortLabel.format(utc(selected))}` : calendarLabel}
            className="absolute top-1/2 right-1 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50"
          >
            <CalendarDaysIcon className="size-4" />
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        align="end"
        className="w-auto p-3"
        aria-labelledby={headingId}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <div className="flex items-center justify-between gap-2 pb-2">
          <button
            type="button"
            aria-label="Previous month"
            className="inline-flex size-8 items-center justify-center rounded-full outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setFocused(addMonths(focused, -1))}
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <h2 id={headingId} aria-live="polite" className="text-sm font-semibold">
            {monthLabel.format(utc(first))}
          </h2>
          <button
            type="button"
            aria-label="Next month"
            className="inline-flex size-8 items-center justify-center rounded-full outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setFocused(addMonths(focused, 1))}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
        <table ref={gridRef} role="grid" aria-labelledby={headingId} className="border-collapse" onKeyDown={onGridKey}>
          <thead>
            <tr>
              {WEEKDAYS.map(([short, long]) => (
                <th key={long} scope="col" abbr={long} className="size-9 text-xs font-medium text-muted-foreground">
                  {short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, w) => (
              <tr key={w}>
                {week.map((day, i) =>
                  day ? (
                    <td key={i} aria-selected={same(day, selected)} className="p-0 text-center">
                      <button
                        type="button"
                        data-day={toIso(day)}
                        tabIndex={same(day, focused) ? 0 : -1}
                        aria-label={longLabel.format(utc(day))}
                        aria-current={same(day, now) ? "date" : undefined}
                        aria-disabled={blocked(day) || undefined}
                        onClick={() => {
                          setFocused(day)
                          choose(day)
                        }}
                        className={cn(
                          "relative inline-flex size-9 items-center justify-center rounded-full text-sm outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-disabled:pointer-events-none aria-disabled:opacity-40 aria-disabled:line-through",
                          same(day, now) && "font-semibold after:absolute after:bottom-1 after:size-1 after:rounded-full after:bg-current",
                          same(day, selected) && "bg-primary text-primary-foreground shadow-glass hover:bg-primary/90 hover:text-primary-foreground"
                        )}
                      >
                        {day.d}
                      </button>
                    </td>
                  ) : (
                    <td key={i} />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
