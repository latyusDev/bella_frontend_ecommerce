import { apiClient } from "@/lib/axios";



export const cartService = {
    getCarts: async () => {
          const response = await apiClient.get(`/cart`);
          const data = await response?.data;
          console.log(data);
          return data;
  },
    storeCart: async (productId:number,quantity:number,imageId:number) => {
        try {
              const response = await apiClient.post(`/cart/add`,
            {product_id:productId,quantity,image_id:imageId});
          const data = await response?.data;
          console.log(data,'store');
          return data;
        } catch (error) {
            console.log(error)
            // throw(error)
            return error
        }
  },
    updateQuantity: async (id:number,quantity:number) => {
        const response = await apiClient.patch(`/cart/update/${id}`,{quantity});
        return response?.data;
    },
    updateCartItemImage: async (id:number,imageId:number) => {
        const response = await apiClient.patch(`/cart/change_image/${id}`,{image_id:imageId});
        return response?.data;
    },
    removeItemFromCart: async (id:number) => {
        const response = await apiClient.delete(`/cart/destroy/${id}`);
        return response?.data;
    },
    addToCart: async () => {
        const response = await apiClient.post(`/cart/add`);
          console.log(response)
        return response?.data;
    },
    getHeaderCategories: async () => {
        const response = await apiClient.get(`/categories/header_categories`);
        return response?.data;
    }

}