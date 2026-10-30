import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// UIUIUI Pagination (Magoo "Pagination"): a named navigation landmark with a list of pages.
// A control with an href is a link (a new address); without one it is a button that updates the content in place.

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex flex-row flex-wrap items-center gap-1", className)} {...props} />
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  /** The page being shown: outlined, bold and announced as the current page. */
  isActive?: boolean
  /** Unavailable (Previous on the first page): looks disabled, does nothing and takes no focus. */
  disabled?: boolean
  size?: "default" | "icon"
} & Omit<React.ComponentProps<"a">, "ref"> &
  Pick<React.ComponentProps<"button">, "type">

function PaginationLink({ className, isActive, disabled, size = "icon", href, children, onClick, ...props }: PaginationLinkProps) {
  // A bare page number is named "Page 3", so it isn't read as a lone number
  const number = typeof children === "number" || (typeof children === "string" && /^\d+$/.test(children))
  const shared = {
    "aria-current": isActive ? ("page" as const) : undefined,
    "aria-label": props["aria-label"] ?? (number ? `Page ${children}` : undefined),
    "data-slot": "pagination-link",
    "data-active": isActive || undefined,
    className: cn(
      buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
      isActive && "font-semibold",
      "motion-reduce:transition-none",
      disabled && "pointer-events-none opacity-50",
      className
    ),
  }
  if (href !== undefined) {
    // An unavailable link loses its href, so it isn't focusable or followed
    return (
      <a {...props} {...shared} href={disabled ? undefined : href} aria-disabled={disabled || undefined} onClick={disabled ? undefined : onClick}>
        {children}
      </a>
    )
  }
  return (
    <button
      {...(props as React.ComponentProps<"button">)}
      {...shared}
      type="button"
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
    >
      {children}
    </button>
  )
}

function PaginationPrevious({ className, children = "Previous", ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink size="default" className={cn("gap-1 px-2.5", className)} {...props}>
      <ChevronLeftIcon />
      {/* The word stays the name on small screens, where only the chevron shows */}
      <span className="sr-only sm:not-sr-only">{children}</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, children = "Next", ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink size="default" className={cn("gap-1 px-2.5", className)} {...props}>
      <span className="sr-only sm:not-sr-only">{children}</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  // Only drawn: the gap in the page numbers tells screen readers that pages are left out
  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <EllipsisHorizontalIcon className="size-4" />
    </span>
  )
}

/** Pages to show around the current one: always the first, the last and `siblings` on each side, with "ellipsis" for gaps. */
function paginationRange(page: number, total: number, siblings = 1): (number | "ellipsis")[] {
  const start = Math.max(2, page - siblings)
  const end = Math.min(total - 1, page + siblings)
  const pages: (number | "ellipsis")[] = [1]
  if (start > 2) pages.push(start === 3 ? 2 : "ellipsis")
  for (let n = start; n <= end; n++) pages.push(n)
  if (end < total - 1) pages.push(end === total - 2 ? total - 1 : "ellipsis")
  if (total > 1) pages.push(total)
  return pages
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationRange,
}
