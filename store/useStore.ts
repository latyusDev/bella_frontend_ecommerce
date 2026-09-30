"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Review } from "@/lib/data";
import { Product } from "@/components/product/ProductCard";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedImage: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered";
  date: string;
  address: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  country: string;
};

type StoreState = {
  cart: CartItem[];
  orders: Order[];
  user: UserProfile;
  totalCartItem:number
  cartCount:number|string
  productRatings: Record<string, { rating: number; review: string }>;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setSelectedImage: (productId: number, imageIndex: number) => void;
  placeOrder: () => void;
  setTotalCartItem:(totalCartItem:number)=>void
  setCartCount:(cartCount:number)=>void
  updateUser: (user: Partial<UserProfile>) => void;
  rateProduct: (productId: number, rating: number, review: string) => void;
  getTotalItems: () => number;
  getCartTotal: () => number;
};

export const useStore = create<StoreState>()(
    (set, get) => ({
      cart: [],
      cartCount:0,
      setCartCount:(cartCount:number)=>{
        set({cartCount})
      },
      totalCartItem:0,
      setTotalCartItem:(totalCartItem:number)=>set({totalCartItem}),
      orders: [
        {
          id: "ORD-2024-001",
          items: [],
          total: 134,
          status: "delivered",
          date: "2024-10-15",
          address: "12 Victoria Island, Lagos",
        },
      ],
      user: {
        name: "Amaka Okonkwo",
        email: "amaka@email.com",
        phone: "+234 801 234 5678",
        avatar: "https://i.pravatar.cc/120?img=1",
        address: "12 Victoria Island",
        city: "Lagos",
        country: "Nigeria",
      },
      productRatings: {},

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1, selectedImage: 0 }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>{
        const cart = get().cart
        console.log(cart)
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((i) => i.product.id !== productId)
              : state.cart.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i
                ),
        }))
      }
        ,

      clearCart: () => set({ cart: [] }),

      setSelectedImage: (productId, imageIndex) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.product.id === productId ? { ...i, selectedImage: imageIndex } : i
          ),
        })),

      placeOrder: () =>
        set((state) => {
          if (state.cart.length === 0) return {};
          const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            items: [...state.cart],
            total: get().getCartTotal(),
            status: "processing",
            date: new Date().toISOString().split("T")[0],
            address: `${state.user.address}, ${state.user.city}`,
          };
          return {
            orders: [newOrder, ...state.orders],
            cart: [],
          };
        }),

      updateUser: (userData) =>
        set((state) => ({ user: { ...state.user, ...userData } })),

      rateProduct: (productId, rating, review) =>
        set((state) => ({
          productRatings: {
            ...state.productRatings,
            [productId]: { rating, review },
          },
        })),

      getTotalItems: () => get().cart.reduce((s, i) => s + i.quantity, 0),
      getCartTotal: () =>
        get().cart.reduce((s, i) => s + i.product.price * i.quantity, 0),
    })
);
// "use client";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { Review } from "@/lib/data";
// import { Product } from "@/components/product/ProductCard";

// export type CartItem = {
//   product: Product;
//   quantity: number;
//   selectedImage: number;
// };

// export type Order = {
//   id: string;
//   items: CartItem[];
//   total: number;
//   status: "processing" | "shipped" | "delivered";
//   date: string;
//   address: string;
// };

// export type UserProfile = {
//   name: string;
//   email: string;
//   phone: string;
//   avatar: string;
//   address: string;
//   city: string;
//   country: string;
// };

// type StoreState = {
//   cart: CartItem[];
//   orders: Order[];
//   user: UserProfile;
//   totalCartItem:number
//   cartCount:number
//   productRatings: Record<string, { rating: number; review: string }>;

//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
//   clearCart: () => void;
//   setSelectedImage: (productId: number, imageIndex: number) => void;
//   placeOrder: () => void;
//   setTotalCartItem:(totalCartItem:number)=>void
//   setCartCount:(cartCount:number)=>void
//   updateUser: (user: Partial<UserProfile>) => void;
//   rateProduct: (productId: number, rating: number, review: string) => void;
//   getTotalItems: () => number;
//   getCartTotal: () => number;
// };

// export const useStore = create<StoreState>()(
//   persist(
//     (set, get) => ({
//       cart: [],
//       cartCount:0,
//       setCartCount:(cartCount:number)=>{
//         set({cartCount})
//       },
//       totalCartItem:0,
//       setTotalCartItem:(totalCartItem:number)=>set({totalCartItem}),
//       orders: [
//         {
//           id: "ORD-2024-001",
//           items: [],
//           total: 134,
//           status: "delivered",
//           date: "2024-10-15",
//           address: "12 Victoria Island, Lagos",
//         },
//       ],
//       user: {
//         name: "Amaka Okonkwo",
//         email: "amaka@email.com",
//         phone: "+234 801 234 5678",
//         avatar: "https://i.pravatar.cc/120?img=1",
//         address: "12 Victoria Island",
//         city: "Lagos",
//         country: "Nigeria",
//       },
//       productRatings: {},

//       addToCart: (product) =>
//         set((state) => {
//           const existing = state.cart.find((i) => i.product.id === product.id);
//           if (existing) {
//             return {
//               cart: state.cart.map((i) =>
//                 i.product.id === product.id
//                   ? { ...i, quantity: i.quantity + 1 }
//                   : i
//               ),
//             };
//           }
//           return { cart: [...state.cart, { product, quantity: 1, selectedImage: 0 }] };
//         }),

//       removeFromCart: (productId) =>
//         set((state) => ({
//           cart: state.cart.filter((i) => i.product.id !== productId),
//         })),

//       updateQuantity: (productId, quantity) =>{
//         const cart = get().cart
//         console.log(cart)
//         set((state) => ({
//           cart:
//             quantity <= 0
//               ? state.cart.filter((i) => i.product.id !== productId)
//               : state.cart.map((i) =>
//                   i.product.id === productId ? { ...i, quantity } : i
//                 ),
//         }))
//       }
//         ,

//       clearCart: () => set({ cart: [] }),

//       setSelectedImage: (productId, imageIndex) =>
//         set((state) => ({
//           cart: state.cart.map((i) =>
//             i.product.id === productId ? { ...i, selectedImage: imageIndex } : i
//           ),
//         })),

//       placeOrder: () =>
//         set((state) => {
//           if (state.cart.length === 0) return {};
//           const newOrder: Order = {
//             id: `ORD-${Date.now()}`,
//             items: [...state.cart],
//             total: get().getCartTotal(),
//             status: "processing",
//             date: new Date().toISOString().split("T")[0],
//             address: `${state.user.address}, ${state.user.city}`,
//           };
//           return {
//             orders: [newOrder, ...state.orders],
//             cart: [],
//           };
//         }),

//       updateUser: (userData) =>
//         set((state) => ({ user: { ...state.user, ...userData } })),

//       rateProduct: (productId, rating, review) =>
//         set((state) => ({
//           productRatings: {
//             ...state.productRatings,
//             [productId]: { rating, review },
//           },
//         })),

//       getTotalItems: () => get().cart.reduce((s, i) => s + i.quantity, 0),
//       getCartTotal: () =>
//         get().cart.reduce((s, i) => s + i.product.price * i.quantity, 0),
//     }),
//     {
//       name: "lumiere-store",
//     }
//   )
// );
