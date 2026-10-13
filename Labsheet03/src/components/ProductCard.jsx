import React from 'react';

/**
 * ProductCard Component
 * Receives a single product object and addToCart handler via props
 */
export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(product.category);
        }}
      />
      <span className="product-category">{product.category}</span>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-desc">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart 🛒
        </button>
      </div>
    </article>
  );
}
