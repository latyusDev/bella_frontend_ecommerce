"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Sparkles,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isNew?: boolean;
}

const newProducts: Product[] = [
  {
    id: "1",
    name: "Radiance Glow Serum",
    size: "30ml",
    price: 16500,
    rating: 5,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "2",
    name: "Hydrating Water Cream",
    size: "50ml",
    price: 13000,
    rating: 5,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "3",
    name: "Gentle Face Cleanser",
    size: "120ml",
    price: 9500,
    rating: 5,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "4",
    name: "Niacinamide 10% Serum",
    size: "30ml",
    price: 10000,
    rating: 5,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "5",
    name: "Rose Water Toner",
    size: "150ml",
    price: 8500,
    rating: 5,
    reviewsCount: 26,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "6",
    name: "Peptide Anti-Aging Cream",
    size: "50ml",
    price: 18000,
    rating: 5,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "7",
    name: "Daily Sunscreen SPF 50",
    size: "50ml",
    price: 11500,
    rating: 5,
    reviewsCount: 37,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "8",
    name: "Tinted Lip Balm",
    size: "4g",
    price: 6000,
    rating: 5,
    reviewsCount: 21,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop",
    isNew: true,
  },
];

export default function NewProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(50000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSkinTypeToggle = (type: string) => {
    setSelectedSkinTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedSkinTypes([]);
    setPriceRange(50000);
    setSelectedBrands([]);
  };

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
            <a href="#" className="text-pink-500 font-bold border-b-2 border-pink-500 pb-1">
              New
            </a>
            <div className="relative group flex items-center gap-1 cursor-pointer hover:text-pink-500 transition-colors">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#" className="hover:text-pink-500 transition-colors">Best Sellers</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Offers</a>
          </nav>

          <div className="flex items-center gap-5 text-gray-600">
            <button className="hover:text-pink-500 transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-pink-500 transition-colors" aria-label="Account">
              <User className="w-5 h-5" />
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">Home</a>
          <span>&gt;</span>
          <span className="text-pink-500 font-medium">New Products</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-pink-50/40 border border-pink-100 rounded-3xl p-8 md:p-12 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="md:col-span-6 space-y-4">
              <span className="px-3 py-1 bg-pink-100 text-pink-500 text-[10px] font-bold tracking-wider rounded-full uppercase">
                NEW ARRIVALS
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                New Products
              </h1>
              <p className="text-pink-500 font-semibold text-sm">
                Discover the latest in beauty & selfcare.
              </p>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-md">
                Be the first to try our newest skincare essentials, thoughtfully formulated for healthy, glowing skin.
              </p>
              
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-gray-700">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>Fresh drops. Better skin. Every day.</span>
              </div>
            </div>

            {/* Right Column: Inline Product Image Banner */}
            <div className="md:col-span-6 flex justify-center md:justify-end">
              <div className="relative w-full max-w-lg h-64 md:h-80 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop"
                  alt="New Skincare Arrivals"
                  fill
                  className="object-contain object-right"
                  priority
                />
              </div>
            </div>

          </div>
        </div>

        {/* Content Layout Grid (Left Sidebar + Right Products) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Filters</h3>
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-pink-500 hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span>Category</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="space-y-2 text-xs">
                {["All", "Skincare", "Makeup", "Bodycare", "Haircare"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900">
                    <input
                      type="radio"
                      name="newCategory"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-3.5 h-3.5 text-pink-500 focus:ring-pink-400 accent-pink-500"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Skin Type Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span>Skin Type</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="space-y-2 text-xs">
                {["All Skin Types", "Dry", "Oily", "Combination", "Sensitive"].map((type) => (
                  <label key={type} className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900">
                    <input
                      type="checkbox"
                      checked={selectedSkinTypes.includes(type)}
                      onChange={() => handleSkinTypeToggle(type)}
                      className="w-3.5 h-3.5 rounded text-pink-500 focus:ring-pink-400 accent-pink-500"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              <button className="text-[11px] font-semibold text-pink-500 hover:underline pt-1">
                Show more ∨
              </button>
            </div>

            <div className="border-t border-gray-100" />

            {/* Price Range Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span>Price Range</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                <span>₦0</span>
                <span>₦{priceRange.toLocaleString()}+</span>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Brand Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span>Brand</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="space-y-2 text-xs">
                {["Belleza", "The Ordinary", "CeraVe", "La Roche-Posay", "Neutrogena"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-3.5 h-3.5 rounded text-pink-500 focus:ring-pink-400 accent-pink-500"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
              <button className="text-[11px] font-semibold text-pink-500 hover:underline pt-1">
                Show more ∨
              </button>
            </div>

            {/* Apply Filters CTA */}
            <button className="w-full py-2.5 border border-pink-500 text-pink-500 font-semibold text-xs rounded-xl hover:bg-pink-50 transition-colors flex items-center justify-center gap-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Apply Filters</span>
            </button>
          </div>

          {/* Right Main Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search new products..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4">
                <span className="text-xs text-gray-500 font-medium">
                  Showing 1–12 of 36 new products
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 font-medium">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-gray-800 focus:outline-none focus:border-pink-500 appearance-none cursor-pointer"
                    >
                      <option value="Newest">Newest</option>
                      <option value="Popular">Popular</option>
                      <option value="PriceLowHigh">Price: Low to High</option>
                      <option value="PriceHighLow">Price: High to Low</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {newProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-100 p-3.5 space-y-3 relative group hover:shadow-md transition-shadow"
                >
                  {/* NEW Badge */}
                  {product.isNew && (
                    <span className="absolute top-5 left-5 z-10 px-2 py-0.5 bg-pink-100 text-pink-500 text-[9px] font-bold rounded-md">
                      NEW
                    </span>
                  )}

                  {/* Heart Icon */}
                  <button
                    className="absolute top-5 right-5 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-pink-500 shadow-sm transition-colors"
                    aria-label="Add to Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Product Image */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-pink-50/40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-gray-400">{product.size}</p>
                    
                    <div className="flex items-center gap-1.5 pt-0.5">
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
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
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
                onClick={() => setCurrentPage(4)}
                className="w-8 h-8 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                4
              </button>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Feature Highlights Footer */}
        <div className="bg-pink-50/40 rounded-2xl border border-pink-100/60 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Free Delivery</h4>
              <p className="text-[10px] text-gray-400">On orders over ₦30,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">100% Authentic</h4>
              <p className="text-[10px] text-gray-400">Original & quality assured</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Easy Returns</h4>
              <p className="text-[10px] text-gray-400">7 days return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Customer Support</h4>
              <p className="text-[10px] text-gray-400">+234 800 123 4567</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}



