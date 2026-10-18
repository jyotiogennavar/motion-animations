import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../.agents/skills/anatomy/kit/iso-kit.mjs";
import { kitScript } from "../.agents/skills/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

const WIDTH = 660;
const HEIGHT = 420;

const PLATE = { x: -124, y: -86, w: 258, d: 196, r: 8 };
const PLATE_H = 11;
const FOOT_H = 5;

const CX = -50;
const CY = -26;
const WHEELS = [
  { r: 30, z: 6, h: 5 },
  { r: 24, z: 12, h: 5 },
  { r: 18.5, z: 18, h: 5 },
];
const KNOB_R = 9.5;
const KNOB_Z = 25.5;
const KNOB_H = 7.5;
const KNOB_TOP = KNOB_Z + KNOB_H;
const GATE = 42;
const TOL = 2;
const START = 8;

const TRAY = { x: -94, y: -66, w: 112, d: 90, r: 2 };
const TRAY_H = 5;

const FENCE = { x: CX, y: CY + 30, w: 50, d: 7.5, r: 1.2 };
const FENCE_Z = 16;
const FENCE_H = 6;
const FENCE_DROP = 9;

const BOLT_Y = FENCE.y - 0.4;
const BOLT = { x: 32, y: BOLT_Y, w: 48, d: 8, r: 1.4 };
const BOLT_Z = 7.5;
const BOLT_H = 6;
const BOLT_TRAVEL = 13;
const HEAD = { x: 66, y: BOLT_Y - 1.1, w: 14, d: 10.2, r: 1.3 };

const ANCHOR = { x: 2, y: BOLT_Y - 2.2, w: 14, d: 12.4, r: 1.2 };
const ANCHOR_Z = 6.5;
const ANCHOR_H = 8;
const SPRING_FROM = ANCHOR.x + ANCHOR.w;
const SPRING_Y = BOLT_Y + BOLT.d / 2;
const SPRING_Z = BOLT_Z + BOLT_H / 2;
const SPRING_R = 2.05;
const SPRING_TURNS = 6;

const STRIKE = { x: 78, y: BOLT_Y - 6, w: 26, d: 20, r: 2 };
const STRIKE_H = 18;
const CATCH = { x: 60, y: BOLT_Y - 1.6, w: 14, d: 11.2, r: 1.2 };
const CATCH_Z = BOLT_Z + BOLT_H;
const CATCH_H = 4.5;
const CATCH_LIFT = 8;

const KEY_X = 6;
const ESC_Y = 34;
const ESC_R = 10;
const ESC_H = 4;
const BLADE_Y = ESC_Y + ESC_R;
const BOW_Y = BLADE_Y + 22;
const KEY_TRAVEL = 16;
const KEY_Z = 0;
const BOW_R = 9.2;
const NOTCHES = [
  { r0: 24.8, r1: 28.8, z: 11 },
  { r0: 19.2, r1: 22.8, z: 17 },
  { r0: 11.4, r1: 17.3, z: 23 },
];

