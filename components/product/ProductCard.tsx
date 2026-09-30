"use client";
import Link from "next/link";
import { useState } from "react";
// import { Product } from "@/lib/data";
import { useStore } from "@/store/useStore";
import { Star, ShoppingCart, Heart, ShoppingBag, Loader2 } from "lucide-react";
import { products as pro } from "@/lib/data";
import { useCart, useStoreCart } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useToggleWishlistProduct } from "@/hooks/useProduct";

// export type Product = {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   originalPrice?: number;
//   description: string;
//   shortDescription: string;
//   images: string[];
//   rating: number;
//   review_count: number;
//   is_new?: boolean;
//   is_best_seller?: boolean;
//   is_featured?: boolean;
//   tags: string[];
//   stock: number;
//   // reviews: Review[];
// };


type ProductImage = {
  id: number;
  url: string;
  updated_at:string;
  product_id:number
  // add other image fields if present
};

export type Product = {
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  images: ProductImage[];
  is_best_seller: boolean;
  is_featured: boolean;
  is_new: boolean;
  name: string;
  original_price: string | null;
  price: string;
  rating: string;
  review_count: number;
  short_description: string;
  stock: number;
  tags: string[] | null;
  updated_at: string;
};


type Props = { product: Product; };

function ProductCard({ product }: Props) {
  const [uiState, setUiState] = useState({ productId: 0 });
  const [wishlisted, setWishlisted] = useState(false);
  const { mutate: addToCart, isPending } = useStoreCart();
  const { mutate: toggleWishlist } = useToggleWishlistProduct();
  const queryClient = useQueryClient();

  const handleAdd = (e: React.MouseEvent, imageId: number) => {
    e.preventDefault();
    addToCart(
      { productId: product.id, quantity: 1, imageId: imageId },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: ['carts'] });
          toast.success('Item added to cart');
        },
        onError: (error: any) => {
          toast.error(error?.data?.message || 'Failed to add item');
        },
      }
    );
  };


  const handleWishList = (e: React.MouseEvent, id: number) => {
    toggleWishlist(
      { id },
      {
        onSuccess: (response) => {
          setWishlisted((prev) => !prev);
          console.log(response,'response')
          queryClient.invalidateQueries({ queryKey: ['wishlists'] });
          toast.success(response?.message || 'Product added to wishlist');
        },
        onError: (error: any) => {
          toast.error(error?.data?.message || 'Failed to update wishlist');
        },
      }
    );
  };

  const originalPrice = parseFloat(product?.original_price ?? "0");
  const currentPrice = parseFloat(product?.price ?? "0");

  return (
    <div
      key={product.id}
      className="bg-white rounded-2xl border border-gray-100 p-3 space-y-3 relative group hover:shadow-xs transition-shadow"
    >
      {/* 1. Wishlist Button moved OUTSIDE the <Link> component */}
      <button
        type="button"
        onClick={(e) => handleWishList(e, product?.id)}
        className="absolute top-4 right-4 z-30 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-400 hover:text-pink-500 shadow-xs transition-colors cursor-pointer"
      >
        <Heart
          className={`w-4 h-4 ${
            wishlisted ? 'fill-pink-500 text-pink-500' : ''
          }`}
        />
      </button>

      {/* Badge */}
      {product?.is_new && (
        <span className="absolute top-4 left-4 z-10 px-2 py-0.5 bg-pink-500 text-white text-[9px] font-bold rounded-md uppercase">
          new
        </span>
      )}
      {product?.is_best_seller && (
        <span className="absolute top-10 left-4 z-10 px-2 py-0.5 bg-pink-500 text-white text-[9px] font-bold rounded-md uppercase">
          best seller
        </span>
      )}

      {/* Product Link wrapper */}
      <Link href={`/product/${product?.id}`}>
        {/* Product Image */}
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-pink-50/30">
          {product?.images.length > 0 ? (
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="md:size-full transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-1 pt-2">
          <h4 className="text-xs font-bold text-gray-900 mt-2 line-clamp-1">
            {product?.name}
          </h4>

          <div className="pt-0.5">
            <span className="text-xs font-bold text-gray-900">
              ₦{product?.price.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-gray-400">
            {product?.description?.slice(0, 60)}...
          </p>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        disabled={isPending}
        onClick={(e) => handleAdd(e, product?.images[0]?.id)}
        className="mt-2 cursor-pointer w-full py-2 border border-pink-500 text-pink-500 text-xs font-semibold rounded-xl hover:bg-pink-50 transition-colors flex items-center justify-center gap-1.5"
      >
        {isPending ? (
          <Loader2 className="w-3 h-3 animate-spin text-pink-500" />
        ) : (
          <ShoppingBag className="w-3 h-3" />
        )}
        <span>Add to Cart</span>
      </button>
    </div>
  );
}

export default ProductCard;





// //   return (
// //     // <section className="px-4 py-16 md:px-8 lg:px-12">
// //     <section className="container px-6 py-16 md:px-0">
// //       <div className="mx-auto max-w-7xl">
        
// //         {/* Section Header */}
// //         <div className="mb-10 flex items-end justify-between">
// //           <div>
// //             <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
// //               Our Collection
// //             </p>

// //             <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
// //               Featured Products
// //             </h2>

// //             <p className="mt-3 text-gray-500">
// //               Discover our most loved beauty and skincare products.
// //             </p>
// //           </div>

// //           <button className="hidden rounded-lg border border-pink-500 px-5 py-2.5 font-medium text-pink-600 transition hover:bg-pink-50 sm:block">
// //             View All
// //           </button>
// //         </div>

// //         {/* Product Grid */}
// //         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// //           {products.map((product) => (
// //             <ProductCard
// //               key={product.id}
// //               product={product}
// //             />
// //           ))}
// //         </div>

// //         {/* Mobile View All Button */}
// //         <div className="mt-8 flex justify-center sm:hidden">
// //           <button className="rounded-lg border border-pink-500 px-6 py-3 font-medium text-pink-600">
// //             View All Products
// //           </button>
// //         </div>

// //       </div>
// //     </section>
// //   );
// // };

// // export default FeaturedProducts;