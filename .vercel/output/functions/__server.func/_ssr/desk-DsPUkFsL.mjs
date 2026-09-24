import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-DsPUkFsL.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadMarket_createServerFn_handler = createServerRpc({
	id: "1af78779bfd05857db18de2742fc50e38ee8d44ce70d1c3c78b9f32d167a5f73",
	name: "loadMarket",
	filename: "src/lib/desk.ts"
}, (opts) => loadMarket.__executeServer(opts));
var loadMarket = createServerFn({ method: "GET" }).handler(loadMarket_createServerFn_handler, async () => {
	const { buildMarket } = await import("./desk.impl-BPCbfZSs.mjs");
	return buildMarket();
});
var scanDeskWallet_createServerFn_handler = createServerRpc({
	id: "b1881aa1a8f30331bd6cbdcdd0b7f7fb8f569d45ea3f6e320100d892291a2669",
	name: "scanDeskWallet",
	filename: "src/lib/desk.ts"
}, (opts) => scanDeskWallet.__executeServer(opts));
var scanDeskWallet = createServerFn({ method: "POST" }).validator((input) => {
	const owner = String(input?.owner ?? "").trim();
	if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(owner)) throw new Error("Нужен публичный ключ Solana. Подпись и перевод не требуются.");
	return { owner };
}).handler(scanDeskWallet_createServerFn_handler, async ({ data }) => {
	const { scanWallet } = await import("./desk.impl-BPCbfZSs.mjs");
	return scanWallet(data.owner);
});
//#endregion
export { loadMarket_createServerFn_handler, scanDeskWallet_createServerFn_handler };
