"use client";

import React, { useState } from "react";
import { useSingleProduct } from "@/hooks/useProduct";
import { useCart, useStoreCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Share2,
  Minus,
  Plus,
  ZoomIn,
  Truck,
  ShieldCheck,
  RotateCcw,
  Gift,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Star,
  Share,
  Share2Icon,
  View,
  Loader2,
  
} from "lucide-react";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/store/useStore";

// Types
interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

const productImages: ProductImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    alt: "Glow Face Serum Main View",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=800&auto=format&fit=crop",
    alt: "Glow Face Serum Dropper View",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    alt: "Glow Face Serum Texture View",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    alt: "Glow Face Serum Packaging",
  },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [uiState,setUiState] = useState<any>({
    expanded:false,
    selectedImg:0,
    added:false,
    imageId:0
  })
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "howToUse" | "ingredients" | "reviews">("description");
    const { id } = useParams();
  const [selectedImg, setSelectedImg] = useState(0);
  const [expanded, setExpanded] = useState(false);
  // const [uiState,setUiState] = useState<UiState>({
  //   expanded:false,
  //   selectedImg:0,
  //   added:false,
  //   imageId:0
  // })
  const [added, setAdded] = useState(false);
  const {setCartCount} = useStore();
  const {mutate:addToCart,isPending} = useStoreCart()
  // const related = products.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);
  const {data:cartItems} = useCart()
  console.log(cartItems,'cartItems')
  const checkProductInCart = cartItems?.cart?.items?.some(item=>item.product.id === Number(id))
  console.log(checkProductInCart,'bb')

  const productId:number = Number(id)
  const {data,error,isError,isLoading} = useSingleProduct(productId)
    const {data:cartData} = useCart();
    const cartCount = cartItems?.count;
  const queryClient = useQueryClient()
  const handleAdd = (e: React.MouseEvent,imageId:number) => {
    e.preventDefault();
    console.log(cartCount)
    // setTimeout(()=>{
     setCartCount(cartCount)
     localStorage.setItem('cartCount',cartCount)
     addToCart(
      {productId,quantity,imageId:imageId},
      {
        onSuccess:(response,_)=>{
          queryClient.invalidateQueries({queryKey:['carts']})
          toast.success('Item added to cart')
          console.log(response,'response')

        },
        onError:(error:any,context,f)=>{
          // toast.success(error?.data?.message)
          // console.log(error?.data?.message)
   
        }

      }
    );
  //  },1000)
    setUiState({...uiState,expanded:true});
  
  };
 

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === "increase" && quantity < 32) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 font-sans">

      {/* Main Content Container */}
      {
        isLoading ? 
          <h1>Loading...</h1>:
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
     

        {/* Product Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Featured Image Container */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-pink-50/30 border border-gray-100">
              <img
                src={data?.images[selectedImage]?.url}
                alt="Selected Product View"
                className="object-cover transition-all duration-300"
              />
              {/* <Image
                src={data?.images[selectedImage]?.url}
                alt="Selected Product View"
                fill
                className="object-cover transition-all duration-300"
                priority
              /> */}
              <button 
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-gray-700 transition-all"
                aria-label="Zoom image"
              >
                <Share2Icon className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Carousel / Grid */}
            <div className="relative flex items-center gap-3">
              <button className="p-1 rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-400">
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-4 gap-3 w-full">
                {data?.images.map((img:any,index:number) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-pink-500 ring-2 ring-pink-500/20"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={data?.name}
                      className="object-cover"
                    />
                    {/* <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    /> */}
                  </button>
                ))}
              </div>

              <button className="p-1 rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-400">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Product Details & Actions */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Badge & Title */}
            <div>
              {
                data?.best_seller && <span className="inline-block px-3 py-1 bg-pink-50 text-pink-500 text-xs font-semibold rounded-full mb-3">
                Best Seller
              </span>
              }
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {data?.name}
              </h1>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-pink-500 font-medium">(128 reviews)</span>
            </div>

            {/* Price Section */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-pink-500">₦{data?.price?.toLocaleString()}</span>
              {/* <span className="text-sm text-gray-400 line-through">₦18,000</span>
              <span className="text-xs font-semibold text-pink-500 bg-pink-50 px-2 py-0.5 rounded">
                You save ₦3,000 (17% OFF)
              </span> */}
            </div>

            {/* Short Description & Bullet Highlights */}
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {data?.description}
            </p>
            {/* <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              A powerful daily serum enriched with Vitamin C and Vitamin E to brighten, hydrate, and rejuvenate your skin. Helps reduce dark spots and brings out your natural glow.
            </p> */}

            {/* <ul className="mt-4 space-y-2 text-xs text-gray-600">
              {["Brightens dull skin", "Reduces dark spots & hyperpigmentation", "Hydrates & nourishes", "Suitable for all skin types"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul> */}

            <div className="my-6 border-t border-gray-100" />

            {/* Quantity Selector & Stock Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-pink-500">In Stock</span>
                <span className="text-gray-400">({data?.stock - quantity} items available)</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                {/* Quantity Controls */}
                <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-32 bg-gray-50/50">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="text-gray-500 cursor-pointer hover:text-pink-500 disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-sm">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="text-gray-500 cursor-pointer hover:text-pink-500"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart Button */}
                {
                  checkProductInCart ? <button  className="flex-1 cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 
                  rounded-xl shadow-lg shadow-pink-500/20 transition-all ">
                 <Link href={'/cart'} className='flex items-center justify-center gap-2' >
                     <View className="w-5 h-5" />
                  <span>View Cart</span>
                 </Link>
                </button>:
                <button onClick={(e) => handleAdd(e,data?.images[0].id)} className="flex-1 cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2">
                  {isPending?<Loader2 className="w-5 h-5 animate-pulse"/>:
                  <ShoppingBag className="w-5 h-5" />
                  }
                  <span> Add to Cart</span>
                </button>
                 
                }
              </div>
            </div>

            {/* Auxiliary Buttons */}
            <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
              <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                <Heart className="w-4 h-4" />
                <span>Add to Wishlist</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Feature Value Props Box */}
            <div className="grid grid-cols-3 gap-2 mt-8 p-4 bg-gray-50/80 rounded-xl border border-gray-100 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-5 h-5 text-pink-500" />
                <span className="text-[11px] font-semibold text-gray-800">Free Delivery</span>
                <span className="text-[10px] text-gray-400">On orders over ₦30,000</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-gray-200 px-2">
                <ShieldCheck className="w-5 h-5 text-pink-500" />
                <span className="text-[11px] font-semibold text-gray-800">100% Authentic</span>
                <span className="text-[10px] text-gray-400">Original products</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-5 h-5 text-pink-500" />
                <span className="text-[11px] font-semibold text-gray-800">Easy Returns</span>
                <span className="text-[10px] text-gray-400">7 days return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Tabbed Information Section */}
      </main>
      }
    </div>
  );
}

