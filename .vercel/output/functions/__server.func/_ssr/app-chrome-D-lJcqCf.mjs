import { o as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { i as ArchivePanel, n as AppNav, r as ArchiveButton } from "./archive-Pt426J3v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-chrome-D-lJcqCf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppChrome({ current, kicker, title, actions, children }) {
	const [archive, setArchive] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-14 shrink-0 items-center gap-2 border-b border-line px-3 md:h-16 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-[10px] tracking-[0.22em] text-brass uppercase",
							children: kicker
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-lg font-semibold leading-tight md:text-2xl",
							children: title
						})]
					}),
					actions,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveButton, { onClick: () => setArchive(true) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppNav, { current })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-hidden",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppNav, {
					current,
					variant: "dock"
				})
			}),
			archive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchivePanel, { onClose: () => setArchive(false) }) : null
		]
	});
}
//#endregion
export { AppChrome as t };
