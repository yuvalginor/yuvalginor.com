#!/usr/bin/env python3
"""Generate the yuvalginor.com wave logo as SVG.

The mark is a damped sine wave (not initials), smoothed into a single thick
stroke in the site's brand purple. Deterministic, no dependencies.
Writes docs/brand/logo.svg (dark tile) and docs/brand/logo-transparent.svg.

See docs/brand/logo.md for the full spec. Rasterize into favicons with
scripts/generate-favicons.sh.
"""
import math
import os

S = 400                  # square canvas / viewBox (px)
BRAND = "#9C96F8"        # oklch(0.7188 0.1405 285.08) -- site --color-brand (dark)
BG = "#282C34"           # site --color-bg-base (dark)
STROKE_W = 10            # chosen "extra bold" weight, in viewBox units
STROKE_OPACITY = 0.8
PAD = 0.16               # inner margin fraction per side


def points():
    """Sample the damped sine: 400 points, t in [0, 1]."""
    pts = []
    for i in range(400):
        t = i / 399
        y = math.exp(-2.4 * t) * math.sin(2 * math.pi * (1.7 * t + 1.3 * t * t))
        pts.append((t * 600, y * 180))
    return pts


def fit(pts):
    """Fit into the square: independent x/y scaling (stretches to fill), centered."""
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    sx = (S * (1 - 2 * PAD)) / (x1 - x0)
    sy = (S * (1 - 2 * PAD)) / (y1 - y0)
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    return [(S / 2 + (x - cx) * sx, S / 2 + (y - cy) * sy) for x, y in pts]


def path_d(P):
    """Catmull-Rom -> cubic bezier (tension 1/6) for a smooth path."""
    d = f"M {P[0][0]:.2f},{P[0][1]:.2f}"
    for i in range(len(P) - 1):
        p0 = P[i - 1] if i > 0 else P[0]
        p1, p2 = P[i], P[i + 1]
        p3 = P[i + 2] if i + 2 < len(P) else P[i + 1]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C {c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {p2[0]:.2f},{p2[1]:.2f}"
    return d


def svg(d, dark):
    rect = f'<rect width="{S}" height="{S}" fill="{BG}"/>' if dark else ""
    return (
        f'<svg width="{S}" height="{S}" viewBox="0 0 {S} {S}" xmlns="http://www.w3.org/2000/svg">'
        f"{rect}"
        f'<path d="{d}" fill="none" stroke="{BRAND}" stroke-opacity="{STROKE_OPACITY}" '
        f'stroke-width="{STROKE_W}" stroke-linecap="round" stroke-linejoin="round"/>'
        f"</svg>\n"
    )


def main():
    out = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs", "brand"))
    os.makedirs(out, exist_ok=True)
    d = path_d(fit(points()))
    with open(os.path.join(out, "logo.svg"), "w") as f:
        f.write(svg(d, dark=True))
    with open(os.path.join(out, "logo-transparent.svg"), "w") as f:
        f.write(svg(d, dark=False))
    print(f"wrote {out}/logo.svg and logo-transparent.svg")


if __name__ == "__main__":
    main()
