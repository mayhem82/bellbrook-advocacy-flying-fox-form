# DFAPTI Factualism Audit Rules

## Purpose

Every DFAPTI finding must be traceable to primary-source evidence. DFAPTI does
not make unsupported allegations. This document is the classification
standard applied to every evidence register entry, and it applies the same
discipline already set out for this project's community records in
`upper-macleay/MAYHEM_COMPLIANCE.md`: source primacy, fact separation,
no allegation framing, and contradiction preservation.

## Classifications

### ACCEPTED

Requirements (all must hold):

- The record is a primary source (the council, agency, minister, or
  department's own published document or media release — not a secondary
  news report about it).
- The source authority has been verified (correct domain, correct issuing
  body).
- The evidence directly supports the specific statement it is attached to,
  with no interpretive leap required.

### HELD

Requirements:

- Relevant information exists and has been captured.
- Verification is incomplete — for example, the claim so far rests only on
  a search-engine synthesis rather than one specific primary document, or
  corroboration is still pending.
- HELD entries may be promoted to ACCEPTED once verification completes, or
  moved to REJECTED if verification fails. The original HELD record is never
  deleted or edited in place — a new entry is appended and the old one is
  marked `superseded_by`.

### REJECTED

Examples:

- Unsupported claims with no underlying document.
- Opinion presented without evidence.
- Secondary reporting (news coverage, commentary) without primary-source
  confirmation.
- Evidence contradicted by a later or higher-authority primary source.

### PENDING

- A candidate document has been noticed but not yet reviewed against any of
  the above criteria.

## Proof of Fact (Human plus Evidence)

Distinct from classification. Scored per entry:

- **1 — Verified**: a human has independently checked the source_url and
  confirmed the summary accurately reflects the primary document.
- **0 — Unverified**: default for every newly-captured entry. Requires
  independent review before the entry is cited as submission-grade evidence.

Every score carries a short rationale.

## No Allegation Framing

Findings describe what the record shows, not motive or intent:

- "The record shows..."
- "The council's own release states..."
- "No corroborating primary source has yet been located."
- "This location shows a documented pattern requiring investigation" rather
  than "This caused that."

Avoid language implying wrongdoing, bad faith, or culpability unless a
primary source directly and explicitly supports that specific characterization.

## Append-Only Discipline

- Evidence records are never deleted.
- Corrections and updates are new entries that reference the prior
  `evidence_id` via `superseded_by`.
- Every entry is timestamped at capture and at register append time.
- A missing document_hash means the document has not yet been independently
  fetched and hashed — it does not mean the finding is false.

## Contradiction Preservation

If a later record conflicts with an earlier one (for example, two sources
giving different dates for the same event), both stay visible and the
contradiction is logged in `verification_notes` rather than silently
resolved in favour of one.

## Silence Handling

Absence of a follow-up record (for example, no confirmed completion notice
for a project past its stated target date) may only be treated as a finding
when it is tied to a specific prior commitment, deadline, or promised
report. Silence by itself is not proof of delay or failure — it is logged
as an open gap in the case timeline.

## Duplicate Handling

Before appending a new entry, the source_url is checked against existing
register entries. Matches are skipped rather than re-appended.
