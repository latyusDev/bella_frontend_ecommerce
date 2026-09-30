"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bell,
  LogOut,
  Package,
  ShieldCheck,
} from "lucide-react";

interface OrderItem {
  image: string;
  name: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  itemsCount: number;
  totalAmount: number;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  itemsSummary: string;
  images: string[];
  extraItemsCount?: number;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "BELZ-54839",
    date: "May 12, 2024",
    itemsCount: 5,
    totalAmount: 45500,
    status: "Delivered",
    itemsSummary: "Glow Face Serum, Brightening Face Cream...",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
    ],
    extraItemsCount: 2,
  },
  {
    id: "2",
    orderNumber: "BELZ-54812",
    date: "May 05, 2024",
    itemsCount: 2,
    totalAmount: 32000,
    status: "Shipped",
    itemsSummary: "Miss Belleza Eau De Parfum, Hydrating Toner",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
    ],
    extraItemsCount: 1,
  },
  {
    id: "3",
    orderNumber: "BELZ-54780",
    date: "Apr 28, 2024",
    itemsCount: 1,
    totalAmount: 12000,
    status: "Processing",
    itemsSummary: "Brightening Face Cream",
    images: [
      "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=200&auto=format&fit=crop",
    ],
  },
  {
    id: "4",
    orderNumber: "BELZ-54711",
    date: "Apr 12, 2024",
    itemsCount: 3,
    totalAmount: 28500,
    status: "Delivered",
    itemsSummary: "Hydrating Cleanser, Lip Glow Balm...",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=200&auto=format&fit=crop",
    ],
    extraItemsCount: 1,
  },
  {
    id: "5",
    orderNumber: "BELZ-54673",
    date: "Mar 30, 2024",
    itemsCount: 4,
    totalAmount: 41000,
    status: "Delivered",
    itemsSummary: "Daily Sunscreen, Niacinamide Serum...",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
    ],
    extraItemsCount: 2,
  },
  {
    id: "6",
    orderNumber: "BELZ-54602",
    date: "Mar 15, 2024",
    itemsCount: 2,
    totalAmount: 18000,
    status: "Cancelled",
    itemsSummary: "Rose Water Toner, Peel Off Mask",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=200&auto=format&fit=crop",
    ],
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Delivered
          </span>
        );
      case "Shipped":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Shipped
          </span>
        );
      case "Processing":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
            Processing
          </span>
        );
      case "Cancelled":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === "Processing") return order.status === "Processing";
    if (activeTab === "Shipped") return order.status === "Shipped";
    if (activeTab === "Delivered") return order.status === "Delivered";
    if (activeTab === "Cancelled") return order.status === "Cancelled";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-lg">
              🌸
            </div>
            <span className="text-2xl font-bold tracking-tight text-pink-500">
              Belleza
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-pink-500 transition-colors">New</a>
            <div className="relative group flex items-center gap-1 cursor-pointer hover:text-pink-500 transition-colors">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#" className="hover:text-pink-500 transition-colors">Best Sellers</a>
          </nav>

          <div className="flex items-center gap-5 text-gray-600">
            <button className="hover:text-pink-500 transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-pink-500 transition-colors" aria-label="Account">
              <User className="w-5 h-5 text-pink-500" />
            </button>
            <button className="relative hover:text-pink-500 transition-colors" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">Home</a>
          <span>&gt;</span>
          <a href="#" className="hover:underline">Account</a>
          <span>&gt;</span>
          <span className="text-pink-500 font-medium">My Orders</span>
        </nav>

        {/* Layout Grid: Sidebar Navigation + Main Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 space-y-8 shadow-sm">
            {/* User Profile Summary */}
            <div className="text-center space-y-3">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-pink-100 ring-4 ring-pink-50">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                  alt="Amaka Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Amaka Johnson</h3>
                <p className="text-xs text-gray-400">amaka.johnson@email.com</p>
              </div>
            </div>

            {/* Sidebar Navigation Menu */}
            <nav className="space-y-1 text-xs font-semibold">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-50 text-pink-500 font-bold transition-colors"
              >
                <Package className="w-4 h-4 text-pink-500" />
                <span>My Orders</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </a>
            </nav>

            <div className="border-t border-gray-100 pt-4">
              <button className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-gray-500 hover:text-rose-500 transition-colors w-full">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Right Main Content Panel */}
          <section className="lg:col-span-9 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 shadow-sm">
            
            {/* Header & Continue Shopping CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                <p className="text-xs text-gray-400 mt-1">Track, manage and view all your orders</p>
              </div>
              <button className="px-4 py-2 border border-pink-500 text-pink-500 text-xs font-semibold rounded-xl hover:bg-pink-50 transition-colors w-fit">
                Continue Shopping
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders by order number or product..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Filter Tabs & Sort By Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              {/* Category Status Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {[
                  { name: "All Orders", count: 8 },
                  { name: "Processing", count: 1 },
                  { name: "Shipped", count: 2 },
                  { name: "Delivered", count: 4 },
                  { name: "Cancelled", count: 1 },
                ].map((tab) => {
                  const isActive = activeTab === tab.name;
                  return (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? "bg-pink-500 text-white"
                          : "bg-gray-100/70 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span>{tab.name}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-200/80 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-xs shrink-0">
                <span className="text-gray-400">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-gray-800 focus:outline-none focus:border-pink-500 appearance-none cursor-pointer"
                  >
                    <option value="Most Recent">Most Recent</option>
                    <option value="Oldest">Oldest</option>
                    <option value="Highest Amount">Highest Amount</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Orders Cards List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 hover:border-gray-200 transition-colors shadow-xs"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Left Side: Product Thumbnails & Order Meta Info */}
                    <div className="flex items-start md:items-center gap-4">
                      {/* Product Thumbnail Row */}
                      <div className="flex items-center -space-x-2 shrink-0">
                        {order.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative w-12 h-12 rounded-xl border-2 border-white overflow-hidden bg-pink-50/50"
                          >
                            <Image
                              src={img}
                              alt="Order Product Thumbnail"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {order.extraItemsCount && (
                          <div className="w-12 h-12 rounded-xl border-2 border-white bg-pink-100 text-pink-500 font-bold text-xs flex items-center justify-center z-10">
                            +{order.extraItemsCount}
                          </div>
                        )}
                      </div>

                      {/* Order Info */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-xs font-bold text-gray-900">
                            Order #{order.orderNumber}
                          </h4>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-[11px] text-gray-400">
                          Placed on {order.date} • {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {order.itemsSummary}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Total Price & View Details Action */}
                    <div className="flex items-center md:flex-col justify-between md:items-end gap-2 border-t md:border-0 pt-3 md:pt-0 border-gray-100">
                      <span className="text-sm font-bold text-gray-900">
                        ₦{order.totalAmount.toLocaleString()}
                      </span>
                      <button className="px-4 py-1.5 border border-pink-500 text-pink-500 text-xs font-semibold rounded-xl hover:bg-pink-50 transition-colors">
                        View Details
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg text-xs font-bold ${
                  currentPage === 1
                    ? "bg-pink-500 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                1
              </button>

              <button
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-lg text-xs font-bold ${
                  currentPage === 2
                    ? "bg-pink-500 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                2
              </button>

              <button
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-lg text-xs font-bold ${
                  currentPage === 3
                    ? "bg-pink-500 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                3
              </button>

              <span className="text-xs text-gray-400 px-1">...</span>

              <button
                onClick={() => setCurrentPage(5)}
                className="w-8 h-8 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                5
              </button>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </section>
        </div>

        {/* Bottom Security Footer Badge */}
        <div className="flex items-center justify-center gap-2 py-4 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Your data is secure with us</span>
        </div>

      </main>
    </div>
  );
}
// import { CheckCircle, ChevronRight, Clock, Package, Truck } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'
// import { Order } from './Order';
// const statusConfig:any = {
//   processing: { label: "Processing", color: "text-yellow-600 bg-yellow-50", icon: Clock },
//   shipped: { label: "Shipped", color: "text-blue-600 bg-blue-50", icon: Truck },
//   delivered: { label: "Delivered", color: "text-teal bg-mint", icon: CheckCircle },
//   pending: { label: "pending", color: "text-yellow-600 bg-yellow-50", icon: CheckCircle },
// };

// const Orders = ({orders,isLoading}:any) => {
//     console.log(orders,'orders')
//   return (
//     <div>
//         orders
//         {
//         orders.slice(0, 2).map((order:any) => {
//         // orders.map((order:any) => {
            
//             const cfg = statusConfig[order.status];
//             const StatusIcon = cfg.icon;
//             return  (
            
//           <Order order={order} />
//             //  <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
//             //     {/* Order Header */}
//             //     <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//             //       <div className="flex items-center gap-4">
//             //         <div>
//             //           <p className="font-semibold text-gray-900 text-sm">{order.order_number}</p>
//             //           <p className="text-xs text-gray-400">{new Date(order.created_at).toDateString()}</p>
//             //         </div>
//             //       </div>
//             //       <div className="flex items-center gap-3">
//             //         <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${cfg.color}`}>
//             //           <StatusIcon size={12} />{cfg.label}
//             //         </span>
//             //         <span className="font-bold text-gray-900">${order.total}</span>
//             //       </div>
//             //     </div>

//             //     {/* Order Items */}
//             //     <div className="px-6 py-4 space-y-4">
//             //       {order.items.length > 0 ? (
//             //         order.items.map((item:any) => (
//             //           <div key={item.product.id} className="flex items-start gap-4">
//             //             <div className="w-16 h-16 rounded-xl overflow-hidden bg-mint flex-shrink-0">
//             //               {/* <img src={item.product.images[item.selectedImage ?? 0]} alt={item.product.name} className="w-full h-full object-cover" /> */}
//             //               {/* <img src={item.product.images[item.selectedImage ?? 0]} alt={item.product.name} className="w-full h-full object-cover" /> */}
//             //             </div>
//             //             <div className="flex-1 min-w-0">
//             //               <h3 className="font-medium text-gray-900 text-sm">{item.product.product_name}</h3>
//             //               <p className="text-xs text-gray-400 capitalize mb-1">{item.product.category}</p>
//             //               {/* <p className="text-xs text-gray-500 line-clamp-2">{item.product.shortDescription}</p> */}
//             //               <p className="text-xs text-gray-500 line-clamp-2">Lorem ipsum dolor sit amet consectetur
//             //                  adipisicing elit. Velit aperiam laborum temporibus reiciendis quasi ipsa incidunt at 
//             //                  consequatur voluptatibus deleniti error repudiandae impedit, inventore ad dignissimos, itaque quo magnam necessitatibus!</p>
//             //               <div className="flex items-center gap-3 mt-1.5">
//             //                 <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
//             //                 <span className="text-xs font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
//             //               </div>
//             //             </div>
//             //           </div>
//             //         ))
//             //       ) : (
//             //         <div className="flex items-center gap-4 py-2">
//             //           <div className="w-16 h-16 rounded-xl bg-mint flex items-center justify-center"><Package size={24} className="text-teal" /></div>
//             //           <div>
//             //             <p className="text-xs text-gray-400">Previous order • ${order.total}</p>
//             //             <p className="text-xs text-gray-500 mt-1">Delivered to {order.shipping_address.address_line_1}</p>
//             //           </div>
//             //         </div>
//             //       )}
//             //     </div>

//             //     {/* Footer */}
//             //     <div className="px-6 py-3 bg-offwhite flex items-center justify-between">
//             //       <p className="text-xs text-gray-500">📍 {order.address}</p>
//             //       <Link href={`/product/${order.items[0]?.product.id ?? "#"}`} className="text-xs text-teal font-medium flex items-center gap-1 hover:gap-1.5 transition-all">
//             //         View Details <ChevronRight size={12} />
//             //       </Link>
//             //     </div>
//             //   </div>
//             )
//            }
//         )
            
//             }
//     </div>
//   )
// }

// export default Orders

//   //   <div key={order.id} className="flex  items-center justify-between mb-5 py-3 px-4 border-b shadow-md border-gray-100 last:border-0">
//             //     <div >
//             //       <p className="text-sm font-medium text-gray-900">{order.id}</p>
//             //       <p className="text-xs text-gray-400">{new Date(order?.created_at).toDateString()}</p>
//             //     </div>
//             //     <div className="text-right">
//             //       <p className="font-semibold text-gray-900">${order.total}</p>
//             //       <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === "delivered" ? "bg-mint text-teal" : order.status === "shipped" ? "bg-blue-50 text-blue-600" : "bg-yellow-50 text-yellow-600"}`}>
//             //         {order.status}
//             //       </span>
//             //     </div>
//             //   </div>