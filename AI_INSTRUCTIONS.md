# 👑 PRIME DIRECTIVE: Bridge2Partners Design System

**ATTENTION AI ASSISTANT:** This document is the ultimate source of truth for the Bridge2Partners UI/UX architecture. You MUST read and strictly adhere to these rules for all future component generation, styling, and modifications. DO NOT deviate from these parameters under any circumstances.

## 🎨 1. Core Color Palette & Rules
We employ a strictly controlled color palette. **Generic colors (plain red, blue, purple) are FORBIDDEN.**
*   **B2P Black (Tertiary/Foreground):** `#001b15`
*   **B2P Green (Primary):** `#00573f`
*   **Secondary Teal:** `#009677`
*   **Neutral:** `#3d4645`
*   **Light Mode Background:** `#ffffff`

### Luminous Lime (High-Voltage Accent): `#98cc67`
**RESTRICTED USAGE ONLY:** This is our digital highlighter lacking optical weight for complex geometries.
*   **APPROVED:** Dynamic notification dots/badges, micro-highlights on data spikes, active focal state lines on complex grids.
*   **STRICT MISUSE:** NEVER use as typography, NEVER use as a solid background block or pill container, NEVER deploy more than once on a single viewport.

### Semantic Interface States
*   **Success:** `#059669` (Completed milestones, positive trajectory)
*   **Warning:** `#d97706` (Pending authorizations, bottlenecks)
*   **Error:** `#dc2626` (Critical failures, non-reversible actions)

---

## 🔤 2. Typographic Archetypes
Do NOT mix data fonts into reading blocks, and do NOT use reading fonts for hero elements. Always use the specified tailwind classes.

*   **Hero Display (`font-display`):** Montserrat (700, 800)
    *   *Usage:* Exclusively for landing page Hero H1s and massive brand pull-quotes.
*   **Financial Data (`font-data`):** Barlow (500, 600)
    *   *Usage:* Exclusively for numerical ROI, tabular data, and highly structured technical micro-copy.
*   **Interface & Action (`font-ui` / `font-heading`):** Inter (400, 500, 600)
    *   *Usage:* Buttons, navs, and structural dashboard headings.
*   **Long-Form Reading (`font-sans`):** Public Sans (300, 400)
    *   *Usage:* Dense paragraphs, case studies, body copy, default body text.

---

## 🪞 3. "AI-Ready" Glassmorphism & Containers
Our aesthetic is premium, airy, and dynamic.
*   **Glass Containers:** Use `backdrop-blur-md` and `bg-white/60` (or similar translucent backgrounds) mappings over dynamic mesh lighting.
*   **Frosted Containers:** Use `backdrop-blur-xl` with inset luminous borders for authoritative macro-information.
*   **Subtle Elements:** Include `border border-neutral/10` and `shadow-sm` utility classes.
*   **Photography Tone Rules:** All team headshots and corporate imagery MUST be subjected to a cool-toned filter (`mix-blend-luminosity` or `grayscale`) to sit homogenously. Raw, unedited color photography is PROHIBITED as it shatters the UI immersion.

---

## ⚙️ 4. Strict UI Engineering Standards
These are non-negotiable UX baselines that cannot be violated during development.

*   **A11y Focus Rings:** EVERY single interactive element (Inputs, Buttons, Links, Dropdowns) must inherit the exact custom focus ring logic to ensure keyboard-navigation compliance:
    `focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none`
*   **Mobile Touch Physics:** All clickable vectors and tiny icon buttons MUST be wrapped in a hit-area spanning a minimum of 44x44 CSS pixels:
    `min-h-[44px] min-w-[44px]`
*   **Iconography Constraints:**
    *   Use **Lucide React** (`lucide-react`) exclusively. Do not mix iconography libraries.
    *   To maintain our lightweight glassmorphic aesthetic, explicitly force the stroke width to 1.5 across all instances: `<Icon strokeWidth={1.5} />`.

***
**CONFIRMATION:** Before writing any front-end code for Bridge2Partners, internally verify that the newly generated components and layouts reflect the exact parameters defined in this Prime Directive.
