import ShippingAddressCard from "./ShippingAddressCard";
import{ useState } from "react";
type LatestShippingAddressProps = {
  address_line_1: string;
  address_line_2: string;
  city: string;
  country: string;
  created_at: string;
  email: string;
  full_name: string;
  id: number;
  is_default: boolean;
  label: string;
  phone: string;
  postal_code: string;
  state: string;
  updated_at: string;
  user_id: number;
};

type LatestShippingAddressesProps = {
  addresses: LatestShippingAddressProps[];
  setUiState: React.Dispatch<React.SetStateAction<any>>;
  selectedAddressId: number | null;
};

const LatestShippingAddresses = ({
  addresses,
  setUiState,
  selectedAddressId
}: LatestShippingAddressesProps) => {
  return (
    <div className="mt-">

      <div className="grid gap-5">
        {addresses?.map((address) => (
          <ShippingAddressCard key={address.id} address={address} setUiState={setUiState} selectedAddressId={selectedAddressId} />
        ))}
      </div>
    </div>
  );
};

export default LatestShippingAddresses;