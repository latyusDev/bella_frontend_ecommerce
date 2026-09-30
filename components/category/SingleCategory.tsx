"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  ChevronDown,
  Filter,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ShoppingBag as BagIcon,
} from "lucide-react";
import { useCategory, useHeaderCategory } from "@/hooks/useCategories";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "../product/ProductCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filtersData, PAGE_TO_SHOW } from "@/lib/data";
import Paginator from "../global/Paginator";

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined | null>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("filterCategory") || "null")?.name || null
      : null
  );
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(50000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("Popular");
  const [isFullDescription, setIsfullDescription] = useState(false);

  const { data: categoryFilters, isLoading: loadingCategory } = useHeaderCategory();
  const { slug } = useParams();
  const router = useRouter();

  const [uiState, setUiState] = useState<any>({
    page: 1,
    query: "",
    id: slug,
  });

  const { data, isLoading } = useCategory(uiState.page, uiState.id, uiState.query);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!uiState.query) {
        handleUiState({ page: 1 });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [uiState.query]);

  const handleSkinTypeToggle = (type: string) => {
    if (type === "All Skin Types") {
      setSelectedSkinTypes([]);
      return;
    }
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
    setSelectedSkinTypes([]);
    setPriceRange(50000);
    setSelectedBrands([]);
    setSortBy("Popular");
  };

  const handleFilterByCategory = (category: any) => {
    setSelectedCategory(category?.name);
    localStorage.setItem(
      "filterCategory",
      JSON.stringify({ name: category?.name, isScroll: true })
    );
    router.push(`/category/${category?.id}`);
  };

  useEffect(() => {
    const getFilterData = JSON.parse(localStorage.getItem("filterCategory") || "null");
    if (getFilterData?.isScroll) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: 680,
          left: 0,
          behavior: "smooth",
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  const category = data?.category;
  const productCount = data?.products?.total;
  const rawProducts = data?.products?.data || [];
  const totalPages = data?.products?.last_page;

  console.log(rawProducts,'rawProducts')

  // Client-side filtering & sorting logic
  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    // 1. Filter by Skin Type
    if (selectedSkinTypes.length > 0) {
      result = result.filter((p) =>
        selectedSkinTypes.some((type) =>
          p.description?.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // 2. Filter by Price Range
    result = result.filter((p) => parseFloat(p.price) <= priceRange);

    // 3. Filter by Brand (if specified on products)
    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.some(
          (b) => p.brand?.toLowerCase() === b.toLowerCase()
        )
      );
    }

    // 4. Sort Products
    switch (sortBy) {
      case "Price: Low to High":
      case "PriceLowHigh":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "Price: High to Low":
      case "PriceHighLow":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "Newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        );
        break;
      default:
        break;
    }

    return result;
  }, [rawProducts, selectedSkinTypes, priceRange, selectedBrands, sortBy]);

  const handleUiState = (data: any) => {
    setUiState({ ...uiState, ...data });
  };

  const from = data?.products?.from;
  const to = data?.products?.to;

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">Home</a>
          <span>&gt;</span>
          <a href="#" className="hover:underline">Categories</a>
          <span>&gt;</span>
          <span className="text-pink-500 font-medium">Skincare</span>
        </nav>

        {/* HERO BANNER SECTION */}
        <div className="bg-pink-100 border border-pink-100 rounded-3xl p-8 md:p-12 overflow-hidden shadow-sm">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                  {category?.name}
                </h1>
                {category?.name === "Fragrance" ? (
                  <p className="text-pink-500 font-semibold text-sm">
                    Smell nice as it makes you feel good.
                  </p>
                ) : (
                  <p className="text-pink-500 font-semibold text-sm">
                    Healthy skin, beautiful you.
                  </p>
                )}
                {isFullDescription ? (
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-md">
                    {category?.description}
                    <button
                      onClick={() => setIsfullDescription(!isFullDescription)}
                      className="text-pink-600 cursor-pointer ml-2"
                    >
                      see less
                    </button>
                  </p>
                ) : (
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-md">
                    {category?.description?.substring(0, 100)} ...
                    <button
                      onClick={() => setIsfullDescription(!isFullDescription)}
                      className="text-pink-600 cursor-pointer ml-2"
                    >
                      see all
                    </button>
                  </p>
                )}

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-200 text-pink-600 text-xs font-bold rounded-xl border border-pink-200/50">
                    <BagIcon className="w-3.5 h-3.5" />
                    <span>{productCount}+ Products</span>
                  </span>
                </div>
              </div>

              <div className="md:col-span-6 flex justify-center md:justify-end">
                <div className="relative w-full max-w-lg h-64 md:h-80 rounded-2xl overflow-hidden">
                  <img
                    src={category?.image_url}
                    alt="Skincare Collection Showcase"
                    className="object-cover object-right w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Layout Grid */}
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

            {/* Categories Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>

              {loadingCategory ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-2 text-xs">
                  {categoryFilters?.map((cat: any) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.name}
                        onChange={() => handleFilterByCategory(cat)}
                        className="w-3.5 h-3.5 text-pink-500 focus:ring-pink-400 accent-pink-500"
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-100" />

            {/* Skin Type Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span>Skin Type</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="space-y-2 text-xs">
                {["All Skin Types", "Dry", "Oily", "Combination", "Sensitive"].map(
                  (type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        checked={
                          type === "All Skin Types"
                            ? selectedSkinTypes.length === 0
                            : selectedSkinTypes.includes(type)
                        }
                        onChange={() => handleSkinTypeToggle(type)}
                        className="w-3.5 h-3.5 rounded text-pink-500 focus:ring-pink-400 accent-pink-500"
                      />
                      <span>{type}</span>
                    </label>
                  )
                )}
              </div>
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
                {["Belleza", "The Ordinary", "CeraVe", "La Roche-Posay", "Neutrogena"].map(
                  (brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="w-3.5 h-3.5 rounded text-pink-500 focus:ring-pink-400 accent-pink-500"
                      />
                      <span>{brand}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearAllFilters}
              className="w-full py-2.5 border border-pink-500 text-pink-500 font-semibold text-xs rounded-xl hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={uiState.query}
                  onChange={(e) => handleUiState({ query: e.target.value })}
                  placeholder={`Search products in ${category?.name || "category"}...`}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4">
                <span className="text-xs text-gray-500 font-medium">
                  Showing {from || 0}–{to || 0} of {filteredProducts.length} products
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 font-medium">Sort by:</span>
                  <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
                    <SelectTrigger className="w-[180px] bg-white text-xs">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Popular">Popular</SelectItem>
                        <SelectItem value="Price: Low to High">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="Price: High to Low">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="Newest">Newest</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {isLoading ? (
              <p>Loading...</p>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500">
                  No products matched your selected filters.
                </p>
              </div>
            )}

            {/* Pagination Controls */}
            <Paginator
              page={uiState.page}
              handleUiState={handleUiState}
              total={totalPages}
              PAGES_TO_SHOW={PAGE_TO_SHOW}
            />
          </div>
        </div>

        {/* Value Proposition Footer Bar */}
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

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import {
//   Search,
//   User,
//   ShoppingBag,
//   Heart,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   Headphones,
//   ShoppingBag as BagIcon,
// } from "lucide-react";
// import { useCategory, useHeaderCategory } from "@/hooks/useCategories";
// import { useParams, useRouter } from "next/navigation";
// import ProductCard from "../product/ProductCard";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { filtersData, PAGE_TO_SHOW } from "@/lib/data";
// import { Controller } from "react-hook-form";
// import Paginator from "../global/Paginator";

// interface Product {
//   id: string;
//   name: string;
//   size: string;
//   price: number;
//   rating: number;
//   reviewsCount: number;
//   image: string;
//   isWishlisted?: boolean;
// }

// const products: Product[] = [
//   {
//     id: "1",
//     name: "Glow Face Serum",
//     size: "30ml",
//     price: 15000,
//     rating: 5,
//     reviewsCount: 128,
//     image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
//   },
//   {
//     id: "2",
//     name: "Miss Belleza Eau De Parfum",
//     size: "50ml",
//     price: 20000,
//     rating: 5,
//     reviewsCount: 96,
//     image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop",
//   },
//   {
//     id: "3",
//     name: "Brightening Face Cream",
//     size: "50ml",
//     price: 12000,
//     rating: 5,
//     reviewsCount: 210,
//     image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=400&auto=format&fit=crop",
//   },
//   {
//     id: "4",
//     name: "Hydrating Toner",
//     size: "120ml",
//     price: 8500,
//     rating: 5,
//     reviewsCount: 74,
//     image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop",
//   },
//   {
//     id: "5",
//     name: "Hydrating Gentle Cleanser",
//     size: "120ml",
//     price: 9500,
//     rating: 5,
//     reviewsCount: 88,
//     image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop",
//   },
//   {
//     id: "6",
//     name: "Niacinamide 10% + Zinc 1%",
//     size: "30ml",
//     price: 10000,
//     rating: 5,
//     reviewsCount: 156,
//     image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
//   },
//   {
//     id: "7",
//     name: "Daily Sunscreen SPF 50",
//     size: "50ml",
//     price: 11500,
//     rating: 5,
//     reviewsCount: 102,
//     image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400&auto=format&fit=crop",
//   },
//   {
//     id: "8",
//     name: "Detox Clay Mask",
//     size: "100g",
//     price: 9000,
//     rating: 5,
//     reviewsCount: 67,
//     image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=400&auto=format&fit=crop",
//   },
// ];

// export default function CategoryPage() {
//   // const [selectedCategory, setSelectedCategory] = useState("All Skincare");
//   const [selectedCategory, setSelectedCategory] = useState<string | undefined | null>(JSON.parse(localStorage.getItem('filterCategory'))?.name||null);
//   // const [selectedCategory, setSelectedCategory] = useState<string | undefined | null>(null);
//   const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState<number>(50000);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [isFullDescription,setIsfullDescription] = useState(false)
//   const {data:categoryFilters,isLoading:loadingCategory} = useHeaderCategory()
//   const {slug} = useParams()
//   const router = useRouter()
  
//   const [uiState,setUiState] = useState<any>({
//     page:1,
//     query:'',
//     id:slug
//   })

//   const {data,isLoading,isError,error} = useCategory(uiState.page,uiState.id,uiState.query)

//       console.log(data,'single')

      
   
//        useEffect(() => {
//         const timer = setTimeout(() => {
//             if (!uiState.query) {
//                 handleUiState({page:1}) // Reset to first page when search changes
//             }
//         }, 300)

//         return () => clearTimeout(timer)
//     }, [uiState.query])

//   const handleSkinTypeToggle = (type: string) => {
//     setSelectedSkinTypes((prev) =>
//       prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
//     );
//   };

//   const handleBrandToggle = (brand: string) => {
//     setSelectedBrands((prev) =>
//       prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand]
//     );
//   };

//   const clearAllFilters = () => {
//     setSelectedCategory("All Skincare");
//     setSelectedSkinTypes([]);
//     setPriceRange(50000);
//     setSelectedBrands([]);
//   };

//   const handleFilterByCategory = (category:any)=>{
//     setSelectedCategory(category?.name)
//     localStorage.setItem('filterCategory',JSON.stringify({name:category?.name,isScroll:true}))
//     router.push(`/category/${category?.id}`)
//   }

//   const getFilterData = JSON.parse(localStorage.getItem('filterCategory')) 

//   useEffect(() => {
//     // Wait until the new page has rendered
//    if(getFilterData?.isScroll){
//      const timer = setTimeout(() => {
//       window.scrollTo({
//         top: 680,
//         left: 0,
//         behavior: "smooth",
//       });
//     }, 100);
    
//     return () => clearTimeout(timer);
//   }
//   }, []);


//   const category = data?.category
//   const productCount = data?.products?.total
//   const products = data?.products?.data
//   const totalPages = data?.products?.last_page
//   console.log(data,'data')



//   const handleUiState = (data:any)=>{
//     setUiState({...uiState,...data})
//   }

//   const from = data?.products?.from
//   const to = data?.products?.to
  

//   return (
//     <div className="min-h-screen bg-gray-50/30 text-gray-800 font-sans">
 
//       {/* Main Container */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
//         {/* Breadcrumb Navigation */}
//         <nav className="flex items-center gap-2 text-xs text-gray-500">
//           <a href="#" className="hover:underline">Home</a>
//           <span>&gt;</span>
//           <a href="#" className="hover:underline">Categories</a>
//           <span>&gt;</span>
//           <span className="text-pink-500 font-medium">Skincare</span>
//         </nav>

//         {/* HERO BANNER SECTION (Left Text / Right Image Layout) */}
//         <div className="bg-pink-100 border border-pink-100 rounded-3xl p-8 md:p-12 overflow-hidden shadow-sm">
          
//           {
//             isLoading ? <p>Loading...</p>:
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
//             {/* Left Column: Category Name, Description & Pill Badge */}
//             <div className="md:col-span-6 space-y-4">
//               <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
//                 {category?.name}
//               </h1>
//               {
//                 category?.name === 'Fragrance'?
//                 <p className="text-pink-500 font-semibold text-sm">
//                 Smell nice as it makes you feel good.
//               </p>:
//               <p className="text-pink-500 font-semibold text-sm">
//                 Healthy skin, beautiful you.
//               </p>
//               }
//                 {
//                    isFullDescription ?
//               <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-md">
//                 {category.description} 
//                 <button onClick={()=>setIsfullDescription(!isFullDescription)} className="text-pink-600 cursor-pointer ml-2"> see less</button>
//               </p>:
//               <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-md">
//                 {category?.description.substring(0,100)} ... 
//                 <button onClick={()=>setIsfullDescription(!isFullDescription)} className="text-pink-600 cursor-pointer ml-2">see all</button>
//                 </p>
//                 }
              
//               <div className="pt-2">
//                 <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-200 text-pink-600 text-xs font-bold rounded-xl border border-pink-200/50">
//                   <BagIcon className="w-3.5 h-3.5" />
//                   <span>{productCount}+ Products</span>
//                 </span>
//               </div>
//             </div>

//             {/* Right Column: Inline Product Showcase Image (Not Background) */}
//             <div className="md:col-span-6 flex justify-center md:justify-end">
//               <div className="relative w-full max-w-lg h-64 md:h-80 rounded-2xl overflow-hidden">
//                 <img
//                   src={category?.image_url}
//                   alt="Skincare Collection Showcase"
//                   className="object-cover object-right w-full"
//                 />
//                 {/* <Image
//                   src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop"
//                   alt="Skincare Collection Showcase"
//                   fill
//                   className="object-cover object-right"
//                   priority
//                 /> */}
//               </div>
//             </div>

//           </div>
//           }
//         </div>

//         {/* Content Layout Grid (Left Sidebar Filters + Right Product Grid) */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* Left Sidebar Filters */}
//           <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
//             <div className="flex items-center justify-between">
//               <h3 className="text-sm font-bold text-gray-900">Filters</h3>
//               <button
//                 onClick={clearAllFilters}
//                 className="text-xs font-semibold text-pink-500 hover:underline"
//               >
//                 Clear All
//               </button>
//             </div>

//             {/* Categories Filter */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between text-xs font-bold text-gray-900">
//                 <span>Categories</span>
//                 <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//               </div>

//               {
//                 loadingCategory ? <p>Loading...</p>:

//               <div className="space-y-2 text-xs">
//                 {categoryFilters?.map((category:any) => (
//                   <label key={category.id} className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900">
//                     <input
//                       type="radio"
//                       name="categoryegory"
//                       checked={selectedCategory === category.name}
//                       onChange={() => handleFilterByCategory(category)}
//                       className="w-3.5 h-3.5 text-pink-500 focus:ring-pink-400 accent-pink-500"
//                     />
//                     <span>{category.name}</span>
//                   </label>
//                 ))}
//                 {/* {[
//                   "All Skincare",
//                   "Cleansers",
//                   "Moisturizers",
//                   "Serums",
//                   "Toners",
//                   "Exfoliators",
//                   "Face Masks",
//                   "Sunscreens",
//                 ].map((cat) => (
//                   <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900">
//                     <input
//                       type="radio"
//                       name="category"
//                       checked={selectedCategory === cat}
//                       onChange={() => setSelectedCategory(cat)}
//                       className="w-3.5 h-3.5 text-pink-500 focus:ring-pink-400 accent-pink-500"
//                     />
//                     <span>{cat}</span>
//                   </label>
//                 ))} */}
//               </div>
//               }
//             </div>

//             <div className="border-t border-gray-100" />

//             {/* Skin Type Filter */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between text-xs font-bold text-gray-900">
//                 <span>Skin Type</span>
//                 <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//               </div>
//               <div className="space-y-2 text-xs">
//                 {["All Skin Types", "Dry", "Oily", "Combination", "Sensitive"].map((type) => (
//                   <label key={type} className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900">
//                     <input
//                       type="checkbox"
//                       checked={selectedSkinTypes.includes(type)}
//                       onChange={() => handleSkinTypeToggle(type)}
//                       className="w-3.5 h-3.5 rounded text-pink-500 focus:ring-pink-400 accent-pink-500"
//                     />
//                     <span>{type}</span>
//                   </label>
//                 ))}
//               </div>
//               <button className="text-[11px] font-semibold text-pink-500 hover:underline pt-1">
//                 Show more ∨
//               </button>
//             </div>

//             <div className="border-t border-gray-100" />

//             {/* Price Range Filter */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between text-xs font-bold text-gray-900">
//                 <span>Price Range</span>
//                 <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//               </div>
//               <input
//                 type="range"
//                 min="0"
//                 max="50000"
//                 step="1000"
//                 value={priceRange}
//                 onChange={(e) => setPriceRange(Number(e.target.value))}
//                 className="w-full accent-pink-500 cursor-pointer"
//               />
//               <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
//                 <span>₦0</span>
//                 <span>₦{priceRange.toLocaleString()}+</span>
//               </div>
//             </div>

//             <div className="border-t border-gray-100" />

//             {/* Brand Filter */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between text-xs font-bold text-gray-900">
//                 <span>Brand</span>
//                 <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//               </div>
//               <div className="space-y-2 text-xs">
//                 {["Belleza", "The Ordinary", "CeraVe", "La Roche-Posay", "Neutrogena"].map((brand) => (
//                   <label key={brand} className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900">
//                     <input
//                       type="checkbox"
//                       checked={selectedBrands.includes(brand)}
//                       onChange={() => handleBrandToggle(brand)}
//                       className="w-3.5 h-3.5 rounded text-pink-500 focus:ring-pink-400 accent-pink-500"
//                     />
//                     <span>{brand}</span>
//                   </label>
//                 ))}
//               </div>
//               <button className="text-[11px] font-semibold text-pink-500 hover:underline pt-1">
//                 Show more ∨
//               </button>
//             </div>

//             {/* Apply Filters Button */}
//             <button className="w-full py-2.5 border border-pink-500 text-pink-500 font-semibold text-xs rounded-xl hover:bg-pink-50 transition-colors flex items-center justify-center gap-2">
//               <Filter className="w-3.5 h-3.5" />
//               <span>Apply Filters</span>
//             </button>
//           </div>

//           {/* Right Product Grid Area */}
//           <div className="lg:col-span-9 space-y-6">
            
//             {/* Top Toolbar: Search Bar, Item Counter & Sorting */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   value={uiState.query}
//                   onChange={(e) => handleUiState({query:e.target.value})}
//                   placeholder={`Search products in ${category?.name}...`}
//                   className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-pink-500 transition-colors"
//                 />
//               </div>

//               <div className="flex items-center justify-between md:justify-end gap-4">
//                 <span className="text-xs text-gray-500 font-medium">
//                   Showing {from}–{to} of {productCount}+ products
//                 </span>

//                 <div className="flex items-center gap-2 text-xs">
//                   <span className="text-gray-500 font-medium">Sort by:</span>
//                   <div className="relative">
//                        <Select >
//                         <SelectTrigger className="w-[180px]">
//                           <SelectValue placeholder="Filter" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectGroup>
//                             {filtersData.map((filter) => (
//                               <SelectItem key={filter.id} value={filter.by}>
//                                 {filter.by}
//                               </SelectItem>
//                             ))}
//                           </SelectGroup>
//                         </SelectContent>
//                       </Select>

//                     {/* <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-gray-800 focus:outline-none focus:border-pink-500 appearance-none cursor-pointer"
//                     >
//                       <option value="Popular">Popular</option>
//                       <option value="PriceLowHigh">Price: Low to High</option>
//                       <option value="PriceHighLow">Price: High to Low</option>
//                       <option value="Newest">Newest</option>
//                     </select>
//                     <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Product Cards Grid */}
//             {
//               isLoading ? <p>Loading...</p>
//               :
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
//               {products.map((product) => (
//                 <ProductCard product={product}/>
//               ))}
//             </div>
//             }

//             {/* Pagination Controls */}
//              <Paginator
//                 page={uiState.page}
//                 handleUiState={handleUiState}
//                 total={totalPages}
//                 PAGES_TO_SHOW={PAGE_TO_SHOW}
//                 />

//           </div>
//         </div>

//         {/* Value Proposition Footer Bar */}
//         <div className="bg-pink-50/40 rounded-2xl border border-pink-100/60 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
//               <Truck className="w-5 h-5" />
//             </div>
//             <div>
//               <h4 className="text-xs font-bold text-gray-900">Free Delivery</h4>
//               <p className="text-[10px] text-gray-400">On orders over ₦30,000</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
//               <ShieldCheck className="w-5 h-5" />
//             </div>
//             <div>
//               <h4 className="text-xs font-bold text-gray-900">100% Authentic</h4>
//               <p className="text-[10px] text-gray-400">Original & quality assured</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
//               <RotateCcw className="w-5 h-5" />
//             </div>
//             <div>
//               <h4 className="text-xs font-bold text-gray-900">Easy Returns</h4>
//               <p className="text-[10px] text-gray-400">7 days return policy</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
//               <Headphones className="w-5 h-5" />
//             </div>
//             <div>
//               <h4 className="text-xs font-bold text-gray-900">Customer Support</h4>
//               <p className="text-[10px] text-gray-400">+234 800 123 4567</p>
//             </div>
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }
