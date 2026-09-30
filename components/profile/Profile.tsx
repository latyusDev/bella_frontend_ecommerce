"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Package, Heart, Bell, Shield, ChevronRight, Camera, Edit3, Check } from "lucide-react";
import { useUserProfile } from "@/hooks/useProfile";
import SectionLoader from "@/components/loaders/SectionLoader";
import { useOrderStore } from "@/store/useOrderStore";
import { CurrentTab } from "@/components/profile/CurrentTab";

export  function Profile ({isLoading,user}:any) {
//   const { user, updateUser, orders, cart } = useStore();
  const {updateUser, orders, cart } = useStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  const [saved, setSaved] = useState(false);
//   const {data,isLoading} = useUserProfile();
  const {setOrderTab,orderTab} = useOrderStore()

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const user2 = {...user,city:'Lagos',address:'No 1, street',country:'Nigeria'};

//   const orderTabs = [
//             { tab:'profile-infor', icon: User, label: "Profile", href: "/profile", active: true },
//             { tab:'orders', icon: Package, label: "My Orders", href: "/orders", count: orders.length },
//             { tab:'wishlist', icon: Heart, label: "Wishlist", href: "#" },
//             { tab:'notifications', icon: Bell, label: "Notifications", href: "#" },
//           ]

  const Field = ({ label, field, type = "text" }: { label: string; field: keyof typeof form; type?: string }) => (
    <div>
      <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
      {editing ? (
        <input
          type={type}
          value={form[field]}
          onChange={(e) => setForm((prev:any) => ({ ...prev, [field]: e.target.value }))}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal/30"
        />
      ) : (
        isLoading ? <div className="h-8 bg-gray-100 rounded w-full animate-pulse" /> : <p className="text-sm text-gray-900">{user2[field]}</p>
      )}
    </div>
  );

  return (
    <main className="  px-4 sm:px-6 py-10 w-full">

      
   <div className="md:col-span-2 space-y-5">
              {/* Avatar Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                 {
                   isLoading ? <SectionLoader h={50} /> : <div className="flex items-center gap-5">
    
                  
                  <div className="relative">
                    <img src={user.avatar} alt={user2.name} className="w-20 h-20 rounded-full object-cover" />
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-teal rounded-full flex items-center justify-center shadow-md hover:bg-teal/90 transition-colors">
                      <Camera size={13} className="text-white" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-bold text-gray-900">{user2.name}</h2>
                    <p className="text-sm text-gray-500">{user2.email}</p>
                    <div className="flex gap-4 mt-2">
                      <div className="text-center"><p className="font-bold text-gray-900 text-sm">{orders.length}</p><p className="text-xs text-gray-400">Orders</p></div>
                      <div className="text-center"><p className="font-bold text-gray-900 text-sm">{cart.length}</p><p className="text-xs text-gray-400">In Cart</p></div>
                    </div>
                  </div>
                  <button
                    onClick={() => editing ? handleSave() : setEditing(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${editing ? "bg-teal text-white" : "bg-offwhite hover:bg-mint text-gray-700"}`}
                  >
                    {editing ? <><Check size={14} /> Save</> : <><Edit3 size={14} /> Edit</>}
                  </button>
                </div>
                 }
                {saved && <p className="text-teal text-sm font-medium mt-3 text-center">✓ Profile updated successfully!</p>}
              </div>
    
              {/* Personal Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-5">Personal Information</h3>
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Full Name" field="name" />
                  <Field label="Email" field="email" type="email" />
                  <Field label="Phone" field="phone" />
                  <Field label="City" field="city" />
                  <div className="col-span-2"><Field label="Address" field="address" /></div>
                  <Field label="Country" field="country" />
                </div>
              </div>
    
              {/* Recent Orders Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Recent Orders</h3>
                  <Link href="/orders" className="text-sm text-teal font-medium hover:underline">View All</Link>
                </div>
                {/* {orders.slice(0, 2).map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${order.total}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === "delivered" ? "bg-mint text-teal" : order.status === "shipped" ? "bg-blue-50 text-blue-600" : "bg-yellow-50 text-yellow-600"}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
    </main>
  );
}

