# 3d-model-tool

Node.js + Three.js scaffold that builds an **approximate** 3D scene from a set of
backyard reference photos, exports it to `.obj`/`.mtl`, and renders an isometric
preview PNG.

The scene models a green-arched hoop tunnel (poly-tunnel/shade-house frame),
a repurposed shipping container, a water tank, three raised garden beds, a
stack of corrugated iron sheeting, and the timber boundary fence.

**This is not a measured or surveyed model.** Every dimension was eyeballed
from nine photos of the yard — see "Assumptions & estimates" below.

## Usage

```bash
npm install
npm run build     # runs export + preview
```

Or individually:

```bash
npm run export    # writes output/model.obj + output/model.mtl
npm run preview   # writes output/preview.png (isometric render via headless Chromium)
```

Outputs land in `./output/`:
- `model.obj` / `model.mtl` — the exported mesh + materials
- `preview.png` — a 1600x1000 isometric render for a quick sanity check

## How it works

- `src/materials.js` — the color/roughness/metalness palette, eyeballed from
  the photos (one entry per surface type: painted steel, rusted container
  panel, poly tank, timber, etc).
- `src/buildScene.js` — pure Three.js scene construction using only primitive
  geometry (`BoxGeometry`, `CylinderGeometry`, `TorusGeometry`, `SphereGeometry`).
  Exports `buildScene(THREE)`, shared by both the exporter and the renderer so
  there is exactly one source of truth for the geometry.
- `scripts/export-obj.js` — Node script. Builds the scene, runs it through
  Three's `OBJExporter`, and writes `model.obj`. `OBJExporter` does **not**
  generate a `.mtl` file itself (it only emits `usemtl <name>` references), so
  this script also walks the scene's unique materials and hand-writes a
  matching `model.mtl` with `Kd`/`Ka`/`Ks`/`Ns` from each material's color,
  metalness and roughness.
- `browser/render-entry.js` — same `buildScene()` call, bundled for the
  browser with esbuild and rendered with `WebGLRenderer` under headless
  Chromium (Playwright), screenshotted to `preview.png`.

## Assumptions & proportions

The **shipping container is the scale anchor**: it's the one object in the
photos with a standardized real-world size (a 20 ft ISO container —
6.06m x 2.44m x 2.59m), so every other dimension is proportioned relative to
it by eye, rather than from an arbitrary guess.

| Element | Estimated size | Reasoning |
|---|---|---|
| Container | 6.06 x 2.44 x 2.59 m | Standard 20ft ISO container dimensions (visually consistent with the photos) |
| Hoop tunnel arch | 1.6m radius, 0.5m vertical leg before the curve starts (≈2.1m apex height, 3.2m span) | By eye against the container and the wheelie bins visible in several photos |
| Tunnel length | ~9.8m, 8 arches at 1.4m spacing | Counted arches in the photos; spacing eyeballed |
| Water tank | 0.85m radius, ~1.7m total height | By eye against the container and bins |
| Garden beds | 1.7 x 0.8 x 0.45 m | Typical raised-sleeper-bed proportions, matched to the photos |
| Fence | 1.8m tall paling fence | Standard suburban fence height, matches the photos |

## What I couldn't confirm from the photos

- **Exact tunnel arch profile.** The real arches aren't a clean semicircle —
  they look like they have a short straight leg near the ground before
  curving. I approximated this with a straight cylinder "leg" plus a
  half-circle `TorusGeometry`, but the true curvature/leg-height split is a
  guess.
- **Full tunnel length.** Only ~5 of the ~8 arches are ever in frame at once
  across the photos; the total run length is inferred, not counted end to end.
- **Container elevation/support detail.** The photos show pale pipe-like
  stumps under the corners, but not how many or their exact height — I used
  four short cylinders at a plausible ~0.3m.
- **Materials/colors.** All colors (rust tone on the container, dark green on
  the tank and arches, weathered grey-brown on the fence) are eyeballed from
  the photos under natural overcast light, not sampled/calibrated — a
  cloudier or sunnier photo would shift the read.
- **What's behind/inside the container and beyond the fence** — not visible
  in any photo, so not modeled.
- **Exact relative spacing** between the tunnel, container, tank and fence —
  the photos show them from oblique angles without a common reference line,
  so gaps between structures are a plausible layout, not a survey.

## Opening the OBJ in Blender (or another viewer)

1. Open Blender, then **File → Import → Wavefront (.obj)**.
2. Navigate to `output/model.obj` (Blender will automatically find
   `model.mtl` and `preview` textures aren't used, so no texture prompts).
3. Blender's OBJ importer defaults to Z-up while this scene was authored
   Y-up (Three.js convention) — in the import dialog, set **Forward: -Y** and
   **Up: Z** if the model looks like it's lying on its side (recent Blender
   versions usually get this right automatically, but check).
4. Once imported, everything is grouped by object name (`arch_0`,
   `containerBody`, `tankDome`, `bed_0`, `fencePanel`, etc.) so you can
   select/hide/re-proportion individual pieces without hunting through a
   single merged mesh.
5. To refine proportions, select an object and adjust its scale/position in
   the N-panel — since everything is built from primitives, resizing won't
   distort UVs or break topology.

Any other `.obj` viewer (Windows 3D Viewer, macOS Quick Look, MeshLab,
online viewers) will also open `model.obj` directly as long as `model.mtl`
sits alongside it in the same folder.