/* Backup */
// export default function ProductDetailPage() {
//   const [selectedImage, setSelectedImage] = useState<string>(productImages[0].src);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [activeTab, setActiveTab] = useState<"description" | "howToUse" | "ingredients" | "reviews">("description");
//     const { id } = useParams();
//   const [selectedImg, setSelectedImg] = useState(0);
  // const [expanded, setExpanded] = useState(false);
  // const [uiState,setUiState] = useState<UiState>({
  //   expanded:false,
  //   selectedImg:0,
  //   added:false,
  //   imageId:0
  // })
//   const [added, setAdded] = useState(false);
//   // const addToCart = useStore((s) => s.addToCart);
//   const {mutate:addToCart} = useStoreCart()
//   // const related = products.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

//   const productId:number = Number(id)
//   const {data,error,isError,isLoading} = useSingleProduct(productId)
  
//   console.log(data,'single product data')
//   const queryClient = useQueryClient()
//   const handleAdd = (e: React.MouseEvent,imageId:number) => {
//     // e.preventDefault();
//     // addToCart(
//     //   {productId,quantity:1,imageId:uiState.imageId},
//     //   {
//     //     // onSuccess:(response,_)=>{
//     //     //   queryClient.invalidateQueries({queryKey:['carts']})
//     //     //   // toast.success('Item added to cart')
//     //     //   console.log(response,'response')

