// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { userService, User } from "@/services/userService";

import { productService } from "@/services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const productKeys = {
  all:(value:string,page:number)=>['category',value,page],
  featuredProducts: ["featured-products"] as const,
  singleProduct:(id:number)=>['single-product',id],
  wishlists:(page?:number)=>['wishlists',page],
  toggleWishlist:(id:number)=>['toggle-wishlist',id],
  newProducts: (page?:number,query?:string)=>["new-products",page,query],
  bestSellers:(page:number,value:string,query?:string)=>{
    if(query){
        return ["best-seller-products",page,query]
    }else{
        return ["best-seller-products",page,value]
    }
  },
  // headerCategory:['header-category'] as const,
  // singleCategoryKey: (slug: string) => ["category", slug]cx as const,
}


export const useFeaturedProducts = ()=> {
    return useQuery({
    queryKey: productKeys.featuredProducts,
    queryFn: ()=> productService.getFeaturedProducts(),
});
}

export const useSingleProduct =(id:number)=> useQuery({
    queryKey:productKeys.singleProduct(id),
    queryFn:()=>productService.getSingleProduct(id)
})
export const useNewProducts = (value?:string,page?:number,query?:string)=> {
    return useQuery({
    queryKey:productKeys.newProducts(page,query),
    queryFn: ()=> {
        if(query){
            return productService.searchNewProducts(page,query)
        }
        return productService.getNewProducts(value,page)
    },
});

}
export const useBestSellerProducts = (value:string,page:number,query?:string)=> {
    return useQuery({
    queryKey: productKeys.bestSellers(page,value,query),
    queryFn: ()=>{
        if(query){
            return productService.searchBestSellerProducts(page,query)
        }
        return  productService.getBestSellerProducts(value,page)
    },
});   
}

// export const useHeaderCategory = ()=> {
//     return useQuery({
//     queryKey: categoryKeys.headerCategory,
//     queryFn: productService.getHeaderCategories
// });
// }

export const useSearchProducts = (query:string)=>{
    return useQuery({
        queryKey:['search-products',query],
        queryFn:()=>productService.searchProducts(query),
        enabled:!!query
    })
}

export const useWishlistProducts = (page?:number)=>{
    return useQuery({
        queryKey:productKeys.wishlists(page),
        queryFn:()=>productService.wishListProducts(page),
        staleTime:60*1000*10
    })
}

export const useWishlistCounts = (page?:number)=>{
    return useQuery({
        queryKey:productKeys.wishlists(page),
        queryFn:()=>productService.wishListProducts(page),
        select:(data)=>data?.data?.total,
        staleTime:60*1000*10
    })
}


export const useToggleWishlistProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. Accept the optional product object so we can append full data optimistically
    mutationFn: ({ id }: { id: number; product?: any }) =>
      productService.toggleWishListProduct(id),

    onMutate: async ({ id, product }) => {
      // 2. Cancel all queries starting with 'wishlists' (handles pages/params)
      await queryClient.cancelQueries({ queryKey: ['wishlists'] });

      // 3. Snapshot previous queries using exact key matching
      const previousWishlists = queryClient.getQueriesData({ queryKey: ['wishlists'] });

      // 4. Optimistically update EVERY wishlist query match in cache
      queryClient.setQueriesData({ queryKey: ['wishlists'] }, (old: any) => {
        if (!old) return old;

        // Determine list location in Laravel payload structure
        const productsList = old?.data?.data || old?.data || [];

        // Check existence
        const exists = productsList.some((item: any) => item.id === id);

        // Append item or remove item
        const updatedProducts = exists
          ? productsList.filter((item: any) => item.id !== id)
          : [...productsList, product || { id, name: 'Loading...', price: 0, images: [] }];

        // Reconstruct cache object matching original structure
        if (old?.data?.data) {
          return {
            ...old,
            data: {
              ...old.data,
              data: updatedProducts,
              total: exists ? Math.max(0, old.data.total - 1) : old.data.total + 1,
            },
          };
        }

        if (old?.data) {
          return {
            ...old,
            data: updatedProducts,
          };
        }

        return updatedProducts;
      });

      // Return snapshot for rollback
      return { previousWishlists };
    },

    onError: (_err, _variables, context) => {
      // Rollback each saved query key snapshot on error
      if (context?.previousWishlists) {
        context.previousWishlists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      // Invalidate all wishlist queries to pull fresh server data
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
    },
  });
};

// export const useToggleWishlistProduct = ()=>{
// const queryClient = useQueryClient()

//     return useMutation({
//         mutationFn:({id}:{id:number})=>productService.toggleWishListProduct(id),
//         onMutate:async({id}:{id:number})=>{
//             await queryClient.cancelQueries({queryKey:['wishlists']})
//             const previousWishlists = queryClient.getQueryData(['wishlists'])
//             console.log(previousWishlists,'previousWishlists')
//             queryClient.setQueryData(['wishlists'],(old)=>{
//                 return old
                
//             })

//             return previousWishlists

//         }
        
//     })
// }