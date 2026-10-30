/* @ds-bundle: {"format":4,"namespace":"UIUIUI","components":[{"name":"Button"},{"name":"Badge"},{"name":"Field"},{"name":"Input"},{"name":"PasswordInput"},{"name":"Textarea"},{"name":"Label"},{"name":"Select"},{"name":"Checkbox"},{"name":"Switch"},{"name":"Card"},{"name":"Alert"},{"name":"Tabs"},{"name":"Table"},{"name":"Separator"},{"name":"Skeleton"},{"name":"Avatar"},{"name":"Dialog"},{"name":"AlertDialog"},{"name":"Popover"},{"name":"Tooltip"},{"name":"DropdownMenu"},{"name":"Toast"},{"name":"Progress"},{"name":"Spinner"},{"name":"RadioGroup"},{"name":"Slider"},{"name":"Toggle"},{"name":"ToggleGroup"},{"name":"Combobox"},{"name":"DatePicker"},{"name":"FileUpload"},{"name":"Breadcrumb"},{"name":"Accordion"},{"name":"Pagination"},{"name":"EmptyState"},{"name":"Stepper"},{"name":"Sheet"}]} */
/* UIUIUI: lightweight reference implementation used only by the documentation previews.
   In products, install the real components with `npx @aline-aroucha/uiuiui add <name>`. */
