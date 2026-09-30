
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  User,
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  Tag,
  Lock,
  ChevronLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";
import { useCart, useRemoveItemFromCart, useUpdateQuantity } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CartItem from "@/components/cart/CartItem";
import CheckoutPage from "../checkout/page";
import EmptyCheckout from "@/components/cart/EmptyCheckout";

// Cart Item Type Definition
interface CartItem {
  id: string;
  name: string;
  size: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Glow Face Serum",
    size: "30ml",
    unitPrice: 15000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Miss Belleza Eau De Parfum",
    size: "50ml",
    unitPrice: 20000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Brightening Face Cream",
    size: "50ml",
    unitPrice: 12000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=300&auto=format&fit=crop",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState<string>("");
  const {data,isLoading} = useCart();
  const router = useRouter();
  const queryClient = useQueryClient()

  console.log(data?.count,'h') 
  
  const cartCount = data?.count
  localStorage.setItem('cartCount',cartCount)

  const handlePlaceOrder = () => {
    queryClient.invalidateQueries({queryKey:['checkout-details']})
    router.push('/checkout')
  };
  


  // Pricing Calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = data?.total;
  const deliveryFee = 1500;
  const total = subtotal + deliveryFee;
  const isCartEmpty = data?.cart?.length === 0
  console.log(data,'carts')

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans">
      

      {/* Main Cart Content */}
     {
      isLoading?'Loading...':

      <>

      {
        isCartEmpty ? <EmptyCheckout heading = "Your cart is currently empty"/>:
       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Back Link */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Your Cart ({totalItemsCount})
          </h1>
          <a
            href="#"
            className="flex items-center gap-1 text-xs font-semibold text-pink-500 hover:text-pink-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </a>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Cart Items List & Coupon Code */}
          <div className="lg:col-span-8 space-y-6">
            {/* Cart Items Container Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
              {data?.cart?.items?.map((item) => (
                <CartItem item={item} cartCount={cartCount} />
              ))}
            </div>

          </div>

          {/* Right Side: Order Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* <div className="bg-pink-50/40 rounded-2xl p-6 border border-pink-100/60 space-y-6"> */}
            <div className="bg-pink-100 rounded-2xl p-6 border border-pink-100/60 space-y-6">
              <h2 className="text-lg font-bold text-gray-900">
                Order Summary
              </h2>

              {/* Price Calculation Breakdown */}
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItemsCount} items)</span>
                  <span className="font-semibold text-gray-900">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                {/* <div className="flex justify-between text-pink-500 font-medium">
                  <span>Discount</span>
                  <span>-₦{discount.toLocaleString()}</span>
                </div> */}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-gray-900">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-pink-200/50" />

              {/* Grand Total */}
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-extrabold text-pink-500">
                  ₦{total.toLocaleString()}
                </span>
              </div>

              {/* Checkout CTA */}
              <button onClick={handlePlaceOrder} className="w-full cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20">
                <Lock className="w-4 h-4" />
                <span>Proceed to Checkout</span>
              </button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-pink-500" />
                <span>Secure checkout powered by Belladama</span>
              </div>
            </div>

            {/* Payment Gateways Bar */}
            <div className="bg-pink-100 rounded-2xl p-4 border border-gray-100 flex flex-col gap-3">
              <span className="text-xs font-semibold text-gray-600">We Accept</span>
              <div className="flex items-center justify-between gap-2">
                <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold tracking-wider text-blue-900">
                  VISA
                </div>
                <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold text-red-500">
                  MasterCard
                </div>
                <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold text-teal-600">
                  Verve
                </div>
                <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold text-gray-900">
                  Pay
                </div>
                <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold text-sky-500">
                  Paystack
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Footer Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-pink-100 rounded-2xl border border-pink-100/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Free Delivery</h4>
              <p className="text-[10px] text-gray-500">On orders over ₦30,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">100% Authentic</h4>
              <p className="text-[10px] text-gray-500">Original products</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Easy Returns</h4>
              <p className="text-[10px] text-gray-500">7 days return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Customer Support</h4>
              <p className="text-[10px] text-gray-500">+234 800 123 4567</p>
            </div>
          </div>
        </div>
      </main>
      }
      </>
     }
    </div>
  );
}