const gateAngle = (reading) => Math.PI + ((reading - GATE) / 100) * Math.PI * 2;

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
    [CX, CY, KNOB_TOP + 4],
    [STRIKE.x + STRIKE.w, STRIKE.y, STRIKE_H + 8],
    [KEY_X + BOW_R, BOW_Y + KEY_TRAVEL + BOW_R, 8],
    [FENCE.x, FENCE.y + FENCE.d + 6, FENCE_Z + FENCE_H],
  ],
  WIDTH,
  HEIGHT,
  { pad: 30, azimuth: 40, elevation: 36 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

const pointerAt = (reading) => {
  const angle = gateAngle(reading);
  const sx = Math.sin(angle);
  const sy = -Math.cos(angle);
  return k.lineOnTop([CX + sx * 3.3, CY + sy * 3.3], [CX + sx * (KNOB_R - 2.35), CY + sy * (KNOB_R - 2.35)], KNOB_TOP, P);
};

const ticksAt = (reading) => k.radialTicks(CX, CY, KNOB_R - 1.35, 20, 5, KNOB_TOP, [1.15, 2.2], P, gateAngle(reading));

const notchAt = (reading) => {
  const angle = gateAngle(reading);
  const sx = Math.sin(angle);
  const sy = -Math.cos(angle);
  return NOTCHES.map((notch) => k.lineOnTop(
    [CX + sx * notch.r0, CY + sy * notch.r0],
    [CX + sx * notch.r1, CY + sy * notch.r1],
    notch.z,
    P,
  )).join("");
};

const springAt = (tailX) => k.coil(SPRING_FROM, tailX, [SPRING_Y, SPRING_Z], SPRING_R, SPRING_TURNS, "x", P);

function screws(points, z, radius = 2) {
  return L(points.map(([x, y]) => k.ring(x, y, radius, z, P, 14)).join(""), { tone: "lo" })
    + D(points.map(([x, y]) => at([x, y, z])), { size: 0.46 });
}

function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.5), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 6), 0, P), { tone: "lo" }));
  out.push(screws(k.corners(PLATE, 12), 0, 2.15));
  const strip = { x: PLATE.x + 18, y: PLATE.y + 14, w: PLATE.w - 36, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.5, 0.6, [2, 3.5], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([
    at([strip.x + 2, strip.y + 3.5, 0.6]),
    at([strip.x + strip.w - 2, strip.y + 3.5, 0.6]),
  ], { size: 0.42 }));
  const label = { x: -108, y: 84, w: 36, d: 14, r: 1.3 };
  const labelTop = 0.8;
  out.push(S(k.slabOf(label, 0, labelTop, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.5), labelTop, P, 4), { tone: "faint" }));
  out.push(L(k.lineOnTop([label.x + 4, label.y + 4.2], [label.x + 28, label.y + 4.2], labelTop, P), { tone: "lo", free: true }));
  out.push(L(k.lineOnTop([label.x + 4, label.y + 8], [label.x + 22, label.y + 8], labelTop, P), { tone: "lo", free: true }));
  out.push(L(k.lineOnTop([label.x + 4, label.y + 11.8], [label.x + 16, label.y + 11.8], labelTop, P), { tone: "lo", free: true }));
  out.push(screws([[label.x + 3.2, label.y + 3.2], [label.x + label.w - 3.2, label.y + label.d - 3.2]], labelTop, 1.15));
  const track = { x: KEY_X - 4.2, y: ESC_Y + ESC_R - 1.5, w: 8.4, d: BOW_Y + KEY_TRAVEL + BOW_R - (ESC_Y + ESC_R) + 2, r: 2.4 };
  out.push(L(k.planOutline(track, 0, P, 5), { tone: "faint" }));
  return out.join("");
}

function tray() {
  const out = [];
  out.push(S(k.slabOf(TRAY, 0, TRAY_H, P, 6, 0.5), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(TRAY, 3.5), TRAY_H, P, 6), { tone: "faint" }));
  const back = { x: TRAY.x, y: TRAY.y, w: TRAY.w, d: 6, r: 1.1 };
  const left = { x: TRAY.x, y: TRAY.y + 6, w: 6, d: TRAY.d - 14, r: 1.1 };
  out.push(S(k.slabOf(back, TRAY_H, 15, P, 5, 0.5), {
    tone: "mid",
    inner: L(k.sideSeam(back, TRAY_H + 8, P, 5), { tone: "faint" }),
  }));
  out.push(S(k.slabOf(left, TRAY_H, 15, P, 5, 0.5), {
    tone: "mid",
    inner: L(k.sideSeam(left, TRAY_H + 8, P, 5), { tone: "faint" }),
  }));
  out.push(screws([
    [TRAY.x + 8, TRAY.y + 8],
    [TRAY.x + TRAY.w - 8, TRAY.y + 8],
  ], TRAY_H, 1.5));
  const post = { w: 6, d: 6, r: 1.2 };
  out.push(S(k.slabOf({ ...post, x: TRAY.x + 2, y: TRAY.y + TRAY.d - 8 }, TRAY_H, 9, P, 3, 0.4), { tone: "mid" }));
  out.push(D([at([TRAY.x + 5, TRAY.y + TRAY.d - 5, TRAY_H + 9])], { size: 0.42 }));
  return out.join("");
}

