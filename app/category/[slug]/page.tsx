"use client";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find((c) => c.id === slug);

  const filtered = useMemo(() => {
    let list = [...products];
    if (slug === "new") list = list.filter((p) => p.isNew);
    else if (slug === "bestseller") list = list.filter((p) => p.isBestSeller);
    else if (slug !== "all") list = list.filter((p) => p.category === slug);

    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDescription.toLowerCase().includes(search.toLowerCase()));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "newest") list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  }, [slug, search, priceRange, sortBy]);

  const pageTitle = slug === "new" ? "New Arrivals" : slug === "bestseller" ? "Best Sellers" : slug === "all" ? "All Products" : category?.name ?? "Products";

  return (
    <main className=" px-4 sm:px-6 py-10">
      {/* Category Header */}
      {/* {category && <CategoryHeader category={category} />} */}
     <SingleCategory/>
    </main>
  );
}

import Link from "next/link";import CategoryHeader from "@/components/category/CategoryHeader";
import SingleCategory from "@/components/category/SingleCategory";