// ==== BACKUP

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import {
//   Search,
//   User,
//   ShoppingBag,
//   Trash2,
//   Minus,
//   Plus,
//   Tag,
//   Lock,
//   ChevronLeft,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   Headphones,
// } from "lucide-react";
// import { useCart } from "@/hooks/useCart";
// import { useRouter } from "next/navigation";
// import { useQueryClient } from "@tanstack/react-query";

// // Cart Item Type Definition
// interface CartItem {
//   id: string;
//   name: string;
//   size: string;
//   unitPrice: number;
//   quantity: number;
//   image: string;
// }

// const initialCartItems: CartItem[] = [
//   {
//     id: "1",
//     name: "Glow Face Serum",
//     size: "30ml",
//     unitPrice: 15000,
//     quantity: 1,
//     image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     id: "2",
//     name: "Miss Belleza Eau De Parfum",
//     size: "50ml",
//     unitPrice: 20000,
//     quantity: 1,
//     image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     id: "3",
//     name: "Brightening Face Cream",
//     size: "50ml",
//     unitPrice: 12000,
//     quantity: 1,
//     image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=300&auto=format&fit=crop",
//   },
// ];

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
//   const [couponCode, setCouponCode] = useState<string>("");
//   const {data,isLoading} = useCart();
//   const router = useRouter();
//   const queryClient = useQueryClient()

//   console.log(data,'carts')

  

  // const updateQuantity = (id: string, delta: number) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) => {
  //       if (item.id === id) {
  //         const newQty = item.quantity + delta;
  //         return newQty > 0 ? { ...item, quantity: newQty } : item;
  //       }
  //       return item;
  //     })
  //   );
  // };

//   const removeItem = (id: string) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   // Pricing Calculations
//   const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
//   const discount = 3000;
//   const deliveryFee = 1500;
//   const total = subtotal - discount + deliveryFee;

//   return (
//     <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans">
      

//       {/* Main Cart Content */}
//      {
//       isLoading?'Loading...':
//        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Page Title & Back Link */}
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Your Cart ({totalItemsCount})
//           </h1>
//           <a
//             href="#"
//             className="flex items-center gap-1 text-xs font-semibold text-pink-500 hover:text-pink-600 transition-colors"
//           >
//             <ChevronLeft className="w-4 h-4" />
//             <span>Continue Shopping</span>
//           </a>
//         </div>

//         {/* Layout Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           {/* Left Side: Cart Items List & Coupon Code */}
//           <div className="lg:col-span-8 space-y-6">
//             {/* Cart Items Container Card */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
//                 >
//                   {/* Product Details & Image */}
//                   <div className="flex items-center gap-4">
//                     <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-pink-50/50 border border-gray-100 shrink-0">
//                       <Image
//                         src={item.image}
//                         alt={item.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <h3 className="font-semibold text-gray-900 text-sm">
//                         {item.name}
//                       </h3>
//                       <p className="text-xs text-gray-400">{item.size}</p>
//                       <p className="text-sm font-bold text-pink-500">
//                         ₦{item.unitPrice.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Quantity Controls & Delete Button */}
//                   <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
//                     {/* Quantity Picker */}
//                     <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
//                       <button
//                         onClick={() => updateQuantity(item.id, -1)}
//                         className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
//                         aria-label="Decrease quantity"
//                       >
//                         <Minus className="w-3.5 h-3.5" />
//                       </button>
//                       <span className="w-8 text-center text-xs font-semibold text-gray-700">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateQuantity(item.id, 1)}
//                         className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
//                         aria-label="Increase quantity"
//                       >
//                         <Plus className="w-3.5 h-3.5" />
//                       </button>
//                     </div>

//                     {/* Total Price for item */}
//                     <div className="text-right min-w-[80px]">
//                       <span className="text-sm font-bold text-pink-500">
//                         ₦{(item.unitPrice * item.quantity).toLocaleString()}
//                       </span>
//                     </div>

//                     {/* Remove Button */}
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="text-pink-400 hover:text-pink-600 transition-colors"
//                       aria-label="Remove item"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* Right Side: Order Summary Card */}
//           <div className="lg:col-span-4 space-y-6">
//             <div className="bg-pink-50/40 rounded-2xl p-6 border border-pink-100/60 space-y-6">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Order Summary
//               </h2>

//               {/* Price Calculation Breakdown */}
//               <div className="space-y-3 text-xs text-gray-600">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({totalItemsCount} items)</span>
//                   <span className="font-semibold text-gray-900">
//                     ₦{subtotal.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-pink-500 font-medium">
//                   <span>Discount</span>
//                   <span>-₦{discount.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Delivery Fee</span>
//                   <span className="font-semibold text-gray-900">
//                     ₦{deliveryFee.toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               <div className="border-t border-pink-200/50" />

//               {/* Grand Total */}
//               <div className="flex items-center justify-between">
//                 <span className="text-base font-bold text-gray-900">Total</span>
//                 <span className="text-xl font-extrabold text-pink-500">
//                   ₦{total.toLocaleString()}
//                 </span>
//               </div>

//               {/* Checkout CTA */}
//               <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20">
//                 <Lock className="w-4 h-4" />
//                 <span>Proceed to Checkout</span>
//               </button>

//               {/* Trust Badge */}
//               <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
//                 <ShieldCheck className="w-4 h-4 text-pink-500" />
//                 <span>Secure checkout powered by Belleza</span>
//               </div>
//             </div>

//             {/* Payment Gateways Bar */}
//             <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col gap-3">
//               <span className="text-xs font-semibold text-gray-600">We Accept</span>
//               <div className="flex items-center justify-between gap-2">
//                 <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold tracking-wider text-blue-900">
//                   VISA
//                 </div>
//                 <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold text-red-500">
//                   MasterCard
//                 </div>
//                 <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold text-teal-600">
//                   Verve
//                 </div>
//                 <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold text-gray-900">
//                   Pay
//                 </div>
//                 <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold text-sky-500">
//                   Paystack
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Value Proposition Footer Bar */}
//         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-pink-50/30 rounded-2xl border border-pink-100/50">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
//               <Truck className="w-5 h-5 text-pink-500" />
//             </div>
//             <div>
//               <h4 className="text-xs font-bold text-gray-900">Free Delivery</h4>
//               <p className="text-[10px] text-gray-500">On orders over ₦30,000</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
//               <ShieldCheck className="w-5 h-5 text-pink-500" />
//             </div>
//             <div>
//               <h4 className="text-xs font-bold text-gray-900">100% Authentic</h4>
//               <p className="text-[10px] text-gray-500">Original products</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
//               <RotateCcw className="w-5 h-5 text-pink-500" />
//             </div>
//             <div>
//               <h4 className="text-xs font-bold text-gray-900">Easy Returns</h4>
//               <p className="text-[10px] text-gray-500">7 days return policy</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
//               <Headphones className="w-5 h-5 text-pink-500" />
//             </div>
//             <div>
//               <h4 className="text-xs font-bold text-gray-900">Customer Support</h4>
//               <p className="text-[10px] text-gray-500">+234 800 123 4567</p>
//             </div>
//           </div>
//         </div>
//       </main>
//      }
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useStore } from "@/store/useStore";
// import StarRating from "@/components/StarRating";
// import { Trash2, Plus, Minus, ShoppingBag, ChevronRight } from "lucide-react";
// import { useCart, useRemoveItemFromCart } from "@/hooks/useCart";
// import CartItem from "@/components/cart/CartItem";
// import { useRouter } from "next/navigation";
// import { useQueryClient } from "@tanstack/react-query";

