// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import {
//   Search,
//   User,
//   ShoppingBag,
//   Heart,
//   Bell,
//   LogOut,
//   Edit2,
//   Gift,
//   Plus,
//   Home as HomeIcon,
//   Briefcase,
//   ChevronRight,
//   ShieldCheck,
//   Package,
//   Truck,
//   RotateCcw,
// } from "lucide-react";

// interface SavedAddress {
//   id: string;
//   type: "home" | "office";
//   title: string;
//   isDefault?: boolean;
//   address: string;
//   phone: string;
// }

// interface RecentOrder {
//   id: string;
//   orderNumber: string;
//   date: string;
//   itemCount: number;
//   total: number;
//   status: "Delivered" | "Shipped" | "Processing";
//   image: string;
// }

// interface WishlistItem {
//   id: string;
//   name: string;
//   size: string;
//   price: number;
//   image: string;
// }

// interface NotificationItem {
//   id: string;
//   icon: "truck" | "tag" | "package";
//   message: string;
//   timestamp: string;
//   unread: boolean;
// }

// const savedAddresses: SavedAddress[] = [
//   {
//     id: "1",
//     type: "home",
//     title: "Home",
//     isDefault: true,
//     address: "12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
//     phone: "+234 801 234 5678",
//   },
//   {
//     id: "2",
//     type: "office",
//     title: "Office",
//     isDefault: false,
//     address: "No. 45 Isaac John Street, Ikeja, Lagos, Nigeria",
//     phone: "+234 802 345 6789",
//   },
// ];

// const recentOrders: RecentOrder[] = [
//   {
//     id: "1",
//     orderNumber: "BELZ-54839",
//     date: "May 12, 2024",
//     itemCount: 3,
//     total: 45500,
//     status: "Delivered",
//     image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     id: "2",
//     orderNumber: "BELZ-54812",
//     date: "May 05, 2024",
//     itemCount: 2,
//     total: 32000,
//     status: "Shipped",
//     image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     id: "3",
//     orderNumber: "BELZ-54780",
//     date: "Apr 28, 2024",
//     itemCount: 1,
//     total: 12000,
//     status: "Processing",
//     image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=300&auto=format&fit=crop",
//   },
// ];

// const wishlistItems: WishlistItem[] = [
//   {
//     id: "1",
//     name: "Glow Face Serum",
//     size: "30ml",
//     price: 15000,
//     image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     id: "2",
//     name: "Miss Belleza Eau De Parfum",
//     size: "50ml",
//     price: 20000,
//     image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     id: "3",
//     name: "Brightening Face Cream",
//     size: "50ml",
//     price: 12000,
//     image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     id: "4",
//     name: "Hydrating Toner",
//     size: "120ml",
//     price: 8500,
//     image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     id: "5",
//     name: "Lip Glow Balm",
//     size: "15ml",
//     price: 6000,
//     image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=300&auto=format&fit=crop",
//   },
// ];

// const notifications: NotificationItem[] = [
//   {
//     id: "1",
//     icon: "truck",
//     message: "Your order #BELZ-54839 has been delivered successfully.",
//     timestamp: "May 12, 2024 • 10:30 AM",
//     unread: true,
//   },
//   {
//     id: "2",
//     icon: "tag",
//     message: "Exclusive offer! Get 20% off on your next purchase.",
//     timestamp: "May 10, 2024 • 09:15 AM",
//     unread: true,
//   },
//   {
//     id: "3",
//     icon: "package",
//     message: "New arrival: Check out our latest skincare collection.",
//     timestamp: "May 08, 2024 • 04:45 PM",
//     unread: true,
//   },
// ];

// export default function ProfilePage() {
//   const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist" | "notifications">("profile");

//   return (
//     <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans">
    
//       {/* Main Container */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
//           <a href="#" className="hover:underline">Home</a>
//           <span>&gt;</span>
//           <span className="text-pink-500 font-medium">Account</span>
//         </nav>

//         {/* Dashboard Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* Left Sidebar */}
//           <div className="lg:col-span-3 space-y-6">
//             <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
//               <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-pink-100">
//                 <Image
//                   src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
//                   alt="Amaka Johnson"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <h2 className="text-base font-bold text-gray-900">Amaka Johnson</h2>
//               <p className="text-xs text-gray-400 mt-0.5">amaka.johnson@email.com</p>

//               {/* Sidebar Navigation */}
//               <div className="mt-6 space-y-1 text-left">
//                 <button
//                   onClick={() => setActiveTab("profile")}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
//                     activeTab === "profile"
//                       ? "bg-pink-50 text-pink-500"
//                       : "text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <User className="w-4 h-4" />
//                   <span>Profile</span>
//                 </button>

//                 <button
//                   onClick={() => setActiveTab("orders")}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
//                     activeTab === "orders"
//                       ? "bg-pink-50 text-pink-500"
//                       : "text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <ShoppingBag className="w-4 h-4" />
//                   <span>My Orders</span>
//                 </button>

//                 <button
//                   onClick={() => setActiveTab("wishlist")}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
//                     activeTab === "wishlist"
//                       ? "bg-pink-50 text-pink-500"
//                       : "text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <Heart className="w-4 h-4" />
//                   <span>Wishlist</span>
//                 </button>

//                 <button
//                   onClick={() => setActiveTab("notifications")}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
//                     activeTab === "notifications"
//                       ? "bg-pink-50 text-pink-500"
//                       : "text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <Bell className="w-4 h-4" />
//                   <span>Notifications</span>
//                 </button>
//               </div>

//               <div className="border-t border-gray-100 my-4" />

//               <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors">
//                 <LogOut className="w-4 h-4" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>

//           {/* Right Main Content */}
//           <div className="lg:col-span-9 space-y-8">
            
