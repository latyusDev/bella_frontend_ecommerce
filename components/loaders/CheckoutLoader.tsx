import React from 'react'

const CheckoutLoader = () => {
  return (
    <div className='w-full'>
        <div className='flex flex-col md:flex-row gap-4'>
            <div className='md:flex-[0.7]'>
                <div className='rounded-sm h-70 mt-2 bg-gray-100 animate-pulse'></div>
                <div className='rounded-sm h-70 mt-4 bg-gray-100 animate-pulse'></div>
            </div>
            <div className='rounded-sm md:flex-[0.3] h-150 mt-2 bg-gray-100 animate-pulse'>
            </div>
        </div>
    </div>
  )
}

export default CheckoutLoader