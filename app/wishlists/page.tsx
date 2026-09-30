'use client'

import React, { useMemo, useState } from 'react';
import { 
  Heart, 
  Trash2, 
  ShoppingBag, 
  Search, 
  User, 
  ChevronDown, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  Loader2,
//   Instagram,
//   Facebook,
//   Twitter
} from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useWishlistProducts } from '@/hooks/useProduct';
import { PAGE_TO_SHOW } from '@/lib/data';
import Paginator from '@/components/global/Paginator';
import { useStoreCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import WishlistCard from '@/components/product/WishlistCard';
import EmptyCheckout from '@/components/cart/EmptyCheckout';

const productsData = [
  {
    id: 1,
    title: "Glow Face Serum",
    size: "30ml",
    rating: 4.9,
    reviews: 128,
    price: 16500,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Brightening Face Cream",
    size: "50ml",
    rating: 4.8,
    reviews: 210,
    price: 12000,
    image: "https://images.unsplash.com/photo-1608248597263-00079e965373?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Hydrating Toner",
    size: "120ml",
    rating: 4.7,
    reviews: 74,
    price: 8500,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    title: "Lip Glow Balm",
    size: "15ml",
    rating: 4.6,
    reviews: 57,
    price: 6000,
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    title: "Gentle Face Cleanser",
    size: "120ml",
    rating: 4.9,
    reviews: 28,
    price: 9500,
    image: "https://images.unsplash.com/photo-1556228722-d119f4d2b2d0?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    title: "Miss Bellesa Eau De Parfum",
    size: "50ml",
    rating: 4.8,
    reviews: 96,
    price: 20000,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 7,
    title: "Lip Plumping Gloss",
    size: "10ml",
    rating: 4.7,
    reviews: 42,
    price: 7500,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 8,
    title: "Detox Clay Mask",
    size: "100g",
    rating: 4.8,
    reviews: 67,
    price: 9000,
    image: "https://images.unsplash.com/photo-1567928254714-27c9d91f42d2?auto=format&fit=crop&q=80&w=400",
  },
];



export default function WishlistPage() {
  const [filterValue, setFilterValue] = useState('latest');
   const [uiState,setUiState] = useState<any>({
          filterValue:'latest',
          page:1,
          
        })
       
    

  const { data, isLoading } = useWishlistProducts(uiState.page);
  
  const totalPages = data?.data?.last_page || 1;
  const rawProducts = data?.data?.data || [];
  const total = data?.data?.total || 0;

  console.log(data,'wish')
  
    const handleUiState = (data:any)=>{
    setUiState({...uiState,...data})
  }
  
  // Client-side sorting logic
  const filteredProducts = useMemo(() => {
    if (!rawProducts.length) return [];

    // Create a copy of the array to avoid mutating original state/data
    const productsCopy = [...rawProducts];

    switch (filterValue) {
      case 'low':
        // Price: Low to High
        return productsCopy.sort((a, b) => Number(a.price) - Number(b.price));

      case 'high':
        // Price: High to Low
        return productsCopy.sort((a, b) => Number(b.price) - Number(a.price));

      case 'oldest':
        // Sort by ID ascending or created_at ascending
        return productsCopy.sort((a, b) => new Date(a.created_at || a.id) - new Date(b.created_at || b.id));

      case 'latest':
      default:
        // Sort by ID descending or created_at descending
        return productsCopy.sort((a, b) => new Date(b.created_at || b.id) - new Date(a.created_at || a.id));
    }
  }, [rawProducts, filterValue]);

  const removeItem = (id:number) => {
    // Call your delete wishlist mutation/endpoint here
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
     
     {
        total === 0 ? <EmptyCheckout isWishlist={true} heading='Your wishlist is currently empty' />:
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Banner Section */}
        <div className="relative rounded-2xl bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 p-8 md:p-12 overflow-hidden mb-8 flex items-center justify-between border border-pink-100">
          <div className="z-10 max-w-md">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-100 stroke-[1.5]" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                My Wishlist
              </h1>
            </div>
            <p className="text-slate-600 text-sm md:text-base">
              Your favorite products, all in one place.
            </p>
          </div>

          <div className="hidden lg:block text-right select-none pr-8">
            <div className="font-serif italic text-pink-400 text-3xl leading-tight">
              Good<br />
              <span className="pl-6">Skin</span><br />
              Happy<br />
              <span className="pl-4">You ♡</span>
            </div>
          </div>
        </div>

        {/* Filter / Sort Bar */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <span className="font-semibold text-slate-700">
            {total} items
          </span>
          
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Sort by:</span>
            
            <Select
              value={filterValue}
              onValueChange={(value) => setFilterValue(value)}
            >
              <SelectTrigger className="w-[180px] bg-white border-slate-200 focus:ring-pink-300">
                <SelectValue placeholder="Sort Products" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem className="data-highlighted:bg-pink-100" value="latest">
                    Added newest
                  </SelectItem>
                  <SelectItem className="data-highlighted:bg-pink-100" value="oldest">
                    Oldest
                  </SelectItem>
                  <SelectItem className="data-highlighted:bg-pink-100" value="low">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem className="data-highlighted:bg-pink-100" value="high">
                    Price: High to Low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center text-slate-500">
            Loading wishlist items...
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {filteredProducts.map((product) => (
              <WishlistCard key={product.id} product={product} />
            ))}
          </div>
        )}  <Paginator
                page={uiState.page}
                handleUiState={handleUiState}
                total={totalPages}
                PAGES_TO_SHOW={PAGE_TO_SHOW}
                />


      </main>
     }
    </div>
  );
}