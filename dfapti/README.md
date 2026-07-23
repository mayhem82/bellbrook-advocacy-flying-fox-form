# DFAPTI — Deep Forensic All Paths Taken Investigation

Source-verified investigation records for the Bellbrook Advocacy Portal,
applying the same factualism discipline as `upper-macleay/MAYHEM_COMPLIANCE.md`
in the sibling council-intelligence repository: primary sources first,
strict fact/inference separation, no allegation framing, append-only
evidence.

## Structure

```text
dfapti/
├── rules/factualism-audit.md   Evidence classification standard
├── schemas/                    JSON Schemas for evidence and case records
├── evidence/register.json      Global, append-only evidence register
└── cases/
    ├── index.json               List of active case IDs
    └── <case_id>/
        ├── case.json            Title, objective, scope, primary sources
        ├── timeline.json        Dated events, each linked to evidence IDs
        └── keywords.json        Source authorities and search terms
```

## Rules

See `rules/factualism-audit.md` for the full classification standard
(ACCEPTED / HELD / REJECTED / PENDING, Proof of Fact scoring, append-only
discipline, contradiction preservation, silence handling).

## Current cases

- `DFAPTI-BB-2026-00001` — Willawarrin / Bellbrook Recurring Drinking Water
  Failure.

This is separate from the portal's resident-facing Community Impact Record
form (the flying-fox camp issue and the other draft issues under
construction). DFAPTI tracks the underlying government/regulator record;
the portal's forms capture resident testimony.
