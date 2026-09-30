import {z} from "zod";

export const checkoutSchema = z.object({
  full_name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  address_line_1: z.string().min(5, "Enter your address"),
  address_line_2: z.string().optional(),
  city: z.string().min(2, "Enter a city"),
  state: z.string().min(2, "Enter a state"),
  country: z.string().min(2, "Enter a country"),
  postal_code: z.string().min(3, "Enter a postal code"),
  save_address: z.boolean(),
  label: z.enum(["Home", "Office", "Other"]),
  payment_method: z.enum(["paystack", "opay", "flutterwave"]),
  notes: z.string().optional(),
})