function wheels() {
  const out = [];
  out.push(S(k.cylinder(CX, CY, 3.4, TRAY_H, 2.2, P, 24), { tone: "mid" }));
  out.push(S(k.cylinder(CX, CY, 2.15, TRAY_H, KNOB_Z - TRAY_H, P, 20), { tone: "mid", crease: "none" }));
  out.push(L(k.sideArc(CX, CY, 2.15, 24, P, 16), { tone: "faint" }));
  for (const wheel of WHEELS) {
    const top = wheel.z + wheel.h;
    out.push(S(k.cylinder(CX, CY, wheel.r, wheel.z, wheel.h, P, 56, 0.45), { tone: "hi", crease: "lo" }));
    out.push(L(k.ring(CX, CY, wheel.r - 1.2, top, P, 48), { tone: "lo" }));
  }
  for (const notch of NOTCHES) out.push(L(k.ring(CX, CY, notch.r0, notch.z, P, 40), { tone: "faint" }));
  out.push(L(k.ring(CX, CY, 5.2, WHEELS[2].z + WHEELS[2].h, P, 24), { tone: "lo" }));
  out.push(S(k.cylinder(CX, CY, 3.6, WHEELS[2].z + WHEELS[2].h, KNOB_Z - (WHEELS[2].z + WHEELS[2].h), P, 24), { tone: "mid" }));
  return out.join("");
}

function knob() {
  const out = [];
  const ticks = ticksAt(START);
  out.push(S(k.cylinder(CX, CY, KNOB_R, KNOB_Z, KNOB_H, P, 48, 0.55), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(CX, CY, KNOB_R, KNOB_Z + 0.5, KNOB_Z + 3.1, 36, P, 0.25), { tone: "lo" }));
  out.push(L(k.sideArc(CX, CY, KNOB_R, KNOB_Z + 3.1, P, 32), { tone: "faint" }));
  out.push(L(k.ring(CX, CY, 3.3, KNOB_TOP, P, 20), { tone: "mid" }));
  out.push(L(k.ring(CX, CY, KNOB_R - 2.35, KNOB_TOP, P, 40), { tone: "lo" }));
  out.push(L(k.ring(CX, CY, KNOB_R - 1.35, KNOB_TOP, P, 40), { tone: "lo" }));
  out.push(`<path data-part="ticks-minor" class="iso-line" data-tone="lo" d="${ticks.minor}"/>`);
  out.push(`<path data-part="ticks-major" class="iso-line" data-tone="mid" d="${ticks.major}"/>`);
  out.push(`<path data-part="pointer" class="iso-line" data-tone="hi" d="${pointerAt(START)}" style="stroke-width:1.15"/>`);
  out.push(`<path data-part="notches" class="iso-line" data-tone="hi" d="${notchAt(START)}" style="stroke-width:1.05"/>`);
  const plaque = { x: CX - 8.5, y: CY + KNOB_R - 1, w: 17, d: 12, r: 1.3 };
  const plaqueTop = KNOB_Z + 3.6;
  out.push(S(k.slabOf(plaque, KNOB_Z + 0.6, 3, P, 4, 0.35), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(plaque, 1.5), plaqueTop, P, 4), { tone: "faint" }));
  const crownX = CX + KNOB_R - 0.6;
  out.push(S(k.slabOf({ x: crownX, y: CY - 2.1, w: 4.6, d: 4.2, r: 1 }, KNOB_Z + 1.6, 4.2, P, 3, 0.3), { tone: "mid" }));
  out.push(S(k.slabOf({ x: crownX + 4.2, y: CY - 2.6, w: 2.3, d: 5.2, r: 1 }, KNOB_Z + 1.1, 5.2, P, 3, 0.3), { tone: "mid" }));
  out.push(k.faceTextSvg(k.topMatrix([CX, plaque.y + plaque.d / 2], plaqueTop, P, "x"), String(START), { size: 4.2, tone: "hi", anchor: "middle" }).replace("<text ", "<text data-part=\"reading\" "));
  return out.join("");
}

