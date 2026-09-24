import { o as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { f as Gem, l as Search, o as Star, s as SlidersHorizontal, t as X } from "../_libs/lucide-react.mjs";
import { C as mismatch, D as seats, E as saveStars, O as tensorTier, _ as flyOk, a as CREW, f as SPECIES, g as displayName, k as xpSpread, s as OFFICIAL, t as APTITUDES, w as packetOf, x as loadStars, y as hasApt } from "./archive-Pt426J3v.mjs";
import { t as CrewPortrait } from "./portrait-CYjIPXWg.mjs";
import { t as influenceFromRoster } from "./crew-score-lnBmlBxE.mjs";
import { t as AppChrome } from "./app-chrome-D-lJcqCf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crew-DVmEujYM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DIAMOND_ROWS = [
	{
		rarity: "Common",
		recipe: "1 major",
		trees: "1",
		xp: "+50%"
	},
	{
		rarity: "Uncommon",
		recipe: "1 major + 1 minor",
		trees: "2",
		xp: "+50 / +25"
	},
	{
		rarity: "Rare",
		recipe: "1 major + 2 minor",
		trees: "3",
		xp: "+50 / +25 / +25"
	},
	{
		rarity: "Epic",
		recipe: "2 major + 1 minor",
		trees: "3",
		xp: "+50 / +50 / +25"
	},
	{
		rarity: "Legendary",
		recipe: "3 major",
		trees: "3",
		xp: "+50 × 3"
	},
	{
		rarity: "Anomaly",
		recipe: "все minor или 2 major + 1 anomalous",
		trees: "много / 3",
		xp: "+25 все или +100"
	}
];
var XP_RATES = [
	{
		slot: "нет слота",
		rate: "×1.00",
		note: "база"
	},
	{
		slot: "minor",
		rate: "×1.25",
		note: "+25% XP"
	},
	{
		slot: "major",
		rate: "×1.50",
		note: "+50% XP"
	},
	{
		slot: "anomalous",
		rate: "×2.00",
		note: "+100% XP · только алмаз Anomaly"
	}
];
var STATIONS = [
	{
		apt: "Command",
		seats: "Admiral / Commander / Captain"
	},
	{
		apt: "Flight",
		seats: "Navigator / Pilot"
	},
	{
		apt: "Operator",
		seats: "орудия, дроны, риги"
	},
	{
		apt: "Engineering",
		seats: "Engineering Officer"
	},
	{
		apt: "Medical",
		seats: "Medical Officer"
	},
	{
		apt: "Science",
		seats: "Science Officer"
	},
	{
		apt: "Hospitality",
		seats: "камбуз, бар, сцена"
	},
	{
		apt: "Fitness",
		seats: "выносливость / пехота (слот позже)"
	}
];
function diamondRecipe(rarity) {
	return DIAMOND_ROWS.find((r) => r.rarity === rarity);
}
var EMPTY_QUERY = {
	q: "",
	aptitudes: [],
	slot: "any",
	official: [],
	tensor: [],
	species: [],
	nMax: 100,
	cMin: 0,
	flyOnly: false,
	mismatchOnly: false,
	house: null,
	sort: "tensor"
};
var PRESETS = [
	{
		id: "all",
		label: "Все",
		apply: EMPTY_QUERY
	},
	{
		id: "tensor-gold",
		label: "Tensor золото",
		apply: {
			...EMPTY_QUERY,
			tensor: ["anomaly", "legendary"],
			sort: "tensor"
		}
	},
	{
		id: "command",
		label: "Command",
		apply: {
			...EMPTY_QUERY,
			aptitudes: ["Command"],
			sort: "tensor"
		}
	},
	{
		id: "rare-gem",
		label: "Алмаз Rare",
		apply: {
			...EMPTY_QUERY,
			official: ["Rare"],
			sort: "tensor"
		}
	},
	{
		id: "jetjet",
		label: "Jetjet dual",
		apply: {
			...EMPTY_QUERY,
			aptitudes: ["Operator", "Flight"],
			sort: "n"
		}
	},
	{
		id: "medics",
		label: "Медики",
		apply: {
			...EMPTY_QUERY,
			aptitudes: ["Medical"],
			sort: "n"
		}
	},
	{
		id: "stick",
		label: "Штурвал",
		apply: {
			...EMPTY_QUERY,
			aptitudes: ["Flight"],
			flyOnly: true,
			nMax: 60,
			cMin: 30,
			sort: "n"
		}
	},
	{
		id: "gummi",
		label: "Гамми",
		apply: {
			...EMPTY_QUERY,
			species: ["High Punaab", "Profound Punaab"],
			sort: "n"
		}
	},
	{
		id: "ops",
		label: "Операторы",
		apply: {
			...EMPTY_QUERY,
			aptitudes: ["Operator"],
			sort: "n"
		}
	},
	{
		id: "floor",
		label: "Пол-раритет",
		apply: {
			...EMPTY_QUERY,
			mismatchOnly: true,
			sort: "tensor"
		}
	}
];
var OFFICIAL_RANK = {
	Anomaly: 0,
	Legendary: 1,
	Epic: 2,
	Rare: 3,
	Uncommon: 4,
	Common: 5
};
function filterCrew(query, list = CREW) {
	const needle = query.q.trim().toLowerCase();
	const out = list.filter((c) => {
		if (needle) {
			if (!`${displayName(c)} ${c.house ?? ""} ${c.university ?? ""} ${c.note ?? ""}`.toLowerCase().includes(needle)) return false;
		}
		if (query.aptitudes.length) {
			if (!query.aptitudes.every((a) => hasApt(c, a, query.slot === "any" ? void 0 : query.slot))) return false;
		}
		if (query.official.length && !query.official.includes(c.official)) return false;
		if (query.tensor.length) {
			const t = tensorTier(c.tensorRank);
			if (t === "unknown" || !query.tensor.includes(t)) return false;
		}
		if (query.species.length && !query.species.includes(c.species)) return false;
		if (c.n > query.nMax) return false;
		if (c.c < query.cMin) return false;
		if (query.flyOnly && !flyOk(c)) return false;
		if (query.mismatchOnly && !mismatch(c)) return false;
		if (query.house && c.house !== query.house) return false;
		return true;
	});
	out.sort((a, b) => {
		switch (query.sort) {
			case "official": return OFFICIAL_RANK[a.official] - OFFICIAL_RANK[b.official] || (a.tensorRank ?? 9e9) - (b.tensorRank ?? 9e9);
			case "n": return a.n - b.n;
			case "c": return b.c - a.c;
			case "name": return displayName(a).localeCompare(displayName(b));
			default: return (a.tensorRank ?? 9e9) - (b.tensorRank ?? 9e9);
		}
	});
	return out;
}
function houses() {
	return [...new Set(CREW.map((c) => c.house).filter(Boolean))];
}
var TIER_LABEL = {
	anomaly: "Anomaly",
	legendary: "Legendary",
	epic: "Epic",
	rare: "Rare",
	uncommon: "Uncommon",
	common: "Common",
	unknown: "—"
};
var TIER_CLASS = {
	anomaly: "text-tensor-anomaly",
	legendary: "text-tensor-legend",
	epic: "text-tensor-epic",
	rare: "text-tensor-rare",
	uncommon: "text-tensor-uncommon",
	common: "text-tensor-common",
	unknown: "text-faint"
};
var TIER_DOT = {
	anomaly: "bg-tensor-anomaly",
	legendary: "bg-tensor-legend",
	epic: "bg-tensor-epic",
	rare: "bg-tensor-rare",
	uncommon: "bg-tensor-uncommon",
	common: "bg-tensor-common",
	unknown: "bg-faint"
};
function CrewBay() {
	const [query, setQuery] = (0, import_react.useState)(EMPTY_QUERY);
	const [preset, setPreset] = (0, import_react.useState)("all");
	const [picked, setPicked] = (0, import_react.useState)(CREW[0]?.id ?? null);
	const [filtersOpen, setFiltersOpen] = (0, import_react.useState)(false);
	const [mobileDetail, setMobileDetail] = (0, import_react.useState)(false);
	const [diamondOpen, setDiamondOpen] = (0, import_react.useState)(false);
	const [stars, setStars] = (0, import_react.useState)(() => typeof window === "undefined" ? [] : loadStars());
	const rows = (0, import_react.useMemo)(() => filterCrew(query), [query]);
	const selected = rows.find((c) => c.id === picked) ?? rows[0] ?? null;
	function patch(p, presetId = "") {
		setQuery((q) => ({
			...q,
			...p
		}));
		setPreset(presetId);
	}
	function toggleStar(id) {
		setStars((prev) => {
			const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
			saveStars(next);
			return next;
		});
	}
	function toggleArr(list, value) {
		return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppChrome, {
		current: "crew",
		kicker: "Star Atlas · крио",
		title: `Экипаж · ${CREW.length}`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setDiamondOpen(true),
			className: "flex h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3 font-display text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gem, { className: "size-4 text-ice" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden sm:inline",
				children: "Алмаз"
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full min-h-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden w-72 shrink-0 flex-col gap-5 overflow-y-auto border-r border-line p-4 md:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, {
							query,
							patch,
							toggleArr
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex min-w-0 flex-1 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 flex-col gap-3 border-b border-line px-4 py-3 md:px-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "relative min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: query.q,
											onChange: (e) => patch({ q: e.target.value }),
											placeholder: "Имя, дом, университет",
											className: "h-11 w-full rounded-lg border border-line bg-surface pr-3 pl-10 text-sm text-fg outline-none placeholder:text-faint focus:border-brass-dim"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "flex h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3 font-display text-sm md:hidden",
										onClick: () => setFiltersOpen(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-brass" }), "Фильтр"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2 overflow-x-auto pb-1",
									children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setQuery({
												...EMPTY_QUERY,
												...p.apply
											});
											setPreset(p.id);
										},
										className: `h-11 shrink-0 rounded-full border px-3 font-display text-sm transition-colors duration-150 ${preset === p.id ? "border-brass-dim bg-surface-2 text-fg" : "border-line text-muted hover:text-fg"}`,
										children: p.label
									}, p.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs text-muted tabular-nums",
										children: [
											rows.length,
											" / ",
											CREW.length,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-faint",
												children: " · Tensor rank ↑ как на витрине"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 font-display text-sm text-muted",
										children: ["Сорт", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: query.sort,
											onChange: (e) => patch({ sort: e.target.value }),
											className: "h-11 rounded-md border border-line bg-surface px-2 text-fg",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "tensor",
													children: "Tensor #"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "official",
													children: "Алмаз XP"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "n",
													children: "N ↑ спокойные"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "c",
													children: "C ↓ чеклист"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "name",
													children: "Имя"
												})
											]
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1 overflow-y-auto p-3 md:p-4",
							children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-2 py-10 text-center text-muted",
								children: "Никого. Снимите фильтр."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3",
								children: rows.map((c) => {
									const t = tensorTier(c.tensorRank);
									const active = selected?.id === c.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setPicked(c.id);
											setMobileDetail(true);
										},
										className: `flex w-full flex-col gap-2 rounded-lg border px-3 py-3 text-left transition-colors duration-150 ${active ? "border-brass-dim bg-surface-2" : "border-line bg-surface hover:bg-surface-2/70"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrewPortrait, {
														crew: c,
														size: "sm"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0 flex-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "truncate font-display text-base font-medium",
															children: displayName(c)
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "truncate text-xs text-muted",
															children: [
																c.species.replace(" Punaab", ""),
																c.house ? ` · ${c.house}` : "",
																packetOf(c.id) ? ` · ${packetOf(c.id)}` : ""
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: `font-mono text-xs tabular-nums ${TIER_CLASS[t]}`,
														children: ["#", c.tensorRank?.toLocaleString("en") ?? "—"]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${TIER_DOT[t]}` }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `font-mono text-xs ${TIER_CLASS[t]}`,
														children: TIER_LABEL[t]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-faint",
														children: "/"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-ice",
														children: c.official
													}),
													mismatch(c) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-brass",
														children: "пол"
													}) : null,
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-mono text-xs text-faint",
														children: [
															"+",
															xpSpread(c),
															"%"
														]
													}),
													stars.includes(c.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-brass text-brass" }) : null
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-mono text-xs text-muted",
												children: c.aptitudes.map((a) => `${a.name} +${a.xp}%`).join(" · ")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-mono text-xs text-faint tabular-nums",
												children: [
													"N ",
													c.n,
													" · C ",
													c.c,
													flyOk(c) ? " · штурвал" : hasFlight(c) ? " · не штурвал" : ""
												]
											})
										]
									}) }, c.id);
								})
							})
						})]
					}),
					selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden w-80 shrink-0 overflow-y-auto border-l border-line lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							crew: selected,
							starred: stars.includes(selected.id),
							onStar: () => toggleStar(selected.id)
						})
					}) : null
				]
			}),
			filtersOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-30 bg-bg/70 md:hidden",
				onClick: () => setFiltersOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-14 max-h-[75vh] overflow-y-auto rounded-t-xl border border-line bg-surface p-4",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg",
							children: "Фильтры"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center",
							onClick: () => setFiltersOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, {
						query,
						patch,
						toggleArr
					})]
				})
			}) : null,
			mobileDetail && selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-20 bg-bg/70 lg:hidden",
				onClick: () => setMobileDetail(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-14 max-h-[80vh] overflow-y-auto rounded-t-xl border border-line bg-surface",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center",
							onClick: () => setMobileDetail(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
						crew: selected,
						starred: stars.includes(selected.id),
						onStar: () => toggleStar(selected.id)
					})]
				})
			}) : null,
			diamondOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiamondPanel, { onClose: () => setDiamondOpen(false) }) : null
		]
	});
}
function hasFlight(c) {
	return c.aptitudes.some((a) => a.name === "Flight");
}
function Filters({ query, patch, toggleArr }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-[0.18em] text-brass uppercase",
				children: "Две шкалы"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-snug text-muted",
				children: "Бирюзовый алмаз на play.staratlas — слоты XP, не цвет Tensor. Rare = три ветки. Сейчас в SAGE алмаз не качает урон."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tensor (цвет карты)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
					"anomaly",
					"legendary",
					"epic",
					"rare",
					"uncommon",
					"common"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
					on: query.tensor.includes(t),
					onClick: () => patch({ tensor: toggleArr(query.tensor, t) }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${TIER_DOT[t]}` }), TIER_LABEL[t]]
				}, t)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Алмаз XP",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: OFFICIAL.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: query.official.includes(r),
					onClick: () => patch({ official: toggleArr(query.official, r) }),
					children: r
				}, r)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				label: "Профессия",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: APTITUDES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: query.aptitudes.includes(a),
					onClick: () => patch({ aptitudes: toggleArr(query.aptitudes, a) }),
					children: a
				}, a)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex gap-1",
					children: [
						"any",
						"major",
						"minor"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						on: query.slot === s,
						onClick: () => patch({ slot: s }),
						children: s === "any" ? "любой слот" : s === "major" ? "+50%" : "+25%"
					}, s))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Раса",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: SPECIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: query.species.includes(s),
					onClick: () => patch({ species: toggleArr(query.species, s) }),
					children: s.replace(" Punaab", "")
				}, s)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Дом",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: houses().map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: query.house === h,
					onClick: () => patch({ house: query.house === h ? null : h }),
					children: h
				}, h)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: `Нервозность ≤ ${query.nMax}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: 100,
					value: query.nMax,
					onChange: (e) => patch({ nMax: Number(e.target.value) }),
					className: "w-full accent-brass"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: `Дисциплина ≥ ${query.cMin}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: 100,
					value: query.cMin,
					onChange: (e) => patch({ cMin: Number(e.target.value) }),
					className: "w-full accent-brass"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: query.flyOnly,
					onChange: (e) => patch({ flyOnly: e.target.checked })
				}), "Только штурвал (N≤60 C≥30 + Flight)"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: query.mismatchOnly,
					onChange: (e) => patch({ mismatchOnly: e.target.checked })
				}), "Пол-раритет: Common XP + золото/эпик Tensor"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-lg border border-line font-display text-sm text-muted hover:text-fg",
				onClick: () => patch(EMPTY_QUERY),
				children: "Сбросить"
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 font-display text-xs tracking-wide text-muted uppercase",
		children: label
	}), children] });
}
function ChipRow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children
	});
}
function Chip({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `flex h-8 items-center gap-1.5 rounded-full border px-2.5 font-display text-xs transition-colors duration-150 ${on ? "border-brass-dim bg-surface-2 text-fg" : "border-line text-muted hover:text-fg"}`,
		children
	});
}
function Detail({ crew, starred, onStar }) {
	const t = tensorTier(crew.tensorRank);
	const gem = diamondRecipe(crew.official);
	const influence = influenceFromRoster(crew);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrewPortrait, {
						crew,
						size: "lg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `font-mono text-xs ${TIER_CLASS[t]}`,
								children: [
									"Tensor #",
									crew.tensorRank?.toLocaleString("en") ?? "—",
									" · ",
									TIER_LABEL[t]
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display mt-1 text-2xl font-semibold leading-tight",
								children: displayName(crew)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									crew.species,
									" · ",
									crew.sex,
									crew.house ? ` · ${crew.house}` : ""
								]
							}),
							packetOf(crew.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xs text-brass",
								children: packetOf(crew.id)
							}) : null
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onStar,
					className: "flex size-11 items-center justify-center rounded-md border border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-4 ${starred ? "fill-brass text-brass" : "text-muted"}` })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-5 grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Алмаз",
						v: crew.official
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Рецепт",
						v: gem.recipe
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "XP spread",
						v: `+${xpSpread(crew)}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Ветки",
						v: String(crew.aptitudes.length)
					}),
					crew.university ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Универ",
						v: crew.university.replace(" University", "")
					}) : null,
					crew.age ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Возраст",
						v: String(crew.age)
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-xs tracking-wide text-muted uppercase",
				children: "Aptitudes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col gap-1",
				children: crew.aptitudes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between rounded-md bg-surface-2 px-3 py-2 font-mono text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: a.xp === 50 ? "text-brass" : "text-ice",
						children: [
							"+",
							a.xp,
							"%"
						]
					})]
				}, a.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-xs tracking-wide text-muted uppercase",
				children: "OCEAN"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-2 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "N нервы",
						value: crew.n,
						warn: crew.n >= 80,
						good: crew.n <= 30
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "C чеклист",
						value: crew.c,
						warn: crew.c <= 15,
						good: crew.c >= 75
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "O открытость",
						value: crew.o
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "E экстра",
						value: crew.e
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "A согласие",
						value: crew.a
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-xs tracking-wide text-muted uppercase",
				children: "На борт"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Задание",
						v: `${influence.mission}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Штурвал",
						v: `${influence.helm}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Корпус",
						v: `${influence.hull}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Сенсор",
						v: `${influence.scan}%`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-snug text-muted",
				children: influence.line
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-xs tracking-wide text-muted uppercase",
				children: "Слоты"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-sm text-ice",
				children: seats(crew).join(" · ") || "—"
			}),
			crew.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-snug text-muted",
				children: crew.note
			}) : null,
			mismatch(crew) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-snug text-brass",
				children: "Пол-раритет: Tensor выше алмаза. Так ловили кэпов с витрины."
			}) : null
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-surface-2 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs text-faint",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-sm",
			children: v
		})]
	});
}
function Bar({ label, value, warn, good }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex justify-between font-mono text-xs text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: value
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1 overflow-hidden rounded-full bg-surface-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full ${warn ? "bg-danger" : good ? "bg-ok" : "bg-ice"}`,
			style: { width: `${value}%` }
		})
	})] });
}
function DiamondPanel({ onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 bg-bg/70",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-x-0 bottom-14 max-h-[85vh] overflow-y-auto rounded-t-xl border border-line bg-surface md:inset-y-8 md:right-8 md:bottom-8 md:left-auto md:w-[32rem] md:rounded-xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-[0.18em] text-ice uppercase",
					children: "Официальный алмаз"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Слоты XP, не Tensor"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "flex size-11 items-center justify-center rounded-md border border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: "Бирюзовый камень на play.staratlas.com/crew — редкость минтинга. Она задаёт сколько веток aptitudes выпало и насколько быстро они качаются. Цвет карточки Tensor — другой рынок: слои костюма, не XP."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: "В SAGE сейчас все равны: алмаз не даёт урон. Заточит UE5 и станции корабля. Команда специально не делала pay-to-win статы — только больше деревьев."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-lg border border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left font-mono text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-surface-2 text-faint",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-display font-medium",
										children: "Алмаз"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-display font-medium",
										children: "Рецепт"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-display font-medium",
										children: "XP"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: DIAMOND_ROWS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-ice",
										children: r.rarity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-fg",
										children: r.recipe
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-brass",
										children: r.xp
									})
								]
							}, r.rarity)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 font-display text-xs tracking-wide text-muted uppercase",
						children: "Скорость кача"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-1",
						children: XP_RATES.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between rounded-md bg-surface-2 px-3 py-2 font-mono text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: x.slot
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: x.rate })]
						}, x.slot))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 font-display text-xs tracking-wide text-muted uppercase",
						children: "Станции"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-1",
						children: STATIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3 rounded-md px-1 py-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-fg",
								children: s.apt
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right text-muted",
								children: s.seats
							})]
						}, s.apt))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: "Перки с разных веток складываются на корабле, с убывающей отдачей. Поэтому Rare на три станции сильнее Common-специалиста: не пик одной ветки, а набор перков. Epic (два major) качает две роли быстрее Rare. Legendary — три major. Anomaly ломает таблицу: все minor или +100% на одну."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-brass",
						children: "Охота с пола: Tensor золото на алмазе Common — косметика. Охота кэпов: алмаз Rare с веткой Command. N и C алмаз не видит."
					})
				]
			})]
		})
	});
}
function CrewPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrewBay, {});
}
//#endregion
export { CrewPage as component };
