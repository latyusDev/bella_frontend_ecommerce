import { apiClient } from "@/lib/axios";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import Cookies from "js-cookie";
import z from "zod";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

const handleSetCookies = (token: string, user: User)=>{
  Cookies.set("token", token);
  Cookies.set("user", JSON.stringify(user));
}

export const authService = {
    login: async (data:z.infer<typeof loginSchema>) => {
          try {
            const response = await apiClient.post(`/login`, data);
          console.log(response);
          handleSetCookies(response?.data.token, response?.data.user);
          return response;
          }catch (error:any) {
            console.log(error);
            return error;
          }
  },
    register: async (data:z.infer<typeof registerSchema>) => {
        try{
            const response = await apiClient.post(`/register`, data);
          console.log(response);
          handleSetCookies(response?.data.token, response?.data.user);

          return response;
        }catch (error:any) {
            console.log(error);
            return error;
        }
  },
}

