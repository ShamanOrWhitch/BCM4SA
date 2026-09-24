#!/usr/bin/env python3
"""Cinematic 1200×630 share card for Galia Crew Bay — NASA globe + HUD + lockup."""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path("/workspace")
BUILD = Path("/workspace/.grok/og-build")
W, H = 1200, 630

BG = (7, 9, 14)
SURFACE = (16, 20, 28)
BRASS = (196, 163, 90)
BRASS_DIM = (138, 115, 64)
ICE = (158, 182, 196)
PAPER = (232, 238, 242)


def load_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(BUILD / name), size)


def ch_w(font: ImageFont.FreeTypeFont, ch: str) -> float:
    if ch == " ":
        return float(font.getlength(" "))
    bb = font.getbbox(ch)
    return float(bb[2] - bb[0])


def tracked_width(font: ImageFont.FreeTypeFont, text: str, tracking: float) -> float:
    if not text:
        return 0.0
    return sum(ch_w(font, ch) for ch in text) + tracking * (len(text) - 1)


def blit_tracked(
    base: Image.Image,
    text: str,
    cx: float,
    cy: float,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    tracking: float = 0,
    glow: tuple[int, int, int, int] | None = None,
    glow_radius: int = 10,
) -> None:
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    width = tracked_width(font, text, tracking)
    ascent, descent = font.getmetrics()
    x = cx - width / 2
    y = cy - (ascent + descent) / 2
    if glow:
        g = Image.new("RGBA", base.size, (0, 0, 0, 0))
        gd = ImageDraw.Draw(g)
        gx = x
        for ch in text:
            gd.text((gx, y), ch, font=font, fill=glow)
            gx += ch_w(font, ch) + tracking
        g = g.filter(ImageFilter.GaussianBlur(glow_radius))
        layer = Image.alpha_composite(layer, g)
        draw = ImageDraw.Draw(layer)
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += ch_w(font, ch) + tracking
    base.alpha_composite(layer)