// export default function CartPage() {
//   const { cart, removeFromCart:_removeFromCart, setTotalCartItem,updateQuantity, placeOrder, getCartTotal, rateProduct, productRatings } = useStore();
//   const [reviewStates, setReviewStates] = useState<Record<string, { rating: number; text: string; submitted: boolean }>>({});
  // const [orderPlaced, setOrderPlaced] = useState(false);
  // const {data,isLoading} = useCart();
  // const router = useRouter();
  // const queryClient = useQueryClient()

  // console.log(data,'carts')

  // const total = getCartTotal();
  // const shipping = total >= 50 ? 0 : 100.99;

  // const shippingFee = 1500
  // const totalCartItem = data?.count
  // const totalAmount = data?.total + shippingFee
  
  // useEffect(()=>{
  //   setTotalCartItem(totalCartItem)
  // },[totalCartItem])

  
  // const handlePlaceOrder = () => {
  //   // placeOrder();
  //   // setOrderPlaced(true);
  //   queryClient.invalidateQueries({queryKey:['checkout-details']})
  //   router.push('/checkout')
  // };
  //   const cartItems = data?.cart?.items
  // const submitReview = (productId: string) => {
  //   const rs = reviewStates[productId];
  //   if (!rs || rs.rating === 0) return;
  //   rateProduct(productId, rs.rating, rs.text);
  //   setReviewStates((prev) => ({ ...prev, [productId]: { ...rs, submitted: true } }));
  // };

