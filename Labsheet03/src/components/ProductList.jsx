import React from 'react';
import { products } from '../products.js';
import ProductCard from './ProductCard.jsx';

/**
 * ProductList Component
 * Maps over products array and renders ProductCard components with unique key={product.id}
 */
export default function ProductList({ onAddToCart }) {
  return (
    <section className="product-section">
      <div className="section-header">
        <h2 className="section-title">Explore Tech Catalog</h2>
        <p className="section-subtitle">
          Discover our curated collection of verified electronics and computing gear.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          // Important: Unique key based on product id, NEVER array index
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