def sample_sphere(
    tex: np.ndarray,
    cx: float,
    cy: float,
    r: float,
    lon0: float,
    tilt: float,
    light: tuple[float, float, float],
    ambient: float = 0.10,
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Return RGB float image of a lit sphere, plus mask and nz (camera-facing)."""
    th, tw = tex.shape[:2]
    yy, xx = np.mgrid[0:H, 0:W]
    dx = xx.astype(np.float32) - cx
    dy = yy.astype(np.float32) - cy
    rho2 = dx * dx + dy * dy
    mask = rho2 <= (r * r)
    z = np.zeros((H, W), dtype=np.float32)
    z[mask] = np.sqrt(np.maximum(r * r - rho2[mask], 0.0))
    nx = np.zeros((H, W), dtype=np.float32)
    ny = np.zeros((H, W), dtype=np.float32)
    nz = np.zeros((H, W), dtype=np.float32)
    inv_r = 1.0 / r
    nx[mask] = dx[mask] * inv_r
    ny[mask] = dy[mask] * inv_r
    nz[mask] = z[mask] * inv_r

    c_t, s_t = math.cos(tilt), math.sin(tilt)
    ny2 = ny * c_t - nz * s_t
    nz2 = ny * s_t + nz * c_t
    c_l, s_l = math.cos(lon0), math.sin(lon0)
    nx3 = nx * c_l + nz2 * s_l
    nz3 = -nx * s_l + nz2 * c_l
    ny3 = ny2

    lng = np.arctan2(nx3, nz3)
    lat = np.arcsin(np.clip(ny3, -1.0, 1.0))
    u = (lng / (2 * math.pi) + 0.5) % 1.0
    v = np.clip(0.5 - lat / math.pi, 0.0, 1.0)

    uf = u * (tw - 1)
    vf = v * (th - 1)
    u0 = np.floor(uf).astype(np.int32) % tw
    v0 = np.clip(np.floor(vf).astype(np.int32), 0, th - 1)
    u1 = (u0 + 1) % tw
    v1 = np.clip(v0 + 1, 0, th - 1)
    fu = (uf - np.floor(uf)).astype(np.float32)
    fv = (vf - np.floor(vf)).astype(np.float32)

    tex_f = tex.astype(np.float32)
    c00 = tex_f[v0, u0]
    c10 = tex_f[v0, u1]
    c01 = tex_f[v1, u0]
    c11 = tex_f[v1, u1]
    fu3 = fu[..., None]
    fv3 = fv[..., None]
    sampled = (
        c00 * (1 - fu3) * (1 - fv3)
        + c10 * fu3 * (1 - fv3)
        + c01 * (1 - fu3) * fv3
        + c11 * fu3 * fv3
    )

    lx, ly, lz = light
    ln = math.sqrt(lx * lx + ly * ly + lz * lz)
    lx, ly, lz = lx / ln, ly / ln, lz / ln
    ndotl = np.clip(nx * lx + ny * ly + nz * lz, 0.0, 1.0)
    wrap = np.clip(ndotl * 1.15, 0.0, 1.0)
    lit = ambient + (1.0 - ambient) * wrap
    rgb = sampled * lit[..., None]

    ice = np.array(ICE, dtype=np.float32)
    rim = np.clip((1.0 - nz) * 1.55 - 0.25, 0.0, 1.0) * mask.astype(np.float32)
    rgb = rgb * (1.0 - 0.28 * rim[..., None]) + ice * (0.38 * rim[..., None])
    rgb[~mask] = 0
    return rgb, mask, nz


def stars(rng: np.random.Generator) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    n = 180
    xs = rng.integers(0, W, n)
    ys = rng.integers(0, H, n)
    bright = rng.integers(70, 200, n)
    sizes = rng.choice([0, 0, 1], n)
    for x, y, b, s in zip(xs, ys, bright, sizes):
        col = (PAPER[0], PAPER[1], PAPER[2], int(b))
        if s == 0:
            d.point((int(x), int(y)), fill=col)
        else:
            d.rectangle((int(x), int(y), int(x) + 1, int(y) + 1), fill=col)
    return layer


def glow_disc(cx: int, cy: int, r: int, color: tuple[int, int, int], alpha: int) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(*color, alpha))
    return layer.filter(ImageFilter.GaussianBlur(28))


def rotated_ellipse(
    cx: int,
    cy: int,
    rx: int,
    ry: int,
    angle_deg: float,
    color: tuple[int, int, int, int],
    width: int,
) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), outline=color, width=width)
    return layer.rotate(angle_deg, resample=Image.BICUBIC, center=(cx, cy))


def wire_globe(cx: int, cy: int, r: int, color: tuple[int, int, int, int]) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=color, width=2)
    for t in (-0.72, -0.4, 0.0, 0.4, 0.72):
        ry = max(3, int(abs(math.cos(t * math.pi / 2) * r)))
        yy = cy + int(t * r)
        d.ellipse((cx - r, yy - ry // 6, cx + r, yy + ry // 6), outline=color, width=1)
    for frac in (-0.7, -0.35, 0.0, 0.35, 0.7):
        rx = max(3, int(abs(math.sqrt(max(0.05, 1 - frac * frac)) * r * 0.55)))
        xx = cx + int(frac * r * 0.15)
        d.ellipse((xx - rx, cy - r, xx + rx, cy + r), outline=color, width=1)
    d.line((cx - r, cy, cx + r, cy), fill=color, width=1)
    return layer


def hud(base: Image.Image) -> None:
    d = ImageDraw.Draw(base)
    m, L, t = 36, 52, 2
    c = (*BRASS, 210)
    dim = (*BRASS_DIM, 160)
    # viewfinder corners
    for x0, x1, y0, y1 in (
        (m, m + L, m, m),
        (m, m, m, m + L),
        (W - m - L, W - m, m, m),
        (W - m, W - m, m, m + L),
        (m, m + L, H - m, H - m),
        (m, m, H - m - L, H - m),
        (W - m - L, W - m, H - m, H - m),
        (W - m, W - m, H - m - L, H - m),
    ):
        d.line([(x0, y0), (x1, y1)], fill=c, width=t)
    # tick marks along top/bottom
    for x in range(180, W - 180, 40):
        h = 8 if (x // 40) % 3 else 14
        d.line([(x, m + 10), (x, m + 10 + h)], fill=dim, width=1)
        d.line([(x, H - m - 10), (x, H - m - 10 - h)], fill=dim, width=1)
    # side ticks
    for y in range(120, H - 120, 36):
        wlen = 7 if (y // 36) % 2 else 12
        d.line([(m + 12, y), (m + 12 + wlen, y)], fill=dim, width=1)
        d.line([(W - m - 12, y), (W - m - 12 - wlen, y)], fill=dim, width=1)


def vignette(base: Image.Image) -> None:
    yy, xx = np.ogrid[0:H, 0:W]
    nx = (xx - W / 2) / (W * 0.62)
    ny = (yy - H / 2) / (H * 0.58)
    v = np.clip((nx * nx + ny * ny - 0.15) * 0.85, 0.0, 1.0)
    arr = np.array(base, dtype=np.float32)
    shade = 1.0 - 0.55 * v
    arr[..., :3] *= shade[..., None]
    base.paste(Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)))


def main() -> None:
    rng = np.random.default_rng(42)
    earth = np.array(Image.open(ROOT / "public/textures/earth.jpg").convert("RGB"))
    clouds = np.array(Image.open(ROOT / "public/textures/clouds.jpg").convert("L"))

    canvas = np.zeros((H, W, 3), dtype=np.float32)
    canvas[:] = np.array(BG, dtype=np.float32)

    # warm/cool space wash
    yy, xx = np.ogrid[0:H, 0:W]
    canvas += np.array(ICE, dtype=np.float32) * (0.04 * (xx / W))[..., None]
    canvas += np.array(BRASS, dtype=np.float32) * (0.03 * (1 - yy / H))[..., None]

    cx, cy, r = 980, 392, 328
    rgb, mask, nz = sample_sphere(
        earth,
        cx,
        cy,
        r,
        lon0=math.radians(18),
        tilt=math.radians(-14),
        light=(0.55, -0.18, 0.72),
        ambient=0.08,
    )
    cloud_rgb, cmask, _ = sample_sphere(
        np.stack([clouds, clouds, clouds], axis=-1),
        cx,
        cy,
        r,
        lon0=math.radians(22),
        tilt=math.radians(-14),
        light=(0.55, -0.18, 0.72),
        ambient=0.12,
    )
    cloud_a = (cloud_rgb[..., 0] / 255.0) * 0.45
    rgb = rgb * (1 - cloud_a[..., None]) + np.array(PAPER, dtype=np.float32) * cloud_a[..., None]

    canvas[mask] = rgb[mask]
    img = Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8)).convert("RGBA")

    # atmosphere halo
    halo = glow_disc(cx, cy, r + 36, ICE, 70)
    img = Image.alpha_composite(img, halo)
    brass_halo = glow_disc(cx, int(cy - 40), r // 2, BRASS, 28)
    img = Image.alpha_composite(img, brass_halo)

    img.alpha_composite(stars(rng))

    # orbital rings around the planet
    img.alpha_composite(rotated_ellipse(cx, cy, r + 18, int(r * 0.22), -16, (*BRASS, 200), 2))
    img.alpha_composite(rotated_ellipse(cx, cy, r + 34, int(r * 0.30), -16, (*ICE, 90), 1))
    img.alpha_composite(rotated_ellipse(cx, cy, int(r * 0.78), int(r * 0.16), 28, (*BRASS, 90), 1))

    # holographic cartograph globe — left of lockup, ice meridians
    hx, hy, hr = 268, 318, 108
    hglow = glow_disc(hx, hy, hr + 8, ICE, 40)
    img = Image.alpha_composite(img, hglow)
    img.alpha_composite(wire_globe(hx, hy, hr, (*ICE, 170)))
    img.alpha_composite(wire_globe(hx, hy, int(hr * 0.62), (*BRASS, 90)))
    # dock pip at north pole of hologram
    d = ImageDraw.Draw(img)
    d.ellipse((hx - 5, hy - hr - 5, hx + 5, hy - hr + 5), fill=(*BRASS, 230))

    hud(img)
    vignette(img)

    # dark scrim behind title so lettering never fights the globe
    scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    sd.ellipse((330, 140, 870, 500), fill=(7, 9, 14, 96))
    scrim = scrim.filter(ImageFilter.GaussianBlur(28))
    img = Image.alpha_composite(img, scrim)

    font_eye = load_font("Rajdhani-SemiBold.ttf", 34)
    font_hero = load_font("Rajdhani-Bold.ttf", 118)
    font_tag = load_font("IBMPlexMono-Medium.ttf", 18)

    cx_t, mid = 600.0, 318.0
    blit_tracked(
        img,
        "GALIA",
        cx_t,
        mid - 78,
        font_eye,
        (*ICE, 235),
        tracking=16,
        glow=(*ICE, 70),
        glow_radius=8,
    )
    blit_tracked(
        img,
        "CREW BAY",
        cx_t,
        mid + 4,
        font_hero,
        (*BRASS, 255),
        tracking=6,
        glow=(*BRASS, 90),
        glow_radius=14,
    )

    # brass rule under the hero line
    rule_w = 220
    rd = ImageDraw.Draw(img)
    y_rule = int(mid + 78)
    rd.line([(int(cx_t - rule_w / 2), y_rule), (int(cx_t + rule_w / 2), y_rule)], fill=(*BRASS, 200), width=2)
    rd.ellipse((int(cx_t - 3), y_rule - 3, int(cx_t + 3), y_rule + 3), fill=(*ICE, 230))

    blit_tracked(
        img,
        "STAR ATLAS CARTOGRAPH",
        cx_t,
        mid + 108,
        font_tag,
        (*ICE, 210),
        tracking=7,
        glow=(*ICE, 40),
        glow_radius=4,
    )

    out_png = BUILD / "og-raw.png"
    img.convert("RGB").save(out_png, "PNG")
    print("wrote", out_png, img.size)


if __name__ == "__main__":
    main()
