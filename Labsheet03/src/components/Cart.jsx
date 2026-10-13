import React from 'react';

/**
 * Cart Component
 * Displays cart items, allows updating/removing items, and calculates grand total
 * Implements conditional rendering for empty cart state
 */
export default function Cart({
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClose,
  onProceedToCheckout,
}) {
  // Calculate grand total using reduce()
  const grandTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close Cart">
            &times;
          </button>
        </div>

        {/* Conditional Rendering: Check if cart is empty */}
        {cart.length === 0 ? (
          <div className="empty-cart-view">
            <div className="empty-cart-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any products to your shopping cart yet.</p>
            <button className="btn btn-primary" onClick={onClose}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-body">
            <div className="cart-table-container">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const subtotal = item.product.price * item.quantity;
                    return (
                      <tr key={item.product.id}>
                        <td>
                          <div className="cart-item-preview">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="cart-thumb"
                            />
                            <div>
                              <div className="cart-item-name">{item.product.name}</div>
                              <small className="cart-item-cat">{item.product.category}</small>
                            </div>
                          </div>
                        </td>
                        <td>₹{item.product.price.toLocaleString('en-IN')}</td>
                        <td>
                          <div className="qty-controls">
                            <button
                              className="qty-btn"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <span className="qty-display">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onRemoveFromCart(item.product.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="cart-footer">
              <div className="cart-total-bar">
                <span>Grand Total:</span>
                <span className="grand-total-amount">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="cart-footer-actions">
                <button className="btn btn-secondary" onClick={onClose}>
                  Continue Shopping
                </button>
                <button
                  className="btn btn-primary"
                  onClick={onProceedToCheckout}
                >
                  Proceed to Checkout &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
