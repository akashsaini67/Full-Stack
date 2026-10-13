/**
 * ==============================================================================
 * ElectroHub - Interactive E-Commerce Logic (Vanilla JavaScript)
 * Lab Sheet 2: Phase 3
 * Concepts: Array Methods (map, filter, find, reduce), DOM Manipulation, localStorage
 * ==============================================================================
 */

// 1. Catalog Data: Array of Product Objects (At least 8 products)
const products = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 26990,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "Industry-leading noise cancellation with two processors and 8 microphones for superior audio."
  },
  {
    id: 2,
    name: "Apple Watch Series 9 GPS",
    price: 41900,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description: "Smarter, brighter, and mightier with the S9 SiP and a magical new Double Tap gesture."
  },
  {
    id: 3,
    name: "Apple MacBook Air M2 13-inch",
    price: 99990,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    description: "Strikingly thin design with blazing-fast Apple M2 chip and up to 18 hours of battery life."
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra 5G",
    price: 119999,
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80",
    description: "Titanium exterior, built-in S-Pen, and groundbreaking Galaxy AI camera features."
  },
  {
    id: 5,
    name: "Keychron K2 V2 Wireless Keyboard",
    price: 7499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    description: "Compact 75% layout mechanical keyboard with Gateron G Pro switches and Mac/Windows support."
  },
  {
    id: 6,
    name: "Logitech MX Master 3S Mouse",
    price: 8995,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    description: "Quiet Click technology, 8,000 DPI track-on-glass sensor, and ergonomic silhouette."
  },
  {
    id: 7,
    name: "LG UltraGear 27-inch 4K Gaming Monitor",
    price: 34500,
    category: "Displays",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
    description: "Ultra-fast 144Hz refresh rate, 1ms response time, Nano IPS display with HDR400."
  },
  {
    id: 8,
    name: "Sony PlayStation 5 Slim Console",
    price: 49990,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80",
    description: "Next-generation gaming console featuring ultra-high speed SSD and ray-tracing hardware."
  }
];

// 2. localStorage Helpers & Cart State Management
const CART_STORAGE_KEY = "electrohub_cart";

/**
 * Retrieve cart items array from localStorage
 * @returns {Array} Array of cart item objects: { product, quantity }
 */
function getCart() {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error parsing cart from localStorage:", e);
    return [];
  }
}

/**
 * Save current cart state into localStorage
 * @param {Array} cart
 */
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadge();
}

/**
 * Updates the cart badge count in the header navbar on all pages
 * Uses reduce() to sum up the total quantities of all items
 */
function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-badge");
  const cart = getCart();
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  badges.forEach((badge) => {
    badge.textContent = totalCount;
    // Animate badge on change
    badge.classList.remove("bounce");
    void badge.offsetWidth; // trigger reflow
    badge.classList.add("bounce");
  });
}

/**
 * Toast notification for user feedback
 * @param {string} message
 */
function showToast(message) {
  let toast = document.getElementById("toastNotification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotification";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/**
 * Add a product to the cart
 * Uses Array.prototype.find() to check if item already exists
 * @param {number} productId
 * @param {number} qty
 */
function addToCart(productId, qty = 1) {
  const product = products.find((p) => p.id === Number(productId));
  if (!product) return;

  const cart = getCart();
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += Number(qty);
  } else {
    cart.push({
      product: product,
      quantity: Number(qty)
    });
  }

  saveCart(cart);
  showToast(`✅ "${product.name}" added to cart!`);
}

/**
 * Remove an item from the cart
 * Uses Array.prototype.filter()
 * @param {number} productId
 */
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.product.id !== Number(productId));
  saveCart(cart);
  renderCart();
  showToast("Item removed from cart");
}

/**
 * Update quantity for a specific product in the cart
 * @param {number} productId
 * @param {number} newQuantity
 */
function updateItemQuantity(productId, newQuantity) {
  const cart = getCart();
  const item = cart.find((i) => i.product.id === Number(productId));
  if (item) {
    const qty = parseInt(newQuantity, 10);
    if (qty <= 0 || isNaN(qty)) {
      removeFromCart(productId);
      return;
    }
    item.quantity = qty;
    saveCart(cart);
    renderCart();
  }
}

/**
 * Recalculate total amount from cart array
 * Uses Array.prototype.reduce()
 * @returns {number}
 */
function calculateTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

// 3. Dynamic Rendering Functions

