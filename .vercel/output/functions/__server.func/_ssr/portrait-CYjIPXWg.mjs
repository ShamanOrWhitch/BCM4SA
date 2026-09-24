import { m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portrait-CYjIPXWg.js
var import_jsx_runtime = require_jsx_runtime();
function portraitSrc(c) {
	const female = c.sex === "Female";
	return `/portraits/${{
		"High Punaab": female ? "high-punaab-female" : "high-punaab-male",
		"Profound Punaab": female ? "profound-punaab-female" : "profound-punaab-male",
		Sogmian: female ? "sogmian-female" : "sogmian-male",
		Human: female ? "human-female" : "human-male",
		Ustur: c.sex === "Body 2" ? "ustur-body2" : "ustur-body1",
		Mierese: female ? "mierese-female" : "mierese-male"
	}[c.species]}.jpg`;
}
function glyph(c) {
	if (c.ustur) return c.ustur.replace(".", "").slice(0, 2).toUpperCase();
	return (c.given[0] + (c.family[0] ?? c.given[1] ?? "")).toUpperCase();
}
function CrewPortrait({ crew, size = "md" }) {
	const dim = size === "lg" ? "size-20" : size === "sm" ? "size-10" : "size-12";
	const type = size === "lg" ? "text-xs" : "text-[9px]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `relative inline-flex shrink-0 overflow-hidden rounded-md bg-surface-2 ${dim}`,
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: portraitSrc(crew),
			alt: "",
			className: "size-full object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `absolute right-0 bottom-0 left-0 bg-bg/70 px-0.5 text-center font-display font-semibold tracking-wide text-fg ${type}`,
			children: glyph(crew)
		})]
	});
}
//#endregion
export { CrewPortrait as t };
