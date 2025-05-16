import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.Product?.price || 0) * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please sign in to proceed to checkout.');
      navigate('/signin');
      return;
    }
    navigate('/checkout', { state: { totalPrice } });
  };

  // Defensive fallback
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {safeCartItems.length === 0 ? (
        <p className="cart-empty">Cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {safeCartItems.map((item) => (
              <li className="cart-item" key={item.productId}>
                <span className="cart-item-name">
                  {item.Product?.name || `Product ${item.productId}`} - ₹
                  {(Number(item.Product?.price) * item.quantity).toFixed(2)}
                </span>
                <div className="cart-controls">
                  <button
                    className="cart-btn"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        Math.max(item.quantity - 1, 1),
                      )
                    }
                  >
                    -
                  </button>
                  <span className="cart-qty">{item.quantity}</span>
                  <button
                    className="cart-btn"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="cart-remove"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-actions">
            <button className="cart-clear" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="cart-checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
