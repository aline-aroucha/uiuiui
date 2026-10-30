import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowPathIcon } from "@heroicons/react/16/solid"

function Spinner({
  className,
  label = "Loading",
  "aria-hidden": ariaHidden,
  ...props
}: React.ComponentProps<"svg"> & {
  /** Names the wait for screen readers ("Loading orders"). Pass aria-hidden instead when visible text already says it. */
  label?: string
}) {
  return (
    <ArrowPathIcon
      role={ariaHidden ? undefined : "status"}
      aria-label={ariaHidden ? undefined : label}
      aria-hidden={ariaHidden ?? false}
      className={cn("size-4 animate-spin motion-reduce:animate-none", className)}
      {...props}
    />
  )
}

export { Spinner }
