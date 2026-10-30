"use client"

import * as React from "react"
import { CheckCircleIcon, InformationCircleIcon, ArrowPathIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

// UIUIUI themes switch with the .dark class on <html>; the toaster follows it (no next-themes needed)
function useDarkClass() {
  const [dark, setDark] = React.useState(false)
  React.useEffect(() => {
    const root = document.documentElement
    const update = () => setDark(root.classList.contains("dark"))
    update()
    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])
  return dark
}

const Toaster = ({ toastOptions, ...props }: ToasterProps) => {
  const dark = useDarkClass()

  return (
    <Sonner
      theme={dark ? "dark" : "light"}
      className="toaster group"
      duration={6000}
      toastOptions={{
        ...toastOptions,
        classNames: {
          // dense glass for a floating message; ! wins over Sonner's own styles (background, and its faint focus shadow)
          toast: "glass-strong! shadow-glass! font-sans",
          description: "text-muted-foreground!",
          actionButton: "rounded-full! bg-primary! text-primary-foreground! font-medium! focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-ring!",
          cancelButton: "rounded-full! bg-transparent! text-foreground! font-medium! focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-ring!",
          closeButton: "glass-strong! text-foreground! focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-ring!",
          ...toastOptions?.classNames,
        },
      }}
      icons={{
        success: <CheckCircleIcon className="size-4 text-success" />,
        info: <InformationCircleIcon className="size-4" />,
        warning: <ExclamationTriangleIcon className="size-4 text-warning" />,
        error: <XCircleIcon className="size-4 text-destructive" />,
        loading: <ArrowPathIcon className="size-4 animate-spin motion-reduce:animate-none" />,
      }}
      style={
        {
          "--normal-bg": "var(--glass-strong)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--glass-border)",
          "--border-radius": "calc(var(--radius) + 4px)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, toast }
