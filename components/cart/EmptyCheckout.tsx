import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyCheckout({heading,isWishlist = false}:{heading:string,isWishlist?:boolean}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm max-w-md w-full space-y-6 flex flex-col items-center">
        
        {/* Soft Pink Icon Circle */}
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 shadow-inner">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>

        {/* Messaging */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">{heading}</h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
            Looks like you haven't added any products to your {isWishlist ? 'wishlist':'cart'}  yet. Explore our collection to find your beauty essentials!
          </p>
        </div>

        {/* CTA Button */}
        <Link href="/all-products" className="w-full">
          <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-6 rounded-2xl text-xs transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 group">
            <span className="cursor-pointer">Continue Shopping</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}