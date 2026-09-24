import { o as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as AppChrome } from "./app-chrome-D-lJcqCf.mjs";
import { t as loadMarket } from "./desk-DTqQIkx-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-N-KFEEUq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function deltaPct(current, previous) {
	if (current == null || previous == null || previous === 0) return null;
	return (current - previous) / previous * 100;
}
var CLASS_LABEL = {
	consumable: "расходник",
	"raw material": "сырьё",
	component: "компонент",
	"compound material": "сплав",
	"material bundle": "набор",
	contracts: "контракт",
	data: "данные"
};
var FILTERS = [
	{
		id: "all",
		label: "все"
	},
	{
		id: "consumable",
		label: "расход"
	},
	{
		id: "raw material",
		label: "сырьё"
	},
	{
		id: "component",
		label: "компоненты"
	},
	{
		id: "compound material",
		label: "сплавы"
	},
	{
		id: "contracts",
		label: "контракты"
	}
];
var PINNED = [
	"Food",
	"Fuel",
	"Ammunition"
];
function fmtAtlas(n) {
	if (n == null) return "—";
	if (n >= 1) return n.toLocaleString("ru-RU", { maximumFractionDigits: 4 });
	return n.toLocaleString("ru-RU", { maximumFractionDigits: 6 });
}
function fmtUsd(n) {
	if (n == null) return "—";
	return `$${n.toLocaleString("en-US", { maximumFractionDigits: 6 })}`;
}
function fmtCompact(n) {
	if (n == null) return "—";
	return n.toLocaleString("ru-RU", { maximumFractionDigits: 0 });
}
function fmtPct(n) {
	if (n == null) return "—";
	return `${n > 0 ? "+" : ""}${n.toLocaleString("ru-RU", { maximumFractionDigits: 2 })}%`;
}
function MarketPage() {
	const [snap, setSnap] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [query, setQuery] = (0, import_react.useState)("");
	const [tape, setTape] = (0, import_react.useState)([]);
	async function pull(_force) {
		setLoading(true);
		setError("");
		try {
			const data = await loadMarket();
			setSnap(data);
			setTape(data.tape);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Стакан не ответил");
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		pull(false);
	}, []);
	const previous = tape.length >= 2 ? tape[tape.length - 2] : void 0;
	const rows = (0, import_react.useMemo)(() => {
		if (!snap) return [];
		const q = query.trim().toLowerCase();
		return snap.resources.filter((row) => {
			if (filter !== "all" && row.className !== filter) return false;
			if (!q) return true;
			return row.name.toLowerCase().includes(q) || row.symbol.toLowerCase().includes(q);
		});
	}, [
		snap,
		filter,
		query
	]);
	const movers = (0, import_react.useMemo)(() => {
		if (!snap || !previous) return [];
		return snap.resources.map((row) => ({
			row,
			d: deltaPct(row.ask, previous.asks[row.mint])
		})).filter((item) => item.d != null && Math.abs(item.d) >= .05).sort((a, b) => Math.abs(b.d) - Math.abs(a.d)).slice(0, 6);
	}, [snap, previous]);
	const pinned = PINNED.map((name) => snap?.resources.find((row) => row.name === name)).filter((row) => Boolean(row));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppChrome, {
		current: "market",
		kicker: "Galaxy · Galactic Marketplace",
		title: "Цены ресурсов",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-5xl flex-col gap-4 px-3 py-4 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenCard, {
							name: "ATLAS",
							quote: snap?.atlas
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenCard, {
							name: "POLIS",
							quote: snap?.polis
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandleChart, { candles: snap?.candles ?? [] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: pinned.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "galia-hop rounded-xl border border-line bg-surface p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-[10px] tracking-[0.18em] text-brass uppercase",
									children: row.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-xl text-fg",
									children: fmtAtlas(row.ask)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										"ATLAS · покупка ",
										fmtAtlas(row.bid),
										" · ",
										changeLabel(row, previous)
									]
								})
							]
						}, row.mint))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFilter(item.id),
								className: `h-11 rounded-lg border px-3 font-display text-sm ${filter === item.id ? "border-brass bg-surface-2 text-fg" : "border-line text-muted"}`,
								children: item.label
							}, item.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Поиск",
								className: "h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-fg outline-none placeholder:text-faint"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void pull(true),
								className: "h-11 rounded-lg border border-line bg-surface px-3 font-display text-sm text-fg",
								children: loading ? "Снимаю…" : "Снимок"
							})
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					movers.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"С прошлого снимка:",
							" ",
							movers.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: item.d > 0 ? "text-danger" : "text-ok",
								children: [
									item.row.name,
									" ",
									fmtPct(item.d),
									" "
								]
							}, item.row.mint))
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: tape.length < 2 ? "Свечи ATLAS уже с общего рынка. По ресурсам Galaxy историю не отдаёт: первый общий снимок сервера записан, следующий покажет Δ, не внутренний ноль." : `Общих снимков сервера: ${tape.length}. Ноль значит, что стакан между ними не сдвинулся.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-xl border border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[36rem] border-collapse text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-surface-2 text-left text-faint",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: "Ресурс"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: "Класс"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: "Продажа"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: "Покупка"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: "Δ"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => {
								const d = deltaPct(row.ask, previous?.asks[row.mint]);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-fg",
												children: row.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2 font-mono text-faint",
												children: row.symbol
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-muted",
											children: CLASS_LABEL[row.className] ?? row.className
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-mono text-fg",
											children: fmtAtlas(row.ask)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-mono text-muted",
											children: fmtAtlas(row.bid)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: `px-3 py-2 font-mono ${d == null ? "text-faint" : d > 0 ? "text-danger" : "text-ok"}`,
											children: fmtPct(d)
										})
									]
								}, row.mint);
							}) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pb-6 text-sm text-muted",
						children: snap?.note
					})
				]
			})
		})
	});
}
function CandleChart({ candles }) {
	if (candles.length < 2) return null;
	const w = 640;
	const h = 112;
	const pad = 6;
	const min = Math.min(...candles.map((c) => c.l));
	const span = Math.max(...candles.map((c) => c.h)) - min || 1;
	const slot = 628 / candles.length;
	const y = (v) => pad + (1 - (v - min) / span) * 100;
	const first = candles[0]?.o ?? 0;
	const last = candles[candles.length - 1]?.c ?? 0;
	const move = first ? (last - first) / first * 100 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-xl border border-line bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
				className: "mb-2 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-[10px] tracking-[0.18em] text-brass uppercase",
					children: "ATLAS · свечи 4ч"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-mono text-sm ${move != null && move < 0 ? "text-danger" : "text-ok"}`,
					children: fmtPct(move)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: `0 0 ${w} ${h}`,
				className: "h-28 w-full",
				role: "img",
				"aria-label": "Свечи ATLAS",
				children: candles.map((candle, index) => {
					const x = pad + index * slot + slot / 2;
					const color = candle.c >= candle.o ? "#7a9a7e" : "#c45c4a";
					const top = y(Math.max(candle.o, candle.c));
					const bot = y(Math.min(candle.o, candle.c));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: x,
						x2: x,
						y1: y(candle.h),
						y2: y(candle.l),
						stroke: color,
						strokeWidth: "1.2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: x - Math.max(1.2, slot * .28),
						y: top,
						width: Math.max(2, slot * .56),
						height: Math.max(1.2, bot - top),
						fill: color
					})] }, candle.t);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Общий рынок MEXC, не снимок этого браузера. Ресурсы ниже — стакан Galactic Marketplace."
			})
		]
	});
}
function changeLabel(row, previous) {
	const d = deltaPct(row.ask, previous?.asks[row.mint]);
	return d == null ? "нет прошлого снимка" : fmtPct(d);
}
function TokenCard({ name, quote }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-line bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[10px] tracking-[0.18em] text-brass uppercase",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-2xl text-fg",
				children: fmtUsd(quote?.usd ?? null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"24ч ",
					fmtPct(quote?.change24h ?? null),
					" · в обороте ",
					fmtCompact(quote?.circulating ?? null)
				]
			})
		]
	});
}
//#endregion
export { MarketPage as component };
