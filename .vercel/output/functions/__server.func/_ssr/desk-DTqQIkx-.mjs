import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-DTqQIkx-.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadMarket = createServerFn({ method: "GET" }).handler(createSsrRpc("1af78779bfd05857db18de2742fc50e38ee8d44ce70d1c3c78b9f32d167a5f73"));
var scanDeskWallet = createServerFn({ method: "POST" }).validator((input) => {
	const owner = String(input?.owner ?? "").trim();
	if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(owner)) throw new Error("Нужен публичный ключ Solana. Подпись и перевод не требуются.");
	return { owner };
}).handler(createSsrRpc("b1881aa1a8f30331bd6cbdcdd0b7f7fb8f569d45ea3f6e320100d892291a2669"));
//#endregion
export { scanDeskWallet as n, loadMarket as t };
