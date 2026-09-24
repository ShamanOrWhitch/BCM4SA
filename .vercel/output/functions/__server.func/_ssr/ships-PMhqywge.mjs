import { o as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { _ as ChevronLeft, g as ChevronRight } from "../_libs/lucide-react.mjs";
import { a as CREW, c as SHIPS, d as SIZE_SPAN, g as displayName, l as SHIP_SIZES, p as STATUS_LABEL, u as SIZE_ABBR, v as formatSupply } from "./archive-Pt426J3v.mjs";
import { t as CrewPortrait } from "./portrait-CYjIPXWg.mjs";
import { t as AppChrome } from "./app-chrome-D-lJcqCf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ships-PMhqywge.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_TONE = {
	owned: "text-ok",
	garage: "text-ice",
	project: "text-brass",
	rent: "text-muted",
	watch: "text-faint"
};
function ShipsPage() {
	const [size, setSize] = (0, import_react.useState)("X-Small");
	const [lineId, setLineId] = (0, import_react.useState)("jetjet");
	const [hullId, setHullId] = (0, import_react.useState)("jetjet-1");
	const lines = (0, import_react.useMemo)(() => size === "all" ? SHIPS : SHIPS.filter((s) => s.size === size), [size]);
	const line = lineId ? lines.find((s) => s.id === lineId) ?? SHIPS.find((s) => s.id === lineId) ?? null : null;
	const hull = line?.hulls.find((h) => h.id === hullId) ?? line?.hulls[0] ?? null;
	function pickSize(next) {
		setSize(next);
		const list = next === "all" ? SHIPS : SHIPS.filter((x) => x.size === next);
		if (list.length === 1) {
			setLineId(list[0].id);
			setHullId(list[0].hulls[0]?.id ?? null);
		} else {
			setLineId(null);
			setHullId(null);
		}
	}
	function pickLine(id) {
		const s = SHIPS.find((x) => x.id === id);
		setLineId(id);
		setHullId(s?.hulls[0]?.id ?? null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppChrome, {
		current: "ships",
		kicker: "Galactic Market · официальные галереи",
		title: "Флот",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full min-h-0 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 gap-2 overflow-x-auto border-b border-line px-3 py-2 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeTab, {
					on: size === "all",
					onClick: () => pickSize("all"),
					label: "Все",
					hint: `${SHIPS.length}`
				}), SHIP_SIZES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeTab, {
					on: size === s,
					onClick: () => pickSize(s),
					label: SIZE_ABBR[s],
					hint: `${SIZE_SPAN[s]} · ${SHIPS.filter((x) => x.size === s).length}`
				}, s))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: !line ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, {
					lines,
					onPick: pickLine
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vessel, {
					line,
					hull,
					siblings: lines,
					onBack: () => setLineId(null),
					onPickLine: pickLine,
					onPickHull: setHullId
				})
			})]
		})
	});
}
function SizeTab({ on, onClick, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `flex h-11 shrink-0 flex-col items-center justify-center rounded-lg border px-3 font-display leading-none ${on ? "border-brass-dim bg-surface-2 text-fg" : "border-line text-muted hover:text-fg"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: label
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 font-mono text-[10px] text-faint",
			children: hint
		}) : null]
	});
}
function Catalog({ lines, onPick }) {
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-6 py-16 text-center text-muted",
		children: "В этом классе судов нет."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3 md:p-6",
		children: lines.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onPick(s.id),
			className: "flex w-full flex-col overflow-hidden rounded-xl border border-line bg-surface text-left hover:border-brass-dim",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: s.images[0],
				alt: "",
				className: "aspect-video w-full bg-surface-2 object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[10px] tracking-[0.14em] text-brass uppercase",
						children: [
							SIZE_ABBR[s.size],
							" · ",
							s.rarity,
							" · ",
							s.spec
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold",
						children: s.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `font-mono text-xs ${STATUS_TONE[s.status]}`,
						children: [
							s.count > 0 ? `×${s.count} · ` : "",
							STATUS_LABEL[s.status],
							" · ",
							s.crew,
							" экипаж"
						]
					})
				]
			})]
		}) }, s.id))
	});
}
function Vessel({ line, hull, siblings, onBack, onPickLine, onPickHull }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-5 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onBack,
					className: "flex h-11 items-center rounded-lg border border-line px-3 font-display text-sm text-muted hover:text-fg",
					children: "К каталогу"
				}), siblings.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPickLine(s.id),
					className: `flex h-11 items-center rounded-lg border px-3 font-display text-sm ${s.id === line.id ? "border-brass-dim bg-surface-2" : "border-line text-muted"}`,
					children: [s.name, s.count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-2 font-mono text-xs text-faint",
						children: ["×", s.count]
					}) : null]
				}, s.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-line bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketMeta, { line }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {
						images: line.images,
						alt: line.name
					}, line.id),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs tracking-[0.16em] text-brass uppercase",
								children: [
									line.maker,
									" · ",
									line.rarity,
									" · ",
									SIZE_ABBR[line.size],
									" ",
									line.spec
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex flex-wrap items-baseline gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl font-semibold",
									children: line.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `font-mono text-xs uppercase ${STATUS_TONE[line.status]}`,
									children: STATUS_LABEL[line.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: line.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										k: "Длина",
										v: line.length != null ? `${line.length} м` : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										k: "Экипаж",
										v: String(line.crew)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										k: "Бак",
										v: line.fuel != null ? String(line.fuel) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										k: "Скан",
										v: line.scan != null ? String(line.scan) : "—"
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-wide text-muted uppercase",
				children: "Штат маркета"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotList, { slots: line.crewSlots })] }),
			line.hulls.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-xs tracking-wide text-muted uppercase",
				children: ["Борта · выборка ", line.hulls.length]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3",
				children: line.hulls.map((h) => {
					const filled = h.seats.filter((s) => s.crewId).length;
					const on = hull?.id === h.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onPickHull(h.id),
						className: `flex h-auto min-h-16 w-full flex-col rounded-lg border px-3 py-3 text-left ${on ? "border-brass-dim bg-surface-2" : "border-line bg-surface hover:bg-surface-2/70"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-base font-medium",
							children: h.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-muted",
							children: [
								"слоты ",
								filled,
								"/",
								h.seats.length
							]
						})]
					}) }, h.id);
				})
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-faint",
				children: "В ангаре нет бортов. Витрина, не флот кромки."
			}),
			hull ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-medium",
					children: hull.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: hull.seats.map((seat, i) => {
						const crew = seat.crewId ? CREW.find((c) => c.id === seat.crewId) : null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-lg bg-surface-2 px-3 py-2",
							children: [crew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrewPortrait, {
								crew,
								size: "sm"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-10 rounded-md border border-dashed border-line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] text-faint uppercase",
									children: seat.role
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-display text-sm",
									children: crew ? displayName(crew) : "пусто"
								})]
							})]
						}, i);
					})
				})]
			}) : null
		]
	});
}
function MarketMeta({ line }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
		className: "grid grid-cols-4 gap-2 px-3 py-3 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
				k: "Class",
				v: SIZE_ABBR[line.size]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
				k: "Rarity",
				v: line.rarity.toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
				k: "Crew",
				v: String(line.crew)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
				k: "Supply",
				v: formatSupply(line.supply)
			})
		]
	});
}
function Meta({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "font-mono text-[10px] tracking-[0.16em] text-faint uppercase",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-display text-lg font-semibold leading-tight",
		children: v
	})] });
}
function Gallery({ images, alt }) {
	const [shot, setShot] = (0, import_react.useState)(0);
	const total = images.length;
	const src = images[shot] ?? images[0];
	function step(dir) {
		if (total < 2) return;
		setShot((i) => (i + dir + total) % total);
	}
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "ArrowRight") {
				e.preventDefault();
				step(1);
			} else if (e.key === "ArrowLeft") {
				e.preventDefault();
				step(-1);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [total]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-video overflow-hidden bg-surface-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: "absolute inset-0 size-full object-contain"
		}), total > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Предыдущий кадр",
			onClick: () => step(-1),
			className: "absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/80 text-fg backdrop-blur-sm hover:border-brass-dim",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Следующий кадр",
			onClick: () => step(1),
			className: "absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/80 text-fg backdrop-blur-sm hover:border-brass-dim",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
		})] }) : null]
	}), total > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2 px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex min-w-0 gap-2 overflow-x-auto pb-1",
			children: images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Кадр ${i + 1}`,
					onClick: () => setShot(i),
					className: `block h-11 w-16 overflow-hidden rounded-md border ${i === shot ? "border-brass" : "border-line opacity-70 hover:opacity-100"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: img,
						alt: "",
						loading: "lazy",
						className: "size-full object-cover"
					})
				})
			}, img))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center font-mono text-[10px] text-faint",
			children: "Стрелки ← → листают галерею"
		})]
	}) : null] });
}
function SlotList({ slots }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 flex flex-wrap gap-2",
		children: slots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-md border border-line bg-surface px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-wide text-faint uppercase",
				children: s.type
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-sm",
				children: ["×", s.n]
			})]
		}, s.type))
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface-2 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] text-faint uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-sm",
			children: v
		})]
	});
}
//#endregion
export { ShipsPage as component };
