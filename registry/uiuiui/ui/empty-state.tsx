import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// UIUIUI EmptyState: says what will appear in an empty list or table and how to add the first item.
// It is content, so it stays solid; it is one of the three ways a wait ends (content, an error with "Try again", or an empty state).

const emptyStateVariants = cva("flex min-w-0 flex-col items-center justify-center gap-6 p-6 text-center md:p-12", {
  variants: {
    variant: {
      // inside a Card or a page section
      default: "",
      // straight on the page background: a dashed outline marks the area that will fill up
      outline: "rounded-2xl border border-dashed border-border",
    },
  },
  defaultVariants: { variant: "default" },
})

function EmptyState({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof emptyStateVariants>) {
  return <div data-slot="empty-state" className={cn(emptyStateVariants({ variant }), className)} {...props} />
}

function EmptyStateMedia({ className, ...props }: React.ComponentProps<"div">) {
  // Decorative: the title says it all
  return (
    <div
      aria-hidden="true"
      data-slot="empty-state-media"
      className={cn("flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-6", className)}
      {...props}
    />
  )
}

function EmptyStateHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-state-header" className={cn("flex max-w-sm flex-col items-center gap-2", className)} {...props} />
}

function EmptyStateTitle({
  className,
  level = 2,
  ...props
}: React.ComponentProps<"h2"> & {
  /** Heading level, to fit the page outline. */
  level?: 2 | 3 | 4 | 5 | 6
}) {
  const Heading = `h${level}` as "h2"
  return <Heading data-slot="empty-state-title" className={cn("text-xl font-semibold tracking-tight", className)} {...props} />
}

function EmptyStateDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="empty-state-description" className={cn("max-w-sm text-sm text-pretty text-muted-foreground", className)} {...props} />
}

function EmptyStateActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-state-actions" className={cn("flex flex-wrap items-center justify-center gap-2", className)} {...props} />
}

export { EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateHeader, EmptyStateMedia, EmptyStateTitle }
