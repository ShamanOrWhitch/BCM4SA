import { n as PublicKey, t as Connection } from "../_libs/@solana/web3.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk.impl-BPCbfZSs.js
var RPC_URL = "https://api.mainnet-beta.solana.com";
var GM = "traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg";
var ATLAS = "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx";
var POLIS = "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk";
var TOKEN = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
var TOKEN_22 = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
var META = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
var CLASS_KEEP = /* @__PURE__ */ new Set([
	"consumable",
	"raw material",
	"component",
	"compound material",
	"material bundle",
	"contracts",
	"data"
]);
var marketCache = null;
var catalogCache = null;
var MARKET_TTL = 12e4;
var CATALOG_TTL = 6e5;
var RPCS = [RPC_URL, "https://solana-rpc.publicnode.com"];
var PROFILE = "pprofELXjL5Kck7Jn5hCpwAL82DpTkSYBENzahVtbc9";
var SAGE = "SAGE2HAwep459SNq61LHvjxPk4pLPEJLoMETef7f7EE";
var GAME = "GAMEzqJehF8yAnKiTARUuhZMvLvkZVAsCVri5vSfemLr";
var KNOWN_FUNGIBLE = {
	[ATLAS]: {
		name: "ATLAS",
		symbol: "ATLAS"
	},
	[POLIS]: {
		name: "POLIS",
		symbol: "POLIS"
	}
};
var connection = new Connection(RPC_URL, "confirmed");
var serverTape = [];
async function getJson(url) {
	const res = await fetch(url, { headers: { accept: "application/json" } });
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return await res.json();
}
function emptyQuote() {
	return {
		usd: null,
		change24h: null,
		circulating: null,
		totalSupply: null,
		lockedSupply: null
	};
}
function kindOf(itemType) {
	if (itemType === "resource") return "resource";
	if (itemType === "ship") return "ship";
	if (itemType === "crew") return "crew";
	if (itemType === "structure") return "structure";
	return "other";
}
async function loadCatalog() {
	if (catalogCache && Date.now() - catalogCache.at < CATALOG_TTL) return catalogCache.byMint;
	const rows = await getJson("https://galaxy.staratlas.com/nfts");
	const byMint = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const mint = String(row.mint ?? "");
		if (!mint) continue;
		const attrs = row.attributes ?? {};
		const itemType = String(attrs.itemType ?? "");
		byMint.set(mint, {
			mint,
			name: String(row.name ?? mint.slice(0, 4)),
			symbol: String(row.symbol ?? ""),
			kind: kindOf(itemType),
			className: String(attrs.class ?? ""),
			rarity: String(attrs.rarity ?? ""),
			spec: String(attrs.spec ?? ""),
			image: String(row.image ?? "")
		});
	}
	catalogCache = {
		at: Date.now(),
		byMint
	};
	return byMint;
}
function readBook(rows, atlasHex) {
	const book = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const raw = Buffer.from(row.account.data);
		if (raw.length < 153) continue;
		if (raw.subarray(0, 32).toString("hex") !== atlasHex) continue;
		const asset = new PublicKey(raw.subarray(32, 64)).toBase58();
		const side = raw[128];
		const price = Number(raw.readBigUInt64LE(129)) / 1e8;
		const rem = Number(raw.readBigUInt64LE(145));
		if (!Number.isFinite(price) || price <= 0 || rem <= 0) continue;
		let slot = book.get(asset);
		if (!slot) {
			slot = {
				ask: null,
				bid: null,
				askQty: 0
			};
			book.set(asset, slot);
		}
		if (side === 1 && (slot.ask == null || price < slot.ask)) {
			slot.ask = price;
			slot.askQty = rem;
		} else if (side === 0 && (slot.bid == null || price > slot.bid)) slot.bid = price;
	}
	return book;
}
async function atlasCandles() {
	try {
		return (await getJson("https://api.mexc.com/api/v3/klines?symbol=ATLASUSDT&interval=4h&limit=42")).map((row) => ({
			t: Number(row[0]),
			o: Number(row[1]),
			h: Number(row[2]),
			l: Number(row[3]),
			c: Number(row[4])
		})).filter((candle) => Number.isFinite(candle.c) && candle.c > 0);
	} catch {
		return [];
	}
}
function pushTape(resources) {
	const asks = {};
	for (const row of resources) if (row.ask != null) asks[row.mint] = row.ask;
	const last = serverTape.at(-1);
	const now = Date.now();
	if (!last || now - last.t >= 9e4) {
		serverTape.push({
			t: now,
			asks
		});
		if (serverTape.length > 48) serverTape.shift();
	}
	return serverTape.map((point) => ({
		t: point.t,
		asks: { ...point.asks }
	}));
}
async function buildMarket() {
	if (marketCache && Date.now() - marketCache.at < MARKET_TTL) return marketCache.data;
	const atlasHex = new PublicKey(ATLAS).toBuffer().toString("hex");
	const [nfts, atlasTok, polisTok, prices, orders, candles] = await Promise.all([
		loadCatalog(),
		getJson("https://galaxy.staratlas.com/tokens/atlas").catch(() => null),
		getJson("https://galaxy.staratlas.com/tokens/polis").catch(() => null),
		getJson(`https://lite-api.jup.ag/price/v3?ids=${ATLAS},${POLIS}`).catch(() => ({})),
		connection.getProgramAccounts(new PublicKey(GM), {
			commitment: "confirmed",
			dataSlice: {
				offset: 40,
				length: 153
			},
			filters: [{ dataSize: 201 }]
		}),
		atlasCandles()
	]);
	const book = readBook(orders, atlasHex);
	const resources = [];
	for (const item of nfts.values()) {
		if (item.kind !== "resource" || !CLASS_KEEP.has(item.className)) continue;
		const side = book.get(item.mint);
		resources.push({
			mint: item.mint,
			name: item.name,
			symbol: item.symbol,
			className: item.className,
			image: item.image,
			ask: side?.ask ?? null,
			bid: side?.bid ?? null,
			askQty: side?.askQty ?? 0
		});
	}
	resources.sort((a, b) => a.name.localeCompare(b.name, "en"));
	const atlas = {
		...emptyQuote(),
		usd: prices[ATLAS]?.usdPrice ?? null,
		change24h: prices[ATLAS]?.priceChange24h ?? null,
		circulating: num(atlasTok?.circulating),
		totalSupply: num(atlasTok?.totalSupply),
		lockedSupply: num(atlasTok?.lockedSupply)
	};
	const polis = {
		...emptyQuote(),
		usd: prices[POLIS]?.usdPrice ?? null,
		change24h: prices[POLIS]?.priceChange24h ?? null,
		circulating: num(polisTok?.circulating),
		totalSupply: num(polisTok?.totalSupply),
		lockedSupply: num(polisTok?.lockedSupply)
	};
	const data = {
		at: Date.now(),
		orderCount: orders.length,
		atlas,
		polis,
		resources,
		candles,
		tape: pushTape(resources),
		note: "Свечи ATLAS — общий рынок MEXC, 4 часа. Это не ноль внутри браузера. Ресурсы: лучшая цена стакана Galactic Marketplace в ATLAS. У Galaxy нет истории стакана, поэтому Δ ресурсов копится общим снимком сервера. USD — Jupiter."
	};
	marketCache = {
		at: Date.now(),
		data
	};
	return data;
}
function num(value) {
	const n = typeof value === "number" ? value : Number(value);
	return Number.isFinite(n) ? n : null;
}
async function rpc(method, params) {
	let last = "RPC не ответил";
	for (const url of RPCS) try {
		const json = await (await fetch(url, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method,
				params
			}),
			signal: AbortSignal.timeout(18e3)
		})).json();
		if (json.error) {
			last = json.error.message || "RPC ошибка";
			continue;
		}
		if (json.result !== void 0) return json.result;
	} catch (err) {
		last = err instanceof Error ? err.message : last;
	}
	throw new Error(last);
}
async function tokensOf(owner, programId) {
	const result = await rpc("getTokenAccountsByOwner", [
		owner.toBase58(),
		{ programId },
		{ encoding: "jsonParsed" }
	]);
	const out = [];
	for (const row of result.value ?? []) {
		const info = row.account.data.parsed?.info;
		const mint = info?.mint;
		const ui = info?.tokenAmount?.uiAmount;
		if (!mint || ui == null || ui <= 0) continue;
		out.push({
			mint,
			amount: ui,
			decimals: info?.tokenAmount?.decimals ?? 0
		});
	}
	return out;
}
function labelOf(raw) {
	return raw.toString("utf8").replace(/\0/g, "").trim() || "флот";
}
async function fleetsOf(profile) {
	const rows = await rpc("getProgramAccounts", [SAGE, {
		encoding: "base64",
		dataSlice: {
			offset: 169,
			length: 33
		},
		filters: [{ memcmp: {
			offset: 9,
			bytes: GAME
		} }, { memcmp: {
			offset: 41,
			bytes: profile
		} }]
	}]);
	const fleets = [];
	for (const row of rows.slice(0, 12)) {
		const buf = Buffer.from(row.account.data[0] ?? "", "base64");
		if (buf.length < 2) continue;
		fleets.push({
			faction: buf[0] ?? 0,
			name: labelOf(buf.subarray(1))
		});
	}
	return fleets;
}
async function profilesOf(owner) {
	const found = /* @__PURE__ */ new Map();
	let warning = "";
	await Promise.all([
		30,
		110,
		190
	].map(async (offset) => {
		try {
			const rows = await rpc("getProgramAccounts", [PROFILE, {
				encoding: "base64",
				dataSlice: {
					offset: 28,
					length: 2
				},
				filters: [{ memcmp: {
					offset,
					bytes: owner
				} }]
			}]);
			for (const row of rows) {
				const buf = Buffer.from(row.account.data[0] ?? "", "base64");
				const keys = buf.length >= 2 ? buf.readUInt16LE(0) : 0;
				found.set(row.pubkey, keys);
			}
		} catch (err) {
			warning = err instanceof Error ? err.message : "Профиль не прочитался";
		}
	}));
	const profiles = [];
	for (const [profile, keys] of [...found.entries()].slice(0, 4)) {
		let fleets = [];
		try {
			fleets = await fleetsOf(profile);
		} catch (err) {
			warning = err instanceof Error ? err.message : warning;
		}
		profiles.push({
			profile,
			keys,
			fleets
		});
	}
	return {
		profiles,
		warning
	};
}
function readBorshString(buf, offset) {
	const len = buf.readUInt32LE(offset);
	const start = offset + 4;
	return {
		value: buf.subarray(start, start + len).toString("utf8").replace(/\0/g, "").trim(),
		next: start + len
	};
}
function parseMeta(buf) {
	if (buf.length < 70 || buf[0] !== 4) return null;
	try {
		const name = readBorshString(buf, 65);
		const uri = readBorshString(buf, readBorshString(buf, name.next).next);
		return {
			name: name.value,
			uri: uri.value
		};
	} catch {
		return null;
	}
}
function safeHttps(uri) {
	try {
		const url = new URL(uri);
		if (url.protocol !== "https:") return null;
		const host = url.hostname.toLowerCase();
		if (host === "localhost" || host.endsWith(".local") || host === "0.0.0.0") return null;
		if (/^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host)) return null;
		return url.toString();
	} catch {
		return null;
	}
}
function traitsFrom(json) {
	if (!json || typeof json !== "object") return [];
	const raw = json.attributes;
	const out = [];
	if (Array.isArray(raw)) {
		for (const row of raw) {
			if (!row || typeof row !== "object") continue;
			const trait = String(row.trait_type ?? row.trait ?? "");
			const value = row.value;
			if (!trait || value == null) continue;
			out.push({
				trait,
				value: String(value)
			});
		}
		return out.slice(0, 24);
	}
	if (raw && typeof raw === "object") for (const [trait, value] of Object.entries(raw)) {
		if (value == null || typeof value === "object") continue;
		out.push({
			trait,
			value: String(value)
		});
	}
	return out.slice(0, 24);
}
async function metaJson(uri) {
	const safe = safeHttps(uri);
	if (!safe) return null;
	const res = await fetch(safe, {
		signal: AbortSignal.timeout(7e3),
		headers: { accept: "application/json" }
	});
	if (!res.ok) return null;
	const text = (await res.text()).slice(0, 2e5);
	const json = JSON.parse(text);
	return {
		image: typeof json.image === "string" ? json.image : "",
		traits: traitsFrom(json),
		name: typeof json.name === "string" ? json.name : ""
	};
}
async function scanWallet(ownerText) {
	let owner;
	try {
		owner = new PublicKey(ownerText);
	} catch {
		throw new Error("Это не публичный ключ Solana.");
	}
	const catalog = await loadCatalog();
	const [heldPair, game] = await Promise.all([Promise.all([tokensOf(owner, TOKEN), tokensOf(owner, TOKEN_22)]), profilesOf(owner.toBase58())]);
	const held = [...heldPair[0], ...heldPair[1]];
	const items = [];
	const pending = [];
	for (const token of held) {
		const known = catalog.get(token.mint);
		if (known && known.kind !== "other") {
			items.push({
				mint: token.mint,
				amount: token.amount,
				name: known.name,
				kind: known.kind,
				image: known.image,
				className: known.className,
				rarity: known.rarity,
				spec: known.spec,
				traits: []
			});
			continue;
		}
		const fungible = KNOWN_FUNGIBLE[token.mint];
		if (fungible) {
			items.push({
				mint: token.mint,
				amount: token.amount,
				name: fungible.name,
				kind: "resource",
				image: "",
				className: "currency",
				rarity: "",
				spec: fungible.symbol,
				traits: []
			});
			continue;
		}
		if (token.decimals === 0 && token.amount <= 20) pending.push(token);
	}
	const metaTargets = pending.slice(0, 24);
	const skippedMeta = Math.max(0, pending.length - metaTargets.length);
	if (metaTargets.length) {
		const pdas = metaTargets.map((token) => {
			const mint = new PublicKey(token.mint);
			return PublicKey.findProgramAddressSync([
				Buffer.from("metadata"),
				META.toBuffer(),
				mint.toBuffer()
			], META)[0];
		});
		const infos = await connection.getMultipleAccountsInfo(pdas);
		const enriched = await Promise.all(metaTargets.map(async (token, index) => {
			const info = infos[index];
			const parsed = info ? parseMeta(Buffer.from(info.data)) : null;
			let image = "";
			let traits = [];
			let name = parsed?.name || token.mint.slice(0, 4) + "…" + token.mint.slice(-4);
			if (parsed?.uri) try {
				const extra = await metaJson(parsed.uri);
				if (extra) {
					image = extra.image;
					traits = extra.traits;
					if (extra.name) name = extra.name;
				}
			} catch {}
			const known = catalog.get(token.mint);
			const kind = known?.kind && known.kind !== "other" ? known.kind : traits.length || parsed ? "nft" : "nft";
			const crewish = /crew|pilot|operator|hospitality|engineering|ustur|gummy|sogmian|hair|openness|ocean/i.test(`${name} ${traits.map((t) => `${t.trait} ${t.value}`).join(" ")}`);
			return {
				mint: token.mint,
				amount: token.amount,
				name,
				kind: crewish ? "crew" : kind === "nft" ? "nft" : kind,
				image: image || known?.image || "",
				className: known?.className || "",
				rarity: known?.rarity || traits.find((t) => /rarity/i.test(t.trait))?.value || "",
				spec: known?.spec || "",
				traits
			};
		}));
		items.push(...enriched);
	}
	const order = {
		crew: 0,
		ship: 1,
		structure: 2,
		resource: 3,
		nft: 4,
		other: 5
	};
	items.sort((a, b) => order[a.kind] - order[b.kind] || a.name.localeCompare(b.name, "en"));
	return {
		owner: owner.toBase58(),
		at: Date.now(),
		items,
		skippedMeta,
		profiles: game.profiles,
		rpcWarning: game.warning,
		note: "Подпись транзакции не нужна. Phantom только называет публичный адрес, реестр и так открыт. Здесь то, что лежит на ключе: SPL, Token-2022, ATLAS и POLIS. Уникальный экипаж — из метадаты NFT, не из Galaxy /nfts. Корабли и груз SAGE сидят во флоте и Cargo: ниже профили, если этот ключ записан первым, вторым или третьим. Содержимое трюма без отдельного разбора Cargo-аккаунта не видно."
	};
}
//#endregion
export { buildMarket, scanWallet };
