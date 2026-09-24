import { t as APTITUDES } from "./archive-Pt426J3v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crew-score-lnBmlBxE.js
var LINE = "Мерка симулятора, не скрытая формула SAGE. Штурвал = Flight × (100−N) × C. Корпус = Engineering × C. Сенсор = Operator × (O и спокойствие). Задание собирает командование, штурвал, корпус, сенсор и медика; E и A чуть поднимают команду. Высокий N режет точные слоты.";
function clamp01(n) {
	if (n < 0) return 0;
	if (n > 1) return 1;
	return n;
}
function pct(n) {
	return Math.round(clamp01(n) * 100);
}
function xpOf(slots, name) {
	const hit = slots.find((slot) => slot.name === name);
	if (!hit) return 0;
	return hit.xp >= 50 ? 1 : hit.xp >= 25 ? .5 : clamp01(hit.xp / 50);
}
function score(slots, ocean) {
	const stability = ocean ? clamp01((100 - ocean.n) / 100) : .7;
	const focus = ocean ? clamp01(ocean.c / 100) : .5;
	const adapt = ocean ? clamp01(ocean.o / 100) : .5;
	const team = ocean ? clamp01((ocean.e + ocean.a) / 200) : .5;
	const helm = xpOf(slots, "Flight") * stability * (.55 + .45 * focus);
	const hull = xpOf(slots, "Engineering") * (.45 + .55 * focus);
	const scan = xpOf(slots, "Operator") * (.5 * adapt + .5 * stability);
	const command = xpOf(slots, "Command");
	const medical = xpOf(slots, "Medical");
	const mission = (command * .34 + helm * .24 + hull * .18 + scan * .12 + medical * .12) * (.82 + .18 * team);
	return {
		helm: pct(helm),
		hull: pct(hull),
		scan: pct(scan),
		mission: pct(mission),
		ocean: Boolean(ocean)
	};
}
function influenceFromRoster(crew) {
	return {
		...score(crew.aptitudes, {
			o: crew.o,
			c: crew.c,
			e: crew.e,
			a: crew.a,
			n: crew.n
		}),
		hair: null,
		skin: null,
		line: LINE
	};
}
function asNumber(value) {
	const n = Number(String(value).replace("%", "").trim());
	return Number.isFinite(n) ? n : null;
}
function influenceFromTraits(traits) {
	const slots = [];
	const ocean = {
		o: NaN,
		c: NaN,
		e: NaN,
		a: NaN,
		n: NaN
	};
	let hair = null;
	let skin = null;
	for (const row of traits) {
		const trait = row.trait.trim();
		const value = row.value.trim();
		const apt = APTITUDES.find((name) => name.toLowerCase() === trait.toLowerCase());
		if (apt) {
			const raw = asNumber(value);
			const xp = raw == null ? /major|50/i.test(value) ? 50 : 25 : raw > 1 ? raw : raw * 100;
			slots.push({
				name: apt,
				xp
			});
			continue;
		}
		const key = trait.toLowerCase();
		const n = asNumber(value);
		if (n != null && n >= 0 && n <= 100) {
			if (/^o$|openness|открыт/.test(key)) ocean.o = n;
			else if (/^c$|conscient|дисцип|чеклист/.test(key)) ocean.c = n;
			else if (/^e$|extraver|экстра/.test(key)) ocean.e = n;
			else if (/^a$|agreeab|соглас/.test(key)) ocean.a = n;
			else if (/^n$|neurot|нерв/.test(key)) ocean.n = n;
		}
		if (/hair|причес|волос/.test(key)) hair = value;
		if (/skin|body|suit|costume|шкур/.test(key)) skin = value;
	}
	const hasOcean = [
		ocean.o,
		ocean.c,
		ocean.e,
		ocean.a,
		ocean.n
	].every((n) => Number.isFinite(n));
	if (!slots.length && !hasOcean && !hair && !skin) return null;
	return {
		...score(slots, hasOcean ? ocean : null),
		hair,
		skin,
		line: LINE
	};
}
//#endregion
export { influenceFromTraits as n, influenceFromRoster as t };
