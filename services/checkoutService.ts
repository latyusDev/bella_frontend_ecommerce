import { CheckoutValues } from "@/app/checkout/page";
import { apiClient } from "@/lib/axios";
import axios from "axios";

type AddressId = {
    shipping_address_id:number|null,
    payment_method:'paystack'
}

type CheckoutOrder = CheckoutValues | AddressId

export const checkoutService = {
    checkoutOrder: async (payload:CheckoutOrder) => {
          const response = await apiClient.post('/orders/checkout', payload);
          const data = await response?.data;
          console.log(data);
          return data;
  },
    checkoutDetails: async (payload: any) => {
          const response = await apiClient.get('/orders/checkout_details');
          const data = await response?.data;
          console.log(data);
          return data;
  },
    // getHeaderCategories: async () => {
    //     const response = await axios.get(`/categories/header_categories`);
    //     return response?.data;
    // }

}