// "use client";
// import { useEffect, useState } from "react";
// import ProductCard, { Product } from "@/components/product/ProductCard";
// import { Sparkles, Search, X } from "lucide-react";
// import { useNewProducts } from "@/hooks/useProduct";
// import ProductCardLoader from "@/components/product/ProductCardLoader";
// import Paginator from "@/components/global/Paginator";

// const PAGE_TO_SHOW = 3
// export default function NewProductsPage() {
//   const [uiState,setUiState] = useState({
//     page:1,
//     query:'',
//   })

//   const handleUiState = (data:any)=>{
//     setUiState({...uiState,...data})
//   }
//   const { data, isLoading } = useNewProducts("all",uiState.page,uiState.query);
//   console.log(data,'new')

//   const newProductCounts = data?.new_products?.data?.length;
  // const totalPages = data?.new_products?.last_page
//   const filtered = data?.new_products?.data 

// useEffect(()=>{
//     if(uiState.query){
//     handleUiState({page:1})
//   }

// },[uiState.query])

//   return (
//     <div className="bg-white">
//       {/* ── Hero Banner ── */}
//       <div className="relative bg-[#2E3A56] overflow-hidden">
//         {/* Decorative circles */}
//         <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
//         <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-white/5" />

//         <div className="relative max-w-6xl mx-auto px-6 py-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
//           <div>
//             <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase">
//               <Sparkles size={12} />
//               Just Arrived
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
//               New Arrivals
//             </h1>
//             <p className="mt-3 text-white/70 text-base max-w-md">
//               Our latest additions — freshly picked and ready to explore.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 shrink-0">
//             <div className="bg-white/15 rounded-2xl px-5 py-3 text-center">
//               <p className="text-2xl font-bold text-white">{newProductCounts}</p>
//               <p className="text-white/60 text-xs mt-0.5">New products</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Search Bar ── */}
//       <div className="max-w-6xl mx-auto px-6 -mt-5 mb-2 relative z-10">
//         <div className="bg-white rounded-2xl shadow-md flex items-center gap-3 px-4 py-3">
//           <Search size={16} className="text-gray-400 shrink-0" />
//           <input
//             type="text"
//             placeholder="Search new arrivals…"
//             value={uiState.query}
//             onChange={(e) => handleUiState({query:e.target.value})}
//             className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
//           />
//           {uiState.query && (
//             <button
//               onClick={() => handleUiState({query:''})}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X size={14} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ── Product Grid ── */}
//       <main className="max-w-6xl mx-auto px-6 py-6">
//         {isLoading ? (
//           <ProductCardLoader />
//         ) : filtered.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24 text-center">
//             <div className="w-16 h-16 rounded-full bg-[#FBE3D4] flex items-center justify-center mb-4">
//               <Sparkles size={24} className="text-[#F2955F]" />
//             </div>
//             <h3 className="text-lg font-semibold text-[#2E3A56] mb-1">
//               {uiState.query ? `No results for "${uiState.query}"` : "No new products found"}
//             </h3>
//             <p className="text-sm text-gray-400 mb-5">
//               {uiState.query ? "Try a different search term." : "Check back soon for new arrivals."}
//             </p>
//             {uiState.query && (
//               <button
//                 onClick={() => handleUiState({query:''})}
//                 className="px-4 py-2 bg-[#F2955F] text-white text-sm font-medium rounded-xl hover:bg-[#F2955F]/90 transition-colors"
//               >
//                 Clear search
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
//             {filtered.map((product: Product) => (
//               <ProductCard key={product.id} product={product} showNew={false} />
//             ))}
//           </div>
//         )}

//           <Paginator
//               page={uiState.page}
//               handleUiState={handleUiState}
//               total={totalPages}
//               PAGES_TO_SHOW={PAGE_TO_SHOW}
//               />
//       </main>
//     </div>
//   );
// }