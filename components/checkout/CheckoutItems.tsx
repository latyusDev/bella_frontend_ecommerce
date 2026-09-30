import React from 'react'
import { Product } from '../cart/CartItem';
import Image from 'next/image';

export type CheckoutItemsProps = {
    cart_id:number;
    created_at:string;
    id:number;
    image_id:number;
    price:string;
    product: Product ;
    product_id:number;
    quantity:number;
    updated_at:string;
}

const CheckoutItems = ({item}: {item: CheckoutItemsProps}) => {
    const getItemImage = item.product.images.find((image) => image.id === item.image_id)?.url || '';
    console.log('getItemImage', getItemImage);
  return (
    <div className="flex items-start gap-3 py-3 border-b border-dashed border-emerald-200">
                <div className="w-12 h-12 rounded-lg bg-black/10 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                  {
                      item.product.images && item.product.images.length > 0 && 
                      <img src={getItemImage} alt={item.product.name} width={48} height={48} className="w-full h-full object-cover rounded-lg" />
                  }
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm font-medium capitalize">
                    {item.product.name}
                  </p>
                  <p className="text-gray-900 text-xs font-mono mt-0.5">
                    QTY: {item.quantity}
                  </p>
                </div>
                <span className="text-gray-700 text-sm font-mono">
                    ₦{item.price}
                </span>
              </div>
  )
}

export default CheckoutItems