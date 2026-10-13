import React, { useState } from 'react';

/**
 * CheckoutForm Component
 * Uses Controlled Inputs (value + onChange connected to useState)
 * Validates inputs and handles simulated order placement
 */
export default function CheckoutForm({ cart, onOrderPlaced, onBackToCart }) {
  // Controlled input states
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    paymentMethod: 'card',
  });

  // Errors state
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  // Grand total calculation
  const grandTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Handle controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Form validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required.';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Pincode must be exactly 6 digits.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const summary = {
      orderId,
      customer: formData.name,
      phone: formData.phone,
      total: grandTotal,
      itemsCount: cart.reduce((sum, i) => sum + i.quantity, 0),
    };

    setOrderSummary(summary);
    setSubmitted(true);
    onOrderPlaced(); // notifies parent to clear cart
  };

  // If order was successfully submitted
  if (submitted && orderSummary) {
    return (
      <div className="order-confirmation-box">
        <div className="success-icon">🎉</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for choosing ElectroHub, <strong>{orderSummary.customer}</strong>.</p>
        <div className="order-receipt">
          <p><strong>Order ID:</strong> #{orderSummary.orderId}</p>
          <p><strong>Items Ordered:</strong> {orderSummary.itemsCount}</p>
          <p><strong>Total Paid:</strong> ₹{orderSummary.total.toLocaleString('en-IN')}</p>
          <p><strong>Confirmation SMS Sent To:</strong> +91 {orderSummary.phone}</p>
        </div>
        <button
          className="btn btn-primary"
          style={{ marginTop: '1.5rem' }}
          onClick={() => window.location.reload()}
        >
          Back to Storefront
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="btn btn-secondary btn-sm" onClick={onBackToCart}>
          &larr; Return to Cart
        </button>
        <h2>Checkout & Delivery Details</h2>
      </div>

      <div className="checkout-grid">
        {/* Form column */}
        <form className="checkout-form-card" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'is-invalid' : ''}`}
              placeholder="e.g. Ramesh Kumar"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Street Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              className={`form-input ${errors.address ? 'is-invalid' : ''}`}
              placeholder="e.g. 102, Innovation Park"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          {/* City & Pincode */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                className={`form-input ${errors.city ? 'is-invalid' : ''}`}
                placeholder="e.g. Roorkee"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode (6 Digits) *</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                maxLength="6"
                className={`form-input ${errors.pincode ? 'is-invalid' : ''}`}
                placeholder="e.g. 247667"
                value={formData.pincode}
                onChange={handleChange}
              />
              {errors.pincode && <span className="field-error">{errors.pincode}</span>}
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number (10 Digits) *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              maxLength="10"
              className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          {/* Payment Method */}
          <div className="form-group">
            <label>Payment Method</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                />
                Credit / Debit Card
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                />
                UPI / Net Banking
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Confirm & Place Order (₹{grandTotal.toLocaleString('en-IN')})
          </button>
        </form>

        {/* Order mini summary column */}
        <aside className="checkout-summary-card">
          <h3>Order Overview</h3>
          <ul className="checkout-item-list">
            {cart.map((item) => (
              <li key={item.product.id} className="checkout-item">
                <span>
                  {item.product.name} &times; {item.quantity}
                </span>
                <span>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-total-row">
            <span>Total Payable:</span>
            <strong>₹{grandTotal.toLocaleString('en-IN')}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
