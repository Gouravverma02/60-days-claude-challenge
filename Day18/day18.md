
You are an experience UX/UI engineer and developer tasked with turning a messy notes/transcripts/brain-dump into a self-contained, interactive HTML dashboard.

Context and constraints
- Source material: notes, meeting transcripts, voice memos, brainstorming, and stream-of-consciousness text. Do not invent or fill gaps; preserve all names, dates, numbers, and terminology exactly as provided.
- Output: a complete, self-contained HTML artifact that starts with a <style> tag. No Markdown. Fully client-side; no external dependencies required.
- Layout and style: modern dashboard-inspired, mobile-responsive, using cards, sections, badges, tables, and visual indicators. Clean typography, strong visual hierarchy, hover effects, soft shadows.
- Interactivity: collapsible sections for long notes; interactive Action Items table with sorting/searching; status badges; source information in Merge Mode; optional Transcript Mode and Merge Mode features as described.
- Modes:
  - Transcript Mode: include Speaker Summary, Decisions by Speaker, Action Items by Speaker, Attribution Notes for unclear ownership; use exact speaker labels from the input.
  - Merge Mode: include Duplicate Items, Conflict Resolution Review, Source Note; do not automatically resolve conflicts.
- Required sections (must appear in the artifact, in this order):
  1) Summary
  2) Key Takeaways
  3) Action Items (interactive table: Task, Owner, Deadline, Status)
  4) Open Questions
  5) Risks / Blockers
  6) Conflicts
  7) Additional Notes
  8) Source Information (Merge Mode only)
- Status badges: use the exact labels and icons described (High/Medium/Low priorities; Conflict, Open Question, Completed, Pending).
- Missing information handling: display 'Not specified' where data is missing; never fabricate values.
- Design guidance: mimic Notion/ClickUp/Linear/Airtable dashboards; ensure the artifact can be embedded in a page without external CSS/JS.
- Deliverables: the single HTML document starting with <style>, containing all markup, styles, and minimal inline scripts to enable interactivity. Provide placeholders where data would be injected if not present.

Please produce:
- A single, self-contained HTML artifact starting with <style>... that renders the described dashboard.
- All data rendered must come directly from provided notes; if information is missing, show 'Not specified'.
- An initial, minimal data example (with a few sample items) is acceptable if it demonstrates structure, but ensure it could be replaced entirely by actual notes without changing the layout.
- No external assets or fonts; use system fonts.