//             {/* Top Row: Profile Information & Rewards Card */}
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
//               {/* Profile Details Card */}
//               <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm relative">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-base font-bold text-gray-900">Profile Information</h3>
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 border border-pink-500 text-pink-500 text-xs font-semibold rounded-lg hover:bg-pink-50 transition-colors">
//                     <Edit2 className="w-3.5 h-3.5" />
//                     <span>Edit Profile</span>
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
//                   <div>
//                     <span className="text-gray-400 block text-[11px] mb-0.5">Full Name</span>
//                     <span className="font-semibold text-gray-800">Amaka Johnson</span>
//                   </div>

//                   <div>
//                     <span className="text-gray-400 block text-[11px] mb-0.5">Username</span>
//                     <span className="font-semibold text-gray-800">amaka_j</span>
//                   </div>

//                   <div>
//                     <span className="text-gray-400 block text-[11px] mb-0.5">Email Address</span>
//                     <span className="font-semibold text-gray-800">amaka.johnson@email.com</span>
//                   </div>

//                   <div>
//                     <span className="text-gray-400 block text-[11px] mb-0.5">Birthday</span>
//                     <span className="font-semibold text-gray-800">May 10, 1996</span>
//                   </div>

//                   <div>
//                     <span className="text-gray-400 block text-[11px] mb-0.5">Phone Number</span>
//                     <span className="font-semibold text-gray-800">+234 801 234 5678</span>
//                   </div>

//                   <div>
//                     <span className="text-gray-400 block text-[11px] mb-0.5">Gender</span>
//                     <span className="font-semibold text-gray-800">Female</span>
//                   </div>

//                   <div>
//                     <span className="text-gray-400 block text-[11px] mb-0.5">Date Joined</span>
//                     <span className="font-semibold text-gray-800">April 12, 2024</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Rewards Card */}
//               <div className="lg:col-span-4 bg-pink-50/40 border border-pink-100 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-sm">
//                 <div className="w-12 h-12 rounded-full bg-pink-100/80 text-pink-500 flex items-center justify-center mb-2">
//                   <Gift className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-bold text-gray-900">Belleza Rewards</h4>
//                   <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
//                     Earn points with every purchase and get exclusive rewards.
//                   </p>
//                 </div>
//                 <button className="mt-4 px-4 py-2 border border-pink-500 text-pink-500 text-xs font-semibold rounded-xl bg-white hover:bg-pink-50 transition-colors">
//                   View Rewards
//                 </button>
//                 <p className="text-[11px] text-gray-500 mt-3">
//                   You have <span className="font-bold text-pink-500">1,250</span> points
//                 </p>
//               </div>
//             </div>

