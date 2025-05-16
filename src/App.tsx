import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductListing from "./pages/ProductListing";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import ProductDesc from "./pages/ProductDesc";
import Aboutus from "./pages/Aboutus";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import AppContextWrapper from "./components/AppContextWrapper";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/orderSuccess/OrderSuccess";

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
