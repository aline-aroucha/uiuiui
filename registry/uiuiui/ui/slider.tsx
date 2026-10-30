"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Slider as SliderPrimitive } from "radix-ui"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onValueChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  thumbLabels,
  formatValue,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  /** One name per thumb when there are two ("Minimum price", "Maximum price"). */
  thumbLabels?: string[]
  /** Text read for each value, with its unit ("$1,200", "40%"). */
  formatValue?: (value: number) => string
}) {
  const [current, setCurrent] = React.useState(() => value ?? defaultValue ?? [min])
  const values = value ?? current

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={values}
      min={min}
      max={max}
      onValueChange={(next) => {
        setCurrent(next)
        onValueChange?.(next)
      }}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-primary/20 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {values.map((thumbValue, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          // the name goes on each thumb (role="slider"), not on the root, so it is announced
          aria-label={thumbLabels?.[index] ?? ariaLabel}
          aria-labelledby={thumbLabels?.[index] || ariaLabel ? undefined : ariaLabelledby}
          aria-valuetext={formatValue?.(thumbValue)}
          className="block size-5 shrink-0 rounded-full border border-primary bg-background shadow-glass transition-[color,box-shadow] motion-reduce:transition-none hover:ring-4 hover:ring-primary/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
