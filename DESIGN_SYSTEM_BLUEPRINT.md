# UI Component Architecture & Audit Blueprint

## Audit Results
Based on a scan of `src/components/ui/`, we currently have a minimal baseline of **7 components**:
- `button.tsx` (Action: Buttons)
- `card.tsx` (Data Display: Cards)
- `input.tsx` (Inputs: Text Inputs)
- `select.tsx` (Inputs: Selects)
- `textarea.tsx` (Inputs: Textareas)
- `chat-bubble.tsx` (Custom)
- `state-card.tsx` (Custom)

**Conclusion:** We are missing the majority of enterprise structural foundations, modern navigation components, robust granular inputs, and feedback mechanisms required for a high-end B2B SaaS platform.

---

## The Blueprint: What We Have vs. What We Need

### 🏗️ Foundations (The Primitives)
- [ ] **Typography scaling**
- [ ] **Color token mappings**
- [ ] **Spacing grids**
- [ ] **Container layouts**

### 🧭 Action & Navigation
- [x] **Buttons** (Primary, Secondary, Ghost, Destructive) *(Have baseline in `button.tsx`, requires full variants)*
- [ ] **Links**
- [ ] **Breadcrumbs**
- [ ] **Pagination**
- [ ] **Tabs**
- [ ] **Dropdown Menus**
- [ ] **Navigation Menus**
- [ ] **Accordions**

### 📝 Inputs & Forms
- [x] **Text Inputs** *(Have baseline in `input.tsx`)*
- [x] **Textareas** *(Have baseline in `textarea.tsx`)*
- [x] **Selects** *(Have baseline in `select.tsx`)*
- [ ] **Checkboxes**
- [ ] **Radio Buttons**
- [ ] **Switches/Toggles**
- [ ] **Sliders**
- [ ] **Date Pickers**
- [ ] **Form Labels**
- [ ] **Form Validation text**

### 📊 Data Display
- [x] **Cards** *(Have baseline in `card.tsx`)*
- [ ] **Avatars**
- [ ] **Badges/Tags**
- [ ] **Data Tables**
- [ ] **Aspect Ratios**
- [ ] **Hover Cards**
- [ ] **Tooltips**
- [ ] **Carousels**

### 🔔 Feedback & Overlays
- [ ] **Modals/Dialogs**
- [ ] **Slide-out Sheets/Drawers**
- [ ] **Alerts**
- [ ] **Toasts/Snackbars**
- [ ] **Skeletons** (loading states)
- [ ] **Progress bars**

### 🔮 B2P Custom (Brand Specific)
- [ ] **Glassmorphic Bento Cards**
- [ ] **Luminous Lime Anchor Lines**
- [ ] **Sonar/Radar Background Grids**
- [ ] **Brand Filter Sandwich** (Image Uploaders)
