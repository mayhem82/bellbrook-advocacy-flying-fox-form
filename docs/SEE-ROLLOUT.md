# MAYHEM Spatial Evidence Engine Rollout

**Project:** Bellbrook Advocacy Portal  
**Engine:** SEE — Spatial Evidence Engine  
**Status:** Rollout Roadmap  
**First Deployment:** Bellbrook Advocacy Portal  

---

## 1. Purpose

This rollout plan defines how the MAYHEM Spatial Evidence Engine (SEE) will be introduced into the Bellbrook Advocacy Portal.

Bellbrook is the first operational deployment and validation environment for SEE. The portal is not a throwaway prototype. It is the live pilot used to prove a reusable rural and remote community investigation framework.

SEE turns a reported issue into a mapped, evidence-backed investigation object. It starts with location, then builds the evidence chain around that location.

---

## 2. Core Operating Logic

```text
Locate → Define → Observe → Verify → Correlate → Report
```

The portal should move progressively from form-first reporting toward map-first investigation.

A resident should eventually be able to:

1. Select an issue type.
2. Pinpoint the affected location.
3. Draw the affected area.
4. Add ground photographs or observations.
5. Link the issue to historical imagery, Street View, Earth observation, and community records.
6. Generate a structured evidence record.

---

## 3. Rollout Phases

### Phase 1 — Spatial Foundation

Add the basic spatial layer required for SEE.

Planned capabilities:

- Interactive map view.
- Point marker placement.
- Line drawing.
- Polygon drawing.
- Manual coordinate entry.
- Investigation area creation.
- Issue linked to a geographic footprint rather than only an address or text description.

Bellbrook validation:

- Park canopy areas can be marked.
- Resident issue locations can be pinned.
- Affected areas can be drawn without requiring GIS knowledge.

---

### Phase 2 — Ground Evidence Capture

Connect user-submitted observations to exact locations.

Planned capabilities:

- Open Camera photo workflow guidance.
- GPS metadata capture or manual entry.
- Compass bearing recording.
- Camera tilt / pitch recording.
- Date and time recording.
- Permanent photo station IDs.
- Repeat-photo guidance.
- Ground observation notes.

Bellbrook validation:

- Users can photograph specific canopy sections.
- Photos can be matched to a map location.
- Repeat photo points can be used to track change over time.

---

### Phase 3 — Historical Context

Add historical visual comparison.

Planned capabilities:

- Google Earth historical imagery reference workflow.
- Google Street View comparison workflow.
- Historical capture-date recording.
- Before / after visual comparison notes.
- Timeline entries for visible change.

Bellbrook validation:

- Historical canopy condition can be compared against current ground photographs.
- Street View dates can be recorded as independent third-party visual references.
- Visible canopy thinning, dead limbs, or structural change can be documented without claiming causation by default.

---

### Phase 4 — Earth Observation Layer

Introduce satellite and remote-sensing evidence.

Planned capabilities:

- Google Earth Engine workflow documentation.
- NDVI time-series workflow.
- Vegetation-change comparison.
- Control-area comparison.
- Seasonal and regional context checks.
- Exported chart or observation summary.

Bellbrook validation:

- Bellbrook Park canopy can be compared over time.
- Nearby unaffected vegetation can be used as control areas.
- NDVI decline or recovery can be treated as one evidence layer rather than proof by itself.

---

### Phase 5 — AI-Guided Evidence Collection

Use AI to help residents collect stronger evidence.

Planned capabilities:

- Issue-type selection.
- Location-aware evidence prompts.
- Guided observation checklists.
- Evidence-gap detection.
- Recommended additional photos.
- Suggested control-area checks.
- Distinction between observation, inference, and unsupported claim.

Bellbrook validation:

- A resident selecting "tree canopy" receives canopy-specific evidence prompts.
- A resident selecting "flooding" receives hydrology-specific prompts.
- The portal guides evidence collection without requiring users to understand GIS, NDVI, or remote sensing.

---

### Phase 6 — Evidence Correlation

Bring multiple evidence sources into a single investigation timeline.

Planned capabilities:

- Resident account linkage.
- Council record linkage.
- Photo station history.
- Street View references.
- Earth observation summaries.
- Timeline assembly.
- Contradiction and gap tracking.

Bellbrook validation:

- Resident accounts can be compared with mapped affected areas.
- Council records can be placed on the same issue timeline.
- Satellite, Street View, ground-photo, and document evidence remain distinguishable.

---

### Phase 7 — Reporting and Export

Generate transparent outputs that can be reviewed, printed, shared, or escalated.

Planned capabilities:

- Spatial evidence summary.
- Issue map export.
- Timeline export.
- Photo-station comparison.
- Evidence register export.
- Community summary.
- Authority briefing pack.
- Recipient-specific evidence pack.

Bellbrook validation:

- A Bellbrook issue can be exported as a structured evidence record.
- Reports separate fact, observation, inference, and unresolved gaps.
- Outputs remain usable for residents, media, councillors, agencies, and legal review.

---

## 4. SEE Investigation Object

Each SEE investigation should eventually resolve into a structured object.

```text
Spatial Investigation Object

ID
Community
Issue type
Responsible authority
Geometry
  - point
  - line
  - polygon
Location description
Evidence
  - resident accounts
  - photos
  - videos
  - documents
  - Street View references
  - historical imagery
  - Earth observation outputs
Timeline
Control areas
Known gaps
Confidence status
Export outputs
```

---

## 5. Evidence Rules

SEE must preserve clear evidentiary separation.

The system must distinguish:

- Direct observation.
- Geotagged media.
- Historical imagery.
- Remote sensing.
- Third-party records.
- Resident accounts.
- Analytical inference.
- Unsupported claim.
- Information gap.

SEE must not automatically convert correlation into causation.

Preferred framing:

```text
This location shows a documented pattern requiring investigation.
```

Avoid unsupported framing:

```text
This caused that.
```

---

## 6. Bellbrook Pilot Success Criteria

The Bellbrook Advocacy Portal validates SEE if it demonstrates:

- Repeatable spatial evidence collection.
- GPS-linked community observations.
- Ground-photo evidence tied to location and direction.
- Historical imagery and Street View comparison.
- Earth observation evidence treated as one layer, not proof by itself.
- Resident accounts correlated with location and time.
- Transparent reporting that separates observation from interpretation.
- A workflow reusable by another rural or remote community without redesigning the engine.

---

## 7. Framework Reuse

Bellbrook remains the first deployment, but SEE is designed for reuse across rural and remote communities.

Reusable issue types include:

- Flying-fox impacts.
- Tree canopy decline.
- Flood access points.
- Road failures.
- Erosion.
- Contaminated sites.
- Illegal dumping.
- Neglected infrastructure.
- Planning and development impacts.
- Waterway damage.

The feature rule is:

```text
Solve the Bellbrook problem first, but build the capability so another rural or remote community can reuse it with minimal change.
```

---

## 8. Implementation Priority

Immediate next steps:

1. Keep the current community evidence form stable.
2. Add a simple spatial issue model.
3. Add map-based issue location capture.
4. Add photo-point and ground-evidence fields.
5. Add documentation for Google Earth / Street View / Open Camera workflows.
6. Add export fields for location, geometry, evidence type, and observation status.
7. Add Earth observation workflow only after the basic spatial record is reliable.

Do not start with complex AI or satellite automation before the portal can reliably store and export simple spatial evidence.
