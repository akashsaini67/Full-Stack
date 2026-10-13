# Lab Sheet 1: Building the Storefront (HTML + CSS)
**COER University, Roorkee — Department of Computer Science & Engineering**  
**Course:** Full Stack Development (Mini E-Commerce Project — Phase 1 & 2)

---

## 📌 Project Overview: "ElectroHub"
ElectroHub is a responsive modern e-commerce storefront designed for consumer electronics and gadgets.

### 📁 Files in this Directory
- `index.html` — Homepage featuring sticky navigation bar, Hero banner, and 4 Featured Products.
- `products.html` — Product listing page showcasing 8 catalog products in a responsive CSS Grid.
- `product-detail.html` (and alias `product.html`) — Detailed showcase page for a product with full specifications, image gallery view, and quantity selector.
- `cart.html` — Shopping cart layout with item details, quantities, itemized subtotals, and grand total.
- `checkout.html` — Shipping address and payment options form with responsive layout and input styling.
- `style.css` — Global external stylesheet implementing CSS variables, Flexbox navbar, Box Model card styling, CSS Grid, and Mobile Media Queries.

---

## 🎨 Key Features & Technical Concepts
1. **CSS Custom Properties (Variables):**
   - `--primary-color: #2563eb` (Brand Blue)
   - `--secondary-color: #0f172a` (Slate Dark)
   - `--accent-color: #f59e0b` (Amber CTA)
   - `--bg-color: #f8fafc` (Clean Neutral Background)
   - `--border-color: #e2e8f0`
2. **Flexbox Navigation:**
   - Common `<header>` and `<nav>` with horizontal alignment, logo, links, and cart badge.
   - Automatically wraps and aligns vertically on mobile screens.
3. **Box Model & Product Cards:**
   - Product blocks styled with padding, border, subtle box shadows, rounded corners, and hover transitions.
4. **CSS Grid Layout:**
   - Product catalog utilizes `display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))` for fluid responsiveness across desktop, tablet, and mobile.
5. **Form Styling:**
   - Consistent input padding, border transitions, `:focus` outline rings with brand colors, and accessible radio buttons for payment methods.
6. **Mobile Responsiveness:**
   - Media queries (`@media (max-width: 900px)` and `@media (max-width: 640px)`) ensure single-column card flows, stacked forms, and responsive tables.

---

## 🚀 How to Run / View
Double-click `index.html` or open any HTML file directly in any modern browser (Chrome, Edge, Firefox).