//     //     // },
//     //     onError:(error:any,context,f)=>{
//     //       // toast.success(error?.data?.message)
//     //       // console.log(error?.data?.message)
//     //       console.log(error)
//     //       console.log(context,'context')
//     //       console.log(f,'context')

//     //     }

//     //   }
//     // );
//     // setUiState({...uiState,expanded:true});
  
//   };
 

//   const handleQuantityChange = (type: "increase" | "decrease") => {
//     if (type === "decrease" && quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     } else if (type === "increase" && quantity < 32) {
//       setQuantity((prev) => prev + 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 text-gray-800 font-sans">

//       {/* Main Content Container */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
     

//         {/* Product Section Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          
//           {/* Left Column: Image Gallery */}
//           <div className="lg:col-span-6 flex flex-col gap-4">
//             {/* Main Featured Image Container */}
//             <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-pink-50/30 border border-gray-100">
//               <Image
//                 src={selectedImage}
//                 alt="Selected Product View"
//                 fill
//                 className="object-cover transition-all duration-300"
//                 priority
//               />
//               <button 
//                 className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-gray-700 transition-all"
//                 aria-label="Zoom image"
//               >
//                 <ZoomIn className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Thumbnail Carousel / Grid */}
//             <div className="relative flex items-center gap-3">
//               <button className="p-1 rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-400">
//                 <ChevronLeft className="w-4 h-4" />
//               </button>

//               <div className="grid grid-cols-4 gap-3 w-full">
//                 {productImages.map((img) => (
//                   <button
//                     key={img.id}
//                     onClick={() => setSelectedImage(img.src)}
//                     className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
//                       selectedImage === img.src
//                         ? "border-pink-500 ring-2 ring-pink-500/20"
//                         : "border-transparent hover:border-gray-300"
//                     }`}
//                   >
//                     <Image
//                       src={img.src}
//                       alt={img.alt}
//                       fill
//                       className="object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>

//               <button className="p-1 rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-400">
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Right Column: Product Details & Actions */}
//           <div className="lg:col-span-6 flex flex-col">
//             {/* Badge & Title */}
//             <div>
//               <span className="inline-block px-3 py-1 bg-pink-50 text-pink-500 text-xs font-semibold rounded-full mb-3">
//                 Best Seller
//               </span>
//               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
//                 Glow Face Serum
//               </h1>
//             </div>

//             {/* Ratings */}
//             <div className="flex items-center gap-2 mt-2">
//               <div className="flex text-amber-400">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-amber-400" />
//                 ))}
//               </div>
//               <span className="text-xs text-pink-500 font-medium">(128 reviews)</span>
//             </div>

//             {/* Price Section */}
//             <div className="mt-4 flex items-baseline gap-3">
//               <span className="text-2xl font-bold text-pink-500">₦15,000</span>
//               <span className="text-sm text-gray-400 line-through">₦18,000</span>
//               <span className="text-xs font-semibold text-pink-500 bg-pink-50 px-2 py-0.5 rounded">
//                 You save ₦3,000 (17% OFF)
//               </span>
//             </div>

//             {/* Short Description & Bullet Highlights */}
//             <p className="mt-4 text-sm text-gray-600 leading-relaxed">
//               A powerful daily serum enriched with Vitamin C and Vitamin E to brighten, hydrate, and rejuvenate your skin. Helps reduce dark spots and brings out your natural glow.
//             </p>

//             <ul className="mt-4 space-y-2 text-xs text-gray-600">
//               {["Brightens dull skin", "Reduces dark spots & hyperpigmentation", "Hydrates & nourishes", "Suitable for all skin types"].map((item, idx) => (
//                 <li key={idx} className="flex items-center gap-2">
//                   <CheckCircle2 className="w-4 h-4 text-pink-500" />
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>

//             <div className="my-6 border-t border-gray-100" />

