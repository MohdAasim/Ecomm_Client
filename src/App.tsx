import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductListing from './pages/productListing/ProductListing';
import Header from './components/Header';
import NotFound from './pages/notFound/NotFound';
import ProductDesc from './pages/productDesc/ProductDesc';
import Aboutus from './pages/aboutus/Aboutus';
import { AuthProvider } from './context/AuthContext';
import SignIn from './pages/signIn/SignIn';
import CartPage from './pages/cartpage/CartPage';
import { CartProvider } from './context/CartContext';
import AppContextWrapper from './components/AppContextWrapper';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderSuccess from './pages/orderSuccess/OrderSuccess';

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <AppContextWrapper>
            <Header />
            <Routes>
              <Route path="/" element={<ProductListing />} />
              <Route path="/desc/:id" element={<ProductDesc />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppContextWrapper>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