//             {/* Saved Addresses Section */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-base font-bold text-gray-900">Saved Addresses</h3>
//                 <button className="text-xs font-semibold text-pink-500 hover:underline">
//                   View All
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {savedAddresses.map((addr) => (
//                   <div
//                     key={addr.id}
//                     className="p-4 rounded-xl border border-gray-100 bg-gray-50/30 space-y-2 relative"
//                   >
//                     <div className="flex items-center gap-2">
//                       {addr.type === "home" ? (
//                         <HomeIcon className="w-4 h-4 text-pink-500" />
//                       ) : (
//                         <Briefcase className="w-4 h-4 text-pink-500" />
//                       )}
//                       <span className="text-xs font-bold text-gray-900">{addr.title}</span>
//                       {addr.isDefault && (
//                         <span className="px-2 py-0.5 bg-pink-100 text-pink-500 text-[9px] font-bold rounded-full">
//                           Default
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-[11px] text-gray-500 leading-relaxed">{addr.address}</p>
//                     <p className="text-[11px] text-gray-400">{addr.phone}</p>
//                   </div>
//                 ))}

//                 {/* Add New Address Card */}
//                 <button className="border-2 border-dashed border-pink-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-pink-500 hover:bg-pink-50/30 transition-colors min-h-[110px]">
//                   <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center">
//                     <Plus className="w-4 h-4" />
//                   </div>
//                   <span className="text-xs font-bold">Add New Address</span>
//                 </button>
//               </div>
//             </div>

//             {/* Recent Orders Section */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-base font-bold text-gray-900">Recent Orders</h3>
//                 <button className="text-xs font-semibold text-pink-500 hover:underline">
//                   View All Orders
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 {recentOrders.map((order) => (
//                   <div
//                     key={order.id}
//                     className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 shrink-0">
//                         <Image
//                           src={order.image}
//                           alt={order.orderNumber}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div>
//                         <h4 className="text-xs font-bold text-gray-900">
//                           Order #{order.orderNumber}
//                         </h4>
//                         <p className="text-[10px] text-gray-400">{order.date}</p>
//                         <p className="text-[10px] text-gray-500 mt-0.5">{order.itemCount} items</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-[10px] font-bold ${
//                           order.status === "Delivered"
//                             ? "bg-green-100 text-green-600"
//                             : order.status === "Shipped"
//                             ? "bg-amber-100 text-amber-600"
//                             : "bg-blue-100 text-blue-600"
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                       <span className="text-xs font-bold text-gray-900">
//                         ₦{order.total.toLocaleString()}
//                       </span>
//                       <ChevronRight className="w-4 h-4 text-gray-400" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Wishlist Section */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-base font-bold text-gray-900">Wishlist</h3>
//                 <button className="text-xs font-semibold text-pink-500 hover:underline">
//                   View All
//                 </button>
//               </div>

//               <div className="relative">
//                 <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
//                   {wishlistItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="min-w-[170px] max-w-[170px] bg-white rounded-xl border border-gray-100 p-3 space-y-2 relative group flex-shrink-0"
//                     >
//                       <button
//                         className="absolute top-4 right-4 z-10 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-pink-500 shadow-sm"
//                         aria-label="Remove from wishlist"
//                       >
//                         <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
//                       </button>

//                       <div className="relative w-full h-32 rounded-lg overflow-hidden bg-pink-50/50">
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           fill
//                           className="object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>

//                       <div>
//                         <h4 className="text-xs font-semibold text-gray-900 truncate">
//                           {item.name}
//                         </h4>
//                         <p className="text-[10px] text-gray-400">{item.size}</p>
//                         <p className="text-xs font-bold text-gray-900 mt-1">
//                           ₦{item.price.toLocaleString()}
//                         </p>
//                       </div>

//                       <button className="w-full py-1.5 border border-pink-500 rounded-lg text-pink-500 text-[11px] font-semibold hover:bg-pink-50 transition-colors">
//                         Add to Cart
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Right Scroll Indicator Button */}
//                 <button
//                   className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-pink-500 z-10"
//                   aria-label="Scroll right"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Notifications Section */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-base font-bold text-gray-900">Notifications</h3>
//                 <button className="text-xs font-semibold text-pink-500 hover:underline">
//                   View All
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 {notifications.map((notif) => (
//                   <div
//                     key={notif.id}
//                     className="flex items-center justify-between p-3.5 bg-pink-50/30 rounded-xl border border-pink-100/50"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
//                         {notif.icon === "truck" && <Truck className="w-4 h-4" />}
//                         {notif.icon === "tag" && <Gift className="w-4 h-4" />}
//                         {notif.icon === "package" && <Package className="w-4 h-4" />}
//                       </div>
//                       <div>
//                         <p className="text-xs font-semibold text-gray-800">{notif.message}</p>
//                         <p className="text-[10px] text-gray-400 mt-0.5">{notif.timestamp}</p>
//                       </div>
//                     </div>
//                     {notif.unread && (
//                       <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Security Footer Note */}
//             <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5 pt-2">
//               <ShieldCheck className="w-4 h-4 text-pink-500" />
//               <span>Your data is secure with us</span>
//             </p>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// // "use client"
// // import { useState } from "react";
// // import { useStore } from "@/store/useStore";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";
// // import { User, Package, Heart, Bell, Shield, ChevronRight, Camera, Edit3, Check } from "lucide-react";
// // import { useUserProfile } from "@/hooks/useProfile";
// // import SectionLoader from "@/components/loaders/SectionLoader";
// // import { useOrderStore } from "@/store/useOrderStore";
// // import { CurrentTab } from "@/components/profile/CurrentTab";

// //   const orderTabs = [
// //             { tab:'profile-info', icon: User, label: "Profile", active: true },
// //             { tab:'orders', icon: Package, label: "My Orders", count: 0},
// //             { tab:'wishlist', icon: Heart, label: "Wishlist" },
// //             { tab:'notifications', icon: Bell, label: "Notifications" },
// //           ]

// // const profilePage = ()=>{
// //   const { user, updateUser, orders, cart } = useStore();
// //     const [editing, setEditing] = useState(false);
// //     const [form, setForm] = useState(user);
// //     const [saved, setSaved] = useState(false);
// //     const {data,isLoading} = useUserProfile();
// //     const {setOrderTab,orderTab} = useOrderStore()
// //   return (
// //     <section className="mt-8 px-4">
// //       <h1 className="font-display text-3xl text-center font-bold text-gray-900 mb-8">My Profile</h1>

// //     <div className="flex  flex-col md:flex-row gap-6 ">
// //             {/* Sidebar */}
// //             <div className="space-y-3 flex-[0.3]">
// //               {orderTabs.map(({ icon: Icon,tab, label, count }) => (
// //                 <div
// //                   onClick={()=>setOrderTab(tab)}
// //                   className={`flex items-center cursor-pointer justify-between px-4 py-3 rounded-xl transition-colors ${orderTab === tab ? "bg-primary text-white" : "bg-white hover:bg-offwhite text-gray-700"}`}
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <Icon size={18} />
// //                     <span className="text-sm font-medium">{label}</span>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     {count !== undefined && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${orderTab === tab ? "bg-white/20" : "bg-mint text-teal"}`}>{count}</span>}
// //                     <ChevronRight size={14} />
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
    
// //           {/* <CurrentTab/> */}
// //       {/* Profile Content */}
// //             <div className="flex-[0.7]">
// //               <CurrentTab/>
// //             </div>
// //           </div>
// //     </section>

// //   )
// // }


// // export default profilePage
// //             // <div className="md:col-span-2 space-y-5">
// //             //   {/* Avatar Card */}
// //             //   <div className="bg-white rounded-2xl p-6 shadow-sm">
// //             //      {
// //             //        isLoading ? <SectionLoader h={50} /> : <div className="flex items-center gap-5">
    
                  
// //             //       <div className="relative">
// //             //         <img src={user.avatar} alt={user2.name} className="w-20 h-20 rounded-full object-cover" />
// //             //         <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-teal rounded-full flex items-center justify-center shadow-md hover:bg-teal/90 transition-colors">
// //             //           <Camera size={13} className="text-white" />
// //             //         </button>
// //             //       </div>
// //             //       <div className="flex-1">
// //             //         <h2 className="font-display text-xl font-bold text-gray-900">{user2.name}</h2>
// //             //         <p className="text-sm text-gray-500">{user2.email}</p>
// //             //         <div className="flex gap-4 mt-2">
// //             //           <div className="text-center"><p className="font-bold text-gray-900 text-sm">{orders.length}</p><p className="text-xs text-gray-400">Orders</p></div>
// //             //           <div className="text-center"><p className="font-bold text-gray-900 text-sm">{cart.length}</p><p className="text-xs text-gray-400">In Cart</p></div>
// //             //         </div>
// //             //       </div>
// //             //       <button
// //             //         onClick={() => editing ? handleSave() : setEditing(true)}
// //             //         className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${editing ? "bg-teal text-white" : "bg-offwhite hover:bg-mint text-gray-700"}`}
// //             //       >
// //             //         {editing ? <><Check size={14} /> Save</> : <><Edit3 size={14} /> Edit</>}
// //             //       </button>
// //             //     </div>
// //             //      }
// //             //     {saved && <p className="text-teal text-sm font-medium mt-3 text-center">✓ Profile updated successfully!</p>}
// //             //   </div>
    
// //             //   {/* Personal Info */}
// //             //   <div className="bg-white rounded-2xl p-6 shadow-sm">
// //             //     <h3 className="font-semibold text-gray-900 mb-5">Personal Information</h3>
// //             //     <div className="grid grid-cols-2 gap-5">
// //             //       <Field label="Full Name" field="name" />
// //             //       <Field label="Email" field="email" type="email" />
// //             //       <Field label="Phone" field="phone" />
// //             //       <Field label="City" field="city" />
// //             //       <div className="col-span-2"><Field label="Address" field="address" /></div>
// //             //       <Field label="Country" field="country" />
// //             //     </div>
// //             //   </div>
    
// //             //   {/* Recent Orders Preview */}
// //             //   <div className="bg-white rounded-2xl p-6 shadow-sm">
// //             //     <div className="flex items-center justify-between mb-4">
// //             //       <h3 className="font-semibold text-gray-900">Recent Orders</h3>
// //             //       <Link href="/orders" className="text-sm text-teal font-medium hover:underline">View All</Link>
// //             //     </div>
// //             //     {orders.slice(0, 2).map((order) => (
// //             //       <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
// //             //         <div>
// //             //           <p className="text-sm font-medium text-gray-900">{order.id}</p>
// //             //           <p className="text-xs text-gray-400">{order.date}</p>
// //             //         </div>
// //             //         <div className="text-right">
// //             //           <p className="font-semibold text-gray-900">${order.total}</p>
// //             //           <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === "delivered" ? "bg-mint text-teal" : order.status === "shipped" ? "bg-blue-50 text-blue-600" : "bg-yellow-50 text-yellow-600"}`}>
// //             //             {order.status}
// //             //           </span>
// //             //         </div>
// //             //       </div>
// //             //     ))}
// //             //   </div>
// //             // </div>






// // // "use client";
// // // import { useState } from "react";
// // // import { useStore } from "@/store/useStore";
// // // import { useRouter } from "next/navigation";
// // // import Link from "next/link";
// // // import { User, Package, Heart, Bell, Shield, ChevronRight, Camera, Edit3, Check } from "lucide-react";
// // // import { useUserProfile } from "@/hooks/useProfile";
// // // import SectionLoader from "@/components/loaders/SectionLoader";
// // // import { useOrderStore } from "@/store/useOrderStore";
// // // import { CurrentTab } from "@/components/profile/CurrentTab";

// // // export default function ProfilePage() {
// // //   const { user, updateUser, orders, cart } = useStore();
// // //   const [editing, setEditing] = useState(false);
// // //   const [form, setForm] = useState(user);
// // //   const [saved, setSaved] = useState(false);
// // //   const {data,isLoading} = useUserProfile();
// // //   const {setOrderTab,orderTab} = useOrderStore()

// // //   const handleSave = () => {
// // //     updateUser(form);
// // //     setEditing(false);
// // //     setSaved(true);
// // //     setTimeout(() => setSaved(false), 2000);
// // //   };

// // //   const user2 = {...data?.user,city:'Lagos',address:'No 1, street',country:'Nigeria'};

// // //   const orderTabs = [
// // //             { tab:'profile-infor', icon: User, label: "Profile", href: "/profile", active: true },
// // //             { tab:'orders', icon: Package, label: "My Orders", href: "/orders", count: orders.length },
// // //             { tab:'wishlist', icon: Heart, label: "Wishlist", href: "#" },
// // //             { tab:'notifications', icon: Bell, label: "Notifications", href: "#" },
// // //           ]

// // //   const Field = ({ label, field, type = "text" }: { label: string; field: keyof typeof form; type?: string }) => (
// // //     <div>
// // //       <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
// // //       {editing ? (
// // //         <input
// // //           type={type}
// // //           value={form[field]}
// // //           onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
// // //           className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal/30"
// // //         />
// // //       ) : (
// // //         isLoading ? <div className="h-8 bg-gray-100 rounded w-full animate-pulse" /> : <p className="text-sm text-gray-900">{user2[field]}</p>
// // //       )}
// // //     </div>
// // //   );

// // //   return (
// // //     <main className="  px-4 sm:px-6 py-10">
// // //       <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">My Account</h1>

// // //       <div className="grid md:grid-cols-3 gap-6">
// // //         {/* Sidebar */}
// // //         <div className="space-y-3">
// // //           {orderTabs.map(({ icon: Icon,tab, label, count }) => (
// // //             <div
// // //               onClick={()=>setOrderTab(tab)}
// // //               className={`flex items-center cursor-pointer justify-between px-4 py-3 rounded-xl transition-colors ${orderTab === tab ? "bg-primary text-white" : "bg-white hover:bg-offwhite text-gray-700"}`}
// // //             >
// // //               <div className="flex items-center gap-3">
// // //                 <Icon size={18} />
// // //                 <span className="text-sm font-medium">{label}</span>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 {count !== undefined && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${orderTab === tab ? "bg-white/20" : "bg-mint text-teal"}`}>{count}</span>}
// // //                 <ChevronRight size={14} />
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //       {/* <CurrentTab/> */}
// // //   {/* Profile Content */}
// // //         <div className="md:col-span-2 space-y-5">
// // //           {/* Avatar Card */}
// // //           <div className="bg-white rounded-2xl p-6 shadow-sm">
// // //              {
// // //                isLoading ? <SectionLoader h={50} /> : <div className="flex items-center gap-5">

              
// // //               <div className="relative">
// // //                 <img src={user.avatar} alt={user2.name} className="w-20 h-20 rounded-full object-cover" />
// // //                 <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-teal rounded-full flex items-center justify-center shadow-md hover:bg-teal/90 transition-colors">
// // //                   <Camera size={13} className="text-white" />
// // //                 </button>
// // //               </div>
// // //               <div className="flex-1">
// // //                 <h2 className="font-display text-xl font-bold text-gray-900">{user2.name}</h2>
// // //                 <p className="text-sm text-gray-500">{user2.email}</p>
// // //                 <div className="flex gap-4 mt-2">
// // //                   <div className="text-center"><p className="font-bold text-gray-900 text-sm">{orders.length}</p><p className="text-xs text-gray-400">Orders</p></div>
// // //                   <div className="text-center"><p className="font-bold text-gray-900 text-sm">{cart.length}</p><p className="text-xs text-gray-400">In Cart</p></div>
// // //                 </div>
// // //               </div>
// // //               <button
// // //                 onClick={() => editing ? handleSave() : setEditing(true)}
// // //                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${editing ? "bg-teal text-white" : "bg-offwhite hover:bg-mint text-gray-700"}`}
// // //               >
// // //                 {editing ? <><Check size={14} /> Save</> : <><Edit3 size={14} /> Edit</>}
// // //               </button>
// // //             </div>
// // //              }
// // //             {saved && <p className="text-teal text-sm font-medium mt-3 text-center">✓ Profile updated successfully!</p>}
// // //           </div>

// // //           {/* Personal Info */}
// // //           <div className="bg-white rounded-2xl p-6 shadow-sm">
// // //             <h3 className="font-semibold text-gray-900 mb-5">Personal Information</h3>
// // //             <div className="grid grid-cols-2 gap-5">
// // //               <Field label="Full Name" field="name" />
// // //               <Field label="Email" field="email" type="email" />
// // //               <Field label="Phone" field="phone" />
// // //               <Field label="City" field="city" />
// // //               <div className="col-span-2"><Field label="Address" field="address" /></div>
// // //               <Field label="Country" field="country" />
// // //             </div>
// // //           </div>

// // //           {/* Recent Orders Preview */}
// // //           <div className="bg-white rounded-2xl p-6 shadow-sm">
// // //             <div className="flex items-center justify-between mb-4">
// // //               <h3 className="font-semibold text-gray-900">Recent Orders</h3>
// // //               <Link href="/orders" className="text-sm text-teal font-medium hover:underline">View All</Link>
// // //             </div>
// //             // {orders.slice(0, 2).map((order) => (
// //             //   <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
// //             //     <div>
// //             //       <p className="text-sm font-medium text-gray-900">{order.id}</p>
// //             //       <p className="text-xs text-gray-400">{order.date}</p>
// //             //     </div>
// //             //     <div className="text-right">
// //             //       <p className="font-semibold text-gray-900">${order.total}</p>
// //             //       <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === "delivered" ? "bg-mint text-teal" : order.status === "shipped" ? "bg-blue-50 text-blue-600" : "bg-yellow-50 text-yellow-600"}`}>
// //             //         {order.status}
// //             //       </span>
// //             //     </div>
// //             //   </div>
// //             // ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </main>
// // //   );
// // // }



// ==== orders


// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import {
//   Search,
//   User,
//   ShoppingBag,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   Bell,
//   LogOut,
//   Package,
//   ShieldCheck,
// } from "lucide-react";

// interface OrderItem {
//   image: string;
//   name: string;
// }

// interface Order {
//   id: string;
//   orderNumber: string;
//   date: string;
//   itemsCount: number;
//   totalAmount: number;
//   status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
//   itemsSummary: string;
//   images: string[];
//   extraItemsCount?: number;
// }

// const mockOrders: Order[] = [
//   {
//     id: "1",
//     orderNumber: "BELZ-54839",
//     date: "May 12, 2024",
//     itemsCount: 5,
//     totalAmount: 45500,
//     status: "Delivered",
//     itemsSummary: "Glow Face Serum, Brightening Face Cream...",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
//     ],
//     extraItemsCount: 2,
//   },
//   {
//     id: "2",
//     orderNumber: "BELZ-54812",
//     date: "May 05, 2024",
//     itemsCount: 2,
//     totalAmount: 32000,
//     status: "Shipped",
//     itemsSummary: "Miss Belleza Eau De Parfum, Hydrating Toner",
//     images: [
//       "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
//     ],
//     extraItemsCount: 1,
//   },
//   {
//     id: "3",
//     orderNumber: "BELZ-54780",
//     date: "Apr 28, 2024",
//     itemsCount: 1,
//     totalAmount: 12000,
//     status: "Processing",
//     itemsSummary: "Brightening Face Cream",
//     images: [
//       "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=200&auto=format&fit=crop",
//     ],
//   },
//   {
//     id: "4",
//     orderNumber: "BELZ-54711",
//     date: "Apr 12, 2024",
//     itemsCount: 3,
//     totalAmount: 28500,
//     status: "Delivered",
//     itemsSummary: "Hydrating Cleanser, Lip Glow Balm...",
//     images: [
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=200&auto=format&fit=crop",
//     ],
//     extraItemsCount: 1,
//   },
//   {
//     id: "5",
//     orderNumber: "BELZ-54673",
//     date: "Mar 30, 2024",
//     itemsCount: 4,
//     totalAmount: 41000,
//     status: "Delivered",
//     itemsSummary: "Daily Sunscreen, Niacinamide Serum...",
//     images: [
//       "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
//     ],
//     extraItemsCount: 2,
//   },
//   {
//     id: "6",
//     orderNumber: "BELZ-54602",
//     date: "Mar 15, 2024",
//     itemsCount: 2,
//     totalAmount: 18000,
//     status: "Cancelled",
//     itemsSummary: "Rose Water Toner, Peel Off Mask",
//     images: [
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=200&auto=format&fit=crop",
//     ],
//   },
// ];

// export default function OrdersPage() {
//   const [activeTab, setActiveTab] = useState("All Orders");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("Most Recent");
//   const [currentPage, setCurrentPage] = useState(1);

//   const getStatusBadge = (status: Order["status"]) => {
//     switch (status) {
//       case "Delivered":
//         return (
//           <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 flex items-center gap-1.5">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
//             Delivered
//           </span>
//         );
//       case "Shipped":
//         return (
//           <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 flex items-center gap-1.5">
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
//             Shipped
//           </span>
//         );
//       case "Processing":
//         return (
//           <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-600 flex items-center gap-1.5">
//             <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
//             Processing
//           </span>
//         );
//       case "Cancelled":
//         return (
//           <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-500 flex items-center gap-1.5">
//             <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
//             Cancelled
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   const filteredOrders = mockOrders.filter((order) => {
//     if (activeTab === "Processing") return order.status === "Processing";
//     if (activeTab === "Shipped") return order.status === "Shipped";
//     if (activeTab === "Delivered") return order.status === "Delivered";
//     if (activeTab === "Cancelled") return order.status === "Cancelled";
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans">
   
//       {/* Main Container */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
//         {/* Breadcrumb Navigation */}
//         <nav className="flex items-center gap-2 text-xs text-gray-500">
//           <a href="#" className="hover:underline">Home</a>
//           <span>&gt;</span>
//           <a href="#" className="hover:underline">Account</a>
//           <span>&gt;</span>
//           <span className="text-pink-500 font-medium">My Orders</span>
//         </nav>

//         {/* Layout Grid: Sidebar Navigation + Main Orders List */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* Left Sidebar Navigation */}
//           <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 space-y-8 shadow-sm">
//             {/* User Profile Summary */}
//             <div className="text-center space-y-3">
//               <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-pink-100 ring-4 ring-pink-50">
//                 <Image
//                   src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
//                   alt="Amaka Johnson"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div>
//                 <h3 className="text-base font-bold text-gray-900">Amaka Johnson</h3>
//                 <p className="text-xs text-gray-400">amaka.johnson@email.com</p>
//               </div>
//             </div>

//             {/* Sidebar Navigation Menu */}
//             <nav className="space-y-1 text-xs font-semibold">
//               <a
//                 href="#"
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 <User className="w-4 h-4" />
//                 <span>Profile</span>
//               </a>

//               <a
//                 href="#"
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-50 text-pink-500 font-bold transition-colors"
//               >
//                 <Package className="w-4 h-4 text-pink-500" />
//                 <span>My Orders</span>
//               </a>

//               <a
//                 href="#"
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 <Heart className="w-4 h-4" />
//                 <span>Wishlist</span>
//               </a>

//               <a
//                 href="#"
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 <Bell className="w-4 h-4" />
//                 <span>Notifications</span>
//               </a>
//             </nav>

//             <div className="border-t border-gray-100 pt-4">
//               <button className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-gray-500 hover:text-rose-500 transition-colors w-full">
//                 <LogOut className="w-4 h-4" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </aside>

//           {/* Right Main Content Panel */}
//           <section className="lg:col-span-9 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 shadow-sm">
            
//             {/* Header & Continue Shopping CTA */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
//                 <p className="text-xs text-gray-400 mt-1">Track, manage and view all your orders</p>
//               </div>
//               <button className="px-4 py-2 border border-pink-500 text-pink-500 text-xs font-semibold rounded-xl hover:bg-pink-50 transition-colors w-fit">
//                 Continue Shopping
//               </button>
//             </div>

//             {/* Search Input Bar */}
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search orders by order number or product..."
//                 className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-pink-500 transition-colors"
//               />
//             </div>

//             {/* Filter Tabs & Sort By Dropdown */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
//               {/* Category Status Tabs */}
//               <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
//                 {[
//                   { name: "All Orders", count: 8 },
//                   { name: "Processing", count: 1 },
//                   { name: "Shipped", count: 2 },
//                   { name: "Delivered", count: 4 },
//                   { name: "Cancelled", count: 1 },
//                 ].map((tab) => {
//                   const isActive = activeTab === tab.name;
//                   return (
//                     <button
//                       key={tab.name}
//                       onClick={() => setActiveTab(tab.name)}
//                       className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
//                         isActive
//                           ? "bg-pink-500 text-white"
//                           : "bg-gray-100/70 text-gray-600 hover:bg-gray-100"
//                       }`}
//                     >
//                       <span>{tab.name}</span>
//                       <span
//                         className={`px-1.5 py-0.2 rounded-full text-[10px] ${
//                           isActive
//                             ? "bg-white/20 text-white"
//                             : "bg-gray-200/80 text-gray-600"
//                         }`}
//                       >
//                         {tab.count}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Sort Dropdown */}
//               <div className="flex items-center gap-2 text-xs shrink-0">
//                 <span className="text-gray-400">Sort by:</span>
//                 <div className="relative">
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-gray-800 focus:outline-none focus:border-pink-500 appearance-none cursor-pointer"
//                   >
//                     <option value="Most Recent">Most Recent</option>
//                     <option value="Oldest">Oldest</option>
//                     <option value="Highest Amount">Highest Amount</option>
//                   </select>
//                   <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Orders Cards List */}
//             <div className="space-y-4">
//               {filteredOrders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 hover:border-gray-200 transition-colors shadow-xs"
//                 >
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
//                     {/* Left Side: Product Thumbnails & Order Meta Info */}
//                     <div className="flex items-start md:items-center gap-4">
//                       {/* Product Thumbnail Row */}
//                       <div className="flex items-center -space-x-2 shrink-0">
//                         {order.images.map((img, idx) => (
//                           <div
//                             key={idx}
//                             className="relative w-12 h-12 rounded-xl border-2 border-white overflow-hidden bg-pink-50/50"
//                           >
//                             <Image
//                               src={img}
//                               alt="Order Product Thumbnail"
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                         ))}
//                         {order.extraItemsCount && (
//                           <div className="w-12 h-12 rounded-xl border-2 border-white bg-pink-100 text-pink-500 font-bold text-xs flex items-center justify-center z-10">
//                             +{order.extraItemsCount}
//                           </div>
//                         )}
//                       </div>

//                       {/* Order Info */}
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-3">
//                           <h4 className="text-xs font-bold text-gray-900">
//                             Order #{order.orderNumber}
//                           </h4>
//                           {getStatusBadge(order.status)}
//                         </div>
//                         <p className="text-[11px] text-gray-400">
//                           Placed on {order.date} • {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
//                         </p>
//                         <p className="text-xs text-gray-500 line-clamp-1">
//                           {order.itemsSummary}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right Side: Total Price & View Details Action */}
//                     <div className="flex items-center md:flex-col justify-between md:items-end gap-2 border-t md:border-0 pt-3 md:pt-0 border-gray-100">
//                       <span className="text-sm font-bold text-gray-900">
//                         ₦{order.totalAmount.toLocaleString()}
//                       </span>
//                       <button className="px-4 py-1.5 border border-pink-500 text-pink-500 text-xs font-semibold rounded-xl hover:bg-pink-50 transition-colors">
//                         View Details
//                       </button>
//                     </div>

//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination Controls */}
//             <div className="flex items-center justify-center gap-2 pt-6">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((p) => p - 1)}
//                 className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40 hover:bg-gray-50"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>

//               <button
//                 onClick={() => setCurrentPage(1)}
//                 className={`w-8 h-8 rounded-lg text-xs font-bold ${
//                   currentPage === 1
//                     ? "bg-pink-500 text-white"
//                     : "border border-gray-200 text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 1
//               </button>

//               <button
//                 onClick={() => setCurrentPage(2)}
//                 className={`w-8 h-8 rounded-lg text-xs font-bold ${
//                   currentPage === 2
//                     ? "bg-pink-500 text-white"
//                     : "border border-gray-200 text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 2
//               </button>

//               <button
//                 onClick={() => setCurrentPage(3)}
//                 className={`w-8 h-8 rounded-lg text-xs font-bold ${
//                   currentPage === 3
//                     ? "bg-pink-500 text-white"
//                     : "border border-gray-200 text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 3
//               </button>

//               <span className="text-xs text-gray-400 px-1">...</span>

//               <button
//                 onClick={() => setCurrentPage(5)}
//                 className="w-8 h-8 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
//               >
//                 5
//               </button>

//               <button
//                 onClick={() => setCurrentPage((p) => p + 1)}
//                 className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>

//           </section>
//         </div>

//         {/* Bottom Security Footer Badge */}
//         <div className="flex items-center justify-center gap-2 py-4 text-xs text-gray-400">
//           <ShieldCheck className="w-4 h-4 text-emerald-500" />
//           <span>Your data is secure with us</span>
//         </div>

//       </main>
//     </div>
//   );
// }



// ===== Wishlist


"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  Heart,
  Bell,
  LogOut,
  Package,
  Share2,
  Trash2,
  ShieldCheck,
} from "lucide-react";

interface WishlistItem {
  id: string;
  name: string;
  size: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
}

const initialWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Glow Face Serum",
    size: "30ml",
    price: 15000,
    rating: 5,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Miss Belleza Eau De Parfum",
    size: "50ml",
    price: 20000,
    rating: 5,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Brightening Face Cream",
    size: "50ml",
    price: 12000,
    rating: 5,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Hydrating Toner",
    size: "120ml",
    price: 8500,
    rating: 5,
    reviewsCount: 74,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Lip Glow Balm",
    size: "15ml",
    price: 6000,
    rating: 5,
    reviewsCount: 57,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRemoveItem = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setWishlist([]);
  };

  const filteredItems = wishlist.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans">
     
      {/* Main Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">Home</a>
          <span>&gt;</span>
          <a href="#" className="hover:underline">Account</a>
          <span>&gt;</span>
          <span className="text-pink-500 font-medium">Wishlist</span>
        </nav>

        {/* Layout Grid: Account Sidebar + Main Wishlist Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Account Left Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 space-y-8 shadow-sm">
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
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-50 text-pink-500 font-bold transition-colors"
              >
                <Heart className="w-4 h-4 text-pink-500" />
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

          {/* Right Main Content Area */}
          <section className="lg:col-span-9 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 shadow-sm">
            
            {/* Top Bar Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-xs text-gray-400 mt-1">
                  Items you love. Don&apos;t lose track.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search Wishlist Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search wishlist"
                    className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                {/* Share Wishlist CTA */}
                <button className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>

                {/* Clear All CTA */}
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 border border-pink-200 text-pink-500 text-xs font-semibold rounded-xl hover:bg-pink-50 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-medium">
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
            </p>

            {/* Wishlist Items Product Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {filteredItems.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-gray-100 p-3 space-y-3 relative group hover:shadow-sm transition-shadow"
                  >
                    {/* Active Heart Badge Button */}
                    <button
                      onClick={() => handleRemoveItem(product.id)}
                      className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-pink-500 shadow-xs hover:bg-pink-50 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Heart className="w-4 h-4 fill-pink-500" />
                    </button>

                    {/* Product Image */}
                    <div className="relative w-full h-36 rounded-xl overflow-hidden bg-pink-50/40">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-[10px] text-gray-400">{product.size}</p>
                      
                      <div className="pt-0.5">
                        <span className="text-xs font-bold text-gray-900">
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 pt-0.5">
                        <div className="flex items-center text-amber-400">
                          {"★".repeat(product.rating)}
                        </div>
                        <span>({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Add to Cart CTA */}
                    <button className="w-full py-2 border border-pink-500 text-pink-500 text-xs font-semibold rounded-xl hover:bg-pink-50 transition-colors flex items-center justify-center gap-1.5">
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mx-auto">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-800">Your Wishlist is Empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Explore our products and save your favorite skincare essentials here!
                </p>
              </div>
            )}

          </section>
        </div>

      </main>
    </div>
  );
}


// ==== notification



// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import {
//   Search,
//   User,
//   ShoppingBag,
//   ChevronDown,
//   Heart,
//   Bell,
//   LogOut,
//   Package,
//   CheckCircle2,
//   Tag,
//   Sparkles,
//   Lock,
//   Gift,
//   ShieldCheck,
// } from "lucide-react";

// interface NotificationItem {
//   id: string;
//   type: "order" | "offer" | "new_arrival" | "wishlist_sale" | "security" | "rewards";
//   text: string;
//   date: string;
//   isUnread: boolean;
// }

// const initialNotifications: NotificationItem[] = [
//   {
//     id: "1",
//     type: "order",
//     text: "Your order #BELZ-54839 has been delivered successfully. We hope you love your purchase!",
//     date: "May 12, 2024 • 10:30 AM",
//     isUnread: true,
//   },
//   {
//     id: "2",
//     type: "offer",
//     text: "Exclusive offer! Get 20% off on your next purchase. Use code: BELLEZA20 • Valid till May 20, 2024",
//     date: "May 10, 2024 • 09:15 AM",
//     isUnread: true,
//   },
//   {
//     id: "3",
//     type: "new_arrival",
//     text: "New arrival alert! Check out our latest skincare collection.",
//     date: "May 08, 2024 • 04:45 PM",
//     isUnread: true,
//   },
//   {
//     id: "4",
//     type: "wishlist_sale",
//     text: "Item in your wishlist is now on sale! Glow Face Serum is now 15% off.",
//     date: "May 06, 2024 • 11:20 AM",
//     isUnread: false,
//   },
//   {
//     id: "5",
//     type: "security",
//     text: "Password changed successfully. Your password was updated on May 05, 2024 at 08:40 PM.",
//     date: "May 05, 2024 • 08:40 PM",
//     isUnread: false,
//   },
//   {
//     id: "6",
//     type: "rewards",
//     text: "Thank you for being with us! We've added 100 reward points to your account.",
//     date: "May 04, 2024 • 06:30 PM",
//     isUnread: false,
//   },
// ];

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

//   const handleMarkAllRead = () => {
//     setNotifications((prev) =>
//       prev.map((item) => ({ ...item, isUnread: false }))
//     );
//   };

//   const renderIcon = (type: NotificationItem["type"]) => {
//     switch (type) {
//       case "order":
//         return <Package className="w-4 h-4 text-pink-500" />;
//       case "offer":
//         return <Tag className="w-4 h-4 text-pink-500" />;
//       case "new_arrival":
//         return <Sparkles className="w-4 h-4 text-pink-500" />;
//       case "wishlist_sale":
//         return <Heart className="w-4 h-4 text-pink-500" />;
//       case "security":
//         return <Lock className="w-4 h-4 text-pink-500" />;
//       case "rewards":
//         return <Gift className="w-4 h-4 text-pink-500" />;
//       default:
//         return <Bell className="w-4 h-4 text-pink-500" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans">
  
//       {/* Main Layout Container */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
//         {/* Breadcrumb Navigation */}
//         <nav className="flex items-center gap-2 text-xs text-gray-500">
//           <a href="#" className="hover:underline">Home</a>
//           <span>&gt;</span>
//           <a href="#" className="hover:underline">Account</a>
//           <span>&gt;</span>
//           <span className="text-pink-500 font-medium">Notifications</span>
//         </nav>

//         {/* Layout Grid: Account Sidebar + Main Notifications Panel */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* Account Left Sidebar */}
//           <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 space-y-8 shadow-sm">
//             <div className="text-center space-y-3">
//               <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-pink-100 ring-4 ring-pink-50">
//                 <Image
//                   src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
//                   alt="Amaka Johnson"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div>
//                 <h3 className="text-base font-bold text-gray-900">Amaka Johnson</h3>
//                 <p className="text-xs text-gray-400">amaka.johnson@email.com</p>
//               </div>
//             </div>

//             <nav className="space-y-1 text-xs font-semibold">
//               <a
//                 href="#"
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 <User className="w-4 h-4" />
//                 <span>Profile</span>
//               </a>

//               <a
//                 href="#"
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 <Package className="w-4 h-4" />
//                 <span>My Orders</span>
//               </a>

//               <a
//                 href="#"
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 <Heart className="w-4 h-4" />
//                 <span>Wishlist</span>
//               </a>

//               <a
//                 href="#"
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-50 text-pink-500 font-bold transition-colors"
//               >
//                 <Bell className="w-4 h-4 text-pink-500" />
//                 <span>Notifications</span>
//               </a>
//             </nav>

//             <div className="border-t border-gray-100 pt-4">
//               <button className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-gray-500 hover:text-rose-500 transition-colors w-full">
//                 <LogOut className="w-4 h-4" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </aside>

//           {/* Right Main Content Panel */}
//           <section className="lg:col-span-9 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 shadow-sm">
            
//             {/* Header & Mark All as Read CTA */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Stay updated with your recent activity and offers.
//                 </p>
//               </div>

//               <button
//                 onClick={handleMarkAllRead}
//                 className="text-xs font-semibold text-pink-500 hover:underline flex items-center gap-1.5 self-start sm:self-auto"
//               >
//                 <CheckCircle2 className="w-3.5 h-3.5" />
//                 <span>Mark all as read</span>
//               </button>
//             </div>

//             {/* Notifications List */}
//             <div className="space-y-3">
//               {notifications.map((item) => (
//                 <div
//                   key={item.id}
//                   className="p-4 rounded-2xl border border-gray-100/80 bg-white hover:bg-gray-50/50 transition-colors flex items-start justify-between gap-4"
//                 >
//                   <div className="flex items-start gap-3.5">
//                     {/* Pink Icon Box */}
//                     <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center shrink-0 mt-0.5">
//                       {renderIcon(item.type)}
//                     </div>

//                     {/* Content Text */}
//                     <div className="space-y-1">
//                       <p className="text-xs font-medium text-gray-800 leading-relaxed">
//                         {item.text}
//                       </p>
//                       <p className="text-[11px] text-gray-400 font-normal">
//                         {item.date}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Red/Pink Unread Indicator Dot */}
//                   {item.isUnread && (
//                     <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0 mt-2" />
//                   )}
//                 </div>
//               ))}
//             </div>

//           </section>
//         </div>

//       </main>
//     </div>
//   );
// }