/**
 * Render Product Catalog dynamically on products.html
 * Uses DOM manipulation with template literals and attaches event listeners
 */
function renderProductsCatalog() {
  const container = document.getElementById("catalogGrid");
  if (!container) return;

  container.innerHTML = products.map((product) => `
    <article class="product-card" data-id="${product.id}">
      <img class="product-image" src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.category)}'">
      <span class="product-category">${product.category}</span>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">₹${product.price.toLocaleString("en-IN")}</p>
      <div class="product-actions">
        <a href="product-detail.html?id=${product.id}" class="btn btn-secondary">Details</a>
        <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join("");

  // Attach event listeners to all dynamic "Add to Cart" buttons
  const addButtons = container.querySelectorAll(".add-to-cart-btn");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      addToCart(id, 1);
    });
  });
}

/**
 * Render Featured Products on index.html dynamically
 */
function renderFeaturedProducts() {
  const container = document.getElementById("featuredGrid");
  if (!container) return;

  const featured = products.slice(0, 4);
  container.innerHTML = featured.map((product) => `
    <article class="product-card" data-id="${product.id}">
      <img class="product-image" src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.category)}'">
      <span class="product-category">${product.category}</span>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">₹${product.price.toLocaleString("en-IN")}</p>
      <div class="product-actions">
        <a href="product-detail.html?id=${product.id}" class="btn btn-secondary">Details</a>
        <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join("");

  const addButtons = container.querySelectorAll(".add-to-cart-btn");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      addToCart(id, 1);
    });
  });
}

/**
 * Render single product detail on product-detail.html dynamically based on URL parameter
 */
