import { o as __toESM } from "../_runtime.mjs";
import { a as useFrame, c as CanvasTexture, d as ShaderMaterial, f as Vector3, h as require_react, i as Canvas, l as Color, m as require_jsx_runtime, n as OrbitControls, o as useThree, r as useTexture, t as Stars, u as SRGBColorSpace } from "../_libs/@react-three/drei+[...].mjs";
import { d as MapPin, o as Star, u as Orbit } from "../_libs/lucide-react.mjs";
import { S as markerKey, T as saveFavorites, b as loadFavorites, h as cssMarker, i as ArchivePanel, m as SYSTEMS, n as AppNav, o as FACTION_TONE, r as ArchiveButton } from "./archive-Pt426J3v.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-AyWATHOY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEG = Math.PI / 180;
/** three-globe convention: lat/lng on a Y-up sphere. */
function latLngToVec3(lat, lng, radius, target = new Vector3()) {
	const phi = (90 - lat) * DEG;
	const theta = (lng + 180) * DEG;
	target.set(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
	return target;
}
var useCartograph = create((set, get) => ({
	systemId: SYSTEMS[0].id,
	markerId: "oni-css",
	favorites: [],
	autoRotate: true,
	interacting: false,
	focusNonce: 0,
	setSystem: (id) => {
		if (id === get().systemId) return;
		const sys = SYSTEMS.find((s) => s.id === id);
		set({
			systemId: id,
			markerId: (sys ? cssMarker(sys) : null)?.id ?? null,
			focusNonce: 0
		});
	},
	selectMarker: (id) => set((s) => ({
		markerId: id,
		autoRotate: id ? false : s.autoRotate,
		focusNonce: id ? s.focusNonce + 1 : s.focusNonce
	})),
	toggleFavorite: (key) => {
		const next = get().favorites.includes(key) ? get().favorites.filter((k) => k !== key) : [...get().favorites, key];
		saveFavorites(next);
		set({ favorites: next });
	},
	setInteracting: (v) => set({
		interacting: v,
		autoRotate: v ? false : get().autoRotate
	}),
	setAutoRotate: (v) => set({ autoRotate: v })
}));
var RADIUS = 1.6;
var _tmp = new Vector3();
var _look = new Vector3();
var _dest = new Vector3();
var _shipLook = new Vector3();
var _orbit = new Vector3();
function glowTexture() {
	const c = document.createElement("canvas");
	c.width = 64;
	c.height = 64;
	const g = c.getContext("2d");
	const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
	grd.addColorStop(0, "rgba(255,255,255,1)");
	grd.addColorStop(.25, "rgba(255,240,200,0.7)");
	grd.addColorStop(1, "rgba(255,255,255,0)");
	g.fillStyle = grd;
	g.fillRect(0, 0, 64, 64);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	return tex;
}
function markerPos(marker, target) {
	if (marker.orbit) return target.set(marker.orbit[0], marker.orbit[1], marker.orbit[2]);
	return latLngToVec3(marker.lat, marker.lng, 1.6400000000000001, target);
}
function Atmosphere({ color }) {
	const mat = (0, import_react.useMemo)(() => {
		const c = new Color(color);
		return new ShaderMaterial({
			transparent: true,
			depthWrite: false,
			blending: 2,
			side: 1,
			uniforms: { uColor: { value: c } },
			vertexShader: `
        varying vec3 vN;
        void main() {
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
			fragmentShader: `
        varying vec3 vN;
        uniform vec3 uColor;
        void main() {
          float f = pow(0.72 - dot(vN, vec3(0.0, 0.0, 1.0)), 2.4);
          gl_FragColor = vec4(uColor, clamp(f * 0.62, 0.0, 0.7));
        }
      `
		});
	}, [color]);
	(0, import_react.useEffect)(() => () => mat.dispose(), [mat]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		scale: 1.09,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			RADIUS,
			48,
			48
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
			object: mat,
			attach: "material"
		})]
	});
}
function PlanetBody({ system }) {
	const map = useTexture(system.texture);
	map.colorSpace = SRGBColorSpace;
	map.anisotropy = 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		RADIUS,
		64,
		64
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		map,
		roughness: .86,
		metalness: .08
	})] });
}
function CloudLayer({ url }) {
	const map = useTexture(url);
	map.colorSpace = SRGBColorSpace;
	const ref = (0, import_react.useRef)(null);
	useFrame((_, d) => {
		if (ref.current) ref.current.rotation.y += Math.min(d, .1) * .012;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		scale: 1.012,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			RADIUS,
			48,
			48
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			map,
			transparent: true,
			opacity: .28,
			depthWrite: false
		})]
	});
}
function MarkerNode({ marker, systemId, onPick }) {
	const selected = useCartograph((s) => s.markerId === marker.id);
	const glow = (0, import_react.useMemo)(() => glowTexture(), []);
	(0, import_react.useEffect)(() => () => glow.dispose(), [glow]);
	const pos = (0, import_react.useMemo)(() => latLngToVec3(marker.lat, marker.lng, 1.6400000000000001), [marker]);
	const faction = (SYSTEMS.find((s) => s.id === systemId) ?? SYSTEMS[0]).faction;
	const color = selected ? "#f2e6c2" : FACTION_TONE[faction];
	const pulse = (0, import_react.useRef)(0);
	const sprite = (0, import_react.useRef)(null);
	useFrame((_, d) => {
		pulse.current += d;
		if (sprite.current) {
			const s = (selected ? .22 : .14) + Math.sin(pulse.current * 2.4) * .03;
			sprite.current.scale.setScalar(s);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sprite", {
			ref: sprite,
			onClick: (e) => {
				e.stopPropagation();
				onPick(marker.id);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("spriteMaterial", {
				map: glow,
				color,
				transparent: true,
				depthWrite: false,
				blending: 2
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			onClick: (e) => {
				e.stopPropagation();
				onPick(marker.id);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.028,
				12,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color })]
		})]
	});
}
function CssStation({ marker, color, onPick }) {
	const selected = useCartograph((s) => {
		const id = s.markerId;
		if (!id) return false;
		if (id === marker.id) return true;
		const m = SYSTEMS.find((x) => x.id === s.systemId)?.markers.find((x) => x.id === id);
		return m?.placement === "hab" || m?.placement === "orbit" && m.id !== marker.id && Boolean(m.orbit);
	});
	const group = (0, import_react.useRef)(null);
	const pos = marker.orbit ?? [
		2.38,
		.78,
		1.12
	];
	useFrame((_, d) => {
		if (group.current) group.current.rotation.y += Math.min(d, .1) * .18;
	});
	const metal = selected ? "#f2e6c2" : color;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		scale: 1.55,
		onClick: (e) => {
			e.stopPropagation();
			onPick(marker.id);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.95,
				24,
				24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color,
				transparent: true,
				opacity: selected ? .08 : .04,
				depthWrite: false
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: group,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							Math.PI / 2,
							0,
							.2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
							.42,
							.038,
							10,
							48
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: metal,
							metalness: .72,
							roughness: .28,
							emissive: metal,
							emissiveIntensity: .22
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							.4,
							0,
							Math.PI / 2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
							.28,
							.022,
							8,
							32
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: metal,
							metalness: .65,
							roughness: .32,
							emissive: metal,
							emissiveIntensity: .15
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.11,
						.13,
						.32,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#d8dee6",
						metalness: .55,
						roughness: .35
					})] }),
					[
						0,
						60,
						120,
						180,
						240,
						300
					].map((deg) => {
						const a = deg * Math.PI / 180;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								Math.cos(a) * .42,
								0,
								Math.sin(a) * .42
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.12,
								.07,
								.16
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#cfd6de",
								metalness: .5,
								roughness: .4
							})]
						}, deg);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.28,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
							.03,
							.18,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: metal,
							emissive: metal,
							emissiveIntensity: .4
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				color,
				intensity: selected ? 1.4 : .7,
				distance: 3.2
			})
		]
	});
}
function FocusRig({ planet, marker }) {
	const { camera } = useThree();
	const controls = useThree((s) => s.controls);
	const nonce = useCartograph((s) => s.focusNonce);
	useFrame((_, raw) => {
		const d = Math.min(raw, .1);
		if (!marker || !planet.current || !controls || nonce === 0) return;
		if (marker.placement === "surface") {
			latLngToVec3(marker.lat, marker.lng, RADIUS, _tmp);
			planet.current.localToWorld(_tmp);
			_dest.copy(_tmp).normalize().multiplyScalar(4.05);
			camera.position.lerp(_dest, 1 - Math.exp(-d * 2.4));
			_look.copy(_tmp).multiplyScalar(.12);
			controls.target.lerp(_look, 1 - Math.exp(-d * 2.4));
		} else {
			markerPos(marker, _orbit);
			_dest.copy(_orbit).add(_tmp.set(1.55, .55, 2.35));
			camera.position.lerp(_dest, 1 - Math.exp(-d * 2.2));
			controls.target.lerp(_orbit, 1 - Math.exp(-d * 2.2));
		}
		controls.update();
	});
	return null;
}
function Spin({ planet, children }) {
	const auto = useCartograph((s) => s.autoRotate);
	const interacting = useCartograph((s) => s.interacting);
	const markerId = useCartograph((s) => s.markerId);
	useFrame((_, raw) => {
		const d = Math.min(raw, .1);
		if (!planet.current) return;
		if (auto && !interacting && !markerId) planet.current.rotation.y += d * .08;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: planet,
		children
	});
}
function Ship$1({ kind, radius, speed, tilt, phase }) {
	const ref = (0, import_react.useRef)(null);
	const color = kind === "jet" ? "#9eb6c4" : kind === "chi" ? "#c4a35a" : kind === "bomb" ? "#7fae8c" : "#c45c4a";
	useFrame((state) => {
		if (!ref.current) return;
		const t = state.clock.elapsedTime * speed + phase;
		const x = Math.cos(t) * radius;
		const z = Math.sin(t) * radius;
		const y = Math.sin(t * 1.7) * .35;
		ref.current.position.set(x, y, z);
		_shipLook.set(-Math.sin(t) * radius, y + .08, Math.cos(t) * radius);
		ref.current.lookAt(_shipLook);
		ref.current.rotation.z += tilt * .002;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: kind === "chi" ? [
				Math.PI / 2,
				0,
				0
			] : [
				0,
				0,
				0
			],
			children: [kind === "bike" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.18,
				.03,
				.05
			] }) : kind === "chi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.045,
				.16,
				4
			] }) : kind === "bomb" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
				.05,
				.14,
				4,
				8
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.22,
				.045,
				.08
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				emissive: color,
				emissiveIntensity: .35,
				metalness: .6,
				roughness: .35
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				0,
				.06
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.03,
				.03,
				.04
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#f2e6c2" })]
		})]
	});
}
function Fleet() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship$1, {
			kind: "jet",
			radius: 3.15,
			speed: .18,
			tilt: .2,
			phase: .2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship$1, {
			kind: "jet",
			radius: 3.35,
			speed: -.14,
			tilt: -.15,
			phase: 2.1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship$1, {
			kind: "bike",
			radius: 2.55,
			speed: .32,
			tilt: .4,
			phase: 1.1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship$1, {
			kind: "chi",
			radius: 3.55,
			speed: .09,
			tilt: .05,
			phase: 4.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship$1, {
			kind: "bomb",
			radius: 3.4,
			speed: -.11,
			tilt: -.25,
			phase: 3.3
		})
	] });
}
function SceneInner() {
	const systemId = useCartograph((s) => s.systemId);
	const markerId = useCartograph((s) => s.markerId);
	const selectMarker = useCartograph((s) => s.selectMarker);
	const setInteracting = useCartograph((s) => s.setInteracting);
	const setAutoRotate = useCartograph((s) => s.setAutoRotate);
	const system = SYSTEMS.find((s) => s.id === systemId) ?? SYSTEMS[0];
	const marker = system.markers.find((m) => m.id === markerId) ?? null;
	const station = cssMarker(system);
	const planet = (0, import_react.useRef)(null);
	const resume = (0, import_react.useRef)(null);
	const surface = system.markers.filter((m) => m.placement === "surface");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#07090e"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#b9c6d4",
			"#1a120c",
			.55
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .28 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				6,
				3.4,
				4
			],
			intensity: 1.55,
			color: system.sun
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-5,
				-2,
				-3
			],
			intensity: .18,
			color: "#6e7c9a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
			radius: 80,
			depth: 40,
			count: 2800,
			factor: 2.4,
			saturation: 0,
			fade: true,
			speed: .4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Spin, {
			planet,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
				fallback: null,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetBody, { system }, system.texture), system.clouds ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudLayer, { url: system.clouds }, system.clouds) : null]
			}), surface.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkerNode, {
				marker: m,
				systemId: system.id,
				onPick: selectMarker
			}, m.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, { color: system.atmosphere }),
		station ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CssStation, {
			marker: station,
			color: FACTION_TONE[system.faction],
			onPick: selectMarker
		}, station.id) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fleet, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusRig, {
			planet,
			marker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			makeDefault: true,
			enablePan: false,
			enableDamping: true,
			dampingFactor: .08,
			minDistance: 2.6,
			maxDistance: 10,
			rotateSpeed: .72,
			zoomSpeed: .85,
			onStart: () => {
				setInteracting(true);
				if (resume.current) window.clearTimeout(resume.current);
			},
			onEnd: () => {
				setInteracting(false);
				if (resume.current) window.clearTimeout(resume.current);
				resume.current = window.setTimeout(() => {
					if (!useCartograph.getState().markerId) setAutoRotate(true);
				}, 2600);
			}
		})
	] });
}
function GlobeCanvas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className: "h-full w-full touch-none",
		camera: {
			position: [
				1.55,
				1.05,
				5.7
			],
			fov: 42,
			near: .1,
			far: 200
		},
		dpr: [1, 1.75],
		gl: {
			antialias: true,
			alpha: false,
			powerPreference: "high-performance"
		},
		onPointerMissed: () => useCartograph.getState().selectMarker(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneInner, {})
	});
}
var KIND = {
	station: "станция",
	port: "порт",
	claim: "клейм",
	core: "ядро",
	yard: "верфь"
};
var PLACE = {
	orbit: "орбита",
	surface: "планета",
	hab: "на CSS"
};
function Overlay() {
	const systemId = useCartograph((s) => s.systemId);
	const markerId = useCartograph((s) => s.markerId);
	const favorites = useCartograph((s) => s.favorites);
	const autoRotate = useCartograph((s) => s.autoRotate);
	const setSystem = useCartograph((s) => s.setSystem);
	const selectMarker = useCartograph((s) => s.selectMarker);
	const toggleFavorite = useCartograph((s) => s.toggleFavorite);
	const setAutoRotate = useCartograph((s) => s.setAutoRotate);
	const [openList, setOpenList] = (0, import_react.useState)(null);
	const [archive, setArchive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		useCartograph.setState({ favorites: loadFavorites() });
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) useCartograph.setState({ autoRotate: false });
	}, []);
	const system = SYSTEMS.find((s) => s.id === systemId) ?? SYSTEMS[0];
	const marker = system.markers.find((m) => m.id === markerId) ?? null;
	const favKey = marker ? markerKey(system.id, marker.id) : "";
	const favItems = (0, import_react.useMemo)(() => favorites.map((key) => {
		const [sid, mid] = key.split(":");
		const sys = SYSTEMS.find((s) => s.id === sid);
		const mk = sys?.markers.find((m) => m.id === mid);
		if (!sys || !mk) return null;
		return {
			key,
			sys,
			mk
		};
	}).filter((x) => Boolean(x)), [favorites]);
	function jumpFav(sid, mid) {
		if (sid !== systemId) setSystem(sid);
		window.setTimeout(() => useCartograph.getState().selectMarker(mid), sid !== systemId ? 40 : 0);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10 text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pointer-events-auto absolute top-0 right-0 left-0 z-30 flex h-14 items-center gap-2 border-b border-line bg-bg/85 px-3 backdrop-blur-md md:h-16 md:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-[10px] tracking-[0.22em] text-brass uppercase",
							children: "Star Atlas · Galia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-base font-semibold leading-tight md:text-lg",
							children: system.name
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppNav, { current: "map" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveButton, { onClick: () => setArchive(true) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAutoRotate(!autoRotate),
						className: "flex size-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-line bg-surface font-display text-sm md:w-auto md:px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, { className: "size-4 text-brass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden md:inline",
							children: autoRotate ? "Авто" : "Стоп"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "pointer-events-auto absolute top-16 bottom-40 left-3 hidden w-56 flex-col gap-2 md:flex md:left-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Системы",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-0.5",
						children: SYSTEMS.map((s) => {
							const active = s.id === systemId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSystem(s.id),
								className: `flex h-11 w-full items-center justify-between rounded-md px-3 text-left transition-colors duration-150 ${active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2/60 hover:text-fg"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate font-display font-medium",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase",
									style: { color: FACTION_TONE[s.faction] },
									children: s.faction
								})]
							}) }, s.id);
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "pointer-events-auto absolute top-16 right-3 bottom-40 hidden w-64 flex-col gap-2 md:flex md:right-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Локации",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-0.5",
						children: system.markers.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceButton, {
							marker: m,
							active: m.id === markerId,
							starred: favorites.includes(markerKey(system.id, m.id)),
							onClick: () => selectMarker(m.id)
						}) }, m.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-36 shrink-0 overflow-hidden rounded-xl border border-line bg-surface/80 backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 pt-3 pb-1 font-display text-[10px] tracking-[0.18em] text-brass uppercase",
						children: "Избранное"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-24 overflow-y-auto px-2 pb-2",
						children: favItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-1 py-2 text-sm text-muted",
							children: "Звезда на карточке — список в этом браузере."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-0.5",
							children: favItems.map(({ key, sys, mk }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => jumpFav(sys.id, mk.id),
								className: "flex h-11 w-full items-center gap-2 rounded-md px-3 text-left text-muted hover:bg-surface-2/60 hover:text-fg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-brass text-brass" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate font-display text-sm",
										children: mk.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] text-faint",
										children: sys.faction
									})
								]
							}) }, key))
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto absolute top-16 right-3 left-3 z-20 flex gap-2 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileMenu, {
					label: "Системы",
					open: openList === "systems",
					onToggle: () => setOpenList(openList === "systems" ? null : "systems"),
					children: SYSTEMS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setSystem(s.id);
							setOpenList(null);
						},
						className: "flex h-11 w-full items-center justify-between px-3 text-left text-sm",
						children: [s.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs",
							style: { color: FACTION_TONE[s.faction] },
							children: s.faction
						})]
					}, s.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileMenu, {
					label: "Места",
					open: openList === "places",
					onToggle: () => setOpenList(openList === "places" ? null : "places"),
					children: system.markers.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							selectMarker(m.id);
							setOpenList(null);
						},
						className: "flex h-11 w-full items-center gap-2 px-3 text-left text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 text-brass" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate",
								children: m.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-faint",
								children: PLACE[m.placement]
							})
						]
					}, m.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "pointer-events-none absolute right-3 bottom-32 left-3 md:right-80 md:bottom-16 md:left-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto mx-auto max-w-lg",
					children: marker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-line bg-surface/90 px-4 py-3 backdrop-blur-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-[10px] tracking-[0.16em] text-brass uppercase",
										children: [
											KIND[marker.kind],
											" · ",
											PLACE[marker.placement]
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-lg font-semibold",
										children: marker.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm leading-snug text-muted",
										children: marker.blurb
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggleFavorite(favKey),
								className: "flex size-11 shrink-0 items-center justify-center rounded-lg border border-line",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-4 ${favorites.includes(favKey) ? "fill-brass text-brass" : "text-muted"}` })
							})]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl border border-line bg-surface/80 px-4 py-3 text-sm text-muted backdrop-blur-md",
						children: system.lore
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto absolute inset-x-0 bottom-0 z-30 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppNav, {
					current: "map",
					variant: "dock"
				})
			}),
			archive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchivePanel, { onClose: () => setArchive(false) }) : null
		]
	});
}
function PlaceButton({ marker, active, starred, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `flex h-11 w-full items-center gap-2 rounded-md px-3 text-left transition-colors duration-150 ${active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2/60 hover:text-fg"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 shrink-0 text-brass" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate font-display",
				children: marker.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] text-faint",
				children: PLACE[marker.placement]
			}),
			starred ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-brass text-brass" }) : null
		]
	});
}
function Panel({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-surface/80 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "shrink-0 px-4 pt-3 pb-1 font-display text-[10px] tracking-[0.18em] text-brass uppercase",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-2 pb-2",
			children
		})]
	});
}
function MobileMenu({ label, open, onToggle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-w-0 flex-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onToggle,
			className: "flex h-11 w-full items-center justify-center rounded-lg border border-line bg-surface/90 font-display text-sm backdrop-blur-md",
			children: label
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-12 right-0 left-0 z-30 max-h-64 overflow-y-auto rounded-lg border border-line bg-surface",
			children
		}) : null]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeCanvas, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {})]
	});
}
//#endregion
export { Home as component };
