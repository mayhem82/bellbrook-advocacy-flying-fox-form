# Bellbrook Flying-Fox Community Impact Form

Standalone GitHub Pages form for collecting Bellbrook flying-fox community impact records.

## What it does

- Captures community impact details in a browser form
- Saves draft content locally in the user's browser
- Generates a structured plain-text community record
- Allows copy, print, and `.txt` export
- Runs as a static GitHub Pages site

## What it does not do

- It does not automatically send submissions
- It does not upload evidence files
- It does not store records in GitHub, email, or a database

This is intentional for the first public version: people can complete the form, export or print the record, then hand it in or send it through a separate channel.

## Canopy Health Evidence Plan

This project may be supported by a separate canopy-health evidence workflow using Google Earth Engine, Google Earth historical imagery, Street View, and ground-level photographs.

The purpose of this workflow is not to treat satellite data as proof by itself. The purpose is to build a reproducible evidence chain showing whether visible canopy decline is consistent with the timing, location, and duration of flying-fox occupation, while also checking other plausible causes such as seasonality, drought, storm damage, flooding, normal vegetation cycles, or unrelated tree decline.

### Core analysis layers

- **Google Earth Engine / NDVI:** Use satellite imagery to measure vegetation greenness over time. NDVI can help identify canopy thinning, defoliation, and recovery patterns.
- **Baseline comparison:** Establish the normal vegetation range before the relevant flying-fox occupation period, then compare later imagery against that baseline.
- **Control areas:** Compare the park canopy with nearby unaffected trees, nearby parks, and broader local vegetation trends so the analysis does not confuse regional conditions with site-specific decline.
- **Google Earth historical imagery:** Review available historical satellite imagery for visible canopy structure, canopy gaps, dead limbs, and changes in tree cover.
- **Google Street View:** Use independent historical street-level images, where available, to compare canopy condition from consistent road viewpoints across different years.
- **Ground photography:** Use repeatable photo points taken from fixed positions with GPS, compass direction, and camera tilt recorded in the image metadata.
- **Resident and council records:** Correlate visual and satellite observations with dated community accounts, meeting records, council reports, and other documentary evidence.

### Ground-photo method

Ground-level photographs should be collected as repeatable evidence, not as isolated images.

Each photo should preserve or record:

- GPS location
- Compass bearing / direction
- Camera tilt or pitch
- Date and time
- Photographer position
- Photo point ID, such as `P01`, `P02`, or `P03`
- Short description of the canopy section being photographed

Preferred approach:

1. Establish fixed photo stations around the park.
2. Photograph the same canopy sections from the same positions over time.
3. Use the same approximate direction, tilt, and zoom where possible.
4. Match each ground photo to the relevant satellite pixel area or canopy section.
5. Compare ground observations with NDVI movement and historical imagery.

### Evidence-chain logic

The intended chain is:

1. Identify the relevant canopy area.
2. Establish a pre-impact baseline.
3. Record flying-fox occupation timing and location.
4. Measure canopy condition through satellite NDVI and imagery.
5. Compare with unaffected control areas.
6. Validate with Street View and ground-level photographs.
7. Cross-check with council records, resident observations, and dated public material.
8. Separate confirmed observations from interpretation.
9. Avoid claiming causation unless the evidence supports it.

This creates a stronger record than relying on any single source. Satellite analysis, Street View, and ground photographs should operate as mutually checking evidence layers.

## GitHub Pages setup

Repository Settings → Pages → Deploy from a branch → `main` → `/root`.

Expected public URL:

`https://mayhem82.github.io/bellbrook-advocacy-flying-fox-form/`
