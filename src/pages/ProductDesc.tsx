import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductById } from '../hooks/useProductById';
import ErrorMessage from '../components/ErrorMessage';
import ShimmerUi from '../components/ShimmerUi';

const ProductDesc: React.FC = () => {
  const { id } = useParams();
  const { product, loading, error } = useProductById(id);
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleAddToCart = () => {
    console.log({ ...product, quantity });
  };

  return (
    <>
    {loading ? (
        <div className="products-grid">
          <ShimmerUi />
        </div>
      ) : error||!product ? (
        <ErrorMessage message="Failed to load products" />
      ) : (
        <div className="product-container">
        <div className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <div className="product-info">
            <h2>{product.name}</h2>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p>{product.description}</p>
            <div className="quantity-control">
                <button onClick={decrement}>-</button>
                <span>{quantity}</span>
                <button onClick={increment}>+</button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
        </div>)
    }
    </>
  );
};

export default ProductDesc;
