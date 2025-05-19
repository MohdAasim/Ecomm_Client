import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSucsess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-success-container">
      <div className="order-success-icon">🎉</div>
      <h1 className="order-success-title">
        Hurray! Your order has been booked.
      </h1>
      <p className="order-success-message">
        You will be redirected to the home page shortly...
      </p>
    </div>
  );
};

export default OrderSuccess;
