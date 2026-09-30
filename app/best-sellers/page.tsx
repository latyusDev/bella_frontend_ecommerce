"use client";

// ─── Mock data (replace with real fetch) ──────────────────────────────────────
const MOCK_BEST_SELLERS: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 100,
  name: [
    "Vitamin C Brightening Serum",
    "Hydra-Plump Moisturiser",
    "Gentle Milky Cleanser",
    "SPF 50+ Daily Shield",
    "Retinol Renewal Night Cream",
    "Pore-Refining Toner",
    "Deep Repair Hair Mask",
    "Clarifying Charcoal Wash",
    "Overnight Sleeping Mask",
    "Niacinamide Balancing Serum",
    "Caffeine Eye Depuffer",
    "AHA/BHA Exfoliant",
  ][i],
  short_description: [
    "Visibly fades dark spots in 4 weeks",
    "72-hour hydration with ceramide complex",
    "Melts away makeup and SPF effortlessly",
    "Lightweight, reef-safe, invisible finish",
    "Smooths fine lines while you sleep",
    "Minimises pores and controls shine",
    "Rebuilds bonds and seals split ends",
    "Banishes breakouts without dryness",
    "Wakes up with plump, glowing skin",
    "Regulates oil and fades blemish marks",
    "Reduces puffiness and dark circles fast",
    "Resurfaces for brighter, smoother skin",
  ][i],
  description: "Full product description goes here.",
  price: String((16.99 + i * 8).toFixed(2)),
  original_price: i % 3 === 0 ? String((16.99 + i * 8 + 12).toFixed(2)) : null,
  rating: String((4.1 + (i % 5) * 0.18).toFixed(1)),
  review_count: 120 + i * 47,
  is_new: i >= 10,
  is_best_seller: true,
  is_featured: i % 5 === 0,
  stock: 10 + i * 3,
  category_id: (i % 4) + 1,
  tags: ["bestseller", "skincare"],
  created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  updated_at: new Date().toISOString(),
  images: [
    {
      id: i + 100,
      url: `https://picsum.photos/seed/best${i + 1}/400/400`,
      product_id: i + 100,
      updated_at: new Date().toISOString(),
    },
  ],
}));
// ───────────────────────────────────────────────────────────────────────────────

const PODIUM = MOCK_BEST_SELLERS.slice(0, 3);

import { useEffect, useState } from "react";
import ProductCard, { Product } from "@/components/product/ProductCard";
import { Trophy, Search, X, Flame } from "lucide-react";
import { useBestSellerProducts } from "@/hooks/useProduct";
import ProductCardLoader from "@/components/product/ProductCardLoader";
import Paginator from "@/components/global/Paginator";

const PAGE_TO_SHOW = 3
export default function BestSellersPage() {
  const [uiState,setUiState] = useState({
    page:1,
    query:'',
  })

  const { data, isLoading } = useBestSellerProducts("all",uiState.page,uiState.query);
  const bestSellerCount = data?.best_sellers?.length;
  const totalPages = data?.best_sellers?.last_page;
  const filtered = data?.best_sellers?.data
  const handleUiState = (data:any)=>{
    setUiState({...uiState,...data})
  }
  useEffect(()=>{
    if(uiState.query){
      handleUiState({page:1})
    }
  
  },[uiState.query])
  
  return (
    <div className="bg-white">
      {/* ── Hero Banner ── */}
      <div className="relative bg-[#2E3A56] overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-white/5" />

        <div className="relative max-w-6xl mx-auto px-6 py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F2955F]/20 text-[#F2955F] text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                <Flame size={12} />
                Customer Favourites
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Best Sellers
              </h1>
              <p className="mt-3 text-white/70 text-base max-w-md">
                Tried, tested, and loved — the products your customers keep coming back for.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/15 rounded-2xl px-5 py-3 text-center">
                <p className="text-2xl font-bold text-white">{bestSellerCount}</p>
                <p className="text-white/60 text-xs mt-0.5">Top products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="max-w-6xl mx-auto px-6 -mt-5 mb-2 relative z-10">
        <div className="bg-white rounded-2xl shadow-md flex items-center gap-3 px-4 py-3">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search best sellers…"
            value={uiState.query}
            onChange={(e) => handleUiState({query:e.target.value})}
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
          {uiState.query && (
            <button onClick={() => handleUiState({query:''})} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {isLoading ? (
          <ProductCardLoader />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FBE3D4] flex items-center justify-center mb-4">
              <Trophy size={24} className="text-[#F2955F]" />
            </div>
            <h3 className="text-lg font-semibold text-[#2E3A56] mb-1">
              {uiState.query ? `No results for "${uiState.query}"` : "No best sellers found"}
            </h3>
            <p className="text-sm text-gray-400 mb-5">
              {uiState.query ? "Try a different search term." : "Check back soon for top products."}
            </p>
            {uiState.query && (
              <button
                onClick={() => handleUiState({query:''})}
                className="px-4 py-2 bg-[#F2955F] text-white text-sm font-medium rounded-xl hover:bg-[#F2955F]/90 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product: Product) => (
              <ProductCard key={product.id} product={product} showNew={false} />
            ))}
          </div>
        )}
         <Paginator
            page={uiState.page}
            handleUiState={handleUiState}
            total={totalPages}
            PAGES_TO_SHOW={PAGE_TO_SHOW}
            />
      </main>
    </div>
  );
}