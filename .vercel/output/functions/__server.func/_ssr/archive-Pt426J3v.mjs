import { o as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Ship, h as Compass, i as Upload, m as Copy, n as Wallet, p as Download, r as Users, t as X, v as ChartLine, y as Archive } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/archive-Pt426J3v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var APTITUDES = [
	"Command",
	"Flight",
	"Operator",
	"Engineering",
	"Medical",
	"Science",
	"Fitness",
	"Hospitality"
];
var OFFICIAL = [
	"Common",
	"Uncommon",
	"Rare",
	"Epic",
	"Legendary",
	"Anomaly"
];
var SPECIES = [
	"Ustur",
	"High Punaab",
	"Profound Punaab",
	"Sogmian",
	"Human",
	"Mierese"
];
/** Tensor.trade rank bands as used on the floor hunt (gold ≈ legendary). */
function tensorTier(rank) {
	if (rank == null) return "unknown";
	if (rank <= 5e3) return "anomaly";
	if (rank <= 8e4) return "legendary";
	if (rank <= 18e4) return "epic";
	if (rank <= 45e4) return "rare";
	if (rank <= 9e5) return "uncommon";
	return "common";
}
function displayName(c) {
	return c.ustur ? `${c.given} ${c.ustur}` : `${c.given} ${c.family}`.trim();
}
function hasApt(c, name, slot) {
	return c.aptitudes.some((x) => x.name === name && (slot ? slot === "major" ? x.xp === 50 : x.xp === 25 : true));
}
function flyOk(c) {
	return hasApt(c, "Flight") && c.n <= 60 && c.c >= 30;
}
function seats(c) {
	const out = [];
	if (hasApt(c, "Command", "major")) out.push("капитан");
	else if (hasApt(c, "Command")) out.push("XO");
	if (hasApt(c, "Flight")) out.push(flyOk(c) ? "штурвал" : "не штурвал");
	if (hasApt(c, "Operator")) out.push("автоматика");
	if (hasApt(c, "Medical")) out.push("медик");
	if (hasApt(c, "Engineering")) out.push("инж");
	if (hasApt(c, "Hospitality")) out.push("камбуз");
	if (hasApt(c, "Science")) out.push("станция");
	if (hasApt(c, "Fitness") && !hasApt(c, "Flight")) out.push("пехота");
	return out;
}
function mismatch(c) {
	const t = tensorTier(c.tensorRank);
	return c.official === "Common" && (t === "anomaly" || t === "legendary" || t === "epic");
}
function xpSpread(c) {
	return c.aptitudes.reduce((s, a) => s + a.xp, 0);
}
var CREW_CORE = [
	{
		id: "arlinasija",
		given: "Arlinasija",
		family: "Otheelkorgar",
		species: "Profound Punaab",
		sex: "Male",
		official: "Rare",
		tensorRank: 1868,
		aptitudes: [
			{
				name: "Hospitality",
				xp: 50
			},
			{
				name: "Command",
				xp: 25
			},
			{
				name: "Science",
				xp: 25
			}
		],
		o: 95,
		c: 12,
		e: 51,
		a: 46,
		n: 67,
		university: "ONI Institute",
		age: 31,
		note: "Tensor-аномалия #1868. Лицо флота, не чеклист."
	},
	{
		id: "arpaikva",
		given: "Arpaikva",
		family: "Varishkey",
		species: "Profound Punaab",
		sex: "Female",
		official: "Rare",
		tensorRank: 3718,
		aptitudes: [
			{
				name: "Fitness",
				xp: 50
			},
			{
				name: "Command",
				xp: 25
			},
			{
				name: "Science",
				xp: 25
			}
		],
		o: 78,
		c: 44,
		e: 61,
		a: 6,
		n: 99,
		university: "ONI Institute",
		age: 33,
		note: "Tensor-аномалия #3718. Алмаз Rare, Command minor. N99 — не мостик, лицо."
	},
	{
		id: "tiora",
		given: "Tiora",
		family: "Outro",
		species: "Sogmian",
		sex: "Male",
		official: "Rare",
		tensorRank: 16615,
		aptitudes: [
			{
				name: "Hospitality",
				xp: 50
			},
			{
				name: "Command",
				xp: 25
			},
			{
				name: "Flight",
				xp: 25
			}
		],
		o: 17,
		c: 26,
		e: 96,
		a: 79,
		n: 2,
		university: "ONI Institute",
		age: 32,
		house: "Outro",
		note: "Tensor-легенда. Официально Rare. Лёд. Лицо дома Outro."
	},
	{
		id: "gunge",
		given: "Gunge",
		family: "Lex Scarka",
		species: "Mierese",
		sex: "Male",
		official: "Rare",
		tensorRank: 17199,
		aptitudes: [
			{
				name: "Flight",
				xp: 50
			},
			{
				name: "Command",
				xp: 25
			},
			{
				name: "Science",
				xp: 25
			}
		],
		o: 16,
		c: 73,
		e: 4,
		a: 79,
		n: 69,
		university: "ONI Institute",
		age: 29,
		note: "Tensor-легенда, кэп-пилот. Интроверт."
	},
	{
		id: "yuma",
		given: "Yuma",
		family: "Lutavira",
		species: "Sogmian",
		sex: "Female",
		official: "Rare",
		tensorRank: 18445,
		aptitudes: [
			{
				name: "Flight",
				xp: 50
			},
			{
				name: "Command",
				xp: 25
			},
			{
				name: "Science",
				xp: 25
			}
		],
		o: 70,
		c: 75,
		e: 8,
		a: 77,
		n: 38,
		university: "ONI Institute",
		age: 42,
		house: "Lutavira",
		note: "Лучший золотой XO. Палка + Command."
	},
	{
		id: "ooniseth",
		given: "Ooniseth",
		family: "Parnathgera",
		species: "Profound Punaab",
		sex: "Female",
		official: "Rare",
		tensorRank: 70269,
		aptitudes: [
			{
				name: "Operator",
				xp: 50
			},
			{
				name: "Flight",
				xp: 25
			},
			{
				name: "Hospitality",
				xp: 25
			}
		],
		o: 71,
		c: 67,
		e: 18,
		a: 38,
		n: 11,
		university: "ONI Institute",
		age: 34,
		note: "Принцесса. Jetjet одним телом. N11."
	},
	{
		id: "enyavana",
		given: "Enyavana",
		family: "Aatiocenothea",
		species: "High Punaab",
		sex: "Female",
		official: "Rare",
		tensorRank: 100432,
		aptitudes: [
			{
				name: "Fitness",
				xp: 50
			},
			{
				name: "Flight",
				xp: 25
			},
			{
				name: "Medical",
				xp: 25
			}
		],
		o: 76,
		c: 25,
		e: 59,
		a: 50,
		n: 55,
		university: "ONI Institute",
		age: 45
	},
	{
		id: "lilara",
		given: "Lilara",
		family: "Outro",
		species: "Sogmian",
		sex: "Female",
		official: "Rare",
		tensorRank: 115129,
		aptitudes: [
			{
				name: "Fitness",
				xp: 50
			},
			{
				name: "Flight",
				xp: 25
			},
			{
				name: "Engineering",
				xp: 25
			}
		],
		o: 5,
		c: 79,
		e: 6,
		a: 48,
		n: 75,
		university: "ONI Institute",
		age: 43,
		house: "Outro"
	},
	{
		id: "marnx",
		given: "Marnx",
		family: "Valeze Eko",
		species: "Mierese",
		sex: "Female",
		official: "Rare",
		tensorRank: 134081,
		aptitudes: [
			{
				name: "Flight",
				xp: 50
			},
			{
				name: "Science",
				xp: 25
			},
			{
				name: "Fitness",
				xp: 25
			}
		],
		o: 73,
		c: 27,
		e: 71,
		a: 65,
		n: 80,
		university: "ONI Institute",
		age: 42,
		note: "Не штурвал. N80."
	},
	{
		id: "deceon",
		given: "Deceon",
		family: "",
		species: "Ustur",
		sex: "Body 1",
		official: "Rare",
		tensorRank: 137770,
		aptitudes: [
			{
				name: "Operator",
				xp: 50
			},
			{
				name: "Flight",
				xp: 25
			},
			{
				name: "Hospitality",
				xp: 25
			}
		],
		o: 77,
		c: 78,
		e: 54,
		a: 78,
		n: 69,
		ustur: ".lrnr",
		note: "Jetjet автоматика. Официально Rare, Tensor epic."
	},
	{
		id: "moon-naima",
		given: "Moon",
		family: "Naima",
		species: "Human",
		sex: "Female",
		official: "Rare",
		tensorRank: 140112,
		aptitudes: [
			{
				name: "Hospitality",
				xp: 50
			},
			{
				name: "Science",
				xp: 25
			},
			{
				name: "Fitness",
				xp: 25
			}
		],
		o: 58,
		c: 65,
		e: 71,
		a: 27,
		n: 70,
		note: "Алмаз Rare, три ветки. Не Command. Камбуз + станция. C65 держит кухню."
	},
	{
		id: "seraimal",
		given: "Seraimal",
		family: "Horgorwroo",
		species: "High Punaab",
		sex: "Female",
		official: "Uncommon",
		tensorRank: 140223,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}, {
			name: "Engineering",
			xp: 25
		}],
		o: 26,
		c: 95,
		e: 51,
		a: 9,
		n: 22,
		university: "ONI Institute",
		age: 27,
		note: "Официально N22 C95 — палка, не паника. Tensor врал."
	},
	{
		id: "lelilintha",
		given: "Lelilintha",
		family: "Srootosothia",
		species: "High Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 142226,
		aptitudes: [{
			name: "Operator",
			xp: 50
		}],
		o: 19,
		c: 10,
		e: 10,
		a: 53,
		n: 22,
		university: "ONI Institute",
		age: 30
	},
	{
		id: "norraphilind",
		given: "Norraphilind",
		family: "Thionalatho",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 206872,
		aptitudes: [{
			name: "Hospitality",
			xp: 50
		}],
		o: 60,
		c: 98,
		e: 100,
		a: 15,
		n: 21,
		note: "Камбуз. C98 E100."
	},
	{
		id: "camposs",
		given: "Camposs",
		family: "Sinsirath",
		species: "Human",
		sex: "Female",
		official: "Rare",
		tensorRank: 218379,
		aptitudes: [
			{
				name: "Fitness",
				xp: 50
			},
			{
				name: "Engineering",
				xp: 25
			},
			{
				name: "Operator",
				xp: 25
			}
		],
		o: 64,
		c: 80,
		e: 4,
		a: 60,
		n: 87,
		university: "MUD Academy",
		age: 41,
		note: "N87. Не палка. Тройное дерево."
	},
	{
		id: "gaarthoren",
		given: "Gaarthoren",
		family: "Raragnilaath",
		species: "Profound Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 223611,
		aptitudes: [{
			name: "Fitness",
			xp: 50
		}],
		o: 93,
		c: 36,
		e: 19,
		a: 40,
		n: 32
	},
	{
		id: "thartine",
		given: "Thartine",
		family: "Vichorichand",
		species: "High Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 239290,
		aptitudes: [{
			name: "Fitness",
			xp: 50
		}],
		o: 98,
		c: 32,
		e: 11,
		a: 89,
		n: 52,
		university: "ONI Institute",
		age: 41
	},
	{
		id: "aanothin",
		given: "Aanothin",
		family: "Thalaramgroo",
		species: "Profound Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 255135,
		aptitudes: [{
			name: "Medical",
			xp: 50
		}],
		o: 1,
		c: 40,
		e: 56,
		a: 5,
		n: 51
	},
	{
		id: "jaenfatali",
		given: "Jaenfatali",
		family: "Arirathonan",
		species: "Profound Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 264836,
		aptitudes: [{
			name: "Engineering",
			xp: 50
		}],
		o: 86,
		c: 3,
		e: 41,
		a: 2,
		n: 49,
		university: "ONI Institute",
		age: 31,
		note: "C3. Не чеклист."
	},
	{
		id: "othnisatehaph",
		given: "Othnisatehaph",
		family: "Barorooanthos",
		species: "Profound Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 282810,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 65,
		c: 98,
		e: 49,
		a: 60,
		n: 93,
		note: "C98 но N93. Не штурвал."
	},
	{
		id: "alkathve",
		given: "Alkathve",
		family: "Jorcoreliro",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 315822,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 48,
		c: 85,
		e: 94,
		a: 68,
		n: 48,
		university: "ONI Institute",
		age: 18
	},
	{
		id: "jailaanqa",
		given: "Jailaanqa",
		family: "Daranrathion",
		species: "Profound Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 322407,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 69,
		c: 38,
		e: 2,
		a: 31,
		n: 27
	},
	{
		id: "caonlekr",
		given: "Caonlekr",
		family: "Keyrordarxroo",
		species: "High Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 340303,
		aptitudes: [{
			name: "Fitness",
			xp: 50
		}],
		o: 81,
		c: 39,
		e: 65,
		a: 8,
		n: 87
	},
	{
		id: "arsamehafa",
		given: "Arsamehafa",
		family: "Bareltarleean",
		species: "Profound Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 345053,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 51,
		c: 30,
		e: 26,
		a: 73,
		n: 2,
		note: "Лёд гамми. N2. Jetjet с Ooniseth."
	},
	{
		id: "aniruuddh",
		given: "Aniruuddh",
		family: "Xorecrowntar",
		species: "Profound Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 356750,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 58,
		c: 2,
		e: 55,
		a: 51,
		n: 86,
		note: "C2 N86. Не штурвал."
	},
	{
		id: "paakroonee",
		given: "Paakroonee",
		family: "Ethuloanthal",
		species: "Profound Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 415013,
		aptitudes: [{
			name: "Hospitality",
			xp: 50
		}],
		o: 79,
		c: 73,
		e: 66,
		a: 20,
		n: 66
	},
	{
		id: "qaethian",
		given: "Qaethian",
		family: "Vasbrooroy",
		species: "Profound Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 432543,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 36,
		c: 93,
		e: 67,
		a: 70,
		n: 28,
		university: "ONI Institute",
		age: 38
	},
	{
		id: "horranepheer",
		given: "Horranepheer",
		family: "Vorterotheo",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 440240,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 10,
		c: 99,
		e: 97,
		a: 2,
		n: 93,
		note: "Чеклист 99, паника 93."
	},
	{
		id: "iansapha",
		given: "Iansapha",
		family: "Aalkmesphin",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 442047,
		aptitudes: [{
			name: "Fitness",
			xp: 50
		}],
		o: 95,
		c: 82,
		e: 95,
		a: 96,
		n: 75
	},
	{
		id: "labruuphka",
		given: "Labruuphka",
		family: "Inthoshallriv",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 442349,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 32,
		c: 50,
		e: 79,
		a: 7,
		n: 83
	},
	{
		id: "zelna",
		given: "Zelna",
		family: "Exinado",
		species: "Sogmian",
		sex: "Female",
		official: "Common",
		tensorRank: 445389,
		aptitudes: [{
			name: "Command",
			xp: 50
		}],
		o: 96,
		c: 1,
		e: 74,
		a: 34,
		n: 38,
		house: "Exinado",
		note: "Command major. C1 — только с XO."
	},
	{
		id: "koben",
		given: "Koben",
		family: "Outro",
		species: "Sogmian",
		sex: "Male",
		official: "Common",
		tensorRank: 454539,
		aptitudes: [{
			name: "Command",
			xp: 50
		}],
		o: 55,
		c: 41,
		e: 17,
		a: 44,
		n: 75,
		university: "ONI Institute",
		age: 32,
		house: "Outro",
		note: "Кэп-1. Command major."
	},
	{
		id: "norina",
		given: "Norina",
		family: "Xictus",
		species: "Sogmian",
		sex: "Female",
		official: "Common",
		tensorRank: 455950,
		aptitudes: [{
			name: "Hospitality",
			xp: 50
		}],
		o: 48,
		c: 80,
		e: 23,
		a: 92,
		n: 62,
		university: "ONI Institute",
		age: 31,
		house: "Xictus"
	},
	{
		id: "yandor",
		given: "Yandor",
		family: "Xictus",
		species: "Sogmian",
		sex: "Male",
		official: "Common",
		tensorRank: 457018,
		aptitudes: [{
			name: "Hospitality",
			xp: 50
		}],
		o: 18,
		c: 62,
		e: 50,
		a: 5,
		n: 96,
		house: "Xictus",
		note: "N96. Камбуз, не мостик."
	},
	{
		id: "paalthar",
		given: "Paalthar",
		family: "Ardroraquxroo",
		species: "High Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 466746,
		aptitudes: [{
			name: "Science",
			xp: 50
		}],
		o: 57,
		c: 28,
		e: 56,
		a: 15,
		n: 86,
		university: "ONI Institute",
		age: 32
	},
	{
		id: "uraiwatica",
		given: "Uraiwatica",
		family: "Inthelwoodton",
		species: "Profound Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 502627,
		aptitudes: [{
			name: "Medical",
			xp: 50
		}],
		o: 81,
		c: 94,
		e: 33,
		a: 3,
		n: 78,
		university: "ONI Institute",
		age: 35
	},
	{
		id: "armalius",
		given: "Armalius",
		family: "Busan",
		species: "Sogmian",
		sex: "Male",
		official: "Common",
		tensorRank: 504480,
		aptitudes: [{
			name: "Engineering",
			xp: 50
		}],
		o: 35,
		c: 38,
		e: 18,
		a: 49,
		n: 77,
		house: "Busan"
	},
	{
		id: "convog",
		given: "Convog",
		family: "",
		species: "Ustur",
		sex: "Body 1",
		official: "Common",
		tensorRank: 543287,
		aptitudes: [{
			name: "Science",
			xp: 50
		}],
		o: 58,
		c: 58,
		e: 51,
		a: 16,
		n: 6,
		ustur: ".tchr",
		note: "Спокойный робот-учёный. N6."
	},
	{
		id: "qaethpaondaja",
		given: "Qaethpaondaja",
		family: "Ilathiaill",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 555287,
		aptitudes: [{
			name: "Engineering",
			xp: 50
		}],
		o: 43,
		c: 12,
		e: 47,
		a: 62,
		n: 5,
		note: "Лёд. C12."
	},
	{
		id: "hareoe",
		given: "Hareoe",
		family: "",
		species: "Ustur",
		sex: "Body 1",
		official: "Common",
		tensorRank: 575818,
		aptitudes: [{
			name: "Medical",
			xp: 50
		}],
		o: 78,
		c: 92,
		e: 75,
		a: 42,
		n: 92,
		university: "Ustur Central University",
		age: 26,
		ustur: ".bod",
		note: "Медик-запас. N92."
	},
	{
		id: "bandoz",
		given: "Bandoz",
		family: "",
		species: "Ustur",
		sex: "Body 1",
		official: "Common",
		tensorRank: 677252,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 62,
		c: 78,
		e: 63,
		a: 2,
		n: 87,
		university: "Ustur Central University",
		age: 22,
		ustur: ".bod",
		note: "Не штурвал. N87 A2."
	},
	{
		id: "bocoqebu",
		given: "Bocoqebu",
		family: "Bayou Valel",
		species: "Mierese",
		sex: "Male",
		official: "Common",
		tensorRank: 700727,
		aptitudes: [{
			name: "Engineering",
			xp: 50
		}],
		o: 46,
		c: 37,
		e: 66,
		a: 59,
		n: 29,
		university: "ONI Institute",
		age: 30
	},
	{
		id: "tavia",
		given: "Tavia",
		family: "Outro",
		species: "Sogmian",
		sex: "Female",
		official: "Common",
		tensorRank: 850523,
		aptitudes: [{
			name: "Science",
			xp: 50
		}],
		o: 27,
		c: 84,
		e: 83,
		a: 21,
		n: 38,
		university: "ONI Institute",
		age: 40,
		house: "Outro"
	},
	{
		id: "rousseau",
		given: "Rousseau",
		family: "Varonis",
		species: "Human",
		sex: "Male",
		official: "Common",
		tensorRank: 973543,
		aptitudes: [{
			name: "Operator",
			xp: 50
		}],
		o: 68,
		c: 1,
		e: 93,
		a: 57,
		n: 81,
		university: "MUD Academy",
		age: 42,
		note: "C1. Не автоматика."
	},
	{
		id: "rhumoj",
		given: "Rhumoj",
		family: "",
		species: "Ustur",
		sex: "Body 1",
		official: "Common",
		tensorRank: 1117803,
		aptitudes: [{
			name: "Medical",
			xp: 50
		}],
		o: 84,
		c: 60,
		e: 86,
		a: 75,
		n: 62,
		ustur: ".tchr",
		note: "Лид-медик."
	},
	{
		id: "estevess",
		given: "Estevess",
		family: "Silvio",
		species: "Human",
		sex: "Male",
		official: "Common",
		tensorRank: 1122056,
		aptitudes: [{
			name: "Engineering",
			xp: 50
		}],
		o: 38,
		c: 46,
		e: 80,
		a: 31,
		n: 30,
		university: "MUD Academy",
		age: 35,
		note: "Человек-инж. Дреды."
	},
	{
		id: "javictorn",
		given: "Ja Victorn",
		family: "",
		species: "Human",
		sex: "Male",
		official: "Common",
		tensorRank: 1140687,
		aptitudes: [{
			name: "Operator",
			xp: 50
		}],
		o: 45,
		c: 98,
		e: 52,
		a: 59,
		n: 71,
		note: "C98. Орудия с Deceon."
	},
	{
		id: "pricer",
		given: "Pricer",
		family: "",
		species: "Ustur",
		sex: "Body 2",
		official: "Common",
		tensorRank: 1157724,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 8,
		c: 53,
		e: 84,
		a: 90,
		n: 25,
		university: "Ustur Central University",
		age: 26,
		ustur: ".doer",
		note: "Спокойный робот-пилот."
	},
	{
		id: "baleof",
		given: "Baleof",
		family: "",
		species: "Ustur",
		sex: "Body 1",
		official: "Common",
		tensorRank: 1210532,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 14,
		c: 49,
		e: 80,
		a: 45,
		n: 45,
		ustur: ".doer"
	},
	{
		id: "bracix",
		given: "Bracix",
		family: "",
		species: "Ustur",
		sex: "Body 1",
		official: "Common",
		tensorRank: 1213145,
		aptitudes: [{
			name: "Science",
			xp: 50
		}],
		o: 34,
		c: 59,
		e: 2,
		a: 0,
		n: 6,
		ustur: ".lrnr",
		note: "A0 N6. Станция с Convog."
	},
	{
		id: "pelir",
		given: "Pelir",
		family: "Kaanni Jura",
		species: "Mierese",
		sex: "Female",
		official: "Common",
		tensorRank: 1230130,
		aptitudes: [{
			name: "Science",
			xp: 50
		}],
		o: 36,
		c: 10,
		e: 70,
		a: 61,
		n: 38,
		university: "ONI Institute",
		age: 20
	},
	{
		id: "nazim",
		given: "Nazim",
		family: "Faipor",
		species: "Human",
		sex: "Male",
		official: "Common",
		tensorRank: 1260840,
		aptitudes: [{
			name: "Science",
			xp: 50
		}],
		o: 82,
		c: 72,
		e: 46,
		a: 38,
		n: 75,
		note: "Дреды. Учёный."
	},
	{
		id: "unkiai",
		given: "Unkiai",
		family: "",
		species: "Ustur",
		sex: "Body 1",
		official: "Common",
		tensorRank: 1462472,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 74,
		c: 80,
		e: 58,
		a: 31,
		n: 31,
		university: "Ustur Central University",
		age: 38,
		ustur: ".bod",
		note: "Лучший робот-пилот. N31 C80."
	}
];
var CREW_ADDITIONS = [
	{
		id: "phulelonva",
		given: "Phulelonva",
		family: "Arianzirfiro",
		species: "Profound Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 187866,
		aptitudes: [{
			name: "Engineering",
			xp: 50
		}],
		o: 5,
		c: 10,
		e: 38,
		a: 95,
		n: 21,
		university: "ONI Institute",
		age: 31,
		note: "Помощник Raurtawa. N21, C10 — не один с чипами."
	},
	{
		id: "uusathar",
		given: "Uusathar",
		family: "Rathianaelhor",
		species: "Profound Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 305405,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 8,
		c: 42,
		e: 99,
		a: 42,
		n: 9,
		note: "Лучшая новая гамми-палка. N9 E99."
	},
	{
		id: "anbeloon",
		given: "Anbeloon",
		family: "Rathumbarjor",
		species: "High Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 342405,
		aptitudes: [{
			name: "Medical",
			xp: 50
		}],
		o: 96,
		c: 59,
		e: 25,
		a: 14,
		n: 67,
		note: "Запас госпиталя. N67."
	},
	{
		id: "aaveortearsi",
		given: "Aaveortearsi",
		family: "Rinthuscarard",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 345385,
		aptitudes: [{
			name: "Operator",
			xp: 50
		}],
		o: 94,
		c: 77,
		e: 60,
		a: 95,
		n: 78,
		note: "Ангар. C77 но N78 — не засада."
	},
	{
		id: "urtelaorilve",
		given: "Urtelaorilve",
		family: "Ethannirari",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 356135,
		aptitudes: [{
			name: "Operator",
			xp: 50
		}],
		o: 56,
		c: 12,
		e: 98,
		a: 68,
		n: 14,
		university: "ONI Institute",
		age: 30,
		note: "Спокойный оператор. C12 — рядом кэп."
	},
	{
		id: "raurtawa",
		given: "Raurtawa",
		family: "Zolamontvish",
		species: "Profound Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 401586,
		aptitudes: [{
			name: "Engineering",
			xp: 50
		}],
		o: 8,
		c: 73,
		e: 89,
		a: 32,
		n: 37,
		note: "Ремонт Ustur. Лучший новый инж-гамми."
	},
	{
		id: "sena",
		given: "Sena",
		family: "Lutavira",
		species: "Sogmian",
		sex: "Female",
		official: "Uncommon",
		tensorRank: 411584,
		aptitudes: [{
			name: "Fitness",
			xp: 50
		}, {
			name: "Hospitality",
			xp: 25
		}],
		o: 23,
		c: 26,
		e: 41,
		a: 63,
		n: 87,
		house: "Lutavira",
		note: "N87. Высадка/камбуз, не мостик. Дом Yuma."
	},
	{
		id: "shimadair",
		given: "Shimadair",
		family: "Xeny",
		species: "Human",
		sex: "Female",
		official: "Uncommon",
		tensorRank: 431142,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}, {
			name: "Medical",
			xp: 25
		}],
		o: 1,
		c: 75,
		e: 32,
		a: 17,
		n: 30,
		university: "MUD Academy",
		age: 32,
		note: "Лампа-2. O1 закрытая. Полёт + аптечка."
	},
	{
		id: "laraellipa",
		given: "Laraellipa",
		family: "Milelliethio",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 432595,
		aptitudes: [{
			name: "Operator",
			xp: 50
		}],
		o: 56,
		c: 24,
		e: 24,
		a: 44,
		n: 27,
		university: "ONI Institute",
		age: 37,
		note: "Запас Туфы / база."
	},
	{
		id: "viurneca",
		given: "Viurneca",
		family: "Oleaantheokar",
		species: "Profound Punaab",
		sex: "Female",
		official: "Common",
		tensorRank: 442185,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 69,
		c: 51,
		e: 84,
		a: 9,
		n: 82,
		note: "Проба лампа-1. N82 — не именной штурвал."
	},
	{
		id: "yarrindilpho",
		given: "Yarrindilpho",
		family: "Etheoolopoll",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 442540,
		aptitudes: [{
			name: "Operator",
			xp: 50
		}],
		o: 12,
		c: 52,
		e: 86,
		a: 89,
		n: 68,
		note: "Проба лампа-1. N68."
	},
	{
		id: "taakorinthilo",
		given: "Taakorinthilo",
		family: "Vrooxylathio",
		species: "High Punaab",
		sex: "Male",
		official: "Common",
		tensorRank: 499850,
		aptitudes: [{
			name: "Flight",
			xp: 50
		}],
		o: 95,
		c: 48,
		e: 40,
		a: 47,
		n: 69,
		note: "Запас пробы. N69."
	},
	{
		id: "elizondo",
		given: "Elizondo",
		family: "Menkabi",
		species: "Human",
		sex: "Female",
		official: "Uncommon",
		tensorRank: 505007,
		aptitudes: [{
			name: "Hospitality",
			xp: 50
		}, {
			name: "Operator",
			xp: 25
		}],
		o: 62,
		c: 63,
		e: 32,
		a: 47,
		n: 62,
		university: "MUD Academy",
		age: 35,
		note: "Кухня ONI CSS + операторка. Не корпус Туфы."
	},
	{
		id: "takedaani",
		given: "Takedaani",
		family: "Elvira",
		species: "Human",
		sex: "Female",
		official: "Uncommon",
		tensorRank: 577280,
		aptitudes: [{
			name: "Medical",
			xp: 50
		}, {
			name: "Flight",
			xp: 25
		}],
		o: 39,
		c: 83,
		e: 36,
		a: 8,
		n: 28,
		university: "MUD Academy",
		age: 27,
		note: "Госпиталь CSS, второй слот лампы-2. Зеркало Shimadair."
	},
	{
		id: "trovam",
		given: "Trovam",
		family: "",
		species: "Ustur",
		sex: "Body 2",
		official: "Uncommon",
		tensorRank: null,
		aptitudes: [{
			name: "Hospitality",
			xp: 50
		}, {
			name: "Engineering",
			xp: 25
		}],
		o: 78,
		c: 35,
		e: 23,
		a: 55,
		n: 60,
		university: "Ustur Central University",
		age: 39,
		ustur: ".idtt",
		note: "Ustur не спит. Камбуз CSS + ремонт роботов (инж, не медик). C35 — кухню не держит один, рядом Elizondo."
	}
];
var CREW = [...CREW_CORE, ...CREW_ADDITIONS].sort((a, b) => (a.tensorRank ?? 9e9) - (b.tensorRank ?? 9e9));
var KEY$1 = "galia-crew-stars";
function loadStars() {
	try {
		const raw = localStorage.getItem(KEY$1);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveStars(ids) {
	localStorage.setItem(KEY$1, JSON.stringify(ids));
}
var PACKETS = {
	koben: "Jetjet-1",
	seraimal: "Jetjet-1",
	shimadair: "Jetjet-2",
	takedaani: "Jetjet-2",
	uusathar: "Jetjet-3",
	urtelaorilve: "Jetjet-3",
	viurneca: "Проба-1",
	yarrindilpho: "Проба-1",
	taakorinthilo: "Проба запас",
	ooniseth: "Jetjet Ooniseth",
	arsamehafa: "Jetjet Ooniseth",
	deceon: "Tufa (проект)",
	tavia: "Tufa (проект)",
	laraellipa: "Tufa запас",
	pricer: "Chi гараж",
	raurtawa: "CSS инж",
	phulelonva: "CSS инж",
	elizondo: "CSS камбуз",
	trovam: "CSS камбуз",
	anbeloon: "CSS госпиталь",
	aaveortearsi: "CSS ангар"
};
function packetOf(id) {
	return PACKETS[id] ?? null;
}
var ITEMS = [
	{
		to: "/",
		id: "map",
		Icon: Compass,
		label: "Карта"
	},
	{
		to: "/crew",
		id: "crew",
		Icon: Users,
		label: "Экипаж"
	},
	{
		to: "/ships",
		id: "ships",
		Icon: Ship,
		label: "Флот"
	},
	{
		to: "/market",
		id: "market",
		Icon: ChartLine,
		label: "Рынок"
	},
	{
		to: "/wallet",
		id: "wallet",
		Icon: Wallet,
		label: "Сейф"
	}
];
function AppNav({ current, variant = "bar" }) {
	if (variant === "dock") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md",
		children: ITEMS.map(({ to, id, Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: `flex h-14 min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 font-display text-xs tracking-wide ${current === id ? "text-fg" : "text-muted"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `size-4 ${current === id ? "text-brass" : "text-faint"}` }), label]
		}, id))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex items-center gap-1 rounded-xl border border-line bg-surface/90 p-1 backdrop-blur-md",
		children: ITEMS.map(({ to, id, Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: `flex h-11 min-w-11 items-center justify-center gap-2 rounded-lg px-2.5 font-display text-sm tracking-wide transition-colors duration-150 ${current === id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden lg:inline",
				children: label
			})]
		}, id))
	});
}
var ship_media_default = /*#__PURE__*/ JSON.parse("[{\"id\":\"jetjet\",\"name\":\"Opal Jetjet\",\"size\":\"x-small\",\"spec\":\"racer\",\"rarity\":\"uncommon\",\"maker\":\"Opal\",\"length\":11.4,\"crew\":2,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1}],\"images\":[\"/ships/jetjet/0.jpg\",\"/ships/jetjet/product.jpg\",\"/ships/jetjet/1.jpg\",\"/ships/jetjet/2.jpg\",\"/ships/jetjet/3.jpg\",\"/ships/jetjet/4.jpg\",\"/ships/jetjet/5.jpg\",\"/ships/jetjet/6.jpg\"]},{\"id\":\"greenader\",\"name\":\"Fimbul ECOS Greenader\",\"size\":\"large\",\"spec\":\"bomber\",\"rarity\":\"epic\",\"maker\":\"Fimbul ECOS\",\"length\":131,\"crew\":20,\"crewSlots\":[{\"type\":\"Captain\",\"n\":1},{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1},{\"type\":\"Engineering Officer\",\"n\":1},{\"type\":\"Medical Officer\",\"n\":1},{\"type\":\"Science Officer\",\"n\":1},{\"type\":\"Security Officer\",\"n\":4},{\"type\":\"Rig Operator\",\"n\":1},{\"type\":\"Weapons Operator\",\"n\":6},{\"type\":\"Operations Foreman\",\"n\":1},{\"type\":\"Janitor\",\"n\":2}],\"images\":[\"/ships/greenader/0.jpg\",\"/ships/greenader/product.jpg\",\"/ships/greenader/1.jpg\",\"/ships/greenader/2.jpg\",\"/ships/greenader/3.jpg\",\"/ships/greenader/4.jpg\",\"/ships/greenader/5.jpg\",\"/ships/greenader/6.jpg\",\"/ships/greenader/7.jpg\",\"/ships/greenader/8.jpg\",\"/ships/greenader/9.jpg\",\"/ships/greenader/10.jpg\",\"/ships/greenader/11.jpg\",\"/ships/greenader/12.jpg\",\"/ships/greenader/13.jpg\",\"/ships/greenader/14.jpg\",\"/ships/greenader/15.jpg\",\"/ships/greenader/16.jpg\",\"/ships/greenader/17.jpg\",\"/ships/greenader/18.jpg\",\"/ships/greenader/19.jpg\",\"/ships/greenader/20.jpg\",\"/ships/greenader/21.jpg\",\"/ships/greenader/22.jpg\",\"/ships/greenader/23.jpg\",\"/ships/greenader/24.jpg\",\"/ships/greenader/25.jpg\",\"/ships/greenader/26.jpg\",\"/ships/greenader/27.jpg\"]},{\"id\":\"r8\",\"name\":\"Pearce R8\",\"size\":\"large\",\"spec\":\"refuel/repair\",\"rarity\":\"epic\",\"maker\":\"Pearce\",\"length\":140,\"crew\":15,\"crewSlots\":[{\"type\":\"Captain\",\"n\":1},{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1},{\"type\":\"Engineering Officer\",\"n\":2},{\"type\":\"Science Officer\",\"n\":1},{\"type\":\"Security Officer\",\"n\":2},{\"type\":\"Rig Operator\",\"n\":3},{\"type\":\"Weapons Operator\",\"n\":2},{\"type\":\"Operations Foreman\",\"n\":1},{\"type\":\"Janitor\",\"n\":1}],\"images\":[\"/ships/r8/0.jpg\",\"/ships/r8/product.jpg\",\"/ships/r8/1.jpg\",\"/ships/r8/2.jpg\",\"/ships/r8/3.jpg\",\"/ships/r8/4.jpg\",\"/ships/r8/5.jpg\",\"/ships/r8/6.jpg\",\"/ships/r8/7.jpg\",\"/ships/r8/8.jpg\",\"/ships/r8/9.jpg\",\"/ships/r8/10.jpg\",\"/ships/r8/11.jpg\",\"/ships/r8/12.jpg\",\"/ships/r8/13.jpg\",\"/ships/r8/14.jpg\",\"/ships/r8/15.jpg\",\"/ships/r8/16.jpg\",\"/ships/r8/17.jpg\"]},{\"id\":\"chi\",\"name\":\"Rainbow Chi\",\"size\":\"small\",\"spec\":\"fighter\",\"rarity\":\"epic\",\"maker\":\"Rainbow\",\"length\":35,\"crew\":1,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1}],\"images\":[\"/ships/chi/0.jpg\",\"/ships/chi/product.jpg\",\"/ships/chi/1.jpg\",\"/ships/chi/2.jpg\",\"/ships/chi/3.jpg\",\"/ships/chi/4.jpg\",\"/ships/chi/5.jpg\",\"/ships/chi/6.jpg\",\"/ships/chi/7.jpg\",\"/ships/chi/8.jpg\",\"/ships/chi/9.jpg\",\"/ships/chi/10.jpg\",\"/ships/chi/11.jpg\"]},{\"id\":\"om\",\"name\":\"Rainbow Om\",\"size\":\"medium\",\"spec\":\"freighter\",\"rarity\":\"epic\",\"maker\":\"Rainbow\",\"length\":38.5,\"crew\":4,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1},{\"type\":\"Weapons Operator\",\"n\":2}],\"images\":[\"/ships/om/0.jpg\",\"/ships/om/product.jpg\",\"/ships/om/1.jpg\",\"/ships/om/2.jpg\",\"/ships/om/3.jpg\",\"/ships/om/4.jpg\",\"/ships/om/5.jpg\",\"/ships/om/6.jpg\",\"/ships/om/7.jpg\",\"/ships/om/8.jpg\"]},{\"id\":\"compakt\",\"name\":\"Calico Compakt Hero\",\"size\":\"medium\",\"spec\":\"multi-role\",\"rarity\":\"rare\",\"maker\":\"Calico\",\"length\":46.6,\"crew\":4,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1},{\"type\":\"Weapons Operator\",\"n\":2}],\"images\":[\"/ships/compakt/0.jpg\",\"/ships/compakt/product.jpg\",\"/ships/compakt/1.jpg\",\"/ships/compakt/2.jpg\",\"/ships/compakt/3.jpg\",\"/ships/compakt/4.jpg\",\"/ships/compakt/5.jpg\",\"/ships/compakt/6.jpg\",\"/ships/compakt/7.jpg\",\"/ships/compakt/8.jpg\",\"/ships/compakt/9.jpg\",\"/ships/compakt/10.jpg\",\"/ships/compakt/11.jpg\",\"/ships/compakt/12.jpg\",\"/ships/compakt/13.jpg\",\"/ships/compakt/14.jpg\",\"/ships/compakt/15.jpg\",\"/ships/compakt/16.jpg\",\"/ships/compakt/17.jpg\",\"/ships/compakt/18.jpg\"]},{\"id\":\"x4\",\"name\":\"Pearce X4\",\"size\":\"xx-small\",\"spec\":\"fighter\",\"rarity\":\"common\",\"maker\":\"Pearce\",\"length\":5,\"crew\":1,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1}],\"images\":[\"/ships/x4/0.jpg\",\"/ships/x4/product.jpg\",\"/ships/x4/1.jpg\",\"/ships/x4/2.jpg\",\"/ships/x4/3.jpg\",\"/ships/x4/4.jpg\",\"/ships/x4/5.jpg\",\"/ships/x4/6.jpg\",\"/ships/x4/7.jpg\",\"/ships/x4/8.jpg\",\"/ships/x4/9.jpg\",\"/ships/x4/10.jpg\",\"/ships/x4/11.jpg\"]},{\"id\":\"tufa\",\"name\":\"Tufa Feist\",\"size\":\"small\",\"spec\":\"fighter\",\"rarity\":\"epic\",\"maker\":\"Tufa\",\"length\":20.9,\"crew\":2,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1}],\"images\":[\"/ships/tufa/0.jpg\",\"/ships/tufa/product.jpg\",\"/ships/tufa/1.jpg\",\"/ships/tufa/2.jpg\",\"/ships/tufa/3.jpg\",\"/ships/tufa/4.jpg\",\"/ships/tufa/5.jpg\",\"/ships/tufa/6.jpg\",\"/ships/tufa/7.jpg\",\"/ships/tufa/8.jpg\",\"/ships/tufa/9.jpg\",\"/ships/tufa/10.jpg\"]},{\"id\":\"airbike\",\"name\":\"Fimbul Airbike\",\"size\":\"xx-small\",\"spec\":\"racer\",\"rarity\":\"common\",\"maker\":\"Fimbul\",\"length\":3.3,\"crew\":1,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1}],\"images\":[\"/ships/airbike/0.jpg\",\"/ships/airbike/product.jpg\",\"/ships/airbike/1.jpg\",\"/ships/airbike/2.jpg\",\"/ships/airbike/3.jpg\",\"/ships/airbike/4.jpg\",\"/ships/airbike/5.jpg\",\"/ships/airbike/6.jpg\",\"/ships/airbike/7.jpg\",\"/ships/airbike/8.jpg\",\"/ships/airbike/9.jpg\",\"/ships/airbike/10.jpg\",\"/ships/airbike/11.jpg\",\"/ships/airbike/12.jpg\",\"/ships/airbike/13.jpg\",\"/ships/airbike/14.jpg\",\"/ships/airbike/15.jpg\",\"/ships/airbike/16.jpg\",\"/ships/airbike/17.jpg\"]},{\"id\":\"unibomba\",\"name\":\"Fimbul ECOS Unibomba\",\"size\":\"xx-small\",\"spec\":\"bomber\",\"rarity\":\"epic\",\"maker\":\"Fimbul ECOS\",\"length\":4.67,\"crew\":1,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1}],\"images\":[\"/ships/unibomba/0.jpg\",\"/ships/unibomba/product.jpg\",\"/ships/unibomba/1.jpg\",\"/ships/unibomba/2.jpg\",\"/ships/unibomba/3.jpg\",\"/ships/unibomba/4.jpg\"]},{\"id\":\"arc\",\"name\":\"Rainbow Arc\",\"size\":\"large\",\"spec\":\"freighter\",\"rarity\":\"epic\",\"maker\":\"Rainbow\",\"length\":130,\"crew\":14,\"crewSlots\":[{\"type\":\"Captain\",\"n\":1},{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1},{\"type\":\"Engineering Officer\",\"n\":2},{\"type\":\"Security Officer\",\"n\":2},{\"type\":\"Rig Operator\",\"n\":1},{\"type\":\"Weapons Operator\",\"n\":2},{\"type\":\"Operations Foreman\",\"n\":3},{\"type\":\"Janitor\",\"n\":1}],\"images\":[\"/ships/arc/0.jpg\",\"/ships/arc/product.jpg\",\"/ships/arc/1.jpg\",\"/ships/arc/2.jpg\",\"/ships/arc/3.jpg\",\"/ships/arc/4.jpg\",\"/ships/arc/5.jpg\",\"/ships/arc/6.jpg\",\"/ships/arc/7.jpg\",\"/ships/arc/8.jpg\",\"/ships/arc/9.jpg\",\"/ships/arc/10.jpg\",\"/ships/arc/11.jpg\",\"/ships/arc/12.jpg\",\"/ships/arc/13.jpg\",\"/ships/arc/14.jpg\",\"/ships/arc/15.jpg\",\"/ships/arc/16.jpg\",\"/ships/arc/17.jpg\",\"/ships/arc/18.jpg\",\"/ships/arc/19.jpg\",\"/ships/arc/20.jpg\",\"/ships/arc/21.jpg\",\"/ships/arc/22.jpg\"]},{\"id\":\"bitboat\",\"name\":\"Opal Bitboat\",\"size\":\"large\",\"spec\":\"transport\",\"rarity\":\"epic\",\"maker\":\"Opal\",\"length\":125,\"crew\":21,\"crewSlots\":[{\"type\":\"Captain\",\"n\":1},{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1},{\"type\":\"Engineering Officer\",\"n\":1},{\"type\":\"Medical Officer\",\"n\":1},{\"type\":\"Security Officer\",\"n\":4},{\"type\":\"Rig Operator\",\"n\":1},{\"type\":\"Weapons Operator\",\"n\":2},{\"type\":\"Operations Foreman\",\"n\":1},{\"type\":\"Hospitality Manager\",\"n\":2},{\"type\":\"Chef\",\"n\":1},{\"type\":\"Janitor\",\"n\":3},{\"type\":\"Mixologist\",\"n\":2}],\"images\":[\"/ships/bitboat/0.jpg\",\"/ships/bitboat/product.png\",\"/ships/bitboat/1.jpg\",\"/ships/bitboat/2.jpg\",\"/ships/bitboat/3.png\",\"/ships/bitboat/4.jpg\",\"/ships/bitboat/5.jpg\",\"/ships/bitboat/6.jpg\",\"/ships/bitboat/7.png\",\"/ships/bitboat/8.png\",\"/ships/bitboat/9.png\",\"/ships/bitboat/10.png\",\"/ships/bitboat/11.png\"]},{\"id\":\"sunpaa\",\"name\":\"Ogrika Sunpaa\",\"size\":\"large\",\"spec\":\"freighter\",\"rarity\":\"epic\",\"maker\":\"Ogrika\",\"length\":128,\"crew\":19,\"crewSlots\":[{\"type\":\"Captain\",\"n\":1},{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1},{\"type\":\"Engineering Officer\",\"n\":2},{\"type\":\"Medical Officer\",\"n\":1},{\"type\":\"Security Officer\",\"n\":3},{\"type\":\"Rig Operator\",\"n\":1},{\"type\":\"Weapons Operator\",\"n\":4},{\"type\":\"Operations Foreman\",\"n\":3},{\"type\":\"Janitor\",\"n\":1},{\"type\":\"Mixologist\",\"n\":1}],\"images\":[\"/ships/sunpaa/0.jpg\",\"/ships/sunpaa/product.jpg\",\"/ships/sunpaa/1.jpg\",\"/ships/sunpaa/2.jpg\",\"/ships/sunpaa/3.jpg\",\"/ships/sunpaa/4.jpg\",\"/ships/sunpaa/5.jpg\",\"/ships/sunpaa/6.jpg\",\"/ships/sunpaa/7.jpg\",\"/ships/sunpaa/8.jpg\",\"/ships/sunpaa/9.jpg\",\"/ships/sunpaa/10.jpg\",\"/ships/sunpaa/11.jpg\",\"/ships/sunpaa/12.jpg\",\"/ships/sunpaa/13.jpg\",\"/ships/sunpaa/14.jpg\",\"/ships/sunpaa/15.jpg\",\"/ships/sunpaa/16.jpg\",\"/ships/sunpaa/17.jpg\",\"/ships/sunpaa/18.jpg\"]},{\"id\":\"mamba-ex\",\"name\":\"Fimbul Mamba EX\",\"size\":\"medium\",\"spec\":\"bounty hunter\",\"rarity\":\"epic\",\"maker\":\"Fimbul\",\"length\":43,\"crew\":5,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1},{\"type\":\"Navigator\",\"n\":1},{\"type\":\"Security Officer\",\"n\":1},{\"type\":\"Weapons Operator\",\"n\":2}],\"images\":[\"/ships/mamba-ex/0.jpg\",\"/ships/mamba-ex/product.jpg\",\"/ships/mamba-ex/1.jpg\",\"/ships/mamba-ex/2.jpg\",\"/ships/mamba-ex/3.jpg\",\"/ships/mamba-ex/4.jpg\",\"/ships/mamba-ex/5.jpg\",\"/ships/mamba-ex/6.jpg\",\"/ships/mamba-ex/7.jpg\",\"/ships/mamba-ex/8.jpg\",\"/ships/mamba-ex/9.jpg\"]},{\"id\":\"ruch\",\"name\":\"Ogrika Ruch\",\"size\":\"xx-small\",\"spec\":\"racer\",\"rarity\":\"common\",\"maker\":\"Ogrika\",\"length\":11,\"crew\":1,\"crewSlots\":[{\"type\":\"Pilot\",\"n\":1}],\"images\":[\"/ships/ruch/0.jpg\",\"/ships/ruch/product.jpg\",\"/ships/ruch/1.jpg\",\"/ships/ruch/2.jpg\",\"/ships/ruch/3.jpg\",\"/ships/ruch/4.jpg\",\"/ships/ruch/5.jpg\",\"/ships/ruch/6.jpg\",\"/ships/ruch/7.jpg\",\"/ships/ruch/8.jpg\",\"/ships/ruch/9.jpg\",\"/ships/ruch/10.jpg\"]}]");
var SHIP_SIZES = [
	"XX-Small",
	"X-Small",
	"Small",
	"Medium",
	"Large"
];
var SIZE_SPAN = {
	"XX-Small": "4–8 м",
	"X-Small": "8–14 м",
	Small: "30–35 м",
	Medium: "42–55 м",
	Large: "60–130 м"
};
var SIZE_ABBR = {
	"XX-Small": "XXS",
	"X-Small": "XS",
	Small: "SML",
	Medium: "MED",
	Large: "LRG"
};
var SIZE_FROM = {
	"xx-small": "XX-Small",
	"x-small": "X-Small",
	small: "Small",
	medium: "Medium",
	large: "Large"
};
var OVERLAY = {
	airbike: {
		status: "owned",
		count: 5,
		supply: 375e3,
		fuel: 450,
		cargo: 86,
		scan: 4,
		note: "Глаза кромки. Не сдавать. Enyavana — высадка, не дрейф.",
		hulls: Array.from({ length: 5 }, (_, i) => ({
			id: `airbike-${i + 1}`,
			label: `Airbike ${i + 1}`,
			seats: [{
				role: "пилот",
				crewId: i === 0 ? "enyavana" : null
			}]
		}))
	},
	unibomba: {
		status: "owned",
		count: 1,
		supply: 275e3,
		fuel: 801,
		cargo: 2143,
		scan: 11,
		note: "Лёгкий бомбер в сарае. Не Greenader.",
		hulls: [{
			id: "unibomba-1",
			label: "Unibomba",
			seats: [{
				role: "пилот",
				crewId: null
			}]
		}]
	},
	ruch: {
		status: "watch",
		count: 0,
		supply: 375e3,
		note: "Гамми-гонщик Akenat. Не Niruch — Ruch, XX-Small common, 1 пилот."
	},
	x4: {
		status: "watch",
		count: 0,
		supply: 116508,
		note: "Maglev patrol COP. XX-Small fighter. Не лампа кромки."
	},
	jetjet: {
		status: "owned",
		count: 6,
		supply: 18805,
		fuel: 1797,
		cargo: 863,
		scan: 22,
		note: "Кромка UNI/ONI CSS. Не в аренду. Лампа-1 — проба слабых. Шесть бортов.",
		hulls: [
			{
				id: "jetjet-1",
				label: "Outro-1",
				seats: [{
					role: "кэп",
					crewId: "koben"
				}, {
					role: "штурвал",
					crewId: "seraimal"
				}]
			},
			{
				id: "jetjet-2",
				label: "MUD мед",
				seats: [{
					role: "штурвал",
					crewId: "shimadair"
				}, {
					role: "медик",
					crewId: "takedaani"
				}]
			},
			{
				id: "jetjet-3",
				label: "Гамми патруль",
				seats: [{
					role: "штурвал",
					crewId: "uusathar"
				}, {
					role: "оператор",
					crewId: "urtelaorilve"
				}]
			},
			{
				id: "jetjet-4",
				label: "Проба-1",
				seats: [{
					role: "штурвал",
					crewId: "viurneca"
				}, {
					role: "оператор",
					crewId: "yarrindilpho"
				}]
			},
			{
				id: "jetjet-5",
				label: "Ooniseth",
				seats: [{
					role: "оператор",
					crewId: "ooniseth"
				}, {
					role: "штурвал",
					crewId: "arsamehafa"
				}]
			},
			{
				id: "jetjet-6",
				label: "Резерв",
				seats: [{
					role: "штурвал",
					crewId: null
				}, {
					role: "второй",
					crewId: null
				}]
			}
		]
	},
	chi: {
		status: "garage",
		count: 1,
		supply: 8e3,
		fuel: 4023,
		cargo: 2464,
		scan: 82,
		note: "Лимитка в гараже. Fighter, не data runner. Не срывать.",
		hulls: [{
			id: "chi-1",
			label: "Chi",
			seats: [{
				role: "пилот",
				crewId: "pricer"
			}]
		}]
	},
	tufa: {
		status: "project",
		count: 0,
		supply: 7e3,
		fuel: 3193,
		cargo: 3214,
		scan: 161,
		note: "Epic fighter. Засада/дрейф. Оператор главный. Не с ядра.",
		hulls: [{
			id: "tufa-1",
			label: "Outro-наука",
			seats: [{
				role: "оператор",
				crewId: "deceon"
			}, {
				role: "наука",
				crewId: "tavia"
			}]
		}]
	},
	om: {
		status: "rent",
		count: 0,
		supply: 2122,
		fuel: 18661,
		cargo: 39332,
		scan: 64,
		note: "Конверт. В собственность не брать. Аренда только на жирный рейс >5k груза. 4 слота, не 5.",
		hulls: [{
			id: "om-rent",
			label: "Прокат",
			seats: [
				{
					role: "пилот",
					crewId: "deceon"
				},
				{
					role: "навигатор",
					crewId: "tavia"
				},
				{
					role: "орудия",
					crewId: null
				},
				{
					role: "орудия",
					crewId: null
				}
			]
		}]
	},
	"mamba-ex": {
		status: "watch",
		count: 0,
		supply: 5081,
		note: "Medium bounty hunter, 5 экипаж. Не large. Не в мини-флот кромки."
	},
	compakt: {
		status: "watch",
		count: 0,
		supply: 1233,
		note: "Calico Compakt Hero. Medium multi-role, 4 экипаж, 9 пассажиров."
	},
	arc: {
		status: "watch",
		count: 0,
		supply: 820,
		note: "Большой Rainbow-фрейтер. Архитектура, 14 экипаж. Не дом гамми — это Sunpaa."
	},
	sunpaa: {
		status: "watch",
		count: 0,
		supply: 1400,
		note: "Любимый большой корабль гамми. Ogrika luxury freighter, 19 экипаж."
	},
	r8: {
		status: "watch",
		count: 0,
		supply: 1200,
		note: "Заправщик/ремонт Pearce. Два бака + руки. 15 экипаж."
	},
	bitboat: {
		status: "watch",
		count: 0,
		supply: 1600,
		note: "Кит-доставщик. Large transport, 21 слот, 65 пассажиров. Виды, не бой."
	},
	greenader: {
		status: "watch",
		count: 0,
		supply: 772,
		note: "Большой момбер. Чиловый дом. Не Unibomba и не в мини-флот."
	}
};
var ORDER = [
	"airbike",
	"unibomba",
	"ruch",
	"x4",
	"jetjet",
	"chi",
	"tufa",
	"om",
	"mamba-ex",
	"compakt",
	"arc",
	"sunpaa",
	"r8",
	"bitboat",
	"greenader"
];
function titleSpec(s) {
	if (s === "refuel/repair") return "Refuel / Repair";
	if (s === "bounty hunter") return "Bounty Hunter";
	if (s === "multi-role") return "Multi-Role";
	return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
function titleWord(s) {
	return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
var SHIPS = ORDER.map((id) => {
	const m = ship_media_default.find((x) => x.id === id);
	const o = OVERLAY[id];
	if (!m || !o) throw new Error(`ship ${id}`);
	return {
		id,
		name: m.name,
		size: SIZE_FROM[m.size],
		spec: titleSpec(m.spec),
		rarity: titleWord(m.rarity),
		maker: m.maker,
		status: o.status,
		crew: m.crew,
		crewSlots: m.crewSlots,
		length: m.length,
		supply: o.supply ?? null,
		fuel: o.fuel ?? null,
		cargo: o.cargo ?? null,
		scan: o.scan ?? null,
		count: o.count,
		images: m.images,
		note: o.note,
		hulls: o.hulls ?? []
	};
});
var STATUS_LABEL = {
	owned: "в ангаре",
	garage: "гараж / лимитка",
	project: "проект",
	rent: "только аренда",
	watch: "витрина"
};
function formatSupply(n) {
	if (n == null) return "—";
	return n.toLocaleString("ru-RU");
}
/** ONI CSS hangs off Akenat's limb from the default camera — not a surface pin. */
var ONI_CSS_ORBIT = [
	2.38,
	.78,
	1.12
];
var MUD_CSS_ORBIT = [
	2.32,
	.7,
	1.18
];
var USTUR_CSS_ORBIT = [
	2.28,
	.82,
	1.05
];
var SYSTEMS = [
	{
		id: "oni",
		name: "ONI · Akenat",
		planet: "Akenat · Punaab homeworld",
		faction: "ONI",
		texture: "/textures/neptune.jpg",
		atmosphere: "#6ea8ff",
		sun: "#cfe4ff",
		lore: "SAGE C4: домашняя система ONI. Akenat — планета (гамми). ONI CSS — mothership 5+ км, висит на орбите, это не мир. Клеймы на грунт. Habs и крио — на станции.",
		markers: [
			{
				id: "oni-css",
				name: "ONI CSS",
				lat: 8,
				lng: 22,
				kind: "station",
				placement: "orbit",
				orbit: ONI_CSS_ORBIT,
				blurb: "Не планета — mothership 5+ км на орбите Akenat. Крио, верфь, habs. Лампа-1 отсюда."
			},
			{
				id: "oni-uni",
				name: "UNI крио",
				lat: 8,
				lng: 22,
				kind: "station",
				placement: "hab",
				orbit: ONI_CSS_ORBIT,
				blurb: "Жилые отсеки на CSS, не на Akenat. Именные пакеты спят. Upkeep ноль, пока флот не выведен."
			},
			{
				id: "oni-institute",
				name: "ONI Institute",
				lat: 8,
				lng: 24,
				kind: "yard",
				placement: "hab",
				orbit: ONI_CSS_ORBIT,
				blurb: "Универ на CSS. Koben, Seraimal, Tavia, Raurtawa. Не грунт планеты."
			},
			{
				id: "oni-akenat",
				name: "Akenat",
				lat: 12,
				lng: -28,
				kind: "port",
				placement: "surface",
				blurb: "Планета под станцией. Родина Punaab. Порт и клеймы — сюда. CSS над ней, не вместо неё."
			},
			{
				id: "oni-sz",
				name: "SZ кольцо",
				lat: 8,
				lng: 22,
				kind: "port",
				placement: "orbit",
				orbit: ONI_CSS_ORBIT,
				blurb: "Safe zone вокруг CSS, не вокруг планеты. Сюда лампа-1. Не MRZ."
			},
			{
				id: "oni-rakh",
				name: "Rakhinit",
				lat: -48,
				lng: -90,
				kind: "claim",
				placement: "surface",
				blurb: "Руда на грунте. Radiation absorber. Клейм на станцию не ставится."
			}
		]
	},
	{
		id: "mud",
		name: "MUD · Pearce",
		planet: "Pearce analog · Mars",
		faction: "MUD",
		texture: "/textures/mars.jpg",
		atmosphere: "#ff8a5c",
		sun: "#ffd2a8",
		lore: "Домашняя система MUD. Планета внизу, MUD CSS висит отдельно. Люди: Shimadair, Takedaani, Elizondo, Estevess.",
		markers: [
			{
				id: "mud-css",
				name: "MUD CSS",
				lat: 16,
				lng: -40,
				kind: "station",
				placement: "orbit",
				orbit: MUD_CSS_ORBIT,
				blurb: "Хабы людей. Своя станция в своей системе. Не путать с ONI CSS."
			},
			{
				id: "mud-pearce",
				name: "Pearce Yards",
				lat: 18.4,
				lng: -133,
				kind: "yard",
				placement: "surface",
				blurb: "X4. Скины ждут тел. Не первая цель."
			},
			{
				id: "mud-academy",
				name: "MUD Academy",
				lat: 16,
				lng: -40,
				kind: "yard",
				placement: "hab",
				orbit: MUD_CSS_ORBIT,
				blurb: "На MUD CSS. Shimadair Xeny и Takedaani Elvira — лампа-2."
			},
			{
				id: "mud-r4",
				name: "Claim R4",
				lat: -32,
				lng: -70,
				kind: "claim",
				placement: "surface",
				blurb: "T2 34 USDC — не с ядра. Клеймить раз в 4 дня или не брать."
			}
		]
	},
	{
		id: "ustur",
		name: "Ustur · Ioki",
		planet: "Ioki · Ustur homeworld",
		faction: "Ustur",
		texture: "/textures/venus.jpg",
		atmosphere: "#e8c07a",
		sun: "#ffe6b0",
		lore: "Ioki — родина роботов, не CSS. Ustur CSS на орбите. Season 0: вторжение Tufa на Ioki. Роботы не спят. Чинит инженер, не медик.",
		markers: [
			{
				id: "ustur-css",
				name: "Ustur CSS",
				lat: 10,
				lng: 20,
				kind: "station",
				placement: "orbit",
				orbit: USTUR_CSS_ORBIT,
				blurb: "Хабы роботов. Ночная смена патруля, пока гамми в крио. Не планета Ioki."
			},
			{
				id: "ustur-ucu",
				name: "Ustur Central University",
				lat: 10,
				lng: 20,
				kind: "yard",
				placement: "hab",
				orbit: USTUR_CSS_ORBIT,
				blurb: "На CSS. Pricer .doer — Chi, когда гараж проснётся."
			},
			{
				id: "ustur-ioki",
				name: "Ioki",
				lat: 41,
				lng: -72,
				kind: "port",
				placement: "surface",
				blurb: "Планета под CSS. Conquest: щит Ioki питают орбитальные станции."
			},
			{
				id: "ustur-chi",
				name: "Chi dock",
				lat: -22,
				lng: 100,
				kind: "station",
				placement: "hab",
				orbit: USTUR_CSS_ORBIT,
				blurb: "Rainbow Chi в гараже CSS. Small, 1 экипаж, бак 4023."
			}
		]
	},
	{
		id: "ecos",
		name: "ECOS Greenhold",
		planet: "Garden moon · Luna",
		faction: "ECOS",
		texture: "/textures/moon.jpg",
		atmosphere: "#b7d4c2",
		sun: "#e8f0e4",
		lore: "Fimbul. 5 Airbike + Unibomba. Не Greenader. CSS сюда не ставится.",
		markers: [{
			id: "ecos-fimbul",
			name: "Fimbul sheds",
			lat: 20,
			lng: 4,
			kind: "yard",
			placement: "surface",
			blurb: "5 Airbike на кромке. Не в аренду."
		}, {
			id: "ecos-unibomba",
			name: "Unibomba",
			lat: -8,
			lng: -52,
			kind: "port",
			placement: "surface",
			blurb: "XX-Small epic. В сарае."
		}]
	},
	{
		id: "hrz",
		name: "HRZ · ядро",
		planet: "Storm giant · Jupiter",
		faction: "HRZ",
		texture: "/textures/jupiter.jpg",
		atmosphere: "#d9b48a",
		sun: "#ffe0b8",
		lore: "Треугольник трёх фракций. CSS сюда не едет. Скаут байками, не именными.",
		markers: [{
			id: "hrz-gate",
			name: "HRZ gate",
			lat: 12,
			lng: -24,
			kind: "core",
			placement: "surface",
			blurb: "Не слать Tiora + Arlinasija вместе. Сначала байки."
		}, {
			id: "hrz-storm",
			name: "Шторм",
			lat: -22,
			lng: -80,
			kind: "core",
			placement: "surface",
			blurb: "Центр треугольника. Выше добыча, выше потеря NFT."
		}]
	}
];
var FACTION_TONE = {
	ONI: "#7f93c9",
	MUD: "#c45c4a",
	Ustur: "#c4a35a",
	ECOS: "#7fae8c",
	HRZ: "#9e8a70"
};
function markerKey(systemId, markerId) {
	return `${systemId}:${markerId}`;
}
function cssMarker(system) {
	return system.markers.find((m) => m.placement === "orbit" && m.kind === "station") ?? null;
}
var KEY = "galia-cartograph-favs-v1";
function loadFavorites() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
	} catch {
		return [];
	}
}
function saveFavorites(ids) {
	try {
		localStorage.setItem(KEY, JSON.stringify(ids));
	} catch {}
}
var LAST_KEY = "galia-last-export";
function stamp() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function buildSnapshot() {
	return {
		version: 1,
		app: "galia-crew-bay",
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		crew: CREW,
		packets: { ...PACKETS },
		ships: SHIPS.map((s) => ({
			id: s.id,
			name: s.name,
			size: s.size,
			spec: s.spec,
			rarity: s.rarity,
			maker: s.maker,
			status: s.status,
			crew: s.crew,
			count: s.count,
			supply: s.supply,
			note: s.note,
			hulls: s.hulls
		})),
		systems: SYSTEMS.map((s) => ({
			id: s.id,
			name: s.name,
			planet: s.planet,
			faction: s.faction,
			lore: s.lore,
			markers: s.markers.map((m) => ({
				id: m.id,
				name: m.name,
				kind: m.kind,
				placement: m.placement,
				blurb: m.blurb
			}))
		})),
		stars: typeof window === "undefined" ? [] : loadStars(),
		favorites: typeof window === "undefined" ? [] : loadFavorites()
	};
}
function snapshotJson(data) {
	return `${JSON.stringify(data, null, 2)}\n`;
}
function rememberExport() {
	try {
		localStorage.setItem(LAST_KEY, (/* @__PURE__ */ new Date()).toISOString());
	} catch {}
}
function lastExport() {
	try {
		return localStorage.getItem(LAST_KEY);
	} catch {
		return null;
	}
}
function downloadFile(filename, body, mime) {
	const blob = new Blob([body], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function esc(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function aptLine(c) {
	return c.aptitudes.map((a) => `${a.name} +${a.xp}`).join(" · ");
}
function catalogInner(data) {
	const when = new Date(data.exportedAt).toLocaleString("ru-RU");
	const crewRows = data.crew.map((c) => {
		const packet = data.packets[c.id] ?? "";
		return `<tr>
        <td>${esc(displayName(c))}</td>
        <td>${esc(c.species)} · ${esc(c.sex)}</td>
        <td>${esc(c.official)}</td>
        <td>${c.tensorRank == null ? "—" : `#${c.tensorRank.toLocaleString("en-US")}`}</td>
        <td>${esc(aptLine(c))}</td>
        <td>O${c.o} C${c.c} E${c.e} A${c.a} N${c.n}</td>
        <td>${esc(packet)}</td>
        <td>${esc(c.note ?? "")}</td>
      </tr>`;
	}).join("\n");
	const packetRows = Object.entries(data.packets).map(([id, label]) => {
		const c = data.crew.find((x) => x.id === id);
		return `<tr><td>${esc(c ? displayName(c) : id)}</td><td>${esc(label)}</td></tr>`;
	}).join("\n");
	const shipRows = data.ships.map((s) => {
		const hulls = s.hulls.map((h) => {
			const seats = h.seats.map((seat) => {
				const who = seat.crewId ? data.crew.find((c) => c.id === seat.crewId) : null;
				return `${esc(seat.role)}: ${who ? esc(displayName(who)) : "пусто"}`;
			}).join("; ");
			return `<li><strong>${esc(h.label)}</strong> — ${seats}</li>`;
		}).join("");
		return `<div class="galia-card">
        <p class="galia-name">${esc(s.name)}</p>
        <p class="galia-meta">${esc(SIZE_ABBR[s.size])} · ${esc(s.rarity)} · ${esc(s.spec)} · ${esc(STATUS_LABEL[s.status])}${s.count ? ` · ×${s.count}` : ""} · ${s.crew} экипаж</p>
        <p>${esc(s.note)}</p>
        ${hulls ? `<ul>${hulls}</ul>` : ""}
      </div>`;
	}).join("\n");
	const systemBlocks = data.systems.map((s) => {
		const marks = s.markers.map((m) => `<li><strong>${esc(m.name)}</strong> · ${esc(m.kind)} · ${esc(m.placement)} — ${esc(m.blurb)}</li>`).join("");
		return `<div class="galia-card">
        <p class="galia-name">${esc(s.name)}</p>
        <p class="galia-meta">${esc(s.faction)} · ${esc(s.planet)}</p>
        <p>${esc(s.lore)}</p>
        <ul>${marks}</ul>
      </div>`;
	}).join("\n");
	return `<div class="galia-head">
    <p class="galia-kicker">Star Atlas · снимок каталога</p>
    <p class="galia-title">Galia Crew Bay</p>
    <p class="galia-sub">Копия на ${esc(when)}. ${data.crew.length} экипаж · ${data.ships.length} судов. Живёт без приложения.</p>
  </div>
  <div class="galia-body">
    <p class="galia-h">Пакеты</p>
    <div class="galia-wrap">
      <table>
        <thead><tr><th>Кто</th><th>Борт / пост</th></tr></thead>
        <tbody>${packetRows}</tbody>
      </table>
    </div>
    <p class="galia-h">Экипаж</p>
    <div class="galia-wrap">
      <table>
        <thead>
          <tr>
            <th>Имя</th><th>Вид</th><th>Алмаз</th><th>Tensor</th>
            <th>Aptitudes</th><th>OCEAN</th><th>Пакет</th><th>Заметка</th>
          </tr>
        </thead>
        <tbody>${crewRows}</tbody>
      </table>
    </div>
    <p class="galia-h">Флот</p>
    ${shipRows}
    <p class="galia-h">Карта</p>
    ${systemBlocks}
  </div>
  <p class="galia-foot">WordPress: вставь этот блок в «Произвольный HTML», либо залей galia.html в корень сайта.</p>`;
}
var GALIA_CSS = `.galia-catalog{box-sizing:border-box;background:#07090e;color:#e8eef2;font:16px/1.5 "Segoe UI",system-ui,sans-serif;padding:0 0 2rem}
.galia-catalog *,.galia-catalog *::before,.galia-catalog *::after{box-sizing:border-box}
.galia-head{padding:2rem 1.25rem 1.5rem;border-bottom:1px solid rgba(232,238,242,.12)}
.galia-kicker{color:#c4a35a;font-size:.75rem;letter-spacing:.22em;text-transform:uppercase;margin:0 0 .35rem}
.galia-title{margin:0;font-size:2rem;font-weight:600;letter-spacing:.02em}
.galia-sub{color:#8b96a3;margin:.5rem 0 0;max-width:40rem}
.galia-body{padding:1.5rem 1.25rem 1rem;max-width:72rem;margin:0 auto}
.galia-h{color:#c4a35a;font-size:1.1rem;letter-spacing:.16em;text-transform:uppercase;margin:2.5rem 0 1rem;font-weight:600}
.galia-wrap{overflow-x:auto;border:1px solid rgba(232,238,242,.12);border-radius:10px;background:#10141c}
.galia-catalog table{width:100%;border-collapse:collapse;font-size:.85rem}
.galia-catalog th,.galia-catalog td{padding:.65rem .75rem;text-align:left;vertical-align:top;border-top:1px solid rgba(232,238,242,.12);color:#e8eef2}
.galia-catalog th{color:#5c6673;font-weight:600;background:#171d28;border-top:0}
.galia-card{border:1px solid rgba(232,238,242,.12);background:#10141c;border-radius:10px;padding:1rem 1.1rem;margin:0 0 .75rem;color:#e8eef2}
.galia-name{margin:0 0 .25rem;font-size:1.25rem;font-weight:600}
.galia-meta{color:#c4a35a;font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;margin:0 0 .5rem}
.galia-catalog ul{margin:.4rem 0 0;padding-left:1.1rem;color:#8b96a3}
.galia-foot{color:#5c6673;font-size:.8rem;padding:0 1.25rem 1rem;max-width:72rem;margin:0 auto}`;
function snapshotHtml(data) {
	const inner = catalogInner(data);
	return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Galia · каталог ${esc(stamp())}</title>
  <style>${GALIA_CSS}
body{margin:0;background:#07090e;color:#e8eef2}</style>
</head>
<body>
<div class="galia-catalog">
${inner}
</div>
</body>
</html>
`;
}
/** Fragment for WordPress Custom HTML block — no html/body, scoped styles. */
function snapshotWp(data) {
	return `<!-- Galia: Страницы → Добавить → блок «Произвольный HTML» → вставить всё. -->
<style>${GALIA_CSS}</style>
<div class="galia-catalog">
${catalogInner(data)}
</div>
`;
}
function applyBackup(raw) {
	if (!raw || typeof raw !== "object") return {
		ok: false,
		error: "Файл пустой или не JSON."
	};
	const data = raw;
	if (data.app && data.app !== "galia-crew-bay") return {
		ok: false,
		error: "Это не снимок Galia."
	};
	if (data.version != null && data.version !== 1) return {
		ok: false,
		error: `Версия ${String(data.version)} не подходит.`
	};
	if (Array.isArray(data.stars)) saveStars(data.stars.filter((x) => typeof x === "string"));
	if (Array.isArray(data.favorites)) saveFavorites(data.favorites.filter((x) => typeof x === "string"));
	rememberExport();
	return {
		ok: true,
		stars: Array.isArray(data.stars) ? data.stars.length : 0,
		favorites: Array.isArray(data.favorites) ? data.favorites.length : 0
	};
}
function ArchiveButton({ onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex size-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-line bg-surface font-display text-sm md:w-auto md:px-3",
		"aria-label": "Архив",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-4 text-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden md:inline",
			children: "Архив"
		})]
	});
}
function ArchivePanel({ onClose }) {
	const fileRef = (0, import_react.useRef)(null);
	const [status, setStatus] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const snap = buildSnapshot();
	const last = lastExport();
	function mark(ok) {
		rememberExport();
		setError(null);
		setStatus(ok);
	}
	function saveHtml() {
		downloadFile(`galia-${stamp()}.html`, snapshotHtml(snap), "text/html;charset=utf-8");
		mark("HTML-страница скачана. Залей в корень сайта → /galia.html");
	}
	function saveWp() {
		downloadFile(`galia-wordpress-${stamp()}.html`, snapshotWp(snap), "text/html;charset=utf-8");
		mark("Фрагмент WordPress скачан");
	}
	async function copyWp() {
		const text = snapshotWp(snap);
		try {
			await navigator.clipboard.writeText(text);
			mark("Скопировано. В WordPress: Страницы → Добавить → блок «Произвольный HTML» → вставить");
		} catch {
			downloadFile(`galia-wordpress-${stamp()}.html`, text, "text/html;charset=utf-8");
			mark("Буфер недоступен — скачал файл фрагмента");
		}
	}
	function saveJson() {
		downloadFile(`galia-${stamp()}.json`, snapshotJson(snap), "application/json");
		mark(`JSON · ${snap.crew.length} экипаж, ${snap.ships.length} судов`);
	}
	async function onFile(file) {
		if (!file) return;
		try {
			const text = await file.text();
			const result = applyBackup(JSON.parse(text));
			if (!result.ok) {
				setStatus(null);
				setError(result.error);
				return;
			}
			setError(null);
			setStatus(`Вернул звёзды ${result.stars} и метки карты ${result.favorites}`);
		} catch {
			setStatus(null);
			setError("Не разобрать JSON.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto fixed inset-0 z-50 bg-bg/70",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-x-0 bottom-14 max-h-[85vh] overflow-y-auto rounded-t-xl border border-line bg-surface text-fg md:inset-y-8 md:right-8 md:bottom-8 md:left-auto md:w-[30rem] md:rounded-xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-[0.18em] text-brass uppercase",
					children: "WordPress · HTML"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "На свой сайт"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "flex size-11 items-center justify-center rounded-md border border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: "Zip приложения в WordPress не ставится — это не плагин. Каталог кладётся страницей. Два пути:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "Файл HTML"
							}),
							" — в файловом менеджере хостинга положи",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-brass",
								children: "galia.html"
							}),
							" рядом с WordPress. Адрес: сайт/galia.html"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "Блок WordPress"
						}), " — Страницы → Добавить → «Произвольный HTML» → вставить фрагмент. Без скриптов, тему не ломает."] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-faint",
						children: [
							"Сейчас ",
							snap.crew.length,
							" карточек · ",
							snap.ships.length,
							" судов",
							last ? ` · съём ${new Date(last).toLocaleString("ru-RU")}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void copyWp(),
						className: "flex h-11 items-center justify-center gap-2 rounded-lg border border-brass-dim bg-surface-2 font-display text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4 text-brass" }), "Скопировать в WordPress"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: saveWp,
						className: "flex h-11 items-center justify-center gap-2 rounded-lg border border-line font-display text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4 text-brass" }), "Скачать фрагмент WP"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: saveHtml,
						className: "flex h-11 items-center justify-center gap-2 rounded-lg border border-line font-display text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4 text-brass" }), "Скачать HTML-страницу"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: saveJson,
						className: "flex h-11 items-center justify-center gap-2 rounded-lg border border-line font-display text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4 text-brass" }), "Скачать JSON"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json,.json",
						className: "hidden",
						onChange: (e) => {
							onFile(e.target.files?.[0]);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => fileRef.current?.click(),
						className: "flex h-11 items-center justify-center gap-2 rounded-lg border border-line font-display text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4 text-brass" }), "Загрузить JSON"]
					}),
					status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ok",
						children: status
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null
				]
			})]
		})
	});
}
//#endregion
export { mismatch as C, seats as D, saveStars as E, tensorTier as O, markerKey as S, saveFavorites as T, flyOk as _, CREW as a, loadFavorites as b, SHIPS as c, SIZE_SPAN as d, SPECIES as f, displayName as g, cssMarker as h, ArchivePanel as i, xpSpread as k, SHIP_SIZES as l, SYSTEMS as m, AppNav as n, FACTION_TONE as o, STATUS_LABEL as p, ArchiveButton as r, OFFICIAL as s, APTITUDES as t, SIZE_ABBR as u, formatSupply as v, packetOf as w, loadStars as x, hasApt as y };