//             {/* Quantity Selector & Stock Info */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-2 text-xs text-gray-600">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500" />
//                 <span className="font-semibold text-pink-500">In Stock</span>
//                 <span className="text-gray-400">({32 - quantity} items available)</span>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
//                 {/* Quantity Controls */}
//                 <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-32 bg-gray-50/50">
//                   <button
//                     onClick={() => handleQuantityChange("decrease")}
//                     className="text-gray-500 hover:text-pink-500 disabled:opacity-30"
//                     disabled={quantity <= 1}
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="font-semibold text-sm">{quantity}</span>
//                   <button
//                     onClick={() => handleQuantityChange("increase")}
//                     className="text-gray-500 hover:text-pink-500"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Add To Cart Button */}
//                 <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2">
//                   <ShoppingBag className="w-5 h-5" />
//                   <span>Add to Cart</span>
//                 </button>
//               </div>
//             </div>

//             {/* Auxiliary Buttons */}
//             <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
//               <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
//                 <Heart className="w-4 h-4" />
//                 <span>Add to Wishlist</span>
//               </button>
//               <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
//                 <Share2 className="w-4 h-4" />
//                 <span>Share</span>
//               </button>
//             </div>

//             {/* Feature Value Props Box */}
//             <div className="grid grid-cols-3 gap-2 mt-8 p-4 bg-gray-50/80 rounded-xl border border-gray-100 text-center">
//               <div className="flex flex-col items-center gap-1">
//                 <Truck className="w-5 h-5 text-pink-500" />
//                 <span className="text-[11px] font-semibold text-gray-800">Free Delivery</span>
//                 <span className="text-[10px] text-gray-400">On orders over ₦30,000</span>
//               </div>
//               <div className="flex flex-col items-center gap-1 border-x border-gray-200 px-2">
//                 <ShieldCheck className="w-5 h-5 text-pink-500" />
//                 <span className="text-[11px] font-semibold text-gray-800">100% Authentic</span>
//                 <span className="text-[10px] text-gray-400">Original products</span>
//               </div>
//               <div className="flex flex-col items-center gap-1">
//                 <RotateCcw className="w-5 h-5 text-pink-500" />
//                 <span className="text-[11px] font-semibold text-gray-800">Easy Returns</span>
//                 <span className="text-[10px] text-gray-400">7 days return policy</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Lower Tabbed Information Section */}
//       </main>
//     </div>
//   );
// }

        // <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        //   {/* Tabs Navigation Header */}
        //   <div className="flex border-b border-gray-100 gap-8">
        //     {[
        //       { id: "description", label: "Description" },
        //       { id: "howToUse", label: "How to Use" },
        //       { id: "ingredients", label: "Ingredients" },
        //       { id: "reviews", label: "Reviews (128)" },
        //     ].map((tab) => (
        //       <button
        //         key={tab.id}
        //         onClick={() => setActiveTab(tab.id as typeof activeTab)}
        //         className={`pb-4 text-sm font-semibold transition-all relative ${
        //           activeTab === tab.id
        //             ? "text-pink-500 border-b-2 border-pink-500"
        //             : "text-gray-400 hover:text-gray-600"
        //         }`}
        //       >
        //         {tab.label}
        //       </button>
        //     ))}
        //   </div>

        //   {/* Tab Panel Content */}
        //   <div className="py-6">
        //     {activeTab === "description" && (
        //       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        //         <div className="md:col-span-7 space-y-4">
        //           <p className="text-sm text-gray-600 leading-relaxed">
        //             Belleza Glow Face Serum is a lightweight, fast-absorbing formula packed with Vitamin C and Vitamin E to help revitalize your skin. It works to reduce the appearance of dark spots, even out skin tone, and boost your natural radiance. With consistent use, your skin feels smoother, brighter, and more youthful.
        //           </p>
        //           <h4 className="text-xs font-bold text-pink-500 tracking-wider uppercase">Benefits</h4>
        //           <ul className="space-y-2 text-xs text-gray-600">
        //             <li className="flex items-center gap-2">
        //               <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
        //               Visibly brightens and enhances skin radiance
        //             </li>
        //             <li className="flex items-center gap-2">
        //               <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
        //               Fades dark spots and discoloration
        //             </li>
        //             <li className="flex items-center gap-2">
        //               <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
        //               Deeply hydrates and improves skin texture
        //             </li>
        //           </ul>
        //         </div>
        //         <div className="md:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-gray-100">
        //           <Image
        //             src="https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=800&auto=format&fit=crop"
        //             alt="Serum application"
        //             fill
        //             className="object-cover"
        //           />
        //         </div>
        //       </div>
        //     )}
        //   </div>

        //   {/* Beauty Tip Card */}
        //   <div className="mt-4 p-4 bg-pink-50/50 rounded-xl border border-pink-100 flex items-center gap-4">
        //     <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
        //       <Gift className="w-5 h-5 text-pink-500" />
        //     </div>
        //     <div>
        //       <h5 className="text-xs font-bold text-pink-500">Beauty tip</h5>
        //       <p className="text-xs text-gray-600">
        //         For best results, use daily in the morning before your moisturizer and always follow up with sunscreen.
        //       </p>
        //     </div>
        //   </div>
        // </div>


// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { nairaSign, products } from "@/lib/data";
// import { useStore } from "@/store/useStore";
// import StarRating from "@/components/StarRating";
// import ProductCard from "@/components/product/ProductCard";
// import { ShoppingCart, ArrowLeft, Heart, Share2 } from "lucide-react";
// import { useSingleProduct } from "@/hooks/useProduct";
// import { useCart, useStoreCart } from "@/hooks/useCart";
// import { toast } from "sonner";
// import { QueryClient, useQueryClient } from "@tanstack/react-query";

// type ProductId = number|undefined
// type UiState = {
//   expanded:boolean,
//   selectedImg:number,
//   added:boolean,
//   imageId:number
// }

// export default function ProductPage() {
  // const { id } = useParams();
  // const product = products.find((p) => p.id === id);
  // const [selectedImg, setSelectedImg] = useState(0);
  // const [expanded, setExpanded] = useState(false);
  // const [uiState,setUiState] = useState<UiState>({
  //   expanded:false,
  //   selectedImg:0,
  //   added:false,
  //   imageId:0
  // })
  // const [added, setAdded] = useState(false);
  // // const addToCart = useStore((s) => s.addToCart);
  // const {mutate:addToCart} = useStoreCart()
  // const related = products.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

  // const productId:ProductId = Number(id)
  // const {data,error,isError,isLoading} = useSingleProduct(productId)
  
  // const queryClient = useQueryClient()
  // const handleAdd = (e: React.MouseEvent,imageId:number) => {
  //   e.preventDefault();
  //   addToCart(
  //     {productId,quantity:1,imageId:uiState.imageId},
  //     {
  //       // onSuccess:(response,_)=>{
  //       //   queryClient.invalidateQueries({queryKey:['carts']})
  //       //   // toast.success('Item added to cart')
  //       //   console.log(response,'response')

  //       // },
  //       onError:(error:any,context,f)=>{
  //         // toast.success(error?.data?.message)
  //         // console.log(error?.data?.message)
  //         console.log(error)
  //         console.log(context,'context')
  //         console.log(f,'context')

  //       }

  //     }
  //   );
  //   setUiState({...uiState,expanded:true});
  
  // };
//   console.log(error)


//   useEffect(()=>{
//     setUiState({...uiState,imageId:data?.images?.[selectedImg]?.id})
//   },[selectedImg])
//   return (
//     <section>
//      {
//       isLoading ? 'loading':
//       isError ? <p className="text-center mt-20">{error?.message}</p>:
//        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

//       <Link href={`/category/${data.category.id}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors">
//         <ArrowLeft size={16} /> Back to {data.category.name}
//       </Link>

//       <div className="grid md:grid-cols-2 gap-12 mb-16">
//         {/* Images */}
//         <div>
//           <div className="rounded-2xl overflow-hidden bg-mint aspect-square mb-4">
//             <img src={data?.images[selectedImg]?.url} alt={data.name} className="w-full h-full object-cover" />
//           </div>
//           {data?.images?.length > 1 && (
//             <div className="flex gap-3">
//               {data.images.map((img:any, i:number) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedImg(i)}
//                   className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${i === selectedImg ? "border-teal" : "border-transparent"}`}
//                 >
//                   <img src={img.url} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           )}
//           {/* {data?.images?.length > 1 && (
//             <div className="flex gap-3">
//               {product.images.map((img, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedImg(i)}
//                   className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${i === selectedImg ? "border-teal" : "border-transparent"}`}
//                 >
//                   <img src={img.url} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           )} */}
//         </div>

