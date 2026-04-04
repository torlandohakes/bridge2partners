# Component Execution Library

## 1. Global Sizing Matrix (Container Queries)
We do not use standard `px`, `rem`, or `vw` for layout scaling inside the Presentation Deck. Everything is uniformly scaled using `cqw` (Container Query Width). This ensures that whether the Pitch Simulator is scaled in a 70% viewport dashboard widget or expanded to 100% fullscreen presentation mode, all typography and grid layers scale symmetrically without breaking bounding boxes.

## 2. Brand Filter Sandwich
The system incorporates an in-memory `customBg` volatile state that injects a base layer for personalized pitching.
*   **Layer 1:** The Custom Image (loaded via FastRefresh URL blob proxy).
*   **Layer 2:** The Desaturation Filter (`mix-blend-luminosity opacity-50` or `grayscale`).
*   **Layer 3:** The Depth Gradient Overlay (The Tertiary `from-neutral-900 to-neutral-950`).

## 3. The Bento Raster Matrix
Used on Slide 4 (The Insiders):
- A standard 12-column masonry grid where nodes break symmetry.
- **Executives:** Span `col-span-7` or `col-span-5`.
- **Vertical Heads:** Span `col-span-4` arrays locked below.
- Nested Glassmorphism parameters: `bg-white/5 border border-white/10 rounded-[1cqw] p-[1.5cqw] transition-all hover:bg-white/10 hover:border-primary/50`
