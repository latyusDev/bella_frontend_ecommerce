import { apiClient } from "@/lib/axios";

export const productService = {
    getFeaturedProducts: async () => {
          const response = await apiClient.get('/products/featured_products');
          const data = await response?.data;
          return data;
  },
    getSingleProduct: async (id:number) => {
          const response = await apiClient.get(`/products/${id}`);
          const data = await response?.data;
          console.log(data);
          return data;
  },
    getNewProducts: async (value?:string,page?:number) => {
        const response = await apiClient.get(`/products/new_products/${value}?page=${page}`);
        return response?.data;
    },
    getBestSellerProducts: async (value:string,page:number) => {
        const response = await apiClient.get(`/products/best_seller_products/${value}?page=${page}`,{
        });
        console.log(response,'best seller')
        return response?.data;
    },
    searchBestSellerProducts: async (page:number,query:string) => {
        const response = await apiClient.get(`/products/best_sellers/search`,{
        params: { page, query },
        });
        return response?.data;
    },
    searchNewProducts: async (page?:number,query?:string) => {
        const response = await apiClient.get(`/products/new_products/search`,{
        params: { page, query },
        });
        return response?.data;
    },
    searchProducts: async (query:string) => {
        const response = await apiClient.get(`/products/search/${query}`);
        return response?.data;
    },
    wishListProducts: async (page?: number) => {
        const response = await apiClient.get(`/wishlists?page=${page}`);
        return response?.data;
    },
    toggleWishListProduct: async (id: number) => {
        const response = await apiClient.post(`/wishlists/toggle/${id}`)
        return response?.data;
    },

}