function fence() {
  const out = [];
  const py = FENCE.y + FENCE.d + 1.65;
  for (const x of [FENCE.x + 5, FENCE.x + FENCE.w - 5]) {
    out.push(S(k.cylinder(x, py, 1.7, TRAY_H, FENCE_Z + FENCE_H + 2 - TRAY_H, P, 18), { tone: "mid", crease: "none" }));
    out.push(S(k.cylinder(x, py, 2.35, TRAY_H, 1.5, P, 18), { tone: "mid" }));
    out.push(L(k.sideArc(x, py, 1.7, FENCE_Z + 1, P, 12), { tone: "faint" }));
  }
  out.push(`<g data-part="fence">${S(k.slabOf(FENCE, FENCE_Z, FENCE_H, P, 4, 0.4), { tone: "mid" })}</g>`);
  return out.join("");
}

function boltBay() {
  const locked = springAt(BOLT.x);
  const out = [];
  out.push(S(k.slabOf(ANCHOR, ANCHOR_Z, ANCHOR_H, P, 4, 0.45), { tone: "mid" }));
  out.push(D([at([SPRING_FROM, SPRING_Y + SPRING_R, SPRING_Z])], { size: 0.5, tone: "hi" }));
  out.push(S(k.slabOf({ x: 16, y: BOLT_Y - 3.1, w: 60, d: 2.5, r: 0.6 }, 4, 3.5, P, 3, 0.3), { tone: "mid" }));
  out.push(S(k.slabOf({ x: 16, y: BOLT_Y + BOLT.d + 0.6, w: 60, d: 2.5, r: 0.6 }, 4, 3.5, P, 3, 0.3), { tone: "mid" }));
  out.push(D([
    at([20, BOLT_Y - 1.85, 7.5]),
    at([70, BOLT_Y - 1.85, 7.5]),
    at([20, BOLT_Y + BOLT.d + 1.85, 7.5]),
    at([70, BOLT_Y + BOLT.d + 1.85, 7.5]),
  ], { size: 0.4 }));
  out.push(`<path data-part="spring-back" class="iso-line" data-tone="lo" d="${locked.back}"/>`);
  out.push(`<g data-part="bolt">${S(k.slabOf(BOLT, BOLT_Z, BOLT_H, P, 4, 0.4), { tone: "hi", lit: true })}${S(k.slabOf(HEAD, BOLT_Z, BOLT_H, P, 4, 0.35), { tone: "hi", lit: true })}${D([
    at([40, SPRING_Y, BOLT_Z + BOLT_H]),
    at([52, SPRING_Y, BOLT_Z + BOLT_H]),
    at([BOLT.x, SPRING_Y + SPRING_R, SPRING_Z]),
  ], { size: 0.48, tone: "hi" })}</g>`);
  out.push(`<path data-part="spring-front" class="iso-line" data-tone="mid" d="${locked.front}"/>`);
  out.push(S(k.slabOf(STRIKE, 0, STRIKE_H, P, 5, 0.7), {
    tone: "mid",
    inner: L(k.sideSeam(STRIKE, 9, P, 5), { tone: "faint" }),
  }));
  out.push(L(k.planOutline(k.insetPlan(STRIKE, 2.4), STRIKE_H, P, 5), { tone: "faint" }));
  out.push(screws([
    [STRIKE.x + 4, STRIKE.y + 4],
    [STRIKE.x + STRIKE.w - 4, STRIKE.y + STRIKE.d - 4],
  ], STRIKE_H, 1.35));
  out.push(`<g data-part="catch">${S(k.slabOf(CATCH, CATCH_Z, CATCH_H, P, 3, 0.35), { tone: "mid" })}</g>`);
  const lamp = [STRIKE.x + STRIKE.w / 2, STRIKE.y + STRIKE.d / 2];
  out.push(S(k.cylinder(lamp[0], lamp[1], 4.4, STRIKE_H, 2.2, P, 28), { tone: "mid" }));
  out.push(L(k.ring(lamp[0], lamp[1], 4.4, STRIKE_H + 2.2, P, 28), { tone: "lo" }));
  out.push(S(k.cylinder(lamp[0], lamp[1], 2.7, STRIKE_H + 2.2, 2, P, 24), { tone: "hi", className: "lamp" }));
  out.push(L(k.ring(lamp[0], lamp[1], 2.7, STRIKE_H + 4.2, P, 24), { tone: "mid" }));
  return out.join("");
}

function key() {
  const out = [];
  out.push(S(k.cylinder(KEY_X, ESC_Y, ESC_R, 0, ESC_H, P, 44, 0.45), { tone: "mid" }));
  out.push(L(k.ring(KEY_X, ESC_Y, ESC_R - 1.8, ESC_H, P, 40), { tone: "lo" }));
  out.push(L(k.planOutline({ x: KEY_X - 0.9, y: ESC_Y - 4.2, w: 1.8, d: 8.2, r: 0.6 }, ESC_H, P, 3), { tone: "lo" }));
  const wardX = KEY_X + 6.2;
  out.push(S(k.cylinder(wardX, ESC_Y + 2.2, 2.5, ESC_H, 1.6, P, 18), { tone: "mid" }));
  out.push(`<g data-part="ward">${S(k.cylinder(wardX, ESC_Y + 2.2, 1.25, ESC_H, 8, P, 16), { tone: "hi", crease: "none" })}${S(k.cylinder(wardX, ESC_Y + 2.2, 1.7, ESC_H + 8, 1.3, P, 16), { tone: "hi" })}</g>`);
  const blade = { x: KEY_X - 2.4, y: BLADE_Y, w: 4.8, d: 16.5, r: 0.6 };
  const shoulder = { x: KEY_X - 3.6, y: BLADE_Y, w: 7.2, d: 3, r: 0.6 };
  const neck = { x: KEY_X - 2.6, y: BLADE_Y + 15, w: 5.2, d: 8.2, r: 0.9 };
  const tooth = (y) => S(k.slabOf({ x: KEY_X + 1.6, y, w: 4.4, d: 2.6, r: 0.45 }, KEY_Z, 5.2, P, 3, 0.3), { tone: "hi", crease: "lo" });
  out.push(`<g data-part="key">${S(k.slabOf(blade, KEY_Z, 3.4, P, 3, 0.3), { tone: "mid" })}${S(k.slabOf(shoulder, KEY_Z, 3.8, P, 3, 0.3), { tone: "mid" })}${tooth(BLADE_Y + 0.5)}${tooth(BLADE_Y + 4.2)}${S(k.slabOf(neck, KEY_Z, 5.2, P, 3, 0.35), { tone: "mid" })}${S(k.cylinder(KEY_X, BOW_Y, BOW_R, KEY_Z, 2.4, P, 40, 0.35), { tone: "mid" })}${S(k.cylinder(KEY_X, BOW_Y, BOW_R - 1.6, 2.4, 5.2, P, 40, 0.4), { tone: "mid" })}${L(k.ring(KEY_X, BOW_Y, 3.6, 7.6, P, 32), { tone: "lo" })}${D([at([KEY_X, BOW_Y, 7.6])], { size: 0.8, tone: "mid" })}</g>`);
  return out.join("");
}

const startSpring = springAt(BOLT.x);
const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label: "A dual-custody lock on a surface plate. A dial stands for the secret you know and a key for the thing you have. The bolt stays sprung into the strike until both are set.",
  body: [plate(), tray(), wheels(), knob(), fence(), boltBay(), key()],
});

