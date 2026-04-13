# RioMates Web Development Protocol

**Purpose:** A standardized workflow to build premium, brand-aligned websites faster and cheaper.
**Origin:** Derived from the RioMates Project Retrospective (LRN-20260412-001).

## 1. Pre-Flight Checklist (Human Input Required)
*Before any code is written, the following must be gathered:*

- [ ] **Brand Assets:** Logo (PNG/SVG), Brand Colors (if defined), Typography preferences.
- [ ] **Content:** Real product photos (no stock), Real copy/text, Real social media links.
- [ ] **References:** Any PDF catalogs, screenshots, or websites that define the "look and feel".
- [ ] **Tech Stack:** Next.js, Tailwind, etc.

## 2. Phase 1: Brand Extraction (AI Action)
*The AI must perform these steps FIRST:*
1.  **Extract Colors:** Use `read` on the logo to identify dominant HEX colors.
2.  **Map Palette:** Create a brand color system (Primary, Accent, Neutral) in `globals.css`.
3.  **Verify Fonts:** Check existing fonts or suggest a pairing based on brand vibe.

## 3. Phase 2: Real Content Integration (AI Action)
*NO PLACEHOLDERS ALLOWED.*
1.  **Images:** Use only images provided in `/public/` or real URLs.
2.  **Text:** Use real product names, descriptions, and prices.
3.  **Social:** Integrate real TikTok/Instagram embeds or data.

## 4. Phase 3: Reference Matching (AI Action)
1.  **Analyze Reference:** If a PDF/Image reference is provided, extract layout, typography, and grid details using tools (`uvx markitdown`, `read`).
2.  **Replicate:** Build the UI to match the reference **exactly**. Do not invent generic layouts.

## 5. Phase 4: Review & Refine (Human + AI)
1.  **Human Review:** Check for "Human Factors" (taste, brand fit, specific details).
2.  **AI Fix:** Iterate based on human feedback.
3.  **Final Polish:** Add ambient assets (textures, videos) to elevate the design.

## 6. Tool Usage Mandate
- **PDFs:** Always use `uvx markitdown` to extract text/data.
- **Images:** Always use `read` to analyze logos/visuals.
- **Web:** Use `native-web-search` or `browser-use-automator` for real data.
