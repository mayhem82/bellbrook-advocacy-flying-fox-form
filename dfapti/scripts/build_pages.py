"""Generate the DFAPTI landing page and per-case detail pages from the JSON data.

Reads dfapti/cases/index.json, each case's case.json/timeline.json, and
dfapti/evidence/register.json, and writes:
  - dfapti/index.html                      (list of all cases)
  - dfapti/cases/<case_id>/index.html       (one page per case)

Run from the repo root: python3 dfapti/scripts/build_pages.py
"""

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CASES_DIR = ROOT / "cases"
REGISTER = ROOT / "evidence" / "register.json"

STYLE = """
body{margin:0;background:#f5f2eb;color:#1f1b16;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;font-size:18px}
.top{background:#063d2e;color:white;padding:28px 18px}
.wrap{max-width:940px;margin:auto;padding:22px 18px}
.hero{background:#071f19;color:white;border-radius:26px;padding:34px 24px;text-align:center;margin-bottom:24px}
.card{background:white;border:1px solid #ddd6ca;border-radius:22px;padding:26px;margin:0 0 20px}
.grid{display:grid;gap:18px}
.btn{display:block;text-align:center;border-radius:16px;padding:16px 18px;font-weight:900;text-decoration:none;background:#087a59;color:white;margin-top:12px}
.btn small{display:block;font-size:14px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px}
.yellow{background:#f5aa20;color:#211400}
.muted{background:#6b5f50;color:white;border:2px dashed #d8d0c3}
.muted small{color:#fff1bf}
h1{margin:0;font-size:36px;line-height:1.1}
h2{margin-top:0;font-size:28px;line-height:1.2}
.tag{display:inline-block;background:#fff7df;border:1px solid #f2d28b;border-radius:999px;padding:5px 10px;font-weight:900;color:#5d4510;font-size:14px}
.tag.build{background:#eef2ff;border-color:#c7d2fe;color:#3730a3}
.bottomnav{background:white;border:1px solid #ddd6ca;border-radius:22px;padding:22px;margin:28px 0 6px}
.bottomnav h2{font-size:24px;margin:0 0 10px}
.foot{background:#1e1a17;color:#aaa;text-align:center;padding:28px 18px}
a{color:#0b644b}
.disclaimer{background:#fff7df;border:1px solid #f2d28b;border-radius:22px;padding:22px 26px;margin:0 0 20px}
.disclaimer h2{font-size:18px;margin:0 0 8px;color:#5d4510}
.disclaimer p{margin:0 0 8px;font-size:15px}
.disclaimer p:last-child{margin-bottom:0}
@media(min-width:720px){.grid{grid-template-columns:1fr 1fr}.card{padding:30px}}
"""

DISCLAIMER = """<section class="disclaimer"><h2>What DFAPTI is (and isn't)</h2><p>This is independent, source-verified research, not an official investigation, complaint, legal proceeding, or government report. It draws only on publicly available government/council material and independently cross-referenced search - every claim is classified as ACCEPTED (verified primary source), HELD (relevant but not fully verified), or an open gap (searched for, not found - logged honestly, not assumed). No finding of fault against any named person or organisation is made or implied anywhere on this site.</p><p>Sources are linked directly wherever available so anyone can check the original document themselves. This register is append-only and corrected in the open: if something here turns out to be wrong, a later entry says so - nothing is quietly edited or removed. See the portal's <a href="__LEGAL_HREF__">Legal &amp; Privacy Notice</a> for the full terms.</p></section>
"""


CLASS_TAG = {
    "ACCEPTED": ("tag", "ACCEPTED"),
    "HELD": ("tag build", "HELD"),
    "PENDING": ("tag build", "OPEN GAP"),
    "REJECTED": ("tag build", "REJECTED"),
}


def esc(s):
    return html.escape(s) if s else ""