const live = `
const P = ${JSON.stringify(P)};
const CX = ${CX}, CY = ${CY}, GATE = ${GATE}, TOL = ${TOL}, KNOB_R = ${KNOB_R}, KNOB_TOP = ${KNOB_TOP};
const WHEELS = ${JSON.stringify(WHEELS)};
const NOTCHES = ${JSON.stringify(NOTCHES)};
const BOLT_X = ${BOLT.x}, BOLT_TRAVEL = ${BOLT_TRAVEL}, KEY_TRAVEL = ${KEY_TRAVEL};
const FENCE_DROP = ${FENCE_DROP}, CATCH_LIFT = ${CATCH_LIFT}, WARD_LIFT = 4.6;
const SPRING_FROM = ${SPRING_FROM}, SPRING_Y = ${SPRING_Y}, SPRING_Z = ${SPRING_Z}, SPRING_R = ${SPRING_R}, SPRING_TURNS = ${SPRING_TURNS};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const fence = svg.querySelector('[data-part="fence"]');
const bolt = svg.querySelector('[data-part="bolt"]');
const boltSolids = bolt.querySelectorAll(".iso-solid");
const catchEl = svg.querySelector('[data-part="catch"]');
const ward = svg.querySelector('[data-part="ward"]');
const keyEl = svg.querySelector('[data-part="key"]');
const lamp = svg.querySelector(".iso-solid.lamp");
const ticksMinor = svg.querySelector('[data-part="ticks-minor"]');
const ticksMajor = svg.querySelector('[data-part="ticks-major"]');
const pointer = svg.querySelector('[data-part="pointer"]');
const notches = svg.querySelector('[data-part="notches"]');
const reading = svg.querySelector('[data-part="reading"]');
const springBack = svg.querySelector('[data-part="spring-back"]');
const springFront = svg.querySelector('[data-part="spring-front"]');
const readout = document.querySelector("[data-readout]");
const live = document.querySelector("[data-live]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
const gateAngle = (value) => Math.PI + ((value - GATE) / 100) * Math.PI * 2;
const pointerAt = ${pointerAt.toString().replaceAll("k.", "")};
const ticksAt = ${ticksAt.toString().replaceAll("k.", "")};
const notchAt = ${notchAt.toString().replaceAll("k.", "")};
let dial = { at: ${START}, target: ${START} };
let key = { at: 0, target: 0 };
let fenceS = { at: 0, rate: 0 };
let wardS = { at: 0, rate: 0 };
let catchS = { at: 0, rate: 0 };
let boltS = { at: 0, rate: 0 };
let boltWant = 0;
let frame = 0, last = 0, clock = 0, touring = !still.matches, visible = false, idleTimer = 0, announced = "";
function springTo(state, want, dt, stiff, drag, calm) {
  if (calm) { state.at = want; state.rate = 0; return true; }
  for (let i = 0; i < 4; i++) {
    state.rate += ((want - state.at) * stiff - state.rate * drag) * dt / 4;
    state.at += state.rate * dt / 4;
  }
  if (Math.abs(want - state.at) < 5e-4 && Math.abs(state.rate) < 5e-4) { state.at = want; state.rate = 0; return true; }
  return false;
}
function tourAt(t) {
  const u = t % 11;
  const ease = (a, b, p) => { const x = clamp(p, 0, 1); const s = x * x * (3 - 2 * x); return a + (b - a) * s; };
  if (u < 2.2) return { dial: ease(8, 42, u / 2.2), key: 0 };
  if (u < 4) return { dial: 42, key: 0 };
  if (u < 5.2) return { dial: 42, key: ease(0, 1, (u - 4) / 1.2) };
  if (u < 8) return { dial: 42, key: 1 };
  if (u < 9.1) return { dial: 42, key: ease(1, 0, (u - 8) / 1.1) };
  return { dial: ease(42, 8, (u - 9.1) / 1.9), key: 0 };
}
function words() {
  const on = Math.abs(dial.at - GATE) <= TOL;
  const dialWord = on ? "42" : "dial " + dial.at.toFixed(1);
  const keyWord = key.at >= 0.92 ? "key in" : key.at <= 0.08 ? "key out" : "key " + Math.round(key.at * 100);
  let boltWord = "bolt home";
  if (Math.abs(boltS.rate) > 0.12) boltWord = boltS.rate > 0 ? "opening" : "closing";
  else if (boltS.at > 0.9) boltWord = "bolt open";
  else if (boltS.at > 0.1) boltWord = boltS.rate >= 0 ? "opening" : "closing";
  return dialWord + " · " + keyWord + " · " + boltWord;
}
function phaseText() {
  const on = Math.abs(dial.at - GATE) <= TOL && fenceS.at > 0.8;
  const have = key.at >= 0.92 && wardS.at > 0.8;
  if (boltS.at > 0.9 && Math.abs(boltS.rate) < 0.05) return "Bolt open. Both factors are set.";
  if (boltS.rate > 0.08) return "Bolt opening.";
  if (boltS.rate < -0.08) return "Bolt closing.";
  if (on && have) return "Both factors set. The bolt is still home.";
  if (on) return "Password set. The fence is down. The key is still out.";
  if (have) return "Key seated. The ward is up. The dial is off the number.";
  return "Bolt home.";
}
function draw() {
  const angleParts = ticksAt(dial.at);
  ticksMinor.setAttribute("d", angleParts.minor);
  ticksMajor.setAttribute("d", angleParts.major);
  pointer.setAttribute("d", pointerAt(dial.at));
  notches.setAttribute("d", notchAt(dial.at));
  const shown = String(Math.round(dial.at));
  if (reading.textContent !== shown) reading.textContent = shown;
  fence.setAttribute("transform", translateAlong(P, [0, 0, -FENCE_DROP * fenceS.at]));
  ward.setAttribute("transform", translateAlong(P, [0, 0, WARD_LIFT * wardS.at]));
  catchEl.setAttribute("transform", translateAlong(P, [0, 0, CATCH_LIFT * catchS.at]));
  bolt.setAttribute("transform", translateAlong(P, [-BOLT_TRAVEL * boltS.at, 0, 0]));
  keyEl.setAttribute("transform", translateAlong(P, [0, KEY_TRAVEL * (1 - key.at), 0]));
  const spring = coil(SPRING_FROM, BOLT_X - BOLT_TRAVEL * boltS.at, [SPRING_Y, SPRING_Z], SPRING_R, SPRING_TURNS, "x", P);
  springBack.setAttribute("d", spring.back);
  springFront.setAttribute("d", spring.front);
  const open = boltS.at > 0.92;
  boltSolids.forEach((node) => (open ? node.removeAttribute("data-lit") : node.setAttribute("data-lit", "")));
  if (open) lamp.setAttribute("data-lit", "");
  else lamp.removeAttribute("data-lit");
  const text = words();
  if (readout.textContent !== text) readout.textContent = text;
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;
  if (touring) {
    clock += dt;
    const pose = tourAt(clock);
    dial.target = pose.dial;
    key.target = pose.key;
  }
  dial.at = calm ? dial.target : dial.at + (dial.target - dial.at) * (1 - Math.exp(-dt / 0.2));
  if (Math.abs(dial.at - dial.target) < 0.01) dial.at = dial.target;
  key.at = calm ? key.target : key.at + (key.target - key.at) * (1 - Math.exp(-dt / 0.22));
  if (Math.abs(key.at - key.target) < 0.004) key.at = key.target;
  const onNumber = Math.abs(dial.at - GATE) <= TOL;
  const seated = key.at >= 0.92;
  springTo(fenceS, onNumber ? 1 : 0, dt, 380, 38, calm);
  springTo(wardS, seated ? 1 : 0, dt, 340, 36, calm);
  const both = onNumber && seated;
  const catchSettled = springTo(catchS, both ? 1 : 0, dt, 420, 40, calm);
  if (catchS.at > 0.82) boltWant = 1;
  else if (catchS.at < 0.32) boltWant = 0;
  const boltSettled = springTo(boltS, boltWant, dt, 260, 24, calm);
  draw();
  const phrase = phaseText();
  if (phrase !== announced) { announced = phrase; live.textContent = phrase; }
  const settled = !touring && dial.at === dial.target && key.at === key.target && fenceS.rate === 0 && wardS.rate === 0 && catchSettled && boltSettled;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (nextDial, nextKey) => {
  touring = false;
  dial.target = clamp(nextDial, 0, 99);
  key.target = clamp(nextKey, 0, 1);
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 3600);
  run();
};
function fromEvent(event) {
  const box = svg.getBoundingClientRect();
  const fx = clamp((event.clientX - box.left) / box.width, 0, 1);
  const fy = clamp((event.clientY - box.top) / box.height, 0, 1);
  return { dial: fx * 99, key: clamp((fy - 0.34) / 0.52, 0, 1) };
}
new IntersectionObserver((entries) => {
  visible = entries[entries.length - 1].isIntersecting;
  if (visible) run();
}, { rootMargin: "120px 0px" }).observe(stage);
let touching = false;
stage.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") { touching = true; stage.setPointerCapture(event.pointerId); }
  const pose = fromEvent(event);
  steer(pose.dial, pose.key);
});
stage.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch" && !touching) return;
  const pose = fromEvent(event);
  steer(pose.dial, pose.key);
});
stage.addEventListener("pointerup", () => { touching = false; });
stage.addEventListener("pointercancel", () => { touching = false; });
stage.addEventListener("keydown", (event) => {
  const dialStep = event.shiftKey ? 10 : 1;
  const keyStep = event.shiftKey ? 0.5 : 0.12;
  let nextDial = null, nextKey = null;
  if (event.key === "ArrowRight") nextDial = dial.at + dialStep;
  if (event.key === "ArrowLeft") nextDial = dial.at - dialStep;
  if (event.key === "ArrowUp") nextKey = key.at + keyStep;
  if (event.key === "ArrowDown") nextKey = key.at - keyStep;
  if (event.key === "Home") { nextDial = 0; nextKey = 0; }
  if (event.key === "End") { nextDial = GATE; nextKey = 1; }
  if (event.key === " " || event.key === "Enter") { nextDial = dial.at; nextKey = key.at > 0.5 ? 0 : 1; }
  if (event.key === "Escape") {
    event.preventDefault();
    touring = !still.matches;
    clock = 0;
    clearTimeout(idleTimer);
    run();
    return;
  }
  if (nextDial === null && nextKey === null) return;
  event.preventDefault();
  steer(nextDial === null ? dial.at : nextDial, nextKey === null ? key.at : nextKey);
});
stage.addEventListener("focus", () => {
  if (touring) { touring = false; dial.target = dial.at; key.target = key.at; }
  live.textContent = phaseText();
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 3600);
});
draw();
`;

