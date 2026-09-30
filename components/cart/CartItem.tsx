import { useRemoveItemFromCart, useUpdateCartItemImage, useUpdateQuantity } from '@/hooks/useCart';
import { useStore } from '@/store/useStore';
import { useQueryClient } from '@tanstack/react-query';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

// types/cart.ts

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  price: number;
  original_price: string | null;
  short_description: string;
  description: string;
  rating: string;
  review_count: number;
  is_new: boolean;
  is_featured: boolean;
  is_best_seller: boolean;
  tags: string[] | null;
  stock: number;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
}

export interface CartItemProps {
  id: number;
  cart_id: number;
  product_id: number;
  name: string;
  quantity: number;
  price: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Cart {
  items: CartItem[];
}

type UpdateQuantity = {
  cartItemId:number,
  quantity: number,
  type:'increase'|'decrease'
}

const CartItem = ({item,cartCount}:{item:CartItemProps,cartCount:number}) => {
const { setCartCount } = useStore();
const {mutate:updateQuantity,isPending} = useUpdateQuantity()
const {mutate:removeFromCart} = useRemoveItemFromCart()

const queryClient = useQueryClient()

const handleRemoveItem = (cartItemId:number)=>{
    removeFromCart(
        {cartItemId},
        {
            onSuccess:()=>{
                toast.success('Item removed from cart')
            }
        }
    )
}

const handleUpdateQuantity = (data:UpdateQuantity) => {
  const quantity = data.type === 'increase'? data.quantity+1:data.quantity-1
    if (quantity < 0) return; 
    if(quantity > item?.product.stock){
        toast.error('Only ' + item?.product.stock + ' quantity is available')
        return
    }else{

      setTimeout(()=>{
        updateQuantity(
        { cartItemId:data.cartItemId, quantity },
        {
          onSuccess: () => toast.success('Quantity updated!'),
          onError: (err) => toast.error('Failed to update quantity'),
        }
      );
      },1000)
      
    }

  };



  return (

  <div
                    key={item.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Product Details & Image */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-pink-50/50 border border-gray-100 shrink-0">
                       {
                        item?.product?.images?.length > 0 && 
                           <img
                          src={item.product.images[0].url}
                          alt={item.name}
                          className="object-cover"
                        />
                       }
                        {/* <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        /> */}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {item.product.name}
                        </h3>
                        {/* <p className="text-xs text-gray-400">{item.product.size}</p> */}
                        <p className="text-sm font-bold text-pink-500">
                          ₦{item.product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
  
                    {/* Quantity Controls & Delete Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Picker */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          disabled={isPending}
                          onClick={() => handleUpdateQuantity({cartItemId:item.id, quantity:item.quantity,type:'decrease'})}
                          className="p-2 text-gray-400 hover:text-pink-500 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                        disabled={isPending}
                          onClick={() => handleUpdateQuantity({cartItemId:item.id, quantity:item.quantity,type:'increase'})}
                          className="p-2 text-gray-400 hover:text-pink-500 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
  
                      {/* Total Price for item */}
                      <div className="text-right min-w-[80px]">
                        <span className="text-sm font-bold text-pink-500">
                          ₦{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
  
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-pink-400 hover:text-pink-600 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
  )
}

export default CartItem


    //  <div key={item.product.id} className="bg-white rounded-2xl p-5 shadow-sm">
    //             <div className="flex gap-4">
    //               {/* Images */}
    //               <div className="flex flex-col gap-2">
    //                 <div className="w-24 h-24 rounded-xl overflow-hidden bg-mint flex-shrink-0">
    //                   <img src={item.product.images[selectedImage]?.url} alt={item.product.name} className="w-full h-full object-cover" />
    //                 </div>
    //                 {item.product.images.length > 1 && (
    //                   <div className="flex gap-1">
    //                     {item.product.images.map((img, i) =>{
    //                       return  (
    //                       <button
    //                         key={i}
    //                         onClick={() => handleChangeImage(i,img.id)}
    //                         className={`w-7 h-7 rounded-md cursor-pointer overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-teal" : "border-transparent"}`}
    //                       >
    //                         <img src={img?.url} alt="" className="w-full h-full object-cover" />
    //                       </button>
    //                     )
    //                     })}
    //                   </div>
    //                 )}
    //               </div>

    //               {/* Details */}
    //               <div className="flex-1 min-w-0">
    //                 <div className="flex items-start justify-between gap-2">
    //                   <div>
    //                     {/* <p className="text-xs text-teal capitalize mb-0.5">{item.product.category}</p> */}
    //                     <h3 className="font-semibold text-gray-900 text-sm">{item.product.name}</h3>
    //                     <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.product.description.substring(0,80)}...</p>
    //                     <Link href={`/product/${item.product.id}`} className="text-xs text-teal hover:underline mt-1 inline-block">Read more</Link>
    //                   </div>
    //                   <button onClick={() => handleRemoveItem(item.id)} className=" cursor-pointer text-gray-400 hover:text-primary transition-colors flex-shrink-0 p-1">
    //                     <Trash2 size={16} />
    //                   </button>
    //                 </div>

    //                 <div className="flex items-center justify-between mt-4">
    //                   <div className="flex items-center gap-2 bg-offwhite rounded-xl p-1">
    //                     <button onClick={()=>handleUpdateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm"><Minus size={12} /></button>
    //                     <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
    //                     <button onClick={()=>handleUpdateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center hover:bg-teal hover:text-white transition-colors shadow-sm"><Plus size={12} /></button>
    //                   </div>
    //                   {/* <div className="flex items-center gap-2 bg-offwhite rounded-xl p-1">
    //                     <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm"><Minus size={12} /></button>
    //                     <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
    //                     <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center hover:bg-teal hover:text-white transition-colors shadow-sm"><Plus size={12} /></button>
    //                   </div> */}
    //                   <div className="text-right">
    //                     <p className="font-bold text-gray-900">{(item.product.price  * item.quantity).toFixed(2)}</p>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Review Section */}
    //             {/* <div className="mt-4 pt-4 border-t border-gray-100">
    //               <p className="text-xs font-semibold text-gray-700 mb-2">Rate this product:</p>
    //               {(rs.submitted || existingRating) ? (
    //                 <div className="flex items-center gap-2">
    //                   <StarRating value={existingRating?.rating ?? rs.rating} size={16} readonly />
    //                   <span className="text-xs text-teal font-medium">✓ Review submitted</span>
    //                 </div>
    //               ) : (
    //                 <div className="space-y-2">
    //                   <StarRating
    //                     value={rs.rating}
    //                     size={18}
    //                     onChange={(v) => setReviewStates((prev) => ({ ...prev, [item.product.id]: { ...rs, rating: v } }))}
    //                   />
    //                   {rs.rating > 0 && (
    //                     <>
    //                       <textarea
    //                         rows={2}
    //                         placeholder="Share your thoughts (optional)..."
    //                         value={rs.text}
    //                         onChange={(e) => setReviewStates((prev) => ({ ...prev, [item.product.id]: { ...rs, text: e.target.value } }))}
    //                         className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-teal/50 resize-none"
    //                       />
    //                       <button onClick={() => submitReview(item.product.id)} className="text-xs bg-teal text-white px-4 py-1.5 rounded-lg hover:bg-teal/90 transition-colors">Submit Review</button>
    //                     </>
    //                   )}
    //                 </div>
    //               )}
    //             </div> */}
    //           </div>