def load_json(path, default=None):
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def page_shell(title, back_href, back_label, heading, subheading, body_html):
    back_link = (
        f'<a class="btn muted" href="{esc(back_href)}" style="margin-bottom:14px">&larr; {esc(back_label)}</a>'
        if back_href else ""
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>&#128167;</text></svg>">
<style>{STYLE}</style>
</head>
<body>
<header class="top"><div class="wrap">{back_link}<h1>{esc(heading)}</h1><p>{esc(subheading)}</p></div></header>
<main class="wrap">
{body_html}
</main>
<footer class="foot">DFAPTI &mdash; Deep Forensic All Paths Taken Investigation</footer>
</body>
</html>
"""


def build_case_page(case_id):
    case_dir = CASES_DIR / case_id
    case = load_json(case_dir / "case.json")
    timeline = load_json(case_dir / "timeline.json", {"events": []})
    register = load_json(REGISTER, {"entries": []})

    evidence = [e for e in register["entries"] if e["case_id"] == case_id]
    evidence.sort(key=lambda e: int(e["evidence_id"].split("-")[1]))

    timeline_html = []
    for ev in timeline["events"]:
        ev_ids = ", ".join(ev["evidence_ids"])
        timeline_html.append(
            f'<article class="card"><span class="tag">{esc(ev["date"])}</span>'
            f'<p style="margin-top:10px">{esc(ev["event"])}</p>'
            f'<p style="margin:0;font-size:14px;color:#6b5f50">Evidence: {esc(ev_ids)}</p></article>'
        )

    evidence_html = []
    for e in evidence:
        cls, label = CLASS_TAG.get(e["classification"], ("tag", e["classification"]))
        if e["source_url"]:
            source_line = f'<p style="margin:8px 0 0"><a href="{esc(e["source_url"])}" target="_blank" rel="noopener">{esc(e["document_title"])}</a></p>'
        else:
            source_line = f'<p style="margin:8px 0 0;font-style:italic;color:#6b5f50">{esc(e["document_title"])}</p>'
        auth = esc(e["source_authority"]) if e["source_authority"] else "Not yet identified"
        superseded_html = ""
        if e.get("superseded_by"):
            superseded_html = f'<p style="margin:8px 0 0;font-size:14px;color:#a66a1e"><strong>Superseded by:</strong> {esc(e["superseded_by"])}</p>'
        evidence_html.append(
            f'<article class="card">'
            f'<span class="{cls}">{label}</span> <span class="tag build">{esc(e["confidence"])} confidence</span>'
            f'<h2 style="font-size:20px;margin:10px 0 4px">{esc(e["evidence_id"])} &mdash; {auth}</h2>'
            f'{source_line}'
            f'<p style="margin:10px 0 0">{esc(e["summary"])}</p>'
            f'<p style="margin:10px 0 0;font-size:14px;color:#6b5f50"><strong>Verification notes:</strong> {esc(e["verification_notes"])}</p>'
            f'{superseded_html}'
            f'</article>'
        )

    accepted_count = len([e for e in evidence if e["classification"] == "ACCEPTED"])
    held_count = len([e for e in evidence if e["classification"] == "HELD"])
    pending_count = len([e for e in evidence if e["classification"] == "PENDING"])

    body = f"""
<section class="hero">
<h2>{esc(case["title"])}</h2>
<p><span class="tag">{esc(case["case_id"])}</span> <span class="tag">Status: {esc(case["status"])}</span> <span class="tag">Opened {esc(case["created_date"])}</span></p>
<p style="margin-top:14px">{accepted_count} accepted evidence entries &middot; {held_count} held for further verification &middot; {pending_count} open gaps logged honestly rather than guessed at.</p>
</section>
{DISCLAIMER.replace("__LEGAL_HREF__", "../../../legal.html")}
<section class="card"><h2>What this investigation is trying to establish</h2><p>{esc(case["investigation_objective"])}</p></section>
<section class="card"><h2>Scope</h2><p>{esc(case["scope"])}</p></section>
<section class="card"><h2>How entries are classified</h2><p>This page shows every entry in the evidence register for this investigation, in the order it was added, exactly as recorded &mdash; nothing is summarised away or smoothed over. Each entry is classified <strong>ACCEPTED</strong> (a verified primary source directly supports the statement), <strong>HELD</strong> (relevant but not yet fully verified, or a claim that could not be independently reproduced on a second check), or an <strong>open gap</strong> (something specific was searched for and not found &mdash; logged honestly rather than left unmentioned). Nothing here is a finding of fault against any person or body.</p></section>
<section class="card"><h2>Timeline</h2><div class="grid">{"".join(timeline_html)}</div></section>
<section class="card"><h2>Full evidence register</h2><div class="grid">{"".join(evidence_html)}</div></section>
"""
    page = page_shell(
        f"{case['title']} - DFAPTI",
        "../../index.html",
        "DFAPTI Case List",
        case["title"],
        f"{case['jurisdiction']} · A source-verified DFAPTI investigation.",
        body,
    )
    (case_dir / "index.html").write_text(page, encoding="utf-8")
    return case, accepted_count, held_count, pending_count


def build_landing_page():
    index = load_json(CASES_DIR / "index.json", {"cases": []})
    case_cards = []
    for case_id in index["cases"]:
        case, accepted, held, pending = build_case_page(case_id)
        case_cards.append(
            f'<article class="card">'
            f'<span class="tag">{esc(case["status"])}</span> <span class="tag build">{esc(case["category"])}</span>'
            f'<h2 style="margin:10px 0 4px">{esc(case["title"])}</h2>'
            f'<p style="margin:0;font-size:14px;color:#6b5f50">{esc(case["case_id"])} &middot; {esc(case["jurisdiction"])}</p>'
            f'<p style="margin:10px 0">{esc(case["investigation_objective"][:220])}{"..." if len(case["investigation_objective"]) > 220 else ""}</p>'
            f'<p style="margin:0 0 10px;font-size:14px;color:#6b5f50">{accepted} accepted &middot; {held} held &middot; {pending} open gaps</p>'
            f'<a class="btn" href="cases/{esc(case["case_id"])}/index.html">OPEN CASE</a>'
            f'</article>'
        )

    body = f"""
<section class="hero">
<h2>{len(index["cases"])} active case{"s" if len(index["cases"]) != 1 else ""}</h2>
<p>Every DFAPTI case, source-verified and append-only. Pick a case to see its full evidence register.</p>
</section>
{DISCLAIMER.replace("__LEGAL_HREF__", "../legal.html")}
<section class="card"><h2>Cases</h2><div class="grid">{"".join(case_cards)}</div></section>
<section class="card"><h2>How this works</h2><p>DFAPTI (Deep Forensic All Paths Taken Investigation) tracks the underlying government/council record for issues raised by the community. Every entry is classified ACCEPTED, HELD, or an open gap - see <a href="rules/factualism-audit.md">the evidence rules</a> this register follows.</p></section>
"""
    page = page_shell(
        "DFAPTI",
        None,
        None,
        "DFAPTI",
        "Deep Forensic All Paths Taken Investigation — case list.",
        body,
    )
    (ROOT / "index.html").write_text(page, encoding="utf-8")


if __name__ == "__main__":
    build_landing_page()
    print("Built dfapti/index.html and per-case pages.")
