// import React from 'react'

// const Order = ({order}:any) => {
//   return (
//     <div>
//               <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">{order.id}</p>
//                   <p className="text-xs text-gray-400">{order.date}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-gray-900">${order.total}</p>
//                   <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === "delivered" ? "bg-mint text-teal" : order.status === "shipped" ? "bg-blue-50 text-blue-600" : "bg-yellow-50 text-yellow-600"}`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
//     </div>
//   )
// }

// export default Order

// components/OrderDetails.tsx
"use client";

import { useState } from "react";

interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  product_sku: string;
  image_url: string | null;
  price: string;
  quantity: number;
  subtotal: string;
  created_at: string;
  updated_at: string;
}

const orderData: OrderDetail = {
  id: 2,
  order_id: 8,
  product_id: 3,
  product_name: "fresh",
  product_sku: "1213qdewsdnm",
  image_url: null,
  price: "40000.00",
  quantity: 3,
  subtotal: "120000.00",
  created_at: "2026-06-30T21:10:40.000000Z",
  updated_at: "2026-06-30T21:10:40.000000Z",
};

function formatCurrency(value: string) {
  const num = parseFloat(value);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(num);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export  const Order = ({ order  }: { order?: OrderDetail }) => {
  const [copied, setCopied] = useState(false);
  console.log(order,'order')

  const handleCopySku = () => {
    navigator.clipboard.writeText(order.order_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className=" w-full  flex items-center  justify-center ">
      <div className="w-full max-w-mdd mb-4">

        {/* Card */}
        <div className="relative   rounded-2xl border-gray-100 shadow-md overflow-hidden">
        {/* <div className="relative  border border-emerald-500/20 rounded-2xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.25)] overflow-hidden"> */}
          {/* Top accent bar */}

          <div className="p-6">
            {/* Product row */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-black/20 border border-black/5  flex items-center justify-center flex-shrink-0">
                {order.image_url ? (
                  <img
                    src={order.image_url}
                    alt={order.product_name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <svg
                    className="w-7 h-7 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V6a1.125 1.125 0 00-1.125-1.125H3.375A1.125 1.125 0 002.25 6v.375c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-white font-semibold text-lg capitalize truncate">
                  {order.product_name}
                </h2>
                <button
                  onClick={handleCopySku}
                  className="mt-1 flex items-center gap-1.5 text-black hover:text-emerald-400 text-xs transition-colors"
                >
                  ORN: {order.order_number}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {copied ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                      />
                    )}
                  </svg>
                  {copied && <span className="text-emerald-400">Copied</span>}
                </button>
              </div>

              <span className="flex-shrink-0 text-[10px] uppercase tracking-wider bg-yellow-50 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-full">
                {order?.status}
              </span>
            </div>

            {/* Divider (perforated) */}
            <div className="my-5 border-t border-dashed border-emerald-500/20" />

            {/* Line items */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-black">
                <span>Delivered to</span>
                <span className="text-black">{order.shipping_address.address_line_1}</span>
              </div>
              
              <div className="flex justify-between text-black">
                <span>Shipping fee</span>
                <span className="text-black"> {order.shipping_fee}</span>
              </div>
              <div className="flex justify-between text-black">
                <span>subtotal</span>
                <span className="text-black"> {order.subtotal}</span>
              </div>
            
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-dashed border-black/20" />

            {/* Subtotal */}
            <div className="flex items-end justify-between">
              <span className="text-black text-sm uppercase tracking-wider">
                Total
              </span>
              <span className="text-black text-2xl font-bold">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-black/5 border-t border-black/10 px-6 py-3 flex justify-between text-[11px] text-black/50">
            <span>Order date {formatDate(order.created_at)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}