(function () {
  var React = window.React, h = React.createElement;
  var ICONS = {"check": [{"d": "M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "minus": [{"d": "M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z", "fillRule": null, "clipRule": null}], "chevron-down": [{"d": "M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "exclamation-circle": [{"d": "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "eye": [{"d": "M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z", "fillRule": null, "clipRule": null}, {"d": "M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "eye-slash": [{"d": "M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z", "fillRule": "evenodd", "clipRule": "evenodd"}, {"d": "m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z", "fillRule": null, "clipRule": null}], "plus": [{"d": "M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z", "fillRule": null, "clipRule": null}], "play": [{"d": "M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z", "fillRule": null, "clipRule": null}], "x-mark": [{"d": "M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z", "fillRule": null, "clipRule": null}], "pencil-square": [{"d": "M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z", "fillRule": null, "clipRule": null}, {"d": "M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z", "fillRule": null, "clipRule": null}], "arrow-down-tray": [{"d": "M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z", "fillRule": null, "clipRule": null}, {"d": "M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z", "fillRule": null, "clipRule": null}], "trash": [{"d": "M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "ellipsis-horizontal": [{"d": "M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z", "fillRule": null, "clipRule": null}], "document-duplicate": [{"d": "M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z", "fillRule": null, "clipRule": null}, {"d": "M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z", "fillRule": null, "clipRule": null}], "chevron-right": [{"d": "M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "check-circle": [{"d": "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "information-circle": [{"d": "M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "exclamation-triangle": [{"d": "M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "x-circle": [{"d": "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "arrow-path": [{"d": "M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "bold": [{"d": "M3 3a1 1 0 0 1 1-1h5a3.5 3.5 0 0 1 2.843 5.541A3.75 3.75 0 0 1 9.25 14H4a1 1 0 0 1-1-1V3Zm2.5 3.5v-2H9a1 1 0 0 1 0 2H5.5Zm0 2.5v2.5h3.75a1.25 1.25 0 1 0 0-2.5H5.5Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "italic": [{"d": "M6.25 2.75A.75.75 0 0 1 7 2h6a.75.75 0 0 1 0 1.5h-2.483l-3.429 9H9A.75.75 0 0 1 9 14H3a.75.75 0 0 1 0-1.5h2.483l3.429-9H7a.75.75 0 0 1-.75-.75Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "underline": [{"d": "M4.75 2a.75.75 0 0 1 .75.75V7a2.5 2.5 0 0 0 5 0V2.75a.75.75 0 0 1 1.5 0V7a4 4 0 0 1-8 0V2.75A.75.75 0 0 1 4.75 2ZM2 13.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "list-bullet": [{"d": "M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z", "fillRule": null, "clipRule": null}], "squares-2x2": [{"d": "M3.5 2A1.5 1.5 0 0 0 2 3.5v2A1.5 1.5 0 0 0 3.5 7h2A1.5 1.5 0 0 0 7 5.5v-2A1.5 1.5 0 0 0 5.5 2h-2ZM3.5 9A1.5 1.5 0 0 0 2 10.5v2A1.5 1.5 0 0 0 3.5 14h2A1.5 1.5 0 0 0 7 12.5v-2A1.5 1.5 0 0 0 5.5 9h-2ZM9 3.5A1.5 1.5 0 0 1 10.5 2h2A1.5 1.5 0 0 1 14 3.5v2A1.5 1.5 0 0 1 12.5 7h-2A1.5 1.5 0 0 1 9 5.5v-2ZM10.5 9A1.5 1.5 0 0 0 9 10.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 12.5 9h-2Z", "fillRule": null, "clipRule": null}], "chevron-up-down": [{"d": "M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "calendar-days": [{"d": "M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z", "fillRule": null, "clipRule": null}, {"d": "M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "chevron-left": [{"d": "M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "document": [{"d": "M2.5 3.5A1.5 1.5 0 0 1 4 2h4.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12a1.5 1.5 0 0 1 .439 1.061V12.5A1.5 1.5 0 0 1 12 14H4a1.5 1.5 0 0 1-1.5-1.5v-9Z", "fillRule": null, "clipRule": null}], "arrow-up-tray": [{"d": "M7.25 10.25a.75.75 0 0 0 1.5 0V4.56l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.69Z", "fillRule": null, "clipRule": null}, {"d": "M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z", "fillRule": null, "clipRule": null}], "document-text": [{"d": "M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm1 5.75A.75.75 0 0 1 5.75 7h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 7.75Zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "magnifying-glass": [{"d": "M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z", "fillRule": "evenodd", "clipRule": "evenodd"}], "adjustments-horizontal": [{"d": "M6.5 2.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0V4.5h6.75a.75.75 0 0 0 0-1.5H6.5v-.75ZM11 6.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-.75h2.25a.75.75 0 0 0 0-1.5H11V6.5ZM5.75 10a.75.75 0 0 1 .75.75v.75h6.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM2.75 7.25H8.5v1.5H2.75a.75.75 0 0 1 0-1.5ZM4 3H2.75a.75.75 0 0 0 0 1.5H4V3ZM2.75 11.5H4V13H2.75a.75.75 0 0 1 0-1.5Z", "fillRule": null, "clipRule": null}]};
  function Icon(p) {
    return h('svg', { viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': true, 'data-slot': 'icon', className: p.className },
      ICONS[p.name].map(function (d, i) { return h('path', { key: i, d: d.d, fillRule: d.fillRule || undefined, clipRule: d.clipRule || undefined }); }));
  }
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(p, keys) { var o = {}; for (var k in p) if (keys.indexOf(k) < 0) o[k] = p[k]; return o; }
  function slot(tag, base) {
    return function (p) { return h(tag, Object.assign(omit(p, ['className']), { className: cx(base, p.className) })); };
  }

  function Button(p) {
    var v = p.variant || 'default', s = p.size || 'default';
    return h('button', Object.assign({ type: 'button' }, omit(p, ['variant', 'size', 'className']), {
      className: cx('uiuiui-btn', 'uiuiui-btn--' + v, 'uiuiui-btn--size-' + s, p.className) }));
  }
  function Badge(p) {
    return h('span', Object.assign(omit(p, ['variant', 'className']), { className: cx('uiuiui-badge', 'uiuiui-badge--' + (p.variant || 'default'), p.className) }));
  }
  var Input = function (p) { return h('input', Object.assign({ type: 'text' }, omit(p, ['className']), { className: cx('uiuiui-input', p.className) })); };
  var Textarea = slot('textarea', 'uiuiui-input uiuiui-textarea');
  var Label = slot('label', 'uiuiui-label');
  function Select(p) {
    var opts = (p.options || []).map(function (o) { return h('option', { key: o.value, value: o.value }, o.label); });
    return h('div', { className: cx('uiuiui-select', p.className) },
      h('select', omit(p, ['options', 'className']), opts),
      h(Icon, { name: 'chevron-down' }));
  }
  function useControlled(value, def, onChange) {
    var st = React.useState(def), cur = value !== undefined ? value : st[0];
    return [cur, function (n) { if (value === undefined) st[1](n); if (onChange) onChange(n); }];
  }
  function Checkbox(p) {
    var c = useControlled(p.checked, p.defaultChecked || false, p.onCheckedChange);
    return h('button', Object.assign(omit(p, ['checked', 'defaultChecked', 'onCheckedChange', 'className']), {
      type: 'button', role: 'checkbox', 'aria-checked': c[0] === 'indeterminate' ? 'mixed' : c[0],
      'data-state': c[0] === 'indeterminate' ? 'indeterminate' : c[0] ? 'checked' : 'unchecked',
      className: cx('uiuiui-checkbox', p.className), onClick: function () { if (!p.disabled) c[1](c[0] === 'indeterminate' ? true : !c[0]); } }),
      c[0] ? h(Icon, { name: c[0] === 'indeterminate' ? 'minus' : 'check' }) : null);
  }
  function Switch(p) {
    var c = useControlled(p.checked, !!p.defaultChecked, p.onCheckedChange);
    return h('button', Object.assign(omit(p, ['checked', 'defaultChecked', 'onCheckedChange', 'className']), {
      type: 'button', role: 'switch', 'aria-checked': c[0], 'data-state': c[0] ? 'checked' : 'unchecked',
      className: cx('uiuiui-switch', p.className), onClick: function () { if (!p.disabled) c[1](!c[0]); } }),
      h('span', { className: 'uiuiui-switch__thumb' }));
  }
  var Card = slot('div', 'uiuiui-card'), CardHeader = slot('div', 'uiuiui-card__header'), CardTitle = slot('div', 'uiuiui-card__title'),
      CardDescription = slot('div', 'uiuiui-card__description'), CardContent = slot('div', 'uiuiui-card__content'), CardFooter = slot('div', 'uiuiui-card__footer');
  function Alert(p) {
    return h('div', Object.assign({ role: p.variant === 'destructive' ? 'alert' : 'status' }, omit(p, ['variant', 'className']), { className: cx('uiuiui-alert', 'uiuiui-alert--' + (p.variant || 'default'), p.className) }));
  }
  var AlertTitle = slot('div', 'uiuiui-alert__title'), AlertDescription = slot('div', 'uiuiui-alert__description');
  var TabsCtx = React.createContext(null);
  function Tabs(p) {
    var c = useControlled(p.value, p.defaultValue, p.onValueChange);
    return h(TabsCtx.Provider, { value: c }, h('div', { className: cx('uiuiui-tabs', p.className) }, p.children));
  }
  function TabsList(p) { return h('div', { role: 'tablist', className: cx('uiuiui-tabs__list', p.className) }, p.children); }
  function TabsTrigger(p) {
    var c = React.useContext(TabsCtx), on = c[0] === p.value;
    return h('button', { type: 'button', role: 'tab', 'aria-selected': on, 'data-state': on ? 'active' : 'inactive', disabled: p.disabled,
      className: cx('uiuiui-tabs__trigger', p.className), onClick: function () { c[1](p.value); } }, p.children);
  }
  function TabsContent(p) {
    var c = React.useContext(TabsCtx);
    return c[0] === p.value ? h('div', { role: 'tabpanel', className: cx('uiuiui-tabs__content', p.className) }, p.children) : null;
  }
  function Table(p) {
    var ref = React.useRef(null), st = React.useState(false), scrollable = st[0];
    React.useEffect(function () {
      var el = ref.current; if (!el) return;
      var check = function () { st[1](el.scrollWidth > el.clientWidth); };
      check(); var ro = new ResizeObserver(check); ro.observe(el); return function () { ro.disconnect(); };
    }, []);
    var region = scrollable ? { tabIndex: 0, role: 'region', 'aria-label': p.label || 'Table' } : {};
    return h('div', Object.assign({ ref: ref, className: 'uiuiui-table-wrap' }, region), h('table', Object.assign(omit(p, ['className', 'label']), { className: cx('uiuiui-table', p.className) })));
  }
  var TableHeader = slot('thead', ''), TableBody = slot('tbody', ''), TableRow = slot('tr', ''), TableHead = function (p) { return h('th', Object.assign({ scope: 'col' }, p)); }, TableCell = slot('td', ''),
      TableCaption = slot('caption', 'uiuiui-table__caption');
  function Separator(p) {
    var o = p.orientation || 'horizontal';
    return h('div', { role: 'separator', 'aria-orientation': o, className: cx('uiuiui-separator', 'uiuiui-separator--' + o, p.className) });
  }
  var Skeleton = function (p) { return h('div', Object.assign({ 'aria-hidden': true }, omit(p, ['className']), { className: cx('uiuiui-skeleton', p.className) })); };
  function Avatar(p) {
    var st = React.useState(false);
    return h('span', { className: cx('uiuiui-avatar', p.className) },
      p.src && !st[0] ? h('img', { src: p.src, alt: p.alt || '', onError: function () { st[1](true); } })
        : h('span', { className: 'uiuiui-avatar__fallback', 'aria-label': p.alt }, p.fallback));
  }

  var FieldCtx = React.createContext(null);
  function Field(p) {
    var gen = 'field-' + React.useId().replace(/:/g, '');
    var id = p.controlId || gen, parts = React.useState({ description: false, error: false });
    var register = React.useCallback(function (part, on) { parts[1](function (cur) { if (cur[part] === on) return cur; var n = Object.assign({}, cur); n[part] = on; return n; }); }, []);
    var ctx = { id: id, invalid: !!p.invalid, required: !!p.required, parts: parts[0], register: register };
    return h(FieldCtx.Provider, { value: ctx }, h('div', Object.assign(omit(p, ['controlId', 'invalid', 'required', 'className']), { className: cx('uiuiui-field', p.className), 'data-invalid': p.invalid || undefined })));
  }
  function FieldLabel(p) {
    var f = React.useContext(FieldCtx);
    return h('label', { htmlFor: f.id, className: 'uiuiui-label' }, p.children, f.required ? null : h('span', { className: 'uiuiui-optional' }, ' (optional)'));
  }
  function FieldControl(p) {
    var f = React.useContext(FieldCtx), child = React.Children.only(p.children);
    var by = [f.parts.description && f.id + '-description', f.invalid && f.parts.error && f.id + '-error'].filter(Boolean).join(' ');
    return React.cloneElement(child, { id: child.props.id || f.id, required: f.required || undefined, 'aria-invalid': f.invalid || undefined, 'aria-describedby': by || undefined });
  }
  function FieldDescription(p) {
    var f = React.useContext(FieldCtx);
    React.useEffect(function () { f.register('description', true); return function () { f.register('description', false); }; }, []);
    return h('p', { id: f.id + '-description', className: 'uiuiui-field__description' }, p.children);
  }
  function FieldError(p) {
    var f = React.useContext(FieldCtx), visible = f.invalid && !!p.children;
    React.useEffect(function () { f.register('error', visible); return function () { f.register('error', false); }; }, [visible]);
    if (!visible) return null;
    return h('p', { id: f.id + '-error', className: 'uiuiui-field__error' },
      h(Icon, { name: 'exclamation-circle' }), h('span', null, p.children));
  }
  function PasswordInput(p) {
    var st = React.useState(false), visible = st[0];
    var rest = omit(p, ['showLabel', 'hideLabel']);
    return h('div', { className: 'uiuiui-password' },
      h(Input, Object.assign({ autoComplete: 'current-password' }, rest, { type: visible ? 'text' : 'password' })),
      h(Button, { variant: 'outline', 'aria-controls': p.id, onClick: function () { st[1](!visible); } },
        h(Icon, { name: visible ? 'eye-slash' : 'eye' }),
        visible ? (p.hideLabel || 'Hide password') : (p.showLabel || 'Show password')));
  }

  var api = { Icon: Icon, Field: Field, FieldLabel: FieldLabel, FieldControl: FieldControl, FieldDescription: FieldDescription, FieldError: FieldError, PasswordInput: PasswordInput, Button: Button, Badge: Badge, Input: Input, Textarea: Textarea, Label: Label, Select: Select, Checkbox: Checkbox,
    Switch: Switch, Card: Card, CardHeader: CardHeader, CardTitle: CardTitle, CardDescription: CardDescription, CardContent: CardContent,
    CardFooter: CardFooter, Alert: Alert, AlertTitle: AlertTitle, AlertDescription: AlertDescription, Tabs: Tabs, TabsList: TabsList,
    TabsTrigger: TabsTrigger, TabsContent: TabsContent, Table: Table, TableHeader: TableHeader, TableBody: TableBody, TableRow: TableRow,
    TableHead: TableHead, TableCell: TableCell, TableCaption: TableCaption, Separator: Separator, Skeleton: Skeleton, Avatar: Avatar };

  // Dialog: a native modal <dialog> (top layer, inert page behind, Esc), focus returned to the opener on close
  var DialogCtx = React.createContext(null), DialogPartsCtx = React.createContext({});
  function Dialog(p) {
    var c = useControlled(p.open, !!p.defaultOpen, p.onOpenChange);
    return h(DialogCtx.Provider, { value: { open: c[0], setOpen: c[1], dismissible: p.dismissible !== false } }, p.children);
  }
  function DialogTrigger(p) {
    var d = React.useContext(DialogCtx), child = React.Children.only(p.children);
    return React.cloneElement(child, { 'aria-haspopup': 'dialog', 'aria-expanded': d.open, onClick: function () { d.setOpen(true); } });
  }
  function DialogClose(p) {
    var d = React.useContext(DialogCtx), child = React.Children.only(p.children);
    return React.cloneElement(child, { onClick: function (e) { if (child.props.onClick) child.props.onClick(e); d.setOpen(false); } });
  }
  function DialogContent(p) {
    var d = React.useContext(DialogCtx), ref = React.useRef(null), opener = React.useRef(null);
    var id = 'dialog-' + React.useId().replace(/:/g, '');
    React.useEffect(function () {
      var el = ref.current; if (!el) return;
      if (d.open && !el.open) { opener.current = document.activeElement; el.showModal(); var first = el.querySelector('[data-autofocus]'); if (first) first.focus(); }
      if (!d.open && el.open) { el.close(); if (opener.current && opener.current.focus) opener.current.focus(); }
    }, [d.open]);
    return h('dialog', { ref: ref, className: cx('uiuiui-dialog', p.className), role: p.role, 'aria-labelledby': id + '-title', 'aria-describedby': id + '-description',
        onCancel: function (e) { e.preventDefault(); d.setOpen(false); },
        // Tab and Shift+Tab cycle inside the dialog instead of leaving for the browser's own controls
        onKeyDown: function (e) {
          if (e.key !== 'Tab') return;
          var f = Array.prototype.filter.call(ref.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'), function (el) { return !el.disabled && el.offsetParent !== null; });
          if (!f.length) return;
          var first = f.at(0), last = f.at(-1);
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        },
        onClick: function (e) { if (e.target === ref.current && d.dismissible) d.setOpen(false); } },
      h(DialogPartsCtx.Provider, { value: { id: id } },
        h('div', { className: 'uiuiui-dialog__body' }, p.children,
          p.showCloseButton === false ? null : h('button', { type: 'button', className: 'uiuiui-btn uiuiui-btn--ghost uiuiui-btn--size-icon-sm uiuiui-dialog__close', 'aria-label': p.closeLabel || 'Close', onClick: function () { d.setOpen(false); } },
            h(Icon, { name: 'x-mark' })))));
  }
  var DialogHeader = slot('div', 'uiuiui-dialog__header'), DialogFooter = slot('div', 'uiuiui-dialog__footer');
  function DialogTitle(p) { var c = React.useContext(DialogPartsCtx); return h('h2', { id: c.id + '-title', className: cx('uiuiui-dialog__title', p.className) }, p.children); }
  function DialogDescription(p) { var c = React.useContext(DialogPartsCtx); return h('p', { id: c.id + '-description', className: cx('uiuiui-dialog__description', p.className) }, p.children); }
  Object.assign(api, { Dialog: Dialog, DialogTrigger: DialogTrigger, DialogClose: DialogClose, DialogContent: DialogContent, DialogHeader: DialogHeader,
    DialogFooter: DialogFooter, DialogTitle: DialogTitle, DialogDescription: DialogDescription });

  // AlertDialog: the Dialog preview as role="alertdialog", no corner button, no outside-click close, focus on Cancel
  function AlertDialog(p) { return h(Dialog, Object.assign({}, p, { dismissible: false })); }
  var AlertDialogTrigger = DialogTrigger, AlertDialogHeader = DialogHeader, AlertDialogFooter = DialogFooter,
      AlertDialogTitle = DialogTitle, AlertDialogDescription = DialogDescription;
  function AlertDialogContent(p) { return h(DialogContent, { role: 'alertdialog', showCloseButton: false, className: p.className }, p.children); }
  function AlertDialogCancel(p) { return h(DialogClose, null, h(Button, { variant: p.variant || 'ghost', 'data-autofocus': true, onClick: p.onClick }, p.children)); }
  function AlertDialogAction(p) { return h(DialogClose, null, h(Button, { variant: p.variant || 'default', onClick: p.onClick }, p.children)); }
  Object.assign(api, { AlertDialog: AlertDialog, AlertDialogTrigger: AlertDialogTrigger, AlertDialogContent: AlertDialogContent, AlertDialogHeader: AlertDialogHeader,
    AlertDialogFooter: AlertDialogFooter, AlertDialogTitle: AlertDialogTitle, AlertDialogDescription: AlertDialogDescription,
    AlertDialogCancel: AlertDialogCancel, AlertDialogAction: AlertDialogAction });

  // Popover: opens on click or Enter/Space (never on hover), focus moves in, Esc / outside click / the trigger close it
  var PopoverCtx = React.createContext(null);
  function Popover(p) {
    var c = useControlled(p.open, !!p.defaultOpen, p.onOpenChange), root = React.useRef(null), trigger = React.useRef(null);
    var id = 'popover-' + React.useId().replace(/:/g, '');
    React.useEffect(function () {
      if (!c[0]) return;
      var away = function (e) { if (root.current && !root.current.contains(e.target)) c[1](false); };
      document.addEventListener('mousedown', away); return function () { document.removeEventListener('mousedown', away); };
    }, [c[0]]);
    return h(PopoverCtx.Provider, { value: { open: c[0], setOpen: c[1], id: id, trigger: trigger } }, h('span', { ref: root, className: 'uiuiui-popover' }, p.children));
  }
  function PopoverTrigger(p) {
    var c = React.useContext(PopoverCtx), child = React.Children.only(p.children);
    return h('span', { ref: c.trigger, style: { display: 'contents' } }, React.cloneElement(child, { 'aria-haspopup': 'dialog', 'aria-expanded': c.open, 'aria-controls': c.open ? c.id : undefined,
      onClick: function () { c.setOpen(!c.open); } }));
  }
  function popoverClose(c) { c.setOpen(false); var t = c.trigger.current && c.trigger.current.querySelector('button, a'); if (t) t.focus(); }
  function PopoverContent(p) {
    var c = React.useContext(PopoverCtx), ref = React.useRef(null);
    React.useEffect(function () {
      if (!c.open || !ref.current) return;
      var first = ref.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      (first || ref.current).focus();
    }, [c.open]);
    if (!c.open) return null;
    return h('div', { ref: ref, id: c.id, role: 'dialog', tabIndex: -1, 'aria-labelledby': c.id + '-title', className: cx('uiuiui-popover__content', p.className),
      onKeyDown: function (e) { if (e.key === 'Escape') { e.stopPropagation(); popoverClose(c); } } }, p.children);
  }
  function PopoverClose(p) {
    var c = React.useContext(PopoverCtx), child = React.Children.only(p.children);
    return React.cloneElement(child, { onClick: function () { popoverClose(c); } });
  }
  var PopoverHeader = slot('div', 'uiuiui-popover__header');
  function PopoverTitle(p) { var c = React.useContext(PopoverCtx); return h('div', { id: c.id + '-title', className: cx('uiuiui-popover__title', p.className) }, p.children); }
  var PopoverDescription = slot('p', 'uiuiui-popover__description');
  Object.assign(api, { Popover: Popover, PopoverTrigger: PopoverTrigger, PopoverContent: PopoverContent, PopoverClose: PopoverClose,
    PopoverHeader: PopoverHeader, PopoverTitle: PopoverTitle, PopoverDescription: PopoverDescription });

  // Tooltip: a short label shown on hover and on keyboard focus, linked with aria-describedby, dismissed with Esc
  function Tooltip(p) {
    var st = React.useState(false), id = 'tooltip-' + React.useId().replace(/:/g, '');
    var open = function () { st[1](true); }, close = function () { st[1](false); };
    var trigger = React.Children.toArray(p.children).find(function (c) { return c.type === TooltipTrigger; });
    var content = React.Children.toArray(p.children).find(function (c) { return c.type === TooltipContent; });
    var child = React.Children.only(trigger.props.children);
    return h('span', { className: 'uiuiui-tooltip', onMouseEnter: open, onMouseLeave: close },
      React.cloneElement(child, { 'aria-describedby': st[0] ? id : undefined, onFocus: open, onBlur: close,
        onKeyDown: function (e) { if (e.key === 'Escape') close(); } }),
      st[0] ? h('span', { id: id, role: 'tooltip', className: 'uiuiui-tooltip__content' }, content.props.children) : null);
  }
  function TooltipTrigger(p) { return p.children; }
  function TooltipContent(p) { return p.children; }
  function TooltipProvider(p) { return p.children; }
  Object.assign(api, { Tooltip: Tooltip, TooltipTrigger: TooltipTrigger, TooltipContent: TooltipContent, TooltipProvider: TooltipProvider });

  // DropdownMenu: an ARIA menu button. Enter/Space/ArrowDown open on the first item, arrows move, Home/End jump,
  // Enter/Space run the item, Esc closes, Tab leaves; focus goes back to the trigger
  var MenuCtx = React.createContext(null);
  function DropdownMenu(p) {
    var c = useControlled(p.open, !!p.defaultOpen, p.onOpenChange), root = React.useRef(null), trigger = React.useRef(null);
    var id = 'menu-' + React.useId().replace(/:/g, '');
    React.useEffect(function () {
      if (!c[0]) return;
      var away = function (e) { if (root.current && !root.current.contains(e.target)) c[1](false); };
      document.addEventListener('mousedown', away); return function () { document.removeEventListener('mousedown', away); };
    }, [c[0]]);
    var close = function (refocus) { c[1](false); if (refocus) { var t = trigger.current && trigger.current.querySelector('button'); if (t) t.focus(); } };
    return h(MenuCtx.Provider, { value: { open: c[0], setOpen: c[1], close: close, id: id, trigger: trigger } }, h('span', { ref: root, className: 'uiuiui-popover' }, p.children));
  }
  function DropdownMenuTrigger(p) {
    var c = React.useContext(MenuCtx), child = React.Children.only(p.children);
    return h('span', { ref: c.trigger, style: { display: 'contents' } }, React.cloneElement(child, { id: c.id + '-trigger', 'aria-haspopup': 'menu', 'aria-expanded': c.open,
      'aria-controls': c.open ? c.id : undefined, onClick: function () { c.setOpen(!c.open); },
      onKeyDown: function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); c.setOpen(true); } } }));
  }
  function menuItems(el) { return Array.prototype.filter.call(el.querySelectorAll('[role^="menuitem"]'), function (i) { return i.getAttribute('aria-disabled') !== 'true'; }); }
  function DropdownMenuContent(p) {
    var c = React.useContext(MenuCtx), ref = React.useRef(null);
    React.useEffect(function () { if (c.open && ref.current) { var f = menuItems(ref.current).at(0); if (f) f.focus(); } }, [c.open]);
    if (!c.open) return null;
    return h('div', { ref: ref, id: c.id, role: 'menu', 'aria-labelledby': c.id + '-trigger', className: cx('uiuiui-menu', p.className),
      onKeyDown: function (e) {
        var items = menuItems(ref.current), i = items.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); items.at((i + 1) % items.length).focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); items.at((i - 1 + items.length) % items.length).focus(); }
        else if (e.key === 'Home') { e.preventDefault(); items.at(0).focus(); }
        else if (e.key === 'End') { e.preventDefault(); items.at(-1).focus(); }
        else if (e.key === 'Escape') { e.preventDefault(); c.close(true); }
        else if (e.key === 'Tab') { c.close(false); }
      } }, p.children);
  }
  function DropdownMenuItem(p) {
    var c = React.useContext(MenuCtx);
    var run = function () { if (p.disabled) return; if (p.onSelect) p.onSelect(); c.close(true); };
    return h('div', { role: 'menuitem', tabIndex: -1, 'aria-disabled': p.disabled || undefined, 'data-variant': p.variant || 'default', className: cx('uiuiui-menu__item', p.className),
      onClick: run, onMouseEnter: function (e) { e.currentTarget.focus(); },
      onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(); } } }, p.children);
  }
  function DropdownMenuCheckboxItem(p) {
    var c = React.useContext(MenuCtx), v = useControlled(p.checked, !!p.defaultChecked, p.onCheckedChange);
    var run = function () { v[1](!v[0]); c.close(true); };
    return h('div', { role: 'menuitemcheckbox', 'aria-checked': v[0], tabIndex: -1, className: 'uiuiui-menu__item uiuiui-menu__item--inset', onClick: run, onMouseEnter: function (e) { e.currentTarget.focus(); },
      onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(); } } },
      h('span', { className: 'uiuiui-menu__indicator' }, v[0] ? h(Icon, { name: 'check' }) : null), p.children);
  }
  var DropdownMenuLabel = slot('div', 'uiuiui-menu__label'), DropdownMenuShortcut = slot('span', 'uiuiui-menu__shortcut');
  function DropdownMenuSeparator() { return h('div', { role: 'separator', className: 'uiuiui-menu__separator' }); }
  function DropdownMenuGroup(p) { return h('div', { role: 'group' }, p.children); }
  Object.assign(api, { DropdownMenu: DropdownMenu, DropdownMenuTrigger: DropdownMenuTrigger, DropdownMenuContent: DropdownMenuContent, DropdownMenuItem: DropdownMenuItem,
    DropdownMenuCheckboxItem: DropdownMenuCheckboxItem, DropdownMenuLabel: DropdownMenuLabel, DropdownMenuShortcut: DropdownMenuShortcut,
    DropdownMenuSeparator: DropdownMenuSeparator, DropdownMenuGroup: DropdownMenuGroup });

  // Toast: a polite live region in a corner. Messages never take focus, pause while hovered or focused, and an action
  // stays reachable with Tab while the toast is shown
  var toastListeners = [], toastSeq = 0;
  function toast(message, opts) {
    var t = Object.assign({ id: ++toastSeq, message: message, type: 'default', duration: 6000 }, opts || {});
    toastListeners.forEach(function (l) { l(t); }); return t.id;
  }
  ['success', 'info', 'warning', 'error'].forEach(function (type) { toast[type] = function (m, o) { return toast(m, Object.assign({}, o, { type: type })); }; });
  var TOAST_ICONS = { success: 'check-circle', info: 'information-circle', warning: 'exclamation-triangle', error: 'x-circle' };
  function ToastItem(p) {
    var t = p.toast, paused = React.useRef(false);
    React.useEffect(function () {
      var left = t.duration, last = Date.now();
      var timer = setInterval(function () { var now = Date.now(); if (!paused.current) left -= now - last; last = now; if (left <= 0) p.onDismiss(t.id); }, 200);
      return function () { clearInterval(timer); };
    }, []);
    var pause = function () { paused.current = true; }, resume = function () { paused.current = false; };
    return h('li', { className: 'uiuiui-toast', 'data-type': t.type, onMouseEnter: pause, onMouseLeave: resume, onFocus: pause, onBlur: resume },
      TOAST_ICONS[t.type] ? h('span', { className: 'uiuiui-toast__icon' }, h(Icon, { name: TOAST_ICONS[t.type] })) : null,
      h('div', { className: 'uiuiui-toast__text' }, h('div', { className: 'uiuiui-toast__title' }, t.message), t.description ? h('div', { className: 'uiuiui-toast__description' }, t.description) : null),
      t.action ? h('button', { type: 'button', className: 'uiuiui-btn uiuiui-btn--default uiuiui-btn--size-sm', onClick: function () { t.action.onClick(); p.onDismiss(t.id); } }, t.action.label) : null);
  }
  function Toaster() {
    // one toaster per page, like in an app: a second <Toaster> stays silent so messages don't show twice
    var st = React.useState([]), active = React.useState(false);
    React.useEffect(function () {
      if (toastListeners.length) return;
      var l = function (t) { st[1](function (list) { return list.concat([t]).slice(-3); }); };
      toastListeners.push(l); active[1](true); return function () { toastListeners.splice(toastListeners.indexOf(l), 1); };
    }, []);
    if (!active[0]) return null;
    var dismiss = function (id) { st[1](function (list) { return list.filter(function (t) { return t.id !== id; }); }); };
    return h('section', { 'aria-label': 'Notifications', className: 'uiuiui-toaster' },
      h('div', { role: 'status', 'aria-live': 'polite' }, h('ol', null, st[0].map(function (t) { return h(ToastItem, { key: t.id, toast: t, onDismiss: dismiss }); }))));
  }
  Object.assign(api, { Toast: Toaster, Toaster: Toaster, toast: toast });

  // Progress: role=progressbar with a name and a value; no value = indeterminate (no fake percentage)
  function Progress(p) {
    var on = p.value != null, max = p.max || 100;
    return h('div', { role: 'progressbar', 'aria-label': p['aria-label'], 'aria-labelledby': p['aria-labelledby'], 'aria-valuemin': 0, 'aria-valuemax': max,
        'aria-valuenow': on ? p.value : undefined, 'aria-valuetext': on ? Math.round(p.value / max * 100) + '%' : undefined,
        'data-state': on ? (p.value >= max ? 'complete' : 'loading') : 'indeterminate', className: cx('uiuiui-progress', p.className) },
      h('div', { className: 'uiuiui-progress__indicator', style: on ? { width: (p.value / max * 100) + '%' } : undefined }));
  }
  // Spinner: an icon that names the wait, or hides when visible text says it
  function Spinner(p) {
    var hidden = p['aria-hidden'];
    return h('span', { role: hidden ? undefined : 'status', 'aria-label': hidden ? undefined : (p.label || 'Loading'), 'aria-hidden': hidden || undefined,
      className: cx('uiuiui-spinner', p.className) }, h(Icon, { name: 'arrow-path' }));
  }
  Object.assign(api, { Progress: Progress, Spinner: Spinner });

  // RadioGroup: one Tab stop (the checked option, or the first); arrows move and select; Space selects
  var RadioCtx = React.createContext(null);
  function RadioGroup(p) {
    var c = useControlled(p.value, p.defaultValue, p.onValueChange), ref = React.useRef(null);
    var move = function (e) {
      var keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      var items = Array.prototype.filter.call(ref.current.querySelectorAll('[role=radio]'), function (i) { return !i.disabled; });
      var next = items.at((items.indexOf(document.activeElement) + keys[e.key] + items.length) % items.length);
      next.focus(); c[1](next.getAttribute('data-value'));
    };
    return h(RadioCtx.Provider, { value: { value: c[0], set: c[1], first: React.useRef(null) } },
      h('div', { ref: ref, role: 'radiogroup', 'aria-labelledby': p['aria-labelledby'], 'aria-label': p['aria-label'], 'aria-describedby': p['aria-describedby'],
        'aria-invalid': p['aria-invalid'], className: cx('uiuiui-radio-group', p.className), onKeyDown: move }, p.children));
  }
  function RadioGroupItem(p) {
    var c = React.useContext(RadioCtx), on = c.value === p.value;
    var reachable = on || (c.value == null && c.first.current == null && !p.disabled ? (c.first.current = p.value, true) : c.value == null && c.first.current === p.value);
    return h('button', { type: 'button', role: 'radio', id: p.id, 'aria-checked': on, 'data-state': on ? 'checked' : 'unchecked', 'data-value': p.value, disabled: p.disabled,
      tabIndex: reachable ? 0 : -1, className: 'uiuiui-radio', onClick: function () { c.set(p.value); },
      onKeyDown: function (e) { if (e.key === ' ') { e.preventDefault(); c.set(p.value); } } }, on ? h('span', { className: 'uiuiui-radio__dot' }) : null);
  }
  Object.assign(api, { RadioGroup: RadioGroup, RadioGroupItem: RadioGroupItem });

  // Slider (preview): a native range input, named, with the value and its unit read out
  function Slider(p) {
    var c = useControlled(p.value, p.defaultValue || [p.min || 0], p.onValueChange), v = c[0][0], min = p.min || 0, max = p.max == null ? 100 : p.max;
    return h('input', { type: 'range', className: cx('uiuiui-slider', p.className), id: p.id, min: min, max: max, step: p.step || 1, value: v, disabled: p.disabled,
      'aria-label': p['aria-label'], 'aria-labelledby': p['aria-labelledby'], 'aria-valuetext': p.formatValue ? p.formatValue(v) : undefined,
      style: { '--fill': ((v - min) / (max - min) * 100) + '%' }, onChange: function (e) { c[1]([Number(e.target.value)]); } });
  }
  Object.assign(api, { Slider: Slider });

  // Toggle: a button with aria-pressed. ToggleGroup: one Tab stop, arrows move focus, Space/Enter press;
  // type "single" works like radios (aria-checked), "multiple" like toggles (aria-pressed)
  function Toggle(p) {
    var c = useControlled(p.pressed, !!p.defaultPressed, p.onPressedChange);
    return h('button', { type: 'button', 'aria-pressed': c[0], 'aria-label': p['aria-label'], 'data-state': c[0] ? 'on' : 'off', disabled: p.disabled,
      className: cx('uiuiui-toggle', p.variant === 'outline' && 'uiuiui-toggle--outline', p.className), onClick: function () { c[1](!c[0]); } }, p.children);
  }
  var ToggleGroupCtx = React.createContext(null);
  function ToggleGroup(p) {
    var multiple = p.type === 'multiple', c = useControlled(p.value, p.defaultValue != null ? p.defaultValue : (multiple ? [] : ''), p.onValueChange), ref = React.useRef(null);
    var focusable = React.useRef(null);
    var move = function (e) {
      var keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      var items = Array.prototype.filter.call(ref.current.querySelectorAll('button'), function (b) { return !b.disabled; });
      items.at((items.indexOf(document.activeElement) + keys[e.key] + items.length) % items.length).focus();
    };
    return h(ToggleGroupCtx.Provider, { value: { multiple: multiple, value: c[0], set: c[1], focusable: focusable } },
      h('div', { ref: ref, role: multiple ? 'group' : 'radiogroup', 'aria-label': p['aria-label'], 'aria-labelledby': p['aria-labelledby'], className: cx('uiuiui-toggle-group', p.className), onKeyDown: move }, p.children));
  }
  function ToggleGroupItem(p) {
    var g = React.useContext(ToggleGroupCtx);
    var on = g.multiple ? g.value.indexOf(p.value) >= 0 : g.value === p.value;
    var first = g.focusable.current == null ? (g.focusable.current = p.value) : g.focusable.current;
    var stop = g.multiple ? first === p.value : (g.value ? on : first === p.value);
    var press = function () {
      if (g.multiple) g.set(on ? g.value.filter(function (v) { return v !== p.value; }) : g.value.concat([p.value]));
      else g.set(on ? '' : p.value);
    };
    var state = g.multiple ? { 'aria-pressed': on } : { role: 'radio', 'aria-checked': on };
    return h('button', Object.assign({ type: 'button', 'aria-label': p['aria-label'], 'data-state': on ? 'on' : 'off', tabIndex: stop ? 0 : -1, disabled: p.disabled,
      className: cx('uiuiui-toggle', p.className), onClick: press }, state), p.children);
  }
  Object.assign(api, { Toggle: Toggle, ToggleGroup: ToggleGroup, ToggleGroupItem: ToggleGroupItem });

  // Combobox (preview): the same editable combobox as the React component
  function Combobox(p) {
    var opts = p.options || [], c = useControlled(p.value, p.defaultValue || '', p.onValueChange);
    var selected = opts.find(function (o) { return o.value === c[0]; });
    var q = React.useState(selected ? selected.label : ''), open = React.useState(false), act = React.useState(-1), status = React.useState('');
    var id = p.id || ('combobox-' + React.useId().replace(/:/g, '')), listId = id + '-list';
    var filtered = selected && q[0] === selected.label ? opts : opts.filter(function (o) { return o.label.toLowerCase().indexOf(q[0].trim().toLowerCase()) >= 0; });
    React.useEffect(function () {
      if (!open[0]) { status[1](''); return; }
      var t = setTimeout(function () { status[1](filtered.length ? filtered.length + (filtered.length === 1 ? ' suggestion' : ' suggestions') : (p.emptyMessage || 'No matches')); }, 500);
      return function () { clearTimeout(t); };
    }, [open[0], q[0]]);
    var commit = function (o) { c[1](o.value); q[1](o.label); open[1](false); act[1](-1); };
    var close = function () { open[1](false); act[1](-1); };
    return h('div', { className: 'uiuiui-combobox' },
      h('input', { id: id, type: 'text', role: 'combobox', 'aria-expanded': open[0], 'aria-controls': listId, 'aria-autocomplete': 'list', autoComplete: 'off',
        'aria-activedescendant': open[0] && act[0] >= 0 ? listId + '-' + act[0] : undefined, 'aria-describedby': p['aria-describedby'], 'aria-invalid': p['aria-invalid'],
        required: p.required, placeholder: p.placeholder, value: q[0], className: 'uiuiui-input', disabled: p.disabled,
        onChange: function (e) { q[1](e.target.value); open[1](true); act[1](-1); if (c[0] && (!selected || e.target.value !== selected.label)) c[1](''); },
        onBlur: close,
        onKeyDown: function (e) {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault();
            if (!open[0]) { var cur = filtered.findIndex(function (o) { return o.value === c[0]; }); open[1](true); act[1](cur >= 0 ? cur : (e.key === 'ArrowDown' ? 0 : filtered.length - 1)); return; }
            var n = filtered.length, d = e.key === 'ArrowDown' ? 1 : -1; act[1](n ? (act[0] + d + n) % n : -1); }
          else if (e.key === 'Enter' && open[0] && act[0] >= 0 && filtered[act[0]]) { e.preventDefault(); commit(filtered[act[0]]); }
          else if (e.key === 'Escape') { if (open[0]) { e.preventDefault(); close(); } else if (selected) q[1](selected.label); }
          else if (e.key === 'Tab') close();
        } }),
      h('span', { className: 'uiuiui-combobox__icon', 'aria-hidden': true }, h(Icon, { name: 'chevron-up-down' })),
      open[0] ? h('ul', { id: listId, role: 'listbox', 'aria-label': p.listLabel || 'Suggestions', className: 'uiuiui-combobox__list' },
        filtered.length ? filtered.map(function (o, i) {
          return h('li', { key: o.value, id: listId + '-' + i, role: 'option', 'aria-selected': o.value === c[0], 'data-active': i === act[0] || undefined, className: 'uiuiui-combobox__option',
            onMouseDown: function (e) { e.preventDefault(); }, onMouseMove: function () { act[1](i); }, onClick: function () { commit(o); } },
            h('span', null, o.label), o.description ? h('span', { className: 'uiuiui-combobox__description' }, o.description) : null,
            o.value === c[0] ? h('span', { className: 'uiuiui-combobox__check' }, h(Icon, { name: 'check' })) : null);
        }) : h('li', { className: 'uiuiui-combobox__empty' }, p.emptyMessage || 'No matches')) : null,
      h('span', { role: 'status', className: 'sr-only' }, status[0]));
  }
  Object.assign(api, { Combobox: Combobox });

  // DatePicker (preview): the same typed field + calendar grid as the React component, with plain year-month-day values
  function dpPad(n) { return String(n).padStart(2, '0'); }
  function dpIso(d) { return d.y + '-' + dpPad(d.m) + '-' + dpPad(d.d); }
  function dpDays(y, m) { return new Date(Date.UTC(y, m, 0)).getUTCDate(); }
  function dpValid(d) { return d.m >= 1 && d.m <= 12 && d.d >= 1 && d.d <= dpDays(d.y, d.m) ? d : null; }
  function dpFromIso(s) { var x = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return x ? dpValid({ y: +x[1], m: +x[2], d: +x[3] }) : null; }
  function dpUtc(d) { return new Date(Date.UTC(d.y, d.m - 1, d.d)); }
  function dpFromUtc(t) { return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; }
  function dpAddDays(d, n) { return dpFromUtc(new Date(dpUtc(d).getTime() + n * 864e5)); }
  function dpAddMonths(d, n) { var f = new Date(Date.UTC(d.y, d.m - 1 + n, 1)), y = f.getUTCFullYear(), m = f.getUTCMonth() + 1; return { y: y, m: m, d: Math.min(d.d, dpDays(y, m)) }; }
  function dpSame(a, b) { return !!a && !!b && a.y === b.y && a.m === b.m && a.d === b.d; }
  function dpFormat(d) { return dpPad(d.m) + '/' + dpPad(d.d) + '/' + d.y; }
  function dpParse(s) { var x = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(s); return x ? dpValid({ y: +x[3], m: +x[1], d: +x[2] }) : null; }
  var dpLong = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  var dpMonth = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  var dpShort = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  var DP_WEEK = [['Su', 'Sunday'], ['Mo', 'Monday'], ['Tu', 'Tuesday'], ['We', 'Wednesday'], ['Th', 'Thursday'], ['Fr', 'Friday'], ['Sa', 'Saturday']];
  function DatePicker(p) {
    var c = useControlled(p.value, p.defaultValue || '', p.onValueChange), sel = dpFromIso(c[0]);
    var now = new Date(), today = { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
    var text = React.useState(sel ? dpFormat(sel) : ''), open = React.useState(false), foc = React.useState(sel || today);
    var root = React.useRef(null), grid = React.useRef(null), btn = React.useRef(null), hid = 'dp-' + React.useId().replace(/:/g, '');
    var minD = dpFromIso(p.min), maxD = dpFromIso(p.max);
    var blocked = function (d) { var t = dpUtc(d).getTime(); return (minD && t < dpUtc(minD).getTime()) || (maxD && t > dpUtc(maxD).getTime()); };
    var close = function (refocus) { open[1](false); if (refocus && btn.current) btn.current.focus(); };
    var choose = function (d) { if (blocked(d)) return; text[1](dpFormat(d)); c[1](dpIso(d)); close(true); };
    var commitText = function () {
      if (!text[0].trim()) { c[1](''); return; }
      var d = dpParse(text[0]);
      if (!d || blocked(d)) { c[1](''); if (p.onInvalidInput) p.onInvalidInput(d ? 'range' : 'format', text[0]); return; }
      text[1](dpFormat(d)); c[1](dpIso(d));
    };
    React.useEffect(function () {
      if (!open[0]) return;
      var f = requestAnimationFrame(function () { var b = grid.current && grid.current.querySelector('[data-day="' + dpIso(foc[0]) + '"]'); if (b) b.focus(); });
      var away = function (e) { if (root.current && !root.current.contains(e.target)) close(false); };
      document.addEventListener('mousedown', away);
      return function () { cancelAnimationFrame(f); document.removeEventListener('mousedown', away); };
    }, [open[0], foc[0]]);
    var onKey = function (e) {
      var d = foc[0], dow = dpUtc(d).getUTCDay();
      var moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -dow, End: 6 - dow };
      if (e.key in moves) { e.preventDefault(); foc[1](dpAddDays(d, moves[e.key])); }
      else if (e.key === 'PageUp' || e.key === 'PageDown') { e.preventDefault(); foc[1](dpAddMonths(d, (e.key === 'PageUp' ? -1 : 1) * (e.shiftKey ? 12 : 1))); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(d); }
    };
    var f0 = { y: foc[0].y, m: foc[0].m, d: 1 }, lead = dpUtc(f0).getUTCDay(), cells = [];
    for (var i = 0; i < lead; i++) cells.push(null);
    for (var k = 1; k <= dpDays(f0.y, f0.m); k++) cells.push({ y: f0.y, m: f0.m, d: k });
    while (cells.length % 7) cells.push(null);
    var weeks = []; for (var w = 0; w < cells.length; w += 7) weeks.push(cells.slice(w, w + 7));
    var navBtn = function (label, icon, n) { return h('button', { type: 'button', 'aria-label': label, className: 'uiuiui-btn uiuiui-btn--ghost uiuiui-btn--size-icon-sm', onClick: function () { foc[1](dpAddMonths(foc[0], n)); } }, h(Icon, { name: icon })); };
    return h('div', { ref: root, className: 'uiuiui-datepicker' },
      h('input', { id: p.id, type: 'text', inputMode: 'numeric', placeholder: 'MM/DD/YYYY', autoComplete: 'off', className: 'uiuiui-input', value: text[0], disabled: p.disabled,
        'aria-describedby': p['aria-describedby'], 'aria-invalid': p['aria-invalid'], required: p.required,
        onChange: function (e) { text[1](e.target.value); }, onBlur: commitText, onKeyDown: function (e) { if (e.key === 'Enter') commitText(); } }),
      h('button', { ref: btn, type: 'button', className: 'uiuiui-datepicker__button', disabled: p.disabled, 'aria-haspopup': 'dialog', 'aria-expanded': open[0],
        'aria-label': sel ? 'Choose date, selected date is ' + dpShort.format(dpUtc(sel)) : 'Choose date',
        onClick: function () { if (!open[0]) foc[1](sel || dpParse(text[0]) || today); open[1](!open[0]); } }, h(Icon, { name: 'calendar-days' })),
      open[0] ? h('div', { role: 'dialog', 'aria-modal': true, 'aria-labelledby': hid, className: 'uiuiui-datepicker__panel',
          onKeyDown: function (e) {
            if (e.key === 'Escape') { e.stopPropagation(); close(true); }
            if (e.key === 'Tab') { var fs = e.currentTarget.querySelectorAll('button:not([tabindex="-1"])'), first = fs[0], last = fs[fs.length - 1];
              if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
          } },
        h('div', { className: 'uiuiui-datepicker__head' }, navBtn('Previous month', 'chevron-left', -1), h('h2', { id: hid, 'aria-live': 'polite', className: 'uiuiui-datepicker__month' }, dpMonth.format(dpUtc(f0))), navBtn('Next month', 'chevron-right', 1)),
        h('table', { ref: grid, role: 'grid', 'aria-labelledby': hid, className: 'uiuiui-datepicker__grid', onKeyDown: onKey },
          h('thead', null, h('tr', null, DP_WEEK.map(function (x) { return h('th', { key: x[1], scope: 'col', abbr: x[1] }, x[0]); }))),
          h('tbody', null, weeks.map(function (wk, wi) { return h('tr', { key: wi }, wk.map(function (d, di) {
            if (!d) return h('td', { key: di });
            var cls = cx('uiuiui-datepicker__day', dpSame(d, today) && 'is-today', dpSame(d, sel) && 'is-selected');
            return h('td', { key: di, 'aria-selected': dpSame(d, sel) }, h('button', { type: 'button', 'data-day': dpIso(d), tabIndex: dpSame(d, foc[0]) ? 0 : -1, className: cls,
              'aria-label': dpLong.format(dpUtc(d)), 'aria-current': dpSame(d, today) ? 'date' : undefined, 'aria-disabled': blocked(d) || undefined,
              onClick: function () { foc[1](d); choose(d); } }, d.d));
          })); })))) : null);
  }
  Object.assign(api, { DatePicker: DatePicker });

  // FileUpload (preview): the same states and actions as the React component, with a simulated upload
  function fuSize(b) { return b < 1024 ? b + ' B' : b < 1048576 ? Math.round(b / 1024) + ' KB' : (b / 1048576).toFixed(1) + ' MB'; }
  function FileUpload(p) {
    var st = React.useState([]), items = st[0], ann = React.useState(''), drag = React.useState(false);
    var input = React.useRef(null), choose = React.useRef(null), list = React.useRef(null), timers = React.useRef({});
    var upd = function (id, patch) { st[1](function (l) { return l.map(function (x) { return x.id === id ? Object.assign({}, x, patch) : x; }); }); };
    var start = function (it) {
      upd(it.id, { state: 'uploading', progress: 0, message: '' });
      var pct = 0, fail = /fail/i.test(it.name);
      timers.current[it.id] = setInterval(function () {
        pct += 20; if (fail && pct >= 60) { clearInterval(timers.current[it.id]); upd(it.id, { state: 'failed', message: 'Upload failed. Check your connection and try again.' }); ann[1](it.name + ' failed to upload'); return; }
        if (pct >= 100) { clearInterval(timers.current[it.id]); upd(it.id, { state: 'uploaded', progress: 100 }); ann[1](it.name + ' uploaded'); return; }
        upd(it.id, { progress: pct });
      }, 600);
    };
    var add = function (files) {
      var kept = items.filter(function (x) { return x.state !== 'rejected'; }), added = [];
      Array.prototype.forEach.call(files, function (f) {
        var it = { id: f.name + '-' + f.size, name: f.name, size: f.size, state: 'uploading', progress: 0 };
        if (kept.concat(added).some(function (o) { return o.id === it.id; })) return;
        if (p.maxSize && f.size > p.maxSize) { it.state = 'rejected'; it.message = 'Not added: larger than ' + fuSize(p.maxSize) + '. Choose a smaller file.'; }
        else if (p.maxFiles && kept.length + added.filter(function (a) { return a.state !== 'rejected'; }).length >= p.maxFiles) { it.state = 'rejected'; it.message = 'Not added: you can add up to ' + p.maxFiles + ' files. Remove one first.'; }
        added.push(it);
      });
      if (!added.length) return;
      st[1](function (l) { return l.concat(added); });
      var ok = added.filter(function (x) { return x.state !== 'rejected'; }), rej = added.length - ok.length;
      ann[1]([ok.length ? (ok.length === 1 ? ok[0].name : ok.length + ' files') + ' added' : '', rej ? rej + ' not added' : ''].filter(Boolean).join(', '));
      setTimeout(function () { ok.forEach(start); }, 0);
    };
    var remove = function (it) {
      clearInterval(timers.current[it.id]);
      var idx = items.findIndex(function (x) { return x.id === it.id; });
      st[1](function (l) { return l.filter(function (x) { return x.id !== it.id; }); }); ann[1](it.name + ' removed');
      requestAnimationFrame(function () { var rows = list.current ? list.current.querySelectorAll('li') : []; var t = rows[idx] || rows[idx - 1];
        var b = t && t.querySelector('button'); (b || choose.current).focus(); });
    };
    var cancel = function (it) { clearInterval(timers.current[it.id]); upd(it.id, { state: 'ready', message: 'Upload canceled' }); ann[1](it.name + ' upload canceled'); };
    var icon = function (s) { return s === 'uploaded' ? 'check-circle' : (s === 'failed' || s === 'rejected') ? 'exclamation-circle' : 'document'; };
    var label = function (it) { return it.state === 'uploading' ? 'Uploading, ' + it.progress + '%' : it.state === 'uploaded' ? 'Uploaded' : it.state === 'ready' ? (it.message || 'Ready to upload') : it.message; };
    return h('div', { className: 'uiuiui-upload' },
      h('div', { className: 'uiuiui-upload__drop', 'data-dragging': drag[0] || undefined,
          onDragOver: function (e) { e.preventDefault(); drag[1](true); }, onDragLeave: function () { drag[1](false); }, onDrop: function (e) { e.preventDefault(); drag[1](false); add(e.dataTransfer.files); } },
        h('span', { className: 'uiuiui-upload__icon', 'aria-hidden': true }, h(Icon, { name: 'arrow-up-tray' })),
        h('button', { ref: choose, id: p.id, type: 'button', className: 'uiuiui-btn uiuiui-btn--outline', 'aria-describedby': p['aria-describedby'], 'aria-invalid': p['aria-invalid'],
          onClick: function () { input.current.click(); } }, p.chooseLabel || 'Choose files'),
        h('span', { 'aria-hidden': true }, p.dropLabel || 'or drop them here'),
        h('input', { ref: input, type: 'file', className: 'sr-only', tabIndex: -1, 'aria-hidden': true, accept: p.accept, multiple: p.multiple !== false,
          onChange: function (e) { add(e.target.files); e.target.value = ''; } })),
      items.length ? h('ul', { ref: list, 'aria-label': 'Files', className: 'uiuiui-upload__list' }, items.map(function (it) {
        var bad = it.state === 'failed' || it.state === 'rejected';
        return h('li', { key: it.id, className: 'uiuiui-upload__item' },
          h('div', { className: 'uiuiui-upload__row' },
            h('span', { className: cx('uiuiui-upload__status', 'is-' + it.state), 'aria-hidden': true }, h(Icon, { name: icon(it.state) })),
            h('div', { className: 'uiuiui-upload__text' }, h('span', { className: 'uiuiui-upload__name', title: it.name }, it.name),
              h('span', { className: cx('uiuiui-upload__meta', bad && 'is-error') }, fuSize(it.size) + ' · ' + label(it))),
            it.state === 'uploading' ? h('button', { type: 'button', className: 'uiuiui-btn uiuiui-btn--ghost uiuiui-btn--size-sm', 'aria-label': 'Cancel upload of ' + it.name, onClick: function () { cancel(it); } }, 'Cancel') : null,
            it.state === 'failed' ? h('button', { type: 'button', className: 'uiuiui-btn uiuiui-btn--ghost uiuiui-btn--size-icon-sm', 'aria-label': 'Try again: ' + it.name, onClick: function () { start(it); } }, h(Icon, { name: 'arrow-path' })) : null,
            it.state !== 'uploading' ? h('button', { type: 'button', className: 'uiuiui-btn uiuiui-btn--ghost uiuiui-btn--size-icon-sm', 'aria-label': 'Remove ' + it.name, onClick: function () { remove(it); } }, h(Icon, { name: 'x-mark' })) : null),
          it.state === 'uploading' ? h(Progress, { value: it.progress, 'aria-label': 'Uploading ' + it.name }) : null);
      })) : null,
      h('span', { role: 'status', className: 'sr-only' }, ann[0]));
  }
  Object.assign(api, { FileUpload: FileUpload });

  // Breadcrumb: a named nav landmark with an ordered list; separators are hidden; the current page is text with aria-current
  function Breadcrumb(p) { return h('nav', Object.assign({ 'aria-label': 'Breadcrumb' }, omit(p, ['className']), { className: cx('uiuiui-breadcrumb', p.className) })); }
  var BreadcrumbList = slot('ol', 'uiuiui-breadcrumb__list');
  var BreadcrumbItem = slot('li', 'uiuiui-breadcrumb__item');
  var BreadcrumbLink = slot('a', 'uiuiui-breadcrumb__link');
  function BreadcrumbPage(p) { return h('span', Object.assign({ 'aria-current': 'page' }, omit(p, ['className']), { className: cx('uiuiui-breadcrumb__page', p.className) })); }
  function BreadcrumbSeparator(p) { return h('li', { role: 'presentation', 'aria-hidden': true, className: cx('uiuiui-breadcrumb__separator', p.className) }, p.children || h(Icon, { name: 'chevron-right' })); }
  function BreadcrumbEllipsis(p) { return h('span', { role: 'presentation', 'aria-hidden': true, className: cx('uiuiui-breadcrumb__ellipsis', p.className) }, h(Icon, { name: 'ellipsis-horizontal' })); }
  Object.assign(api, { Breadcrumb: Breadcrumb, BreadcrumbList: BreadcrumbList, BreadcrumbItem: BreadcrumbItem, BreadcrumbLink: BreadcrumbLink,
    BreadcrumbPage: BreadcrumbPage, BreadcrumbSeparator: BreadcrumbSeparator, BreadcrumbEllipsis: BreadcrumbEllipsis });

  // Accordion: each title is a heading with a button (aria-expanded, aria-controls); closed panels are hidden, so they take no focus
  var AccordionCtx = React.createContext(null), AccordionItemCtx = React.createContext(null);
  function Accordion(p) {
    var multiple = p.type === 'multiple', c = useControlled(p.value, p.defaultValue != null ? p.defaultValue : (multiple ? [] : ''), p.onValueChange);
    return h(AccordionCtx.Provider, { value: { multiple: multiple, collapsible: p.collapsible, value: c[0], set: c[1] } },
      h('div', { className: cx('uiuiui-accordion', p.className) }, p.children));
  }
  function AccordionItem(p) {
    var a = React.useContext(AccordionCtx), id = React.useId();
    var open = a.multiple ? a.value.indexOf(p.value) >= 0 : a.value === p.value;
    var locked = open && !a.multiple && !a.collapsible;
    var toggle = function () {
      if (a.multiple) a.set(open ? a.value.filter(function (v) { return v !== p.value; }) : a.value.concat([p.value]));
      else if (!locked) a.set(open ? '' : p.value);
    };
    return h(AccordionItemCtx.Provider, { value: { open: open, locked: locked, toggle: toggle, id: id, disabled: p.disabled } },
      h('div', { 'data-state': open ? 'open' : 'closed', className: cx('uiuiui-accordion__item', p.className) }, p.children));
  }
  function AccordionTrigger(p) {
    var i = React.useContext(AccordionItemCtx);
    return h('h' + (p.level || 3), { className: 'uiuiui-accordion__heading' },
      h('button', { type: 'button', id: i.id + 'trigger', 'aria-expanded': i.open, 'aria-controls': i.id + 'panel', 'aria-disabled': i.locked || undefined,
        disabled: i.disabled, 'data-state': i.open ? 'open' : 'closed', className: cx('uiuiui-accordion__trigger', p.className), onClick: i.toggle },
        h('span', null, p.children), h(Icon, { name: 'chevron-down' })));
  }
  function AccordionContent(p) {
    var i = React.useContext(AccordionItemCtx);
    return h('div', { id: i.id + 'panel', role: 'region', 'aria-labelledby': i.id + 'trigger', hidden: !i.open, className: 'uiuiui-accordion__content' },
      h('div', { className: cx('uiuiui-accordion__body', p.className) }, p.children));
  }
  Object.assign(api, { Accordion: Accordion, AccordionItem: AccordionItem, AccordionTrigger: AccordionTrigger, AccordionContent: AccordionContent });

  // Pagination: a named nav with a list; href = link, no href = button; the current page has aria-current; Previous/Next can be unavailable
  function Pagination(p) { return h('nav', Object.assign({ 'aria-label': 'Pagination' }, omit(p, ['className']), { className: cx('uiuiui-pagination', p.className) })); }
  var PaginationContent = slot('ul', 'uiuiui-pagination__list');
  var PaginationItem = slot('li', 'uiuiui-pagination__item');
  function PaginationLink(p) {
    var num = typeof p.children === 'number' || /^\d+$/.test(String(p.children));
    var props = Object.assign(omit(p, ['isActive', 'disabled', 'size', 'className', 'href', 'onClick']), {
      'aria-current': p.isActive ? 'page' : undefined, 'aria-label': p['aria-label'] || (num ? 'Page ' + p.children : undefined),
      className: cx('uiuiui-btn', 'uiuiui-btn--' + (p.isActive ? 'outline' : 'ghost'), p.size === 'default' ? 'uiuiui-pagination__step' : 'uiuiui-pagination__page', p.isActive && 'uiuiui-pagination__current', p.className) });
    if (p.href !== undefined) return h('a', Object.assign(props, { href: p.disabled ? undefined : p.href, 'aria-disabled': p.disabled || undefined, onClick: p.disabled ? undefined : p.onClick }));
    return h('button', Object.assign(props, { type: 'button', disabled: p.disabled, onClick: p.onClick }));
  }
  function PaginationPrevious(p) { return h(PaginationLink, Object.assign({}, p, { size: 'default' }), h(Icon, { name: 'chevron-left' }), h('span', { className: 'uiuiui-pagination__word' }, p.children || 'Previous')); }
  function PaginationNext(p) { return h(PaginationLink, Object.assign({}, p, { size: 'default' }), h('span', { className: 'uiuiui-pagination__word' }, p.children || 'Next'), h(Icon, { name: 'chevron-right' })); }
  function PaginationEllipsis() { return h('span', { 'aria-hidden': true, className: 'uiuiui-pagination__ellipsis' }, h(Icon, { name: 'ellipsis-horizontal' })); }
  function paginationRange(page, total, siblings) {
    var s = siblings == null ? 1 : siblings, start = Math.max(2, page - s), end = Math.min(total - 1, page + s), out = [1];
    if (start > 2) out.push(start === 3 ? 2 : 'ellipsis');
    for (var n = start; n <= end; n++) out.push(n);
    if (end < total - 1) out.push(end === total - 2 ? total - 1 : 'ellipsis');
    if (total > 1) out.push(total);
    return out;
  }
  Object.assign(api, { Pagination: Pagination, PaginationContent: PaginationContent, PaginationItem: PaginationItem, PaginationLink: PaginationLink,
    PaginationPrevious: PaginationPrevious, PaginationNext: PaginationNext, PaginationEllipsis: PaginationEllipsis, paginationRange: paginationRange });

  // EmptyState: solid content with a decorative icon, a real heading, a description and the actions that fill the list
  function EmptyState(p) { return h('div', Object.assign(omit(p, ['className', 'variant']), { className: cx('uiuiui-empty', p.variant === 'outline' && 'uiuiui-empty--outline', p.className) })); }
  function EmptyStateMedia(p) { return h('div', { 'aria-hidden': true, className: cx('uiuiui-empty__media', p.className) }, p.children); }
  function EmptyStateTitle(p) { return h('h' + (p.level || 2), Object.assign(omit(p, ['className', 'level']), { className: cx('uiuiui-empty__title', p.className) })); }
  var EmptyStateHeader = slot('div', 'uiuiui-empty__header');
  var EmptyStateDescription = slot('p', 'uiuiui-empty__description');
  var EmptyStateActions = slot('div', 'uiuiui-empty__actions');
  Object.assign(api, { EmptyState: EmptyState, EmptyStateMedia: EmptyStateMedia, EmptyStateHeader: EmptyStateHeader, EmptyStateTitle: EmptyStateTitle, EmptyStateDescription: EmptyStateDescription, EmptyStateActions: EmptyStateActions });

  // Stepper: an ordered list of steps; the current one has aria-current="step"; completed and upcoming say so in words; a summary says "Step 2 of 4"
  function Stepper(p) {
    var steps = p.steps || [], at = Math.min(Math.max(p.current || 0, 0), steps.length - 1);
    return h('div', { id: p.id, className: cx('uiuiui-stepper', p.className) },
      h('ol', { 'aria-label': p.label || 'Progress', className: 'uiuiui-stepper__list' }, steps.map(function (s, i) {
        var state = i < at ? 'complete' : i === at ? 'current' : 'upcoming';
        var text = [s.label, state !== 'current' ? h('span', { key: 'sr', className: 'uiuiui-sr-only' }, state === 'complete' ? ', completed' : ', not completed') : null];
        return h('li', { key: s.label, 'data-state': state, 'aria-current': state === 'current' ? 'step' : undefined, className: 'uiuiui-stepper__step' },
          h('span', { 'aria-hidden': true, className: 'uiuiui-stepper__bar' }),
          h('span', { className: 'uiuiui-stepper__row' },
            h('span', { 'aria-hidden': true, className: 'uiuiui-stepper__marker' }, state === 'complete' ? h(Icon, { name: 'check' }) : i + 1),
            h('span', { className: 'uiuiui-stepper__label' }, state === 'complete' && s.href ? h('a', { href: s.href, className: 'uiuiui-stepper__link' }, text) : text)));
      })),
      h('p', { className: 'uiuiui-stepper__summary' }, h('strong', null, 'Step ' + (at + 1) + ' of ' + steps.length), ': ' + (steps[at] ? steps[at].label : '')));
  }
  Object.assign(api, { Stepper: Stepper });

  // Sheet: the Dialog (native modal <dialog>: top layer, inert page, Esc, Tab kept inside, focus returned) docked to one edge
  function SheetContent(p) { return h(DialogContent, Object.assign({}, p, { className: cx('uiuiui-sheet', 'uiuiui-sheet--' + (p.side || 'right'), p.className) })); }
  Object.assign(api, { Sheet: Dialog, SheetTrigger: DialogTrigger, SheetClose: DialogClose, SheetContent: SheetContent,
    SheetHeader: slot('div', 'uiuiui-dialog__header uiuiui-sheet__header'), SheetFooter: slot('div', 'uiuiui-sheet__footer'), SheetTitle: DialogTitle, SheetDescription: DialogDescription });
  window.UIUIUI = Object.assign(window.UIUIUI || {}, api);
})();
