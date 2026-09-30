import React from 'react'
import {useStoreCart} from '@/hooks/useCart'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Heart, Loader2, ShoppingBag, Star, Trash2 } from 'lucide-react'
import { useToggleWishlistProduct } from '@/hooks/useProduct'

const WishlistCard = ({ product }) => {
     const queryClient = useQueryClient()
    const { mutate: toggleWishlist } = useToggleWishlistProduct();
     
    const {mutate:addToCart,isPending} = useStoreCart()
        
      const handleAdd = (e: React.MouseEvent,imageId:number,productId:number) => {
        e.preventDefault();
         addToCart(
          {productId,quantity:1,imageId:imageId},
          {
            onSuccess:(response,_)=>{
              queryClient.invalidateQueries({queryKey:['carts']})
              toast.success('Wishlist item added to cart')
              console.log(response,'response')
    
            },
            onError:(error:any,context)=>{
              toast.success(error?.data?.message||'Try again later')
            }
    
          }
        );
      
      };

        const handleWishlist = (e: React.MouseEvent, id: number) => {
      toggleWishlist(
        { id },
        {
          onSuccess: (response) => {
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

    
  return (
    <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image & Wishlist Icon */}
                <div className="relative flex items-center justify-center bg-pink-50/30">
                  <img
                    src={product?.images?.[0]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    className="h-[200px] w-full object-cover"
                  />
                  <button
                    // onClick={() => removeItem(product.id)}
                    className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm text-pink-500 hover:text-pink-600"
                  >
                    <Heart className="w-4 h-4 fill-pink-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-2">{product.size}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                      <div className="flex text-pink-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-pink-500 stroke-none" />
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="font-bold text-slate-900 text-base mb-4">
                      ₦{Number(product.price).toLocaleString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                        disabled={isPending}
                      onClick={(e) => handleAdd(e, product.images[0]?.id || 0, product.id)}
                      className="flex-1 cursor-pointer bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      
                      {
                        isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin text-white" /> : 
                        <ShoppingBag className="w-3.5 h-3.5" />
                      }
                      Add to Cart
                    </button>
                    <button
                    disabled={isPending}
                      onClick={(e) => handleWishlist(e,product.id)}
                      className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-pink-500 hover:border-pink-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
  )
}

export default WishlistCard