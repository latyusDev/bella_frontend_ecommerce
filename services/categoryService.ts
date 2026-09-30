import { apiClient } from "@/lib/axios";


export const categoryService = {
    getCategory: async (id:string,page:number) => {
          const response = await apiClient.get(`/categories/${id}?page=${page}`);
          const data = await response?.data;
          console.log(data);
          return data;
  },
    getHomeCategories: async () => {
          const response = await apiClient.get(`/categories/home_categories`);
          const data = await response?.data;
          console.log(data);
          return data;
  },
  getHeaderCategories: async () => {
      const response = await apiClient.get(`/categories/header_categories`);
      console.log(response,'response')
      return response?.data;
  },
  getSearchProductsInCategory: async (page: number = 1,slug:string, query: string) => {
  try {
    const response = await apiClient.get(`/categories/${slug}/product/search`, {
      params: { page, query },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

}