function renderProductDetail() {
  const container = document.getElementById("productDetailContainer");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"), 10) || 1; // default to 1st item
  const product = products.find((p) => p.id === productId) || products[0];

  container.innerHTML = `
    <div style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
      <a href="index.html">Home</a> / <a href="products.html">Products</a> / <span>${product.name}</span>
    </div>

    <div class="product-detail-layout">
      <div class="detail-image-box">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="detail-info">
        <span class="detail-badge">${product.category} &bull; In Stock</span>
        <h1>${product.name}</h1>
        <p class="detail-price">₹${product.price.toLocaleString("en-IN")}</p>
        <p class="detail-description">${product.description}</p>

        <div class="quantity-control">
          <label for="detailQuantity">Quantity:</label>
          <input type="number" id="detailQuantity" min="1" max="10" value="1">
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button id="detailAddToCartBtn" class="btn btn-primary" style="flex: 2;">Add to Cart</button>
          <a href="checkout.html" id="detailBuyNowBtn" class="btn btn-hero" style="flex: 2;">Buy Now</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById("detailAddToCartBtn").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("detailQuantity").value, 10) || 1;
    addToCart(product.id, qty);
  });

  document.getElementById("detailBuyNowBtn").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("detailQuantity").value, 10) || 1;
    addToCart(product.id, qty);
  });
}

/**
 * Render Cart page with dynamic table, live calculation, and remove buttons
 */
function renderCart() {
  const tableBody = document.getElementById("cartTableBody");
  const subtotalEl = document.getElementById("cartSubtotal");
  const grandTotalEl = document.getElementById("cartGrandTotal");
  const cartContent = document.getElementById("cartContent");
  const emptyState = document.getElementById("cartEmptyState");

  if (!tableBody) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (cartContent) cartContent.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (cartContent) cartContent.style.display = "grid";
  if (emptyState) emptyState.style.display = "none";

  tableBody.innerHTML = cart.map((item) => {
    const subtotal = item.product.price * item.quantity;
    return `
      <tr>
        <td>
          <div class="cart-item-info">
            <img class="cart-item-img" src="${item.product.image}" alt="${item.product.name}">
            <div>
              <strong>${item.product.name}</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${item.product.category}</div>
            </div>
          </div>
        </td>
        <td>₹${item.product.price.toLocaleString("en-IN")}</td>
        <td>
          <div class="qty-btn-group">
            <button class="qty-btn" onclick="updateItemQuantity(${item.product.id}, ${item.quantity - 1})">-</button>
            <input class="cart-qty-input" type="number" min="1" max="99" value="${item.quantity}" 
                   onchange="updateItemQuantity(${item.product.id}, this.value)">
            <button class="qty-btn" onclick="updateItemQuantity(${item.product.id}, ${item.quantity + 1})">+</button>
          </div>
        </td>
        <td><strong>₹${subtotal.toLocaleString("en-IN")}</strong></td>
        <td>
          <button class="btn btn-danger" onclick="removeFromCart(${item.product.id})">Remove</button>
        </td>
      </tr>
    `;
  }).join("");

  const total = calculateTotal();
  if (subtotalEl) subtotalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
  if (grandTotalEl) grandTotalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
}

// 4. Checkout Form Validation
function initCheckoutValidation() {
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutSuccess = document.getElementById("checkoutSuccess");
  const checkoutContainer = document.getElementById("checkoutContainer");
  const checkoutTotalEl = document.getElementById("checkoutTotal");

  if (!checkoutForm) return;

  // Display cart total on checkout summary
  const total = calculateTotal();
  if (checkoutTotalEl) checkoutTotalEl.textContent = `₹${total.toLocaleString("en-IN")}`;

  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const pincodeInput = document.getElementById("pincode");
  const phoneInput = document.getElementById("phone");

  const nameError = document.getElementById("nameError");
  const addressError = document.getElementById("addressError");
  const cityError = document.getElementById("cityError");
  const pincodeError = document.getElementById("pincodeError");
  const phoneError = document.getElementById("phoneError");

  function validateField(input, errorEl, isValid, message) {
    if (!isValid) {
      input.classList.add("input-error");
      errorEl.textContent = message;
      return false;
    } else {
      input.classList.remove("input-error");
      errorEl.textContent = "";
      return true;
    }
  }

  // Real-time input validation listeners
  if (nameInput) {
    nameInput.addEventListener("input", () => {
      validateField(nameInput, nameError, nameInput.value.trim().length > 0, "Full Name must not be empty.");
    });
  }

  if (addressInput) {
    addressInput.addEventListener("input", () => {
      validateField(addressInput, addressError, addressInput.value.trim().length > 0, "Address must not be empty.");
    });
  }

  if (pincodeInput) {
    pincodeInput.addEventListener("input", () => {
      const pinRegex = /^\d{6}$/;
      validateField(pincodeInput, pincodeError, pinRegex.test(pincodeInput.value.trim()), "Pincode must be exactly 6 digits.");
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      const phoneRegex = /^\d{10}$/;
      validateField(phoneInput, phoneError, phoneRegex.test(phoneInput.value.trim()), "Phone must be exactly 10 digits.");
    });
  }

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if cart is empty before placing order
    const cart = getCart();
    if (cart.length === 0) {
      showToast("❌ Your cart is empty! Add products before checking out.");
      return;
    }

    // Run complete validation
    const isNameValid = validateField(nameInput, nameError, nameInput.value.trim().length > 0, "Full Name must not be empty.");
    const isAddressValid = validateField(addressInput, addressError, addressInput.value.trim().length > 0, "Address must not be empty.");
    const isCityValid = validateField(cityInput, cityError, cityInput.value.trim().length > 0, "City must not be empty.");
    const isPincodeValid = validateField(pincodeInput, pincodeError, /^\d{6}$/.test(pincodeInput.value.trim()), "Pincode must be exactly 6 digits.");
    const isPhoneValid = validateField(phoneInput, phoneError, /^\d{10}$/.test(phoneInput.value.trim()), "Phone must be exactly 10 digits.");

    if (isNameValid && isAddressValid && isCityValid && isPincodeValid && isPhoneValid) {
      // Successful Validation
      const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
      const customerName = nameInput.value.trim();

      // Clear Cart from localStorage
      localStorage.removeItem(CART_STORAGE_KEY);
      updateCartBadge();

      // Show confirmation message inline on page
      if (checkoutContainer) checkoutContainer.style.display = "none";
      if (checkoutSuccess) {
        checkoutSuccess.style.display = "block";
        document.getElementById("orderConfirmationMessage").innerHTML = `
          <strong>Thank you, ${customerName}!</strong> Your order has been placed successfully.<br>
          Order Reference ID: <strong>#${orderId}</strong>.<br>
          A confirmation SMS has been sent to <strong>+91 ${phoneInput.value.trim()}</strong>.
        `;
      }
    } else {
      showToast("⚠️ Please fix the highlighted form errors.");
    }
  });
}

// 5. Initialize on Page Load
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderProductsCatalog();
  renderFeaturedProducts();
  renderProductDetail();
  renderCart();
  initCheckoutValidation();
});
