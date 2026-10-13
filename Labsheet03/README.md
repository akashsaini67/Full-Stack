# Lab Sheet 3: Rebuilding with React (Components, Props, useState)
**COER University, Roorkee — Department of Computer Science & Engineering**  
**Course:** Full Stack Web Development (Mini E-Commerce Project — Phase 4)

---

## 📌 Project Overview: "ElectroHub React"
Rebuilding the product listing, shopping cart, and checkout workflow into a modern component-driven single page application (SPA) using React 19 and Vite.

### 📁 Project Architecture & Components
```
Labsheet03/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # React root rendering with StrictMode
    ├── App.jsx                  # Top-level component holding state & lifting state up
    ├── products.js              # Mock data source exporting 8 catalog items
    ├── index.css                # Component styling, responsive layout, animations
    └── components/
        ├── Navbar.jsx           # Header, brand, and Cart toggle with dynamic count badge
        ├── ProductList.jsx      # Maps over catalog, rendering ProductCard with unique key={product.id}
        ├── ProductCard.jsx      # Displays single product image, name, price, and Add to Cart button
        ├── Cart.jsx             # Shopping cart modal with conditional empty rendering, qty buttons, grand total
        └── CheckoutForm.jsx     # Controlled inputs form with useState, inline validation, and order receipt
```

---

## ⚛️ React Concepts Implemented
1. **Functional Components with Props:**
   - Parent-to-child data flow: `App` &rarr; `ProductList` &rarr; `ProductCard`
   - Event callback propagation: `onAddToCart`, `onRemoveFromCart`, `onUpdateQuantity`
2. **Lifting State Up:**
   - The central `cart` state array (`[{ product, quantity }]`) is maintained in `App.jsx` so both `Navbar` (item counter), `ProductCard` (add actions), `Cart` (listing/calculations), and `CheckoutForm` share synchronized state.
3. **Controlled Form Inputs:**
   - In `CheckoutForm.jsx`, each input's `value` is tied to local `useState` object, updated via `onChange` handler, and validated on submit.
4. **Conditional Rendering:**
   - If cart is empty (`cart.length === 0`), `Cart.jsx` displays a friendly empty state message rather than an empty table.
   - Screen switcher switches between `catalog` and `checkout` views.
5. **Lists and Keys:**
   - `ProductList.jsx` uses `products.map()` with `key={product.id}` (ensuring stable virtual DOM identity, never using array indices).
6. **Total Calculation:**
   - Grand total calculated declaratively using `reduce()` across item quantities and prices.

---

## 🚀 How to Run
```bash
# 1. Navigate to directory
cd "d:\Full Stack\Labsheet03"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local Vite development server
npm run dev

# 4. Or build for production
npm run build
```
Open the printed local URL (typically `http://localhost:5173`) in your browser.
