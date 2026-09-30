import React from 'react'
import { Pencil, Trash2, MapPin } from "lucide-react";



const ShippingAddressCard = ({ address, setUiState, selectedAddressId }) => {
  console.log("selectedAddressId", selectedAddressId);
  return (
    <div
    onClick={() => setUiState((prev) => ({ ...prev, selectedAddressId: address.id }))}
            key={address.id}
            className={`border rounded-xl p-5 shadow-sm hover:shadow-lg transition cursor-pointer  bg-white ${selectedAddressId === address.id ? "border-black " : ""}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {address.label || "Address"}
                  </h3>

                  {address.is_default && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mt-1 inline-block">
                      Default
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Edit Address"
                  onClick={() => setUiState((prev) => ({ ...prev, selectedAddressId: address.id }))}
                >
                  <Pencil size={18} />
                </button>

                <button
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete Address"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Recipient */}
            <div className="mt-4 space-y-1 text-sm">
              <p>
                <span className="font-semibold">Recipient:</span>{" "}
                {address.full_name}
              </p>

              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {address.phone}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {address.email}
              </p>
            </div>

            {/* Address */}
            <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-1">
              <p>{address.address_line_1}</p>

              {address.address_line_2 && (
                <p>{address.address_line_2}</p>
              )}

              <p>
                {address.city}, {address.state}
              </p>

              <p>
                {address.country}{" "}
                {address.postal_code && `(${address.postal_code})`}
              </p>
            </div>
          </div>
  )
}

export default ShippingAddressCard