//         {/* Info */}
//         <div>
//           <div className="flex items-start justify-between mb-2">
//             <div>
//               <p className="text-teal text-sm font-medium capitalize mb-1">{data.category.name}</p>
//               <h1 className="font-display text-3xl font-bold  text-[#2E3A56]  capitalize">{data.name}</h1>
//             </div>
//             <div className="flex gap-2">
//               <button className="p-2 hover:bg-offwhite rounded-xl transition-colors"><Heart size={20} className="text-gray-500" /></button>
//               <button className="p-2 hover:bg-offwhite rounded-xl transition-colors"><Share2 size={20} className="text-gray-500" /></button>
//             </div>
//           </div>

//           {/* <div className="flex items-center gap-3 mb-4">
//             <StarRating value={Math.round(product.rating)} size={18} readonly />
//             <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount} reviews)</span>
//           </div> */}

//           <div className="flex items-center gap-3 mb-6">
//             <span className="text-4xl font-bold text-gray-900">{nairaSign}{data.price}</span>
//             {/* {product.originalPrice && (
//               <>
//                 <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
//                 <span className="bg-primary/10 text-primary text-sm font-medium px-2 py-0.5 rounded-lg">
//                   Save ${product.originalPrice - product.price}
//                 </span>
//               </>
//             )} */}
//           </div>

//           {/* Description */}
//           <div className="mb-6">
//             <p className="text-gray-600 leading-relaxed">
//               {expanded ? data.description : data.description.substring(0,19)}
//             </p>
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className="text-teal text-sm font-medium mt-2 hover:underline"
//             >
//               {expanded ? "Show less" : "Read more"}
//             </button>
//           </div>

//           {/* Tags */}
//           {/* <div className="flex flex-wrap gap-2 mb-6">
//             {product.tags.map((tag) => (
//               <span key={tag} className="text-xs bg-offwhite text-gray-600 px-3 py-1 rounded-full capitalize">{tag}</span>
//             ))}
//           </div> */}

//           {/* Stock */}
//           <p className={`text-sm mb-6 font-medium ${data.stock > 10 ? "text-[#2E3A56]" : "text-primary"}`}>
//             {data.stock > 10 ? `✓ In Stock (${data.stock} available)` : `⚡ Only ${data.stock} left!`}
//           </p>

//           {/* CTA */}
//           <button
//             onClick={(e)=>handleAdd(e,uiState.imageId)}
//             className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${added ? "bg-[#F2955F] text-white" : "bg-[#2E3A56] hover:bg-[#F2955F] text-white hover:shadow-lg hover:shadow-primary/30"}`}
//           >
//             <ShoppingCart size={22} />
//             {added ? "Added to Cart! ✓" : "Add to Cart"}
//           </button>
//           <Link href="/cart" className="block text-center mt-3 text-sm text-gray-500 hover:text-gray-800 transition-colors">View Cart</Link>
//         </div>
//       </div>

//       {/* Reviews */}
//       {/* <div className="mb-16">
//         <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
//         <div className="grid gap-4">
//           {product.reviews.map((r) => (
//             <div key={r.id} className="bg-white rounded-2xl p-5 shadow-sm">
//               <div className="flex items-start gap-3">
//                 <img src={r.avatar} alt={r.user} className="w-10 h-10 rounded-full" />
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between mb-1">
//                     <p className="font-medium text-gray-900 text-sm">{r.user}</p>
//                     <p className="text-xs text-gray-400">{r.date}</p>
//                   </div>
//                   <StarRating value={r.rating} size={14} readonly />
//                   <p className="text-sm text-gray-600 mt-2">{r.comment}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div> */}

//       {/* Related Products */}
//       {/* {related.length > 0 && (
//         <div>
//           <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//             {related.map((p) => <ProductCard key={p.id} product={p} />)}
//           </div>
//         </div>
//       )} */}
//       </div>
//      }

//     </section>
//   );
// }


