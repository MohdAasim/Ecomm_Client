import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductListing from './pages/productListing/ProductListing';
import NotFound from './pages/notFound/NotFound';
import ProductDesc from './pages/productDesc/ProductDesc';
import Aboutus from './pages/aboutus/Aboutus';
import { AuthProvider } from './context/AuthContext';
import SignIn from './pages/signIn/SignIn';
import CartPage from './pages/cartpage/CartPage';
import { CartProvider } from './context/CartContext';
import AppContextWrapper from './components/shared/appContextWrapper/AppContextWrapper';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderSuccess from './pages/orderSuccess/OrderSuccess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './components/shared/MainLayout/MainLayout';

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <AppContextWrapper>
            <Routes>
              <Route element={<MainLayout />}>
                <Route
                  path="/"
                  element={<ProductListing aria-label="Product listing page" />}
                />
                <Route
                  path="/desc/:id"
                  element={
                    <ProductDesc aria-label="Product description page" />
                  }
                />
                <Route
                  path="/about"
                  element={<Aboutus aria-label="About us page" />}
                />
                <Route
                  path="/signin"
                  element={<SignIn aria-label="Sign in page" />}
                />
                <Route
                  path="/cart"
                  element={<CartPage aria-label="Cart page" />}
                />
                <Route
                  path="/checkout"
                  element={<CheckoutPage aria-label="Checkout page" />}
                />
                <Route
                  path="/order-success"
                  element={<OrderSuccess aria-label="Order success page" />}
                />
              </Route>
              <Route
                path="*"
                element={<NotFound aria-label="404 not found page" />}
              />
            </Routes>
          </AppContextWrapper>
        </CartProvider>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
