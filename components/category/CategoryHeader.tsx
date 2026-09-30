// import { Category } from '@/lib/data'
import React from 'react'
import { Product } from '../product/ProductCard';
export type Category = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  products: Product[]
};

const CategoryHeader = ({ categoryItem }: { categoryItem: Category }) => {
  console.log(categoryItem,'categoryItem')
  return (
    <div className="relative rounded-3xl overflow-hidden mb-10 h-60">
          <img src={categoryItem?.image_url} alt={categoryItem?.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <h1 className="font-display text-4xl font-bold text-white mb-2">{categoryItem?.name}</h1>
            <p className="text-white/80 max-w-lg text-sm leading-relaxed">{categoryItem?.description}</p>
          </div>
        </div>
  )
}

export default CategoryHeader