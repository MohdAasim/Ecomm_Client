import React from 'react';
import './AddressForm.css';

type AddressFormData = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

interface AddressFormProps {
  address: AddressFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onChange }) => (
  <div className="address-form">
    <input
      placeholder="Street"
      name="street"
      value={address.street}
      onChange={onChange}
    />
    <input
      placeholder="City"
      name="city"
      value={address.city}
      onChange={onChange}
    />
    <input
      placeholder="State"
      name="state"
      value={address.state}
      onChange={onChange}
    />
    <input
      placeholder="Postal Code"
      name="postalCode"
      value={address.postalCode}
      onChange={onChange}
    />
    <input
      placeholder="Country"
      name="country"
      value={address.country}
      onChange={onChange}
    />
  </div>
);

export default AddressForm;
