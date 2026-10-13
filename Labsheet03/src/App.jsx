import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';

/**
 * Main App Component
 * Holds top-level cart state, UI toggle states (cart open/close, checkout view),
 * and passes handler callbacks down to child components (Lifting State Up).
 */
export function App() {
  // Cart state: Array of { product, quantity }
  const [cart, setCart] = useState([]);

  // UI state: Show/hide Cart modal
  const [isCartOpen, setIsCartOpen] = useState(false);

  // UI state: Active view ('catalog' | 'checkout')
  const [currentView, setCurrentView] = useState('catalog');

  // Notification state
  const [toastMessage, setToastMessage] = useState('');

  // Helper to show transient toast message
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2400);
  };

  /**
   * Add a product to cart
   * Increments quantity if already exists, else adds new item
   */
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  /**
   * Remove a product from cart
   */
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  /**
   * Update quantity of an item
   */
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Clear cart when order is placed
   */
  const handleOrderPlaced = () => {
    setCart([]);
  };

  // Compute total items count for navbar badge
  const totalItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app-root">
      {/* Toast Alert */}
      {toastMessage && <div className="app-toast">{toastMessage}</div>}

      {/* Common Navbar */}
      <Navbar
        cartCount={totalItemCount}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        onNavigateHome={() => setCurrentView('catalog')}
      />

      {/* Main Body */}
      <main className="container main-content">
        {currentView === 'catalog' && (
          <ProductList onAddToCart={handleAddToCart} />
        )}

        {currentView === 'checkout' && (
          <CheckoutForm
            cart={cart}
            onOrderPlaced={handleOrderPlaced}
            onBackToCart={() => {
              setCurrentView('catalog');
              setIsCartOpen(true);
            }}
          />
        )}
      </main>

      {/* Cart Modal with Show / Hide state */}
      {isCartOpen && (
        <Cart
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onClose={() => setIsCartOpen(false)}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setCurrentView('checkout');
          }}
        />
      )}

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-content">
          <p>
            &copy; 2026 ElectroHub Store &bull; Built with React &amp; Vite &bull; COER University CSE
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
