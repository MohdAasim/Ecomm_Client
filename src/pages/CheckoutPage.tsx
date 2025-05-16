import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosclient";
import { useAuth } from "../context/AuthContext";
import AddressForm from "../components/AddressForm";
import { useCart } from "../context/CartContext";

type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

const CheckoutPage = () => {
  const { state } = useLocation();
  const { totalPrice } = state;
  const { userId, token } = useAuth();
  const {clearCart} =useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    street: "", city: "", state: "", postalCode: "", country: ""
  });
  const [saveAddress, setSaveAddress] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axiosClient.get<Address[]>(`/addresses/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(res.data || []);
      } catch (err) {
        console.error("Error fetching addresses", err);
      }
    };
    fetchAddresses();
  }, [userId, token]);

  const handleBookOrder = async () => {
    if (!selectedAddressId) {
      const isNewAddressFilled = Object.values(newAddress).every((val) => val.trim() !== "");
      if (!isNewAddressFilled) {
        alert("Please select a saved address or fill in the new address form.");
        return;
      }
    }

    const address = selectedAddressId
      ? addresses.find((a) => a.id === selectedAddressId)
      : newAddress;

    if (!address) {
      alert("Please provide an address");
      return;
    }

    if (!selectedAddressId && saveAddress) {
      try {
        const newAddressData = {
          ...newAddress,
          userId,
        };

        await axiosClient.post("/addresses", newAddressData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Error saving address", err);
        alert("Failed to save address");
        return;
      }
    }

    try {
      await clearCart();
      navigate("/order-success");
    } catch (err) {
      console.error("Error clearing cart", err);
      alert("Order placed but failed to clear cart.");
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      {addresses.length > 0 && (
        <div className="address-section">
          <h3 className="section-title">Select Saved Address:</h3>
          <div className="address-list">
            {addresses.map((addr) => (
              <label key={addr.id} className="address-item">
                <input
                  type="radio"
                  name="selectedAddress"
                  value={addr.id}
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                  className="radio-input"
                />
                {addr.street}, {addr.city}, {addr.state}, {addr.postalCode}, {addr.country}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="new-address-section">
        <h3 className="section-title">Enter New Address:</h3>
        <AddressForm
          address={newAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
            className="checkbox-input"
          />
          Save this address for future delivery
        </label>
      </div>

      <div className="total-amount">
        Total: <span className="price">₹{totalPrice}</span>
      </div>

      <button className="checkout-button" onClick={handleBookOrder}>
        Proceed to Book (COD)
      </button>
    </div>
  );
};

export default CheckoutPage;
