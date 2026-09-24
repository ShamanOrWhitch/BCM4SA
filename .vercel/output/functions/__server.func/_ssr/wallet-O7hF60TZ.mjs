import { o as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as influenceFromTraits } from "./crew-score-lnBmlBxE.mjs";
import { t as AppChrome } from "./app-chrome-D-lJcqCf.mjs";
import { n as scanDeskWallet } from "./desk-DTqQIkx-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-O7hF60TZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND = {
	crew: "экипаж",
	ship: "корабль",
	structure: "структура",
	resource: "ресурс",
	nft: "NFT",
	other: "прочее"
};
function phantom() {
	const win = window;
	return win.solana?.isPhantom ? win.solana : null;
}
function WalletPage() {
	const [owner, setOwner] = (0, import_react.useState)("");
	const [scan, setScan] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [hasPhantom, setHasPhantom] = (0, import_react.useState)(false);
	async function connect() {
		setError("");
		const provider = phantom();
		if (!provider) {
			setHasPhantom(false);
			setError("Phantom в этом браузере не найден. Вставь публичный ключ — чтение без подписи.");
			return;
		}
		setHasPhantom(true);
		const res = await provider.connect();
		setOwner(res.publicKey.toString());
		await run(res.publicKey.toString());
	}
	async function run(address = owner) {
		const next = address.trim();
		if (!next) {
			setError("Нужен адрес кошелька.");
			return;
		}
		setLoading(true);
		setError("");
		try {
			setScan(await scanDeskWallet({ data: { owner: next } }));
		} catch (err) {
			setScan(null);
			setError(err instanceof Error ? err.message : "Кошелёк не прочитался");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppChrome, {
		current: "wallet",
		kicker: "Player Profile · только чтение",
		title: "Сейф кошелька",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-5xl flex-col gap-4 px-3 py-4 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-sm text-muted",
						children: "Подпись транзакции не открывает трюм. Phantom только подтверждает, что сайт видит публичный адрес — реестр Solana и так читается без неё. На ключе видны SPL, Token-2022, ATLAS, POLIS и NFT. Корабли и груз, которые уже в SAGE, лежат во флоте и Cargo. Если ключ записан в Player Profile первым, вторым или третьим, ниже появятся флот и его имя. OCEAN и причёска берутся из метадаты NFT и меряются формулой симулятора, не скрытым бонусом SAGE."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: owner,
								onChange: (event) => setOwner(event.target.value),
								placeholder: "Публичный ключ",
								spellCheck: false,
								className: "h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 font-mono text-sm text-fg outline-none placeholder:text-faint"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void connect(),
								className: "h-11 rounded-lg border border-line px-3 font-display text-sm",
								children: hasPhantom ? "Phantom" : "Кошелёк"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void run(),
								className: "h-11 rounded-lg border border-brass bg-surface-2 px-3 font-display text-sm text-fg",
								children: loading ? "Читаю…" : "Показать"
							})
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					scan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-faint",
							children: [
								scan.owner,
								" · ",
								scan.items.length,
								" на ключе",
								scan.skippedMeta ? ` · ещё ${scan.skippedMeta} NFT не открыты за один проход` : ""
							]
						}),
						scan.rpcWarning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: scan.rpcWarning
						}) : null,
						scan.profiles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-sm tracking-[0.16em] text-brass uppercase",
								children: "В игре"
							}), scan.profiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl border border-line bg-surface p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-faint",
										children: profile.profile
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted",
										children: ["ключей на профиле: ", profile.keys || "—"]
									}),
									profile.fleets.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2 flex flex-col gap-1",
										children: profile.fleets.map((fleet) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "text-sm text-fg",
											children: [fleet.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted",
												children: [" · фракция ", fleet.faction]
											})]
										}, `${profile.profile}-${fleet.name}`))
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: "Флотов SAGE на этом профиле не видно."
									})
								]
							}, profile.profile))]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Профиль по этому ключу не найден среди первых трёх ProfileKey. Либо ключ не привязан, либо он четвёртый и дальше. Пустой список токенов при этом нормален: игра держит корабли и ресурсы не на адресе."
						}),
						!scan.items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "На самом ключе токенов Star Atlas нет. Это не отказ сайта и не отсутствие подписи."
						}) : null,
						[
							"crew",
							"ship",
							"structure",
							"resource",
							"nft",
							"other"
						].map((kind) => {
							const rows = scan.items.filter((item) => item.kind === kind);
							if (!rows.length) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-2 font-display text-sm tracking-[0.16em] text-brass uppercase",
								children: KIND[kind]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: rows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "galia-hop flex gap-3 rounded-xl border border-line bg-surface p-3",
									children: [item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.image,
										alt: "",
										className: "size-16 shrink-0 rounded-lg bg-surface-2 object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-16 shrink-0 rounded-lg bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-display text-base text-fg",
												children: item.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted",
												children: [
													"×",
													item.amount.toLocaleString("ru-RU"),
													item.className ? ` · ${item.className}` : "",
													item.rarity ? ` · ${item.rarity}` : "",
													item.spec ? ` · ${item.spec}` : ""
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraitBlock, { item })
										]
									})]
								}, `${item.mint}-${item.amount}`))
							})] }, kind);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pb-6 text-sm text-muted",
							children: scan.note
						})
					] }) : null
				]
			})
		})
	});
}
function TraitBlock({ item }) {
	const influence = item.kind === "crew" || item.traits.length ? influenceFromTraits(item.traits) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		item.traits.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-1 space-y-0.5 text-sm text-ice",
			children: item.traits.slice(0, 8).map((trait) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				trait.trait,
				": ",
				trait.value
			] }, trait.trait))
		}) : null,
		influence && (influence.ocean || influence.helm || influence.hull || influence.scan || influence.mission) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-fg",
			children: [
				"задание ",
				influence.mission,
				"% · штурвал ",
				influence.helm,
				"% · корпус ",
				influence.hull,
				"% · сенсор ",
				influence.scan,
				"%"
			]
		}) : null,
		influence?.hair || influence?.skin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-brass",
			children: [
				influence.hair ? `волосы ${influence.hair}` : "",
				influence.skin ? ` · скин ${influence.skin}` : "",
				". Скин — слот рядом с бортом, не второй плагин."
			]
		}) : null
	] });
}
//#endregion
export { WalletPage as component };
