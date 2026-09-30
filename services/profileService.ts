import { apiClient } from "@/lib/axios";
import axios from "axios";


export const profileService = {
    getUserProfileDetails: async () => {
          const response = await apiClient.get('/user/profile');
          const data = await response?.data;
          console.log(data);
          return data;
  }
    // getNewProducts: async (value:string) => {
    //     const response = await apiClient.get(` /products/new_products/${value}`);
    //     return response?.data;
    // },
    // getBestSellerProducts: async (value:string) => {
    //     const response = await apiClient.get(` /products/best_seller_products/${value}`);
    //     return response?.data;
    // }

}