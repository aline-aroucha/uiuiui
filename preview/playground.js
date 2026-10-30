// UIUIUI docs: interactive example for each component page (preview + controls + generated code).
// Previews use the reference implementation in preview/uiuiui.js (window.UIUIUI).
(function () {
  var React = window.React, ReactDOM = window.ReactDOM, P = window.UIUIUI, h = React.createElement

  function attrs(props) {
    return Object.keys(props).filter(function (k) { return props[k] !== undefined && props[k] !== false && props[k] !== "" })
      .map(function (k) { return props[k] === true ? k : k + '="' + props[k] + '"' }).join(" ")
  }
  function tag(name, props, children, indent) {
    var pad = indent || "", a = attrs(props || {}), open = "<" + name + (a ? " " + a : "")
    if (children === undefined || children === "") return pad + open + " />"
    if (children.indexOf("\n") < 0 && children.indexOf("<") < 0) return pad + open + ">" + children + "</" + name + ">"
    return pad + open + ">\n" + children + "\n" + pad + "</" + name + ">"
  }
  function unless(value, fallback) { return value === fallback ? undefined : value }
  function imports(file, names) { return "import { " + names.join(", ") + ' } from "@/components/ui/' + file + '"\n\n' }

  // Overlays keep their open state in a small component of their own
  function DialogDemo(p) {
    var st = React.useState(false)
    return h(P.Dialog, { open: st[0], onOpenChange: st[1] },
      h(P.DialogTrigger, null, h(P.Button, { variant: "outline" }, p.title)),
      h(P.DialogContent, { showCloseButton: p.showCloseButton },
        h(P.DialogHeader, null, h(P.DialogTitle, null, p.title), p.description ? h(P.DialogDescription, null, p.description) : null),
        h(P.Field, { required: true }, h(P.FieldLabel, null, "Name"), h(P.FieldControl, null, h(P.Input, { defaultValue: "Maya Chen" }))),
        h(P.DialogFooter, null, h(P.DialogClose, null, h(P.Button, { variant: "ghost" }, "Cancel")), h(P.DialogClose, null, h(P.Button, null, "Save changes")))))
  }

  function AlertDialogDemo(p) {
    var st = React.useState(false)
    return h(P.AlertDialog, { open: st[0], onOpenChange: st[1] },
      h(P.AlertDialogTrigger, null, h(P.Button, { variant: p.actionVariant }, p.action)),
      h(P.AlertDialogContent, null,
        h(P.AlertDialogHeader, null, h(P.AlertDialogTitle, null, p.title), h(P.AlertDialogDescription, null, p.description)),
        h(P.AlertDialogFooter, null, h(P.AlertDialogCancel, null, "Cancel"), h(P.AlertDialogAction, { variant: p.actionVariant }, p.action))))
  }

  function SliderDemo(p) {
    var st = React.useState([40])
    return h(P.Card, { style: { width: "100%", maxWidth: 360 } }, h(P.CardContent, { style: { display: "grid", gap: 12 } },
      h("div", { className: "uiuiui-row", style: { justifyContent: "space-between" } }, h("label", { id: "vx-slider-label", htmlFor: "vx-slider", className: "uiuiui-label" }, p.label),
        h("span", { className: "uiuiui-muted", "aria-hidden": true }, st[0][0] + "%")),
      h(P.Slider, { id: "vx-slider", value: st[0], onValueChange: st[1], max: 100, step: Number(p.step), disabled: p.disabled, "aria-labelledby": "vx-slider-label", formatValue: function (n) { return n + "%" } })))
  }

  var sizes = ["sm", "default", "lg"]
  var configs = {
    Alert: {
      controls: [
        { name: "variant", type: "select", options: ["default", "destructive"], value: "default" },
        { name: "title", type: "text", value: "Sync complete" },
        { name: "description", type: "text", value: "1,240 orders imported from the ERP at 9:42 AM." }
      ],
      render: function (p) { return h(P.Alert, { variant: p.variant }, h(P.AlertTitle, null, p.title), h(P.AlertDescription, null, p.description)) },
      code: function (p) {
        return imports("alert", ["Alert", "AlertDescription", "AlertTitle"]) +
          tag("Alert", { variant: unless(p.variant, "default") }, tag("AlertTitle", {}, p.title, "  ") + "\n" + tag("AlertDescription", {}, p.description, "  "))
      }
    },
    AlertDialog: {
      controls: [
        { name: "title", type: "text", value: "Delete “Website redesign”?" },
        { name: "description", type: "text", value: "This permanently deletes the project and its 24 files. You can’t undo this." },
        { name: "action", type: "text", value: "Delete project" },
        { name: "actionVariant", type: "select", options: ["destructive", "default", "emphasis"], value: "destructive" }
      ],
      render: function (p) { return h(AlertDialogDemo, p) },
      code: function (p) {
        var v = p.actionVariant === "default" ? "" : ' variant="' + p.actionVariant + '"'
        return imports("button", ["Button"]) + imports("alert-dialog", ["AlertDialog", "AlertDialogAction", "AlertDialogCancel", "AlertDialogContent", "AlertDialogDescription", "AlertDialogFooter", "AlertDialogHeader", "AlertDialogTitle", "AlertDialogTrigger"]) +
          "<AlertDialog>\n  <AlertDialogTrigger asChild>\n    <Button" + v + ">" + p.action + "</Button>\n  </AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n" +
          "      <AlertDialogTitle>" + p.title + "</AlertDialogTitle>\n      <AlertDialogDescription>" + p.description + "</AlertDialogDescription>\n    </AlertDialogHeader>\n" +
          "    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction" + v + " onClick={deleteProject}>" + p.action + "</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>"
      }
    },
    Avatar: {
      controls: [
        { name: "fallback", type: "text", value: "MC" },
        { name: "alt", type: "text", value: "Maya Chen" }
      ],
      render: function (p) { return h(P.Avatar, { fallback: p.fallback, alt: p.alt }) },
      code: function (p) {
        return imports("avatar", ["Avatar", "AvatarFallback", "AvatarImage"]) +
          tag("Avatar", {}, tag("AvatarImage", { src: "/maya.jpg", alt: p.alt }, undefined, "  ") + "\n" + tag("AvatarFallback", {}, p.fallback, "  "))
      }
    },
    Badge: {
      controls: [
        { name: "children", type: "text", value: "✓ Paid" },
        { name: "variant", type: "select", options: ["default", "secondary", "outline", "destructive", "success", "warning", "highlight", "emphasis"], value: "success" }
      ],
      render: function (p) { return h(P.Badge, { variant: p.variant }, p.children) },
      code: function (p) { return imports("badge", ["Badge"]) + tag("Badge", { variant: unless(p.variant, "default") }, p.children) }
    },
    Button: {
      controls: [
        { name: "children", type: "text", value: "Save changes" },
        { name: "variant", type: "select", options: ["default", "highlight", "emphasis", "secondary", "outline", "ghost", "destructive", "link"], value: "default" },
        { name: "size", type: "select", options: sizes, value: "default" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) { return h(P.Button, { variant: p.variant, size: p.size, disabled: p.disabled }, p.children) },
      code: function (p) {
        return imports("button", ["Button"]) +
          tag("Button", { variant: unless(p.variant, "default"), size: unless(p.size, "default"), disabled: p.disabled }, p.children)
      }
    },
    Card: {
      controls: [
        { name: "title", type: "text", value: "Pro plan" },
        { name: "description", type: "text", value: "Billed monthly. Cancel anytime." },
        { name: "footer", type: "boolean", value: true }
      ],
      render: function (p) {
        return h(P.Card, { style: { maxWidth: 360, width: "100%" } },
          h(P.CardHeader, null, h(P.CardTitle, null, p.title), p.description ? h(P.CardDescription, null, p.description) : null),
          h(P.CardContent, null, "$18 per month, up to 10 members."),
          p.footer ? h(P.CardFooter, null, h(P.Button, { variant: "outline" }, "Compare plans"), h(P.Button, null, "Subscribe")) : null)
      },
      code: function (p) {
        var header = tag("CardTitle", {}, p.title, "    ") + (p.description ? "\n" + tag("CardDescription", {}, p.description, "    ") : "")
        var body = tag("CardHeader", {}, header, "  ") + "\n" + tag("CardContent", {}, "$18 per month, up to 10 members.", "  ")
        if (p.footer) body += "\n" + tag("CardFooter", {}, tag("Button", { variant: "outline" }, "Compare plans", "    ") + "\n" + tag("Button", {}, "Subscribe", "    "), "  ")
        return imports("card", ["Card", "CardContent", "CardDescription", "CardFooter", "CardHeader", "CardTitle"]) + tag("Card", {}, body)
      }
    },
    Checkbox: {
      controls: [
        { name: "label", type: "text", value: "Send me a weekly summary" },
        { name: "defaultChecked", type: "select", options: ["false", "true", "indeterminate"], value: "true" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        var checked = p.defaultChecked === "indeterminate" ? "indeterminate" : p.defaultChecked === "true"
        return h("div", { className: "uiuiui-inline" }, h(P.Checkbox, { id: "vx-cb", key: p.defaultChecked, defaultChecked: checked, disabled: p.disabled }), h(P.Label, { htmlFor: "vx-cb" }, p.label))
      },
      code: function (p) {
        var dc = p.defaultChecked === "indeterminate" ? 'defaultChecked="indeterminate"' : p.defaultChecked === "true" ? "defaultChecked" : ""
        var line = '  <Checkbox id="summary"' + (dc ? " " + dc : "") + (p.disabled ? " disabled" : "") + " />"
        return imports("checkbox", ["Checkbox"]) + 'import { Label } from "@/components/ui/label"\n\n' +
          '<div className="flex items-center gap-2">\n' + line + '\n  <Label htmlFor="summary">' + p.label + "</Label>\n</div>"
      }
    },
    Dialog: {
      controls: [
        { name: "title", type: "text", value: "Edit profile" },
        { name: "description", type: "text", value: "Changes show on your public page." },
        { name: "showCloseButton", type: "boolean", value: true }
      ],
      render: function (p) { return h(DialogDemo, p) },
      code: function (p) {
        return imports("button", ["Button"]) + imports("dialog", ["Dialog", "DialogClose", "DialogContent", "DialogDescription", "DialogFooter", "DialogHeader", "DialogTitle", "DialogTrigger"]) +
          "<Dialog>\n  <DialogTrigger asChild>\n    <Button variant=\"outline\">" + p.title + "</Button>\n  </DialogTrigger>\n" +
          "  <DialogContent" + (p.showCloseButton ? "" : " showCloseButton={false}") + ">\n    <DialogHeader>\n      <DialogTitle>" + p.title + "</DialogTitle>\n" +
          (p.description ? "      <DialogDescription>" + p.description + "</DialogDescription>\n" : "") +
          "    </DialogHeader>\n    {/* fields */}\n    <DialogFooter>\n      <DialogClose asChild>\n        <Button variant=\"ghost\">Cancel</Button>\n      </DialogClose>\n      <Button type=\"submit\">Save changes</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>"
      }
    },
    DropdownMenu: {
      controls: [
        { name: "subject", type: "text", value: "Q3 sales" },
        { name: "shortcuts", type: "boolean", value: true },
        { name: "destructive", type: "boolean", value: true }
      ],
      render: function (p) {
        return h(P.DropdownMenu, null,
          h(P.DropdownMenuTrigger, null, h(P.Button, { variant: "ghost", size: "icon", "aria-label": "More actions for " + p.subject }, h(P.Icon, { name: "ellipsis-horizontal" }))),
          h(P.DropdownMenuContent, null,
            h(P.DropdownMenuItem, null, h(P.Icon, { name: "pencil-square" }), "Edit", p.shortcuts ? h(P.DropdownMenuShortcut, null, "⌘E") : null),
            h(P.DropdownMenuItem, null, h(P.Icon, { name: "document-duplicate" }), "Duplicate", p.shortcuts ? h(P.DropdownMenuShortcut, null, "⌘D") : null),
            p.destructive ? h(P.DropdownMenuSeparator) : null,
            p.destructive ? h(P.DropdownMenuItem, { variant: "destructive" }, h(P.Icon, { name: "trash" }), "Delete") : null))
      },
      code: function (p) {
        var sc = function (k) { return p.shortcuts ? "\n      <DropdownMenuShortcut>⌘" + k + "</DropdownMenuShortcut>" : "" }
        return 'import { DocumentDuplicateIcon, EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"\n' + imports("button", ["Button"]) +
          imports("dropdown-menu", ["DropdownMenu", "DropdownMenuContent", "DropdownMenuItem"].concat(p.destructive ? ["DropdownMenuSeparator"] : []).concat(p.shortcuts ? ["DropdownMenuShortcut"] : []).concat(["DropdownMenuTrigger"])) +
          "<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant=\"ghost\" size=\"icon\" aria-label=\"More actions for " + p.subject + "\">\n      <EllipsisHorizontalIcon />\n    </Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent>\n" +
          "    <DropdownMenuItem onSelect={edit}>\n      <PencilSquareIcon />\n      Edit" + sc("E") + "\n    </DropdownMenuItem>\n" +
          "    <DropdownMenuItem onSelect={duplicate}>\n      <DocumentDuplicateIcon />\n      Duplicate" + sc("D") + "\n    </DropdownMenuItem>\n" +
          (p.destructive ? "    <DropdownMenuSeparator />\n    <DropdownMenuItem variant=\"destructive\" onSelect={confirmDelete}>\n      <TrashIcon />\n      Delete\n    </DropdownMenuItem>\n" : "") +
          "  </DropdownMenuContent>\n</DropdownMenu>"
      }
    },
    Field: {
      controls: [
        { name: "label", type: "text", value: "Email" },
        { name: "description", type: "text", value: "We send receipts here." },
        { name: "error", type: "text", value: "Enter an email like name@example.com." },
        { name: "required", type: "boolean", value: true },
        { name: "invalid", type: "boolean", value: true }
      ],
      render: function (p) {
        return h(P.Field, { required: p.required, invalid: p.invalid, style: { width: "100%", maxWidth: 360 } },
          h(P.FieldLabel, null, p.label),
          h(P.FieldControl, null, h(P.Input, { type: "email", defaultValue: "maya@" })),
          p.description ? h(P.FieldDescription, null, p.description) : null,
          h(P.FieldError, null, p.error))
      },
      code: function (p) {
        var inner = tag("FieldLabel", {}, p.label, "  ") + "\n" + tag("FieldControl", {}, tag("Input", { type: "email" }, undefined, "    "), "  ") +
          (p.description ? "\n" + tag("FieldDescription", {}, p.description, "  ") : "") + "\n" + tag("FieldError", {}, p.error, "  ")
        return imports("field", ["Field", "FieldControl", "FieldDescription", "FieldError", "FieldLabel"]) +
          'import { Input } from "@/components/ui/input"\n\n' + tag("Field", { required: p.required, invalid: p.invalid ? "{invalid}" : undefined }, inner).replace('invalid="{invalid}"', "invalid={invalid}")
      }
    },
    Input: {
      controls: [
        { name: "type", type: "select", options: ["text", "email", "search", "tel", "url"], value: "email" },
        { name: "placeholder", type: "text", value: "you@company.com" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        return h(P.Field, { required: true, style: { width: "100%", maxWidth: 360 } }, h(P.FieldLabel, null, "Email"),
          h(P.FieldControl, null, h(P.Input, { type: p.type, placeholder: p.placeholder, disabled: p.disabled })))
      },
      code: function (p) {
        return imports("field", ["Field", "FieldControl", "FieldLabel"]) + 'import { Input } from "@/components/ui/input"\n\n' +
          tag("Field", { required: true }, '  <FieldLabel>Email</FieldLabel>\n' + tag("FieldControl", {}, tag("Input", { type: unless(p.type, "text"), placeholder: p.placeholder, disabled: p.disabled }, undefined, "    "), "  "))
      }
    },
    Label: {
      controls: [{ name: "children", type: "text", value: "I accept the terms of service" }],
      render: function (p) { return h("div", { className: "uiuiui-inline" }, h(P.Checkbox, { id: "vx-terms", defaultChecked: true }), h(P.Label, { htmlFor: "vx-terms" }, p.children)) },
      code: function (p) {
        return imports("label", ["Label"]) + 'import { Checkbox } from "@/components/ui/checkbox"\n\n' +
          '<div className="flex items-center gap-2">\n  <Checkbox id="terms" defaultChecked />\n  <Label htmlFor="terms">' + p.children + "</Label>\n</div>"
      }
    },
    PasswordInput: {
      controls: [
        { name: "autoComplete", type: "select", options: ["current-password", "new-password"], value: "current-password" },
        { name: "showLabel", type: "text", value: "Show password" },
        { name: "hideLabel", type: "text", value: "Hide password" }
      ],
      render: function (p) {
        return h(P.Field, { required: true, style: { width: "100%", maxWidth: 420 } }, h(P.FieldLabel, null, "Password"),
          h(P.FieldControl, null, h(P.PasswordInput, { autoComplete: p.autoComplete, showLabel: p.showLabel, hideLabel: p.hideLabel, defaultValue: "correct-horse" })))
      },
      code: function (p) {
        return imports("password-input", ["PasswordInput"]) + 'import { Field, FieldControl, FieldLabel } from "@/components/ui/field"\n\n' +
          tag("Field", { required: true }, '  <FieldLabel>Password</FieldLabel>\n' + tag("FieldControl", {},
            tag("PasswordInput", { autoComplete: unless(p.autoComplete, "current-password"), showLabel: unless(p.showLabel, "Show password"), hideLabel: unless(p.hideLabel, "Hide password") }, undefined, "    "), "  "))
      }
    },
    Popover: {
      controls: [
        { name: "trigger", type: "text", value: "Share link" },
        { name: "title", type: "text", value: "Share link" },
        { name: "description", type: "text", value: "Anyone with the link can view this report." }
      ],
      render: function (p) {
        return h(P.Popover, null,
          h(P.PopoverTrigger, null, h(P.Button, { variant: "outline" }, p.trigger)),
          h(P.PopoverContent, null,
            h(P.PopoverHeader, null, h(P.PopoverTitle, null, p.title), p.description ? h(P.PopoverDescription, null, p.description) : null),
            h(P.PopoverClose, null, h(P.Button, { size: "sm" }, "Done"))))
      },
      code: function (p) {
        return imports("button", ["Button"]) + imports("popover", ["Popover", "PopoverClose", "PopoverContent", "PopoverDescription", "PopoverHeader", "PopoverTitle", "PopoverTrigger"]) +
          "<Popover>\n  <PopoverTrigger asChild>\n    <Button variant=\"outline\">" + p.trigger + "</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <PopoverHeader>\n      <PopoverTitle>" + p.title + "</PopoverTitle>\n" +
          (p.description ? "      <PopoverDescription>" + p.description + "</PopoverDescription>\n" : "") +
          "    </PopoverHeader>\n    <PopoverClose asChild>\n      <Button size=\"sm\">Done</Button>\n    </PopoverClose>\n  </PopoverContent>\n</Popover>"
      }
    },
    Progress: {
      controls: [
        { name: "label", type: "text", value: "Uploading q3-sales.csv" },
        { name: "value", type: "select", options: ["0", "25", "64", "100", "indeterminate"], value: "64" }
      ],
      render: function (p) {
        var v = p.value === "indeterminate" ? undefined : Number(p.value)
        return h(P.Card, { style: { width: "100%", maxWidth: 360 } }, h(P.CardContent, { style: { display: "grid", gap: 8 } },
          h("div", { className: "uiuiui-row", style: { justifyContent: "space-between" } }, h("span", { id: "vx-progress-label", style: { fontWeight: 500 } }, p.label),
            v === undefined ? null : h("span", { className: "uiuiui-muted" }, v + "%")),
          h(P.Progress, { value: v, "aria-labelledby": "vx-progress-label" })))
      },
      code: function (p) {
        var v = p.value === "indeterminate" ? "" : " value={" + p.value + "}"
        return imports("progress", ["Progress"]) + '<span id="upload-label">' + p.label + "</span>\n<Progress" + v + ' aria-labelledby="upload-label" />'
      }
    },
    RadioGroup: {
      controls: [
        { name: "label", type: "text", value: "Delivery speed" },
        { name: "defaultValue", type: "select", options: ["standard", "express", "overnight", "none"], value: "standard" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        var opt = function (v, l) { return h("div", { className: "uiuiui-inline", key: v }, h(P.RadioGroupItem, { value: v, id: "vx-speed-" + v, disabled: p.disabled }), h(P.Label, { htmlFor: "vx-speed-" + v }, l)) }
        return h(P.Card, null, h(P.CardContent, { style: { display: "grid", gap: 12 } },
          h("div", { id: "vx-speed-label", className: "uiuiui-label" }, p.label),
          h(P.RadioGroup, { key: p.defaultValue, defaultValue: p.defaultValue === "none" ? undefined : p.defaultValue, "aria-labelledby": "vx-speed-label" },
            opt("standard", "Standard"), opt("express", "Express"), opt("overnight", "Overnight"))))
      },
      code: function (p) {
        var item = function (v, l) { return '  <div className="flex items-center gap-2">\n    <RadioGroupItem value="' + v + '" id="' + v + '"' + (p.disabled ? " disabled" : "") + ' />\n    <Label htmlFor="' + v + '">' + l + "</Label>\n  </div>" }
        return imports("label", ["Label"]) + imports("radio-group", ["RadioGroup", "RadioGroupItem"]) +
          '<span id="speed-label" className="text-sm font-medium">' + p.label + "</span>\n<RadioGroup" + (p.defaultValue === "none" ? "" : ' defaultValue="' + p.defaultValue + '"') + ' aria-labelledby="speed-label">\n' +
          [item("standard", "Standard"), item("express", "Express"), item("overnight", "Overnight")].join("\n") + "\n</RadioGroup>"
      }
    },
    Select: {
      controls: [
        { name: "placeholder", type: "text", value: "Choose a country" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        return h(P.Field, { required: true, style: { width: "100%", maxWidth: 320 } }, h(P.FieldLabel, null, "Country"),
          h(P.FieldControl, null, h(P.Select, { disabled: p.disabled, defaultValue: "", options: [{ value: "", label: p.placeholder }, { value: "BR", label: "Brazil" }, { value: "CA", label: "Canada" }, { value: "US", label: "United States" }] })))
      },
      code: function (p) {
        return imports("select", ["Select", "SelectContent", "SelectItem", "SelectTrigger", "SelectValue"]) +
          'import { Field, FieldControl, FieldLabel } from "@/components/ui/field"\n\n' +
          tag("Field", { required: true }, "  <FieldLabel>Country</FieldLabel>\n" + tag("Select", { disabled: p.disabled },
            tag("FieldControl", {}, tag("SelectTrigger", {}, tag("SelectValue", { placeholder: p.placeholder }, undefined, "        "), "      "), "    ") + "\n" +
            tag("SelectContent", {}, '      <SelectItem value="BR">Brazil</SelectItem>\n      <SelectItem value="CA">Canada</SelectItem>\n      <SelectItem value="US">United States</SelectItem>', "    "), "  "))
      }
    },
    Separator: {
      controls: [{ name: "orientation", type: "select", options: ["horizontal", "vertical"], value: "horizontal" }],
      render: function (p) {
        return p.orientation === "vertical"
          ? h("div", { className: "uiuiui-row", style: { height: 20 } }, "Profile", h(P.Separator, { orientation: "vertical" }), "Security", h(P.Separator, { orientation: "vertical" }), "Notifications")
          : h("div", { style: { width: "100%", maxWidth: 360 } }, h("div", { style: { fontWeight: 600 } }, "Account settings"), h(P.Separator, { style: { margin: "12px 0" } }), h("div", { className: "uiuiui-muted" }, "Profile, security and notifications."))
      },
      code: function (p) { return imports("separator", ["Separator"]) + tag("Separator", { orientation: unless(p.orientation, "horizontal") }) }
    },
    Skeleton: {
      controls: [{ name: "shape", type: "select", options: ["text", "avatar", "card"], value: "text" }],
      render: function (p) {
        var s = { text: { width: 220, height: 16 }, avatar: { width: 40, height: 40, borderRadius: 9999 }, card: { width: 280, height: 120, borderRadius: 12 } }[p.shape]
        return h("div", { className: "uiuiui-stage", style: { padding: 0 } }, h("span", { role: "status", className: "uiuiui-muted" }, "Loading orders…"), h(P.Skeleton, { style: s }))
      },
      code: function (p) {
        var c = { text: "h-4 w-56", avatar: "size-10 rounded-full", card: "h-30 w-72 rounded-xl" }[p.shape]
        return imports("skeleton", ["Skeleton"]) + '<div role="status" className="text-sm text-muted-foreground">Loading orders…</div>\n<Skeleton className="' + c + '" />'
      }
    },
    Slider: {
      controls: [
        { name: "label", type: "text", value: "Volume" },
        { name: "step", type: "select", options: ["1", "5", "10"], value: "5" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        return h(SliderDemo, p)
      },
      code: function (p) {
        return imports("slider", ["Slider"]) + '<label id="volume-label">' + p.label + "</label>\n<Slider\n  defaultValue={[40]}\n  max={100}\n  step={" + p.step + '}\n  aria-labelledby="volume-label"\n  formatValue={(n) => n + "%"}' + (p.disabled ? "\n  disabled" : "") + "\n/>"
      }
    },
    Spinner: {
      controls: [
        { name: "label", type: "text", value: "Loading orders" },
        { name: "inButton", type: "boolean", value: false }
      ],
      render: function (p) {
        return h(P.Card, null, h(P.CardContent, null, p.inButton
          ? h(P.Button, { disabled: true }, h(P.Spinner, { "aria-hidden": true }), p.label + "…")
          : h("div", { className: "uiuiui-inline" }, h(P.Spinner, { label: p.label }), h("span", { className: "uiuiui-muted", "aria-hidden": true }, p.label + "…"))))
      },
      code: function (p) {
        return imports("spinner", ["Spinner"]) + (p.inButton
          ? imports("button", ["Button"]) + "<Button disabled>\n  <Spinner aria-hidden />\n  " + p.label + "…\n</Button>"
          : '<Spinner label="' + p.label + '" />')
      }
    },
    Switch: {
      controls: [
        { name: "label", type: "text", value: "Email notifications" },
        { name: "defaultChecked", type: "boolean", value: true },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) { return h("div", { className: "uiuiui-inline" }, h(P.Switch, { id: "vx-sw", key: String(p.defaultChecked), defaultChecked: p.defaultChecked, disabled: p.disabled }), h(P.Label, { htmlFor: "vx-sw" }, p.label)) },
      code: function (p) {
        return imports("switch", ["Switch"]) + 'import { Label } from "@/components/ui/label"\n\n<div className="flex items-center gap-2">\n  <Switch id="notifications"' +
          (p.defaultChecked ? " defaultChecked" : "") + (p.disabled ? " disabled" : "") + ' />\n  <Label htmlFor="notifications">' + p.label + "</Label>\n</div>"
      }
    },
    Table: {
      controls: [
        { name: "caption", type: "text", value: "Orders, October 2026" },
        { name: "label", type: "text", value: "Orders" }
      ],
      render: function (p) {
        var rows = [["#4821", "Maya Chen", "$1,280.00"], ["#4822", "Leo Park", "$349.90"]]
        // Tables are content: they sit on a Card, never straight on color, imagery or glass
        return h(P.Card, { style: { width: "100%" } }, h(P.CardContent, null, h(P.Table, { label: p.label },
          h(P.TableCaption, null, p.caption),
          h(P.TableHeader, null, h(P.TableRow, null, h(P.TableHead, null, "Order"), h(P.TableHead, null, "Customer"), h(P.TableHead, { className: "num" }, "Amount"))),
          h(P.TableBody, null, rows.map(function (r) { return h(P.TableRow, { key: r[0] }, h(P.TableCell, null, r[0]), h(P.TableCell, null, r[1]), h(P.TableCell, { className: "num" }, r[2])) })))))
      },
      code: function (p) {
        var table = tag("Table", { label: p.label }, "  <TableCaption>" + p.caption + "</TableCaption>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Order</TableHead>\n      <TableHead>Customer</TableHead>\n      <TableHead className=\"text-right\">Amount</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    {orders.map((order) => (\n      <TableRow key={order.id}>\n        <TableCell>{order.id}</TableCell>\n        <TableCell>{order.customer}</TableCell>\n        <TableCell className=\"text-right font-mono tabular-nums\">{order.amount}</TableCell>\n      </TableRow>\n    ))}\n  </TableBody>").replace(/^/gm, "    ")
        return imports("card", ["Card", "CardContent"]) + imports("table", ["Table", "TableBody", "TableCaption", "TableCell", "TableHead", "TableHeader", "TableRow"]) +
          "<Card>\n  <CardContent>\n" + table + "\n  </CardContent>\n</Card>"
      }
    },
    Tabs: {
      controls: [{ name: "defaultValue", type: "select", options: ["general", "team", "billing"], value: "general" }],
      render: function (p) {
        return h(P.Tabs, { defaultValue: p.defaultValue, key: p.defaultValue },
          h(P.TabsList, null, h(P.TabsTrigger, { value: "general" }, "General"), h(P.TabsTrigger, { value: "team" }, "Team"), h(P.TabsTrigger, { value: "billing" }, "Billing")),
          h(P.TabsContent, { value: "general" }, "Company name, logo and time zone."),
          h(P.TabsContent, { value: "team" }, "8 members, 2 pending invites."),
          h(P.TabsContent, { value: "billing" }, "Next invoice on Nov 1, 2026."))
      },
      code: function (p) {
        return imports("tabs", ["Tabs", "TabsContent", "TabsList", "TabsTrigger"]) +
          tag("Tabs", { defaultValue: p.defaultValue }, '  <TabsList>\n    <TabsTrigger value="general">General</TabsTrigger>\n    <TabsTrigger value="team">Team</TabsTrigger>\n    <TabsTrigger value="billing">Billing</TabsTrigger>\n  </TabsList>\n  <TabsContent value="general">Company name, logo and time zone.</TabsContent>\n  <TabsContent value="team">8 members, 2 pending invites.</TabsContent>\n  <TabsContent value="billing">Next invoice on Nov 1, 2026.</TabsContent>')
      }
    },
    Textarea: {
      controls: [
        { name: "placeholder", type: "text", value: "E.g. deliver after 2 PM" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        return h(P.Field, { style: { width: "100%", maxWidth: 420 } }, h(P.FieldLabel, null, "Notes"),
          h(P.FieldControl, null, h(P.Textarea, { placeholder: p.placeholder, disabled: p.disabled })))
      },
      code: function (p) {
        return imports("textarea", ["Textarea"]) + 'import { Field, FieldControl, FieldLabel } from "@/components/ui/field"\n\n' +
          tag("Field", {}, "  <FieldLabel>Notes</FieldLabel>\n" + tag("FieldControl", {}, tag("Textarea", { placeholder: p.placeholder, disabled: p.disabled }, undefined, "    "), "  "))
      }
    },
    Toast: {
      controls: [
        { name: "message", type: "text", value: "Report archived" },
        { name: "description", type: "text", value: "" },
        { name: "type", type: "select", options: ["default", "success", "info", "warning", "error"], value: "default" },
        { name: "action", type: "boolean", value: true }
      ],
      render: function (p) {
        var show = function () {
          var opts = { description: p.description || undefined }
          if (p.action) { opts.action = { label: "Undo", onClick: function () { P.toast("Report restored") } }; opts.duration = 10000 }
          if (p.type === "default") P.toast(p.message, opts); else P.toast[p.type](p.message, opts)
        }
        return h("div", null, h(P.Toaster), h(P.Button, { variant: "outline", onClick: show }, "Show toast"))
      },
      code: function (p) {
        var fn = p.type === "default" ? "toast" : "toast." + p.type
        var opts = []
        if (p.description) opts.push('description: "' + p.description + '"')
        if (p.action) opts.push('action: { label: "Undo", onClick: restore }', "duration: 10000")
        return imports("toast", ["Toaster", "toast"]) + "// Once, near the root of the app\n<Toaster />\n\n// After the action\n" + fn + '("' + p.message + '"' +
          (opts.length ? ", {\n  " + opts.join(",\n  ") + ",\n}" : "") + ")"
      }
    },
    Toggle: {
      controls: [
        { name: "label", type: "text", value: "Bold" },
        { name: "variant", type: "select", options: ["default", "outline"], value: "default" },
        { name: "defaultPressed", type: "boolean", value: false }
      ],
      render: function (p) {
        return h(P.Toggle, { key: String(p.defaultPressed), "aria-label": p.label, variant: p.variant, defaultPressed: p.defaultPressed }, h(P.Icon, { name: "bold" }))
      },
      code: function (p) {
        return 'import { BoldIcon } from "@heroicons/react/16/solid"\n' + imports("toggle", ["Toggle"]) +
          tag("Toggle", { "aria-label": p.label, variant: unless(p.variant, "default"), defaultPressed: p.defaultPressed }, "  <BoldIcon />")
      }
    },
    ToggleGroup: {
      controls: [
        { name: "type", type: "select", options: ["single", "multiple"], value: "single" },
        { name: "label", type: "text", value: "View" }
      ],
      render: function (p) {
        return h(P.ToggleGroup, { key: p.type, type: p.type, defaultValue: p.type === "single" ? "list" : ["list"], "aria-label": p.label },
          h(P.ToggleGroupItem, { value: "list" }, h(P.Icon, { name: "list-bullet" }), "List"),
          h(P.ToggleGroupItem, { value: "grid" }, h(P.Icon, { name: "squares-2x2" }), "Grid"))
      },
      code: function (p) {
        return 'import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/16/solid"\n' + imports("toggle-group", ["ToggleGroup", "ToggleGroupItem"]) +
          '<ToggleGroup type="' + p.type + '" defaultValue=' + (p.type === "single" ? '"list"' : '{["list"]}') + ' aria-label="' + p.label + '">\n' +
          '  <ToggleGroupItem value="list">\n    <ListBulletIcon />\n    List\n  </ToggleGroupItem>\n  <ToggleGroupItem value="grid">\n    <Squares2X2Icon />\n    Grid\n  </ToggleGroupItem>\n</ToggleGroup>'
      }
    },
    Tooltip: {
      controls: [
        { name: "label", type: "text", value: "Download CSV" },
        { name: "icon", type: "select", options: ["arrow-down-tray", "pencil-square", "trash"], value: "arrow-down-tray" }
      ],
      render: function (p) {
        return h(P.Tooltip, null, h(P.TooltipTrigger, null, h(P.Button, { variant: "ghost", size: "icon", "aria-label": p.label }, h(P.Icon, { name: p.icon }))),
          h(P.TooltipContent, null, p.label))
      },
      code: function (p) {
        var icon = p.icon.replace(/(^|-)([a-z])/g, function (_, __, c) { return c.toUpperCase() }) + "Icon"
        return 'import { ' + icon + ' } from "@heroicons/react/16/solid"\n' + imports("button", ["Button"]) + imports("tooltip", ["Tooltip", "TooltipContent", "TooltipTrigger"]) +
          "// TooltipProvider wraps the app once\n<Tooltip>\n  <TooltipTrigger asChild>\n    <Button variant=\"ghost\" size=\"icon\" aria-label=\"" + p.label + "\">\n      <" + icon + " />\n    </Button>\n  </TooltipTrigger>\n  <TooltipContent>" + p.label + "</TooltipContent>\n</Tooltip>"
      }
    }
  }

  // Keep consecutive import lines together in the generated code
  Object.keys(configs).forEach(function (name) {
    var code = configs[name].code
    configs[name].code = function (p) { return code(p).replace(/\n\nimport/g, "\nimport") }
  })

  function control(c, value, onChange, uid) {
    var id = uid + "-" + c.name
    if (c.type === "boolean") {
      return h("div", { className: "vx-control vx-control--inline", key: c.name },
        h(P.Switch, { id: id, checked: value, onCheckedChange: onChange }), h(P.Label, { htmlFor: id, className: "vx-label" }, c.name))
    }
    var field = c.type === "select"
      ? h("div", { className: "uiuiui-select" }, h("select", { id: id, value: value, onChange: function (e) { onChange(e.target.value) } },
          c.options.map(function (o) { return h("option", { key: o, value: o }, o) })),
          h(P.Icon, { name: "chevron-down" }))
      : h("input", { id: id, className: "uiuiui-input", value: value, onChange: function (e) { onChange(e.target.value) } })
    return h("div", { className: "vx-control", key: c.name }, h(P.Label, { htmlFor: id, className: "vx-label" }, c.name), field)
  }

  function Playground(props) {
    var cfg = configs[props.name]
    var init = {}
    cfg.controls.forEach(function (c) { init[c.name] = c.value })
    var st = React.useState(init), values = st[0]
    var set = function (name) { return function (v) { var n = Object.assign({}, values); n[name] = v; st[1](n) } }
    var code = cfg.code(values)
    React.useEffect(function () { props.onCode(code) }, [code])
    return h(React.Fragment, null,
      h("div", { className: "vx-preview" }, cfg.render(values)),
      h("div", { role: "group", "aria-label": "Controls", className: "vx-controls" },
        cfg.controls.map(function (c) { return control(c, values[c.name], set(c.name), "vx-" + props.name) })))
  }

  document.querySelectorAll("[data-playground]").forEach(function (el) {
    var name = el.getAttribute("data-playground"), codeEl = el.querySelector(".vx-code code"), mount = el.querySelector(".vx-mount")
    if (!configs[name]) return
    ReactDOM.createRoot(mount).render(h(Playground, { name: name, onCode: function (code) { codeEl.textContent = code } }))
  })
})()
