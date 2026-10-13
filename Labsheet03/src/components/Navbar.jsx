import React from 'react';

/**
 * Navbar Component
 * Displays brand logo, navigation links, and Cart toggle button with real-time item count badge
 */
export default function Navbar({ cartCount, onToggleCart, onNavigateHome }) {
  return (
    <header className="site-header">
      <div className="container nav-content">
        <div className="brand" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>
          ⚡ Electro<span>Hub</span>
        </div>

        <nav className="nav-menu">
          <button className="nav-link-btn" onClick={onNavigateHome}>
            Catalog
          </button>
          
          <button className="cart-trigger-btn" onClick={onToggleCart} aria-label="Toggle Shopping Cart">
            🛒 Cart
            <span className="cart-count-badge">{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
