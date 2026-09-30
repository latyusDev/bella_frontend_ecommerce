"use client"
import {
  Search,
  ChevronDown,
  ChevronUp,
  User,
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Menu,
  X,
  Loader2,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Logo from "./global/Logo";
import { useCartCount } from "@/hooks/useCart";
import { productService } from "@/services/productService"; // adjust to your actual service
import { useHeaderCategory } from "@/hooks/useCategories";
import { useSearchProducts, useWishlistCounts } from "@/hooks/useProduct";

const NAV_LINKS = [
  { href: "/category/skincare", label: "Skincare" },
  { href: "/category/makeup", label: "Makeup" },
  { href: "/category/body-care", label: "Bodycare" },
  { href: "/category/hair-care", label: "Haircare" },
  { href: "/category/fragrances", label: "Fragrances" },
];

const SHOP_LINKS = [
  { href: "/category/skincare", label: "Skin Care" },
  { href: "/category/body-care", label: "Body Care" },
  { href: "/category/perfumes", label: "Perfumes" },
  { href: "/category/makeup", label: "Makeup" },
  { href: "/category/hair-care", label: "Hair Care" },
];

function useDebouncedValue<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const Header = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: cartCount = 0 } = useCartCount();
  const { data: wishlistCount = 0 } = useWishlistCounts();
  // const wishlistCount = 2; // wire up to your wishlist hook when available
console.log(wishlistCount,'wishlistCount')
  const debouncedQuery = useDebouncedValue(query, 350);

  const { data: results, isFetching } = useQuery({
    queryKey: ["product-search", debouncedQuery],
    queryFn: () => productService.searchProducts(debouncedQuery),
    enabled: debouncedQuery.trim().length > 1,
    staleTime: 60 * 1000,
  });

  const {data,isLoading} = useHeaderCategory();
  const {data:searchResults,isLoading:isLoadingSearch} = useSearchProducts(query);



  const showDropdown =
    isSearchFocused && debouncedQuery.trim().length > 0;

  // close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleStorageFilter = (category:any)=>{
    localStorage.setItem('filterCategory',JSON.stringify({name:category?.name,isScroll:false}))
  }


  return (
    <div>
      {/* Top announcement bar */}
      <div className="bg-pink-500 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Free shipping on orders over ₦30,000</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Authentic Products</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>7 Days Easy Returns</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Hamburger - mobile only */}
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
            className="md:hidden text-gray-700 hover:text-pink-500 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Logo isFooter={false} />

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 shrink-0">
            <Link
              href="/"
              className="text-pink-500 border-b-2 border-pink-500 pb-1 font-semibold"
            >
              Home
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsShopOpen(!isShopOpen)}
                onBlur={() => setIsShopOpen(false)}
                className="flex items-center gap-1 cursor-pointer hover:text-pink-500 transition-colors"
              >
                <span>Shop</span>
                {isShopOpen ? (
                  <ChevronUp className="w-4 h-4 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform" />
                )}
              </button>

              {isShopOpen && (
                <div className="absolute z-10 top-full mt-3 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                  {data?.map((category) => (
                    <Link
                    onClick={()=>handleStorageFilter(category)}
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-pink-50 hover:text-[#e63970]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {data?.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                onClick={()=>handleStorageFilter(category)}

                className="hover:text-pink-500 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search bar with live results dropdown */}
          <div ref={searchRef} className="hidden lg:block relative flex-1 max-w-xs">
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for products..."
                className="w-full bg-pink-50/60 rounded-full pl-4 pr-10 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-200 transition-colors"
              />
              <button
                aria-label="Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                {isLoadingSearch ? (
                  <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </div>

            {showDropdown && (
              <div className="absolute z-20 top-full mt-2 w-[420px] max-w-[90vw] -translate-x-1/4 rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                {isLoadingSearch ? (
                  <div className="p-6 text-center text-sm text-gray-400">
                    Searching...
                  </div>
                ) : searchResults?.products.length > 0 ? (
                  <ul className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                    {searchResults?.products?.map((product: any) => (
                      <li key={product.id}>
                        <Link
                          href={`/product/${product.id}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center gap-3 p-3 hover:bg-pink-50/60 transition-colors"
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-pink-50 shrink-0">
                            {product.images?.[0]?.url && (
                              <img
                                src={product.images[0].url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate mt-0.5">
                              {product.description}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-pink-500 shrink-0">
                            ₦{Number(product.price).toLocaleString()}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-sm text-gray-400">
                    No products found for "{debouncedQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-5 text-gray-700 shrink-0">
            <Link href="/account" aria-label="Account" className="hidden sm:inline-flex hover:text-pink-500 transition-colors">
              <User className="w-5 h-5" />
            </Link>

            <Link href="/wishlists" aria-label="Wishlists" className="relative hidden sm:inline-flex hover:text-pink-500 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" aria-label="Cart" className="relative hover:text-pink-500 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar - mobile/tablet, shown below header row */}
        <div className="lg:hidden px-4 sm:px-6 pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search for products..."
              className="w-full bg-pink-50/60 rounded-full pl-4 pr-10 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-200 transition-colors"
            />
            <button
              aria-label="Search"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center transition-colors"
            >
              {isFetching ? (
                <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
              ) : (
                <Search className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          </div>

          {showDropdown && (
            <div className="mt-2 w-full rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
              {isLoadingSearch ? (
                <div className="p-6 text-center text-sm text-gray-400">
                  Searching...
                </div>
              ) : searchResults?.products?.length > 0 ? (
                <ul className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                  {searchResults?.products?.map((product: any) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.id}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center gap-3 p-3 hover:bg-pink-50/60 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-pink-50 shrink-0">
                          {product.images?.[0]?.url && (
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {product.description}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-pink-500 shrink-0">
                          ₦{Number(product.price).toLocaleString()}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center text-sm text-gray-400">
                  No products found for "{debouncedQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile slide-in nav */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Logo isFooter={false} />
              <button
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
                className="text-gray-500 hover:text-pink-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                className="block px-5 py-3 text-sm font-semibold text-pink-500"
              >
                Home
              </Link>

              <button
                onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700"
              >
                <span>Shop</span>
                {isMobileShopOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {isMobileShopOpen && (
                <div className="bg-pink-50/40">
                  {SHOP_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-8 py-2.5 text-sm text-gray-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-5 py-3 text-sm font-medium text-gray-700"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 border-t border-gray-100 pt-2">
                <Link
                  href="/account"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700"
                >
                  <User className="w-4 h-4" /> Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700"
                >
                  <Heart className="w-4 h-4" /> Wishlist
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;