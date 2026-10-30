"use client"

import * as React from "react"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// UIUIUI Sidebar (Magoo "Menu" and "Page regions"): the app's main navigation, a named <nav> landmark whose current item
// has aria-current="page". From 768px it is a column next to the content; below that the same links open in a Sheet from
// the left, through SidebarTrigger.

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  label: string
  setLabel: (label: string) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}
const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("Sidebar parts must be used inside <SidebarProvider>.")
  return context
}

function SidebarProvider({ className, ...props }: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)
  const [label, setLabel] = React.useState("Main")
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  // The sheet only exists on small screens: close it when the window grows past the breakpoint
  React.useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)")
    const close = () => wide.matches && setOpen(false)
    wide.addEventListener("change", close)
    return () => wide.removeEventListener("change", close)
  }, [])
  return (
    <SidebarContext.Provider value={{ open, setOpen, label, setLabel, triggerRef }}>
      <div data-slot="sidebar-provider" className={cn("flex min-h-svh w-full", className)} {...props} />
    </SidebarContext.Provider>
  )
}

function Sidebar({
  label = "Main",
  className,
  children,
  ...props
}: React.ComponentProps<"nav"> & {
  /** Names the navigation landmark ("Main"); it is also the title of the small-screen sheet. */
  label?: string
}) {
  const { open, setOpen, setLabel, triggerRef } = useSidebar()
  React.useEffect(() => setLabel(label), [label, setLabel])
  return (
    <>
      <nav
        aria-label={label}
        data-slot="sidebar"
        className={cn(
          "sticky top-0 hidden h-svh w-64 shrink-0 flex-col gap-4 overflow-y-auto border-r border-border bg-background p-4 md:flex",
          className
        )}
        {...props}
      >
        {children}
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          closeLabel={`Close ${label.toLowerCase()} navigation`}
          className="w-72 gap-0 p-0"
          // The sheet opens from SidebarTrigger, not a SheetTrigger: give focus back to it on close
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            triggerRef.current?.focus()
          }}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{label}</SheetTitle>
            <SheetDescription>Navigation</SheetDescription>
          </SheetHeader>
          <nav aria-label={label} data-slot="sidebar" data-mobile="true" className={cn("flex flex-col gap-4 p-4 pt-14", className)}>
            {children}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

function SidebarTrigger({ className, children, ...props }: React.ComponentProps<typeof Button>) {
  const { open, setOpen, label, triggerRef } = useSidebar()
  return (
    <Button
      ref={triggerRef}
      variant="ghost"
      size="icon"
      aria-label={props["aria-label"] ?? `Open ${label.toLowerCase()} navigation`}
      aria-haspopup="dialog"
      aria-expanded={open}
      data-slot="sidebar-trigger"
      className={cn("md:hidden", className)}
      onClick={() => setOpen(true)}
      {...props}
    >
      {children ?? <Bars3Icon className="size-6" />}
    </Button>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("flex flex-col gap-2 px-3", className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" className={cn("mt-auto flex flex-col gap-2", className)} {...props} />
}

function SidebarGroup({ label, className, children, ...props }: React.ComponentProps<"div"> & {
  /** Visible heading of the group; it names the list of links. */
  label?: string
}) {
  const id = React.useId()
  return (
    <div data-slot="sidebar-group" className={cn("flex flex-col gap-1", className)} {...props}>
      {label && (
        <p id={id} className="px-3 text-xs font-semibold text-muted-foreground">
          {label}
        </p>
      )}
      <ul aria-labelledby={label ? id : undefined} className="flex flex-col gap-1">
        {children}
      </ul>
    </div>
  )
}

function SidebarItem({
  href,
  active,
  icon,
  asChild,
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"a"> & {
  /** The page being shown: highlighted and announced as the current page. */
  active?: boolean
  /** A Heroicons Outline icon (24/outline), drawn at 20px. */
  icon?: React.ReactNode
  /** Render your router's link (Next.js Link) with the item styles. */
  asChild?: boolean
}) {
  const { setOpen } = useSidebar()
  const Comp = asChild ? Slot.Root : "a"
  return (
    <li>
      <Comp
        href={href}
        aria-current={active ? "page" : undefined}
        data-slot="sidebar-item"
        data-active={active || undefined}
        className={cn(
          buttonVariants({ variant: active ? "secondary" : "ghost" }),
          "h-auto min-h-9 w-full justify-start px-3 py-2 text-left whitespace-normal [&_svg]:size-5",
          active && "font-semibold",
          className
        )}
        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
          onClick?.(event)
          // Following a link closes the small-screen sheet
          setOpen(false)
        }}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </Comp>
    </li>
  )
}

export { Sidebar, SidebarFooter, SidebarGroup, SidebarHeader, SidebarItem, SidebarProvider, SidebarTrigger, useSidebar }