//   // if (orderPlaced) {
//   //   return (
//   //     <main className="max-w-2xl mx-auto px-4 py-20 text-center">
//   //       <div className="text-6xl mb-6">🎉</div>
//   //       <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Order Placed!</h1>
//   //       <p className="text-gray-500 mb-8">Thank you for your order. We'll send you a confirmation email shortly.</p>
//   //       <div className="flex gap-3 justify-center">
//   //         <Link href="/orders" className="bg-teal text-white px-8 py-3 rounded-xl font-medium hover:bg-teal/90 transition-colors">Track Order</Link>
//   //         <Link href="/" className="border border-gray-200 px-8 py-3 rounded-xl font-medium hover:bg-white transition-colors">Continue Shopping</Link>
//   //       </div>
//   //     </main>
//   //   );
//   // }

//   if (totalCartItem === 0) {
//     return (
//       <main className="max-w-2xl mx-auto px-4 py-20 text-center">
//         <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
//         <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
//         <p className="text-gray-500 mb-8">Add some products to get started</p>
//         <Link href="/category/all" className="bg-primary text-white px-10 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">Shop Now</Link>
//       </main>
//     );
//   }

//   return (
//     <main className="px-4 sm:px-6 py-10">
//       <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">Your Cart ({totalCartItem} item{totalCartItem !== 1 ? "s" : ""})</h1>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//        {
//         isLoading?'Loading...':
//          <div className="lg:col-span-2 space-y-5">
//           {cartItems?.map((item) => {
//             console.log(item,'item')
//             const rs = reviewStates[item.product.id] ?? { rating: 0, text: "", submitted: false };
//             const existingRating = productRatings[item.product.id];

//             return (
//              <CartItem key={item.id} item={item} />
//             );
//           })}
          
//         </div>
//        }

//         {/* Order Summary */}
//       <div className="lg:col-span-1">
//           <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
//             <h2 className="font-semibold text-[#2E3A56] mb-5">Order Summary</h2>
//             <div className="space-y-3 mb-5">
//               <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-medium">₦{totalAmount?.toFixed(2)}</span></div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Shipping</span>
//                 <span className={"text-[#F2955F] font-medium"}>₦{shippingFee}</span>
//               </div>
//               <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-[#2E3A56]">
//                 <span>Total</span><span className="text-xl">₦{(totalAmount).toFixed(2)}</span>
//               </div>
//             </div>

//             <button
//               onClick={handlePlaceOrder}
//               className="w-full bg-[#F2955F] hover:bg-[#F2955F]/90 text-white py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#F2955F]/30 active:scale-95 flex items-center justify-center gap-2"
//             >
//               Place Order <ChevronRight size={18} />
//             </button>
//             <Link href="/category/all" className="block text-center text-sm text-gray-500 hover:text-gray-800 mt-3 transition-colors">Continue Shopping</Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
