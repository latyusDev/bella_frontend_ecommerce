import React from 'react'

const ProductCardLoader = () => {
  return (
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
    {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse">
        <div className="aspect-square bg-gray-100" />
        <div className="p-4 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-4 bg-gray-100 rounded w-1/3 mt-3" />
        </div>
        </div>
    ))}
    </div>  )
}

export default ProductCardLoader