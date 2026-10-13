# Lab Sheet 2: Making It Interactive (Vanilla JavaScript)
**COER University, Roorkee — Department of Computer Science & Engineering**  
**Course:** Full Stack Development (Mini E-Commerce Project — Phase 3)

---

## 📌 Objective & Requirements
Add cart logic, dynamic rendering, and inline form validation using plain JavaScript (Vanilla JS) before moving to React.

### 📁 Files in this Directory
- `script.js` — Core JavaScript logic implementing:
  - Product catalog array (8 products with id, name, price, category, image, description).
  - DOM manipulation functions (`renderProductsCatalog`, `renderFeaturedProducts`, `renderProductDetail`, `renderCart`).
  - Cart state management with `localStorage` (`getCart`, `saveCart`, `addToCart`, `removeFromCart`, `updateItemQuantity`).
  - Total calculation using `Array.prototype.reduce()`.
  - Navbar cart badge counter updater.
  - Regex-based form validation for checkout (Name, Address, 6-digit Pincode, 10-digit Phone) with inline errors and toast alerts.
- `index.html` — Dynamic home page with featured products & cart badge.
- `products.html` — Dynamic catalog page rendered from JS array.
- `product-detail.html` (and alias `product.html`) — Dynamic product details page.
- `cart.html` — Live interactive cart with quantity adjusters, item removal, and subtotal calculation.
- `checkout.html` — Real-time and submit-time inline form validation and confirmation UI.
- `style.css` — Modern UI styling including toast notifications, badge bounce animations, and inline error styling.

---

## 💡 Key JavaScript Concepts Demonstrated
1. **Array Methods:**
   - `.map()`: Dynamically generating HTML template literals for product lists and cart rows.
   - `.filter()`: Removing products from the cart array by ID.
   - `.find()`: Locating existing items in the cart or catalog by ID.
   - `.reduce()`: Calculating total quantity for the navbar badge and calculating the grand total amount.
2. **DOM Manipulation:**
   - `document.getElementById`, `document.querySelectorAll`.
   - `addEventListener('click')`, `addEventListener('input')`, `addEventListener('submit')`.
   - Dynamic template literals with `.innerHTML`.
3. **Data Persistence (`localStorage`):**
   - `localStorage.setItem('electrohub_cart', JSON.stringify(cart))`
   - `JSON.parse(localStorage.getItem('electrohub_cart'))`
   - Data persists across page reloads and between multiple pages.
4. **Regex Form Validation:**
   - Name & Address: Non-empty check (`.trim().length > 0`).
   - Pincode: `/^\d{6}$/` (exactly 6 numeric digits).
   - Phone: `/^\d{10}$/` (exactly 10 numeric digits).
   - Inline error display without disruptive `alert()` dialogs.

---

## 🚀 How to Run & Test
Open `index.html` or `products.html` directly in your browser. Add items to the cart, navigate to `cart.html` to adjust quantities, and test form validation on `checkout.html`.
