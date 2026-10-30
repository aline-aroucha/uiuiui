import * as React from "react"
import { CheckIcon } from "@heroicons/react/16/solid"

import { cn } from "@/lib/utils"

// UIUIUI Stepper (Magoo "Step indicator"): shows where the person is in a sequence of steps.
// It only informs: Back and Continue are ordinary buttons next to the form. Completed steps can link back when you pass an href.

type StepperStep = {
  label: string
  /** Only for completed steps people may go back to; current and upcoming steps are never links. */
  href?: string
}

function Stepper({
  steps,
  current,
  label = "Progress",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  steps: StepperStep[]
  /** Index of the current step, from 0. */
  current: number
  /** Names the list of steps for screen readers ("Checkout progress"). */
  label?: string
}) {
  const at = Math.min(Math.max(current, 0), steps.length - 1)
  return (
    <div data-slot="stepper" className={cn("flex flex-col gap-3", className)} {...props}>
      <ol aria-label={label} className="flex gap-2">
        {steps.map((step, i) => {
          const state = i < at ? "complete" : i === at ? "current" : "upcoming"
          const text = (
            <>
              {step.label}
              {/* State in words, not only color or an icon */}
              {state !== "current" && <span className="sr-only">{state === "complete" ? ", completed" : ", not completed"}</span>}
            </>
          )
          return (
            <li
              key={step.label}
              data-state={state}
              aria-current={state === "current" ? "step" : undefined}
              className="flex min-w-0 flex-1 flex-col gap-2"
            >
              <span aria-hidden="true" className={cn("h-2 rounded-full", state === "upcoming" ? "bg-muted" : "bg-primary")} />
              <span
                className={cn(
                  "flex items-start gap-2 text-sm",
                  state === "current" ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "hidden size-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums sm:inline-flex",
                    state === "complete" && "border-primary bg-primary text-primary-foreground",
                    state === "current" && "border-primary text-foreground",
                    state === "upcoming" && "border-border text-muted-foreground"
                  )}
                >
                  {state === "complete" ? <CheckIcon className="size-3" /> : i + 1}
                </span>
                {/* On small screens only the bars and the summary below show; the names stay for screen readers */}
                <span className="sr-only sm:not-sr-only">
                  {state === "complete" && step.href ? (
                    <a
                      href={step.href}
                      className="rounded-sm text-foreground underline underline-offset-4 outline-none hover:text-primary active:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </span>
              </span>
            </li>
          )
        })}
      </ol>
      <p data-slot="stepper-summary" className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          Step {at + 1} of {steps.length}
        </span>
        : {steps[at]?.label}
      </p>
    </div>
  )
}

export { Stepper, type StepperStep }