const style = `<style>
.iso-stage{position:relative;touch-action:pan-y;border-radius:8px}
.iso-stage:focus{outline:none}
.iso-stage:focus-visible{outline:1px solid var(--anatomy-muted);outline-offset:6px}
.iso-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
</style>`;

const body = k.plateHtml({
  fig: "Fig 1",
  title: "Two-factor lock",
  hint: "Drag to turn and seat the key",
  readout: "dial 8.0 · key out · bolt home",
  keys: [
    { mark: "lit", label: "Bolt. The lamp takes its place once the bolt is open" },
    { mark: "raised", label: "Wheel pack. The gates line up only at 42" },
  ],
  caption:
    "The dial is the secret you know: the three gates line up only at 42, and the fence drops. The key is the thing you have: seated, it lifts the ward. The bolt is sprung into the strike and leaves only when both have happened. Arrow keys step the dial and the key; End sets both.",
  body: `${style}<div class="iso-stage" tabindex="0" role="group" aria-label="Two-factor lock. Drag across the figure to turn the dial and seat the key. Left and right arrows step the dial, up and down seat the key, End sets both, Home clears them.">${svg}<span class="iso-sr" data-live aria-live="polite"></span></div>`,
});

for (const theme of ["dark", "light"]) {
  const name = theme === "light" ? "mfa-lock-light.html" : "mfa-lock.html";
  writeFileSync(join(ROOT, name), k.pageHtml({ title: "Two-factor lock", theme, body, script: kitScript() + live, width: 720 }));
  console.log("wrote", name);
}
console.log("solids", (svg.match(/iso-solid/g) || []).length);
