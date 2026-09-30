"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Building,
  Map,
  Globe,
  Tag,
  Home as HomeIcon,
  Briefcase,
  Lock,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  PlusCircle,
  Landmark,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { checkoutService } from "@/services/checkoutService";
import { useCheckoutDetails } from "@/hooks/useCheckout";
import SectionLoader from "@/components/loaders/SectionLoader";
import { countries, Country } from "@/lib/data";
import Link from "next/link";
import EmptyCheckout from "@/components/cart/EmptyCheckout";

// ---- Zod Schema Matching API Payload ----
const checkoutSchema = z.object({
  full_name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  address_line_1: z.string().min(5, "Enter your address"),
  address_line_2: z.string().optional(),
  city: z.string().min(2, "Enter a city"),
  state: z.string().min(2, "Enter a state"),
  country: z.string().min(2, "Select a country"),
  postal_code: z.string().min(3, "Enter a valid postal code"),
  save_address: z.boolean().default(false),
  label: z.enum(["Home", "Office", "Other"]),
  payment_method: z.enum(["paystack"]),
  notes: z.string().optional(),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

interface SavedAddress {
  id: number;
  label: string;
  isDefault?: boolean;
  address: string;
  phone: string;
}

const savedAddressesList: SavedAddress[] = [
  {
    id: 1,
    label: "Home",
    isDefault: true,
    address: "12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
    phone: "+234 801 234 5678",
  },
  {
    id: 2,
    label: "Office",
    isDefault: false,
    address: "No. 45 Isaac John Street, Ikeja, Lagos, Nigeria",
    phone: "+234 802 345 6789",
  },
];

const orderItems = [
  {
    id: "1",
    name: "Glow Face Serum",
    size: "30ml",
    quantity: 1,
    price: 15000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Miss Belleza Eau De Parfum",
    size: "50ml",
    quantity: 1,
    price: 20000,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Brightening Face Cream",
    size: "50ml",
    quantity: 1,
    price: 12000,
    image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=300&auto=format&fit=crop",
  },
];

export default function CheckoutPage() {
  const [addressTab, setAddressTab] = useState<"new" | "saved">("saved");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useRouter();
  const { data: checkoutData, isLoading } = useCheckoutDetails();
  console.log(checkoutData,'checkoutData')

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      save_address: false,
      label: "Home",
      payment_method: "paystack",
      notes: "",
    },
  });

  // Handle Order with Existing Address
  const handleExistingAddressOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a saved address.");
      return;
    }
    console.log(selectedAddressId)

    setLoading(true);
    try {
      const response = await checkoutService.checkoutOrder({
        shipping_address_id: selectedAddressId,
        payment_method: "paystack",
      });
      toast.success(response?.message || "Payment initiated!");
      if (response?.authorization_url) {
        window.location.href = response.authorization_url;
      }
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "Payment failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Order with New Address Form
  const onSubmit = async (data: CheckoutValues) => {
    setLoading(true);
    try {
      const payload = {
        address: {
          full_name: data.full_name,
          phone: data.phone,
          email: data.email,
          address_line_1: data.address_line_1,
          address_line_2: data.address_line_2,
          city: data.city,
          state: data.state,
          country: data.country,
          postal_code: data.postal_code,
          save_address: data.save_address,
          label: data.label,
        },
        payment_method: data.payment_method,
        notes: data.notes,
        amount: checkoutData?.total ,
      };
    console.log(payload,'payload')

      const response = await checkoutService.checkoutOrder(payload);
      toast.success(response?.message || "Payment initiated!");
      if (response?.authorization_url) {
        window.location.href = response.authorization_url;
      }
    } catch (err: any) {
      const message = err?.response?.data?.message ?? "Payment failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };


  const subTotalAmount = checkoutData?.total 
  const totalAmount = checkoutData?.total + 1500
  const cartCount = checkoutData?.count
  const _orderItems = checkoutData?.cart?.items 
  const _savedAddresses = checkoutData?.defaultShippingAddress
  const isEmptyCart = checkoutData?.cart?.length === 0

  return (
    <div className="relative min-h-screen bg-gray-50/30 text-gray-800 font-sans">
    {
      isLoading ? <p>Loading...</p> :
      <>

      {
          isEmptyCart ?
        <EmptyCheckout heading="Your Checkout is Empty"/> :
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <a href="#" className="hover:underline">Home</a>
          <span>&gt;</span>
          <a href="#" className="hover:underline">Cart</a>
          <span>&gt;</span>
          <span className="text-pink-500 font-medium">Checkout</span>
        </nav>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-xs text-gray-500 mt-1">
            Complete your order by providing your shipping details and payment method.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Address & Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900">Delivery Address</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Choose a saved address or add a new one
                </p>
              </div>

              {/* Tab Toggle */}
              <div className="grid grid-cols-2 gap-4">
                 <button
                  type="button"
                  onClick={() => setAddressTab("saved")}
                  className={`flex items-center justify-center cursor-pointer gap-2  p-3 rounded-xl border text-xs font-semibold transition-all ${
                    addressTab === "saved"
                      ? "border-pink-500 bg-pink-50/50 text-pink-500"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Use Saved Address</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAddressTab("new")}
                  className={`flex items-center cursor-pointer justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    addressTab === "new"
                      ? "border-pink-500 bg-pink-50/50 text-pink-500"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Use New Address</span>
                </button>
               
              </div>

              {/* SAVED ADDRESSES LIST */}
              {addressTab === "saved" && (
                <div className="space-y-3 pt-2">
                  {_savedAddresses?.map((savedAddress) => (
                    <div
                      key={savedAddress.id}
                      onClick={() => setSelectedAddressId(savedAddress.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        selectedAddressId === savedAddress.id
                          ? "border-pink-500 bg-pink-50/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="saved_address"
                        checked={selectedAddressId === savedAddress.id}
                        onChange={() => setSelectedAddressId(savedAddress.id)}
                        className="mt-1 text-pink-500 focus:ring-pink-500"
                      />
                      <div className="flex-1 text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{savedAddress.label}</span>
                          {savedAddress.is_default && (
                            <span className="bg-pink-100 text-gray-600 px-2 py-0.5 rounded text-[10px]">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{savedAddress.address_line_1}{savedAddress?.address_line_1?.includes(savedAddress?.state)?'':', '+savedAddress.state}</p>
                        <p className="text-gray-400">{savedAddress.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* NEW ADDRESS FORM */}
              {addressTab === "new" && (
                <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup className="space-y-4">
                    {/* Full Name & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        name="full_name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="full_name" className="text-xs font-semibold text-gray-700">
                              Full Name <span className="text-pink-500">*</span>
                            </FieldLabel>
                            <div className="relative">
                              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              <Input
                                {...field}
                                id="full_name"
                                placeholder="Enter your full name"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus-visible:border-pink-500 focus-visible:ring-0 focus-visible:ring-pink-500 aria-invalid:border-pink-500 aria-invalid:ring-pink-500/20 transition-colors"
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />

                      <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="phone" className="text-xs font-semibold text-gray-700">
                              Phone Number <span className="text-pink-500">*</span>
                            </FieldLabel>
                            <div className="relative">
                              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              <Input
                                {...field}
                                id="phone"
                                type="tel"
                                placeholder="Enter phone number"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus-visible:border-pink-500 focus-visible:ring-0 focus-visible:ring-pink-500 aria-invalid:border-pink-500 aria-invalid:ring-pink-500/20 transition-colors"
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    </div>

                    {/* Email */}
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="email" className="text-xs font-semibold text-gray-700">
                            Email Address <span className="text-pink-500">*</span>
                          </FieldLabel>
                          <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              placeholder="Enter email address"
                              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus-visible:border-pink-500 focus-visible:ring-0 focus-visible:ring-pink-500 aria-invalid:border-pink-500 aria-invalid:ring-pink-500/20 transition-colors"
                            />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {/* Address Line 1 */}
                    <Controller
                      name="address_line_1"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="address_line_1" className="text-xs font-semibold text-gray-700">
                            Address Line 1 <span className="text-pink-500">*</span>
                          </FieldLabel>
                          <div className="relative">
                            <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <Input
                              {...field}
                              id="address_line_1"
                              placeholder="House number, street name, apartment, etc."
                              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus-visible:border-pink-500 focus-visible:ring-0 focus-visible:ring-pink-500 aria-invalid:border-pink-500 aria-invalid:ring-pink-500/20 transition-colors"
                            />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {/* Address Line 2 */}
                    <Controller
                      name="address_line_2"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="address_line_2" className="text-xs font-semibold text-gray-700">
                            Address Line 2 <span className="text-gray-400 font-normal">(Optional)</span>
                          </FieldLabel>
                          <div className="relative">
                            <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <Input
                              {...field}
                              id="address_line_2"
                              placeholder="Apartment, suite, unit, building name, etc."
                              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus-visible:border-pink-500 focus-visible:ring-0 focus-visible:ring-pink-500 aria-invalid:border-pink-500 aria-invalid:ring-pink-500/20 transition-colors"
                            />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {/* City / State / Country */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="city" className="text-xs font-semibold text-gray-700">
                              City <span className="text-pink-500">*</span>
                            </FieldLabel>
                            <div className="relative">
                              <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              <Input
                                {...field}
                                id="city"
                                placeholder="Enter city"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus-visible:border-pink-500 focus-visible:ring-0 focus-visible:ring-pink-500 aria-invalid:border-pink-500 aria-invalid:ring-pink-500/20 transition-colors"
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />

                      <Controller
                        name="state"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="state" className="text-xs font-semibold text-gray-700">
                              State / Province <span className="text-pink-500">*</span>
                            </FieldLabel>
                            <div className="relative">
                              <Map className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              <Input
                                {...field}
                                id="state"
                                placeholder="Enter state"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus-visible:border-pink-500 focus-visible:ring-0 focus-visible:ring-pink-500 aria-invalid:border-pink-500 aria-invalid:ring-pink-500/20 transition-colors"
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />

                       <Controller
                            name="country"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                  htmlFor="country"
                                  className="text-xs cursor-pointer  font-semibold text-gray-700"
                                >
                                  Country <span className="text-pink-500">*</span>
                                </FieldLabel>

                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    id="country"
                                    className="w-full"
                                  >
                                    <SelectValue placeholder="Country" />
                                  </SelectTrigger>

                                  <SelectContent>
                                    <SelectGroup>
                                      {countries.map((country: Country) => (
                                        <SelectItem
                                          key={country.name}
                                          value={country.name}
                                          className="data-highlighted:bg-pink-100"
                                        >
                                          {country.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>

                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                    </div>

                    {/* Postal Code & Address Label */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        name="postal_code"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="postal_code" className="text-xs font-semibold text-gray-700">
                              Postal Code <span className="text-pink-500">*</span>
                            </FieldLabel>
                            <div className="relative">
                              <Tag className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              <Input
                                {...field}
                                id="postal_code"
                                placeholder="Enter postal code"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus-visible:border-pink-500 focus-visible:ring-0 focus-visible:ring-pink-500 aria-invalid:border-pink-500 aria-invalid:ring-pink-500/20 transition-colors"
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />

                       <Controller
                            name="label"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                  htmlFor="country"
                                  className="text-xs cursor-pointer font-semibold text-gray-700"
                                >
                                  Address Label <span className="text-pink-500">*</span>
                                </FieldLabel>

                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    id="country"
                                    className="w-full"
                                  >
                                    <SelectValue placeholder="Address Label" />
                                  </SelectTrigger>

                                  <SelectContent>
                                    <SelectGroup>
                                        <SelectItem
                                         className="data-highlighted:bg-pink-100"
                                          key={'Home'}
                                          value={'Home'}
                                          
                                        >
                                         Home
                                        </SelectItem>
                                        <SelectItem
                                         className="data-highlighted:bg-pink-100"
                                          key={'School'}
                                          value={'School'}
                                        >
                                         School
                                        </SelectItem>
                                        <SelectItem
                                         className="data-highlighted:bg-pink-100"
                                          key={'Office'}
                                          value={'Office'}
                                        >
                                         Office
                                        </SelectItem>
                                        <SelectItem
                                         className="data-highlighted:bg-pink-100"
                                          key={'Other'}
                                          value={'Other'}
                                        >
                                         Other
                                        </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>

                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                    </div>

                    {/* Delivery Note */}
                    <Controller
                      name="notes"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="notes" className="text-xs font-semibold text-gray-700">
                            Delivery Note <span className="text-gray-400 font-normal">(Optional)</span>
                          </FieldLabel>
                          <textarea
                            {...field}
                            id="notes"
                            rows={3}
                            placeholder="Add delivery note for the courier"
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors resize-none"
                          />
                          <p className="text-[10px] text-gray-400 mt-1">
                            E.g., Leave at the gate, call before delivery, etc.
                          </p>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </form>
              )}
            </div>

            {/* Place Order CTA Button */}
            <div className="space-y-3">
              <button
                type={addressTab === "new" ? "submit" : "button"}
                form={addressTab === "new" ? "checkout-form" : undefined}
                onClick={addressTab === "saved" ? handleExistingAddressOrder : undefined}
                disabled={loading}
                className="w-full cursor-pointer bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-semibold py-4 rounded-2xl text-sm transition-all flex items-center justify-between px-8 shadow-lg shadow-pink-500/20"
              >
                <div className="flex items-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  <span>Place Order</span>
                </div>
                <span className="font-extrabold text-base">₦{totalAmount}</span>
              </button>
              <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
                <span>Your payment is secure and encrypted</span>
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 col-start-1 md:col-start-5 space-y-6">
            <div className="bg-pink-100/50 rounded-2xl p-6 border border-pink-100 space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="space-y-4">
                {_orderItems?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-pink-100 shrink-0">
                        <img
                          src={item?.product?.images[0]?.url}
                          alt={item?.product?.name}
                          className="object-cover"
                        />
                        {/* <Image
                          src={item?.product?.images[0]}
                          alt={item?.product?.name}
                          fill
                          className="object-cover"
                        /> */}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900">{item?.product?.name}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">Qty: {item?.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      ₦{item?.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-pink-200/50" />

              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-gray-900">₦{subTotalAmount}</span>
                </div>
                {/* <div className="flex justify-between text-pink-500 font-medium">
                  <span>Discount</span>
                  <span>-₦3,000</span>
                </div> */}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-gray-900">₦1,500</span>
                </div>
              </div>

              <div className="border-t border-pink-200/50" />

              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-extrabold text-pink-500">₦{totalAmount}</span>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-pink-200/60 flex items-center gap-2 text-xs text-pink-500 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <div>
                  <span className="font-bold block text-[11px]">Secure Checkout</span>
                  <span className="text-[10px] text-gray-400">Your information is safe with us</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
              <h3 className="text-xs font-bold text-gray-900">Why shop with Belladama?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">100% Authentic Products</h4>
                    <p className="text-[10px] text-gray-400">Directly sourced from top skincare brands.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      }
      </>
    }
    </div>
  );
}






// "use client"

// import {useEffect}from "react"
// import { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Controller, useForm } from "react-hook-form"
// import { toast } from "sonner"
// import * as z from "zod"
// import { useRouter } from "next/navigation"
// import { Lock, Loader2, ShieldCheck, MapPin, Zap, Wallet, Landmark } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { checkoutService } from "@/services/checkoutService"
// import { useCheckoutDetails } from "@/hooks/useCheckout"
// import LatestShippingAddresses from "@/components/checkout/LatestShippingAddresses"
// import CheckoutItems, { CheckoutItemsProps } from "@/components/checkout/CheckoutItems"
// import Image from "next/image"
// import CheckoutLoader from "@/components/loaders/CheckoutLoader"
// import Link from "next/link"
// // ---- schema (matches required payload shape) ----
// const checkoutSchema = z.object({
//   full_name: z.string().min(2, "Enter your full name"),
//   phone: z.string().min(10, "Enter a valid phone number"),
//   email: z.string().email("Enter a valid email"),
//   address_line_1: z.string().min(5, "Enter your address"),
//   address_line_2: z.string().optional(),
//   city: z.string().min(2, "Enter a city"),
//   state: z.string().min(2, "Enter a state"),
//   country: z.string().min(2, "Enter a country"),
//   postal_code: z.string().min(3, "Enter a postal code"),
//   save_address: z.boolean(),
//   label: z.enum(["Home", "Office", "Other"]),
//   payment_method: z.enum(["paystack"]),
//   // payment_method: z.enum(["paystack", "opay", "flutterwave"]),
//   notes: z.string().optional(),
// })

// export type CheckoutValues = z.infer<typeof checkoutSchema>

// // ---- order data (swap with props / API data) ----
// interface OrderItem {
//   id: number
//   order_id: number
//   product_name: string
//   product_sku: string
//   price: string
//   quantity: number
//   subtotal: string
// }

// const order: OrderItem = {
//   id: 2,
//   order_id: 8,
//   product_name: "fresh",
//   product_sku: "1213qdewsdnm",
//   price: "40000.00",
//   quantity: 3,
//   subtotal: "120000.00",
// }

// const DELIVERY_FEE = 2500
// const formatCurrency = (value: number) =>
//   new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 2,
//   }).format(value)

// const paymentOptions = [
//   {
//     value: "paystack",
//     label: "Paystack",
//     description: "Pay with card, bank or transfer",
//     icon: Landmark,
//   }
//   // {
//   //   value: "opay",
//   //   label: "OPay",
//   //   description: "Pay with your OPay wallet",
//   //   icon: Wallet,
//   // },
//   // {
//   //   value: "flutterwave",
//   //   label: "Flutterwave",
//   //   description: "Pay with card, USSD or transfer",
//   //   icon: Zap,
//   // },
// ] as const


// export default function CheckoutPage() {
//   const [uiState,setUiState] = useState({
//     showFormAddress:false,
//     loading:false,
//     selectedAddressId:null as number | null
//   })
//   const navigate = useRouter()
//   const {data,isLoading} = useCheckoutDetails()
//   console.log(data,'checkout details')
//   const form = useForm<CheckoutValues>({
//     resolver: zodResolver(checkoutSchema),
//     defaultValues: {
//       full_name: "",
//       phone: "11111111111",
//       email: "yunusabdullateef95@gmail.com",
//       address_line_1: "43, Memudu Orile Iganmu Lagos",
//       address_line_2: "43, Memudu Orile Iganmu Lagos",
//       city: "Lagos",
//       state: "Lagos",
//       country: "Nigeria",
//       postal_code: "100001",
//       save_address: false,
//       label: "Home",
//       payment_method: "paystack",
//       notes: "Call before delivery.",
//     },
//     // defaultValues: {
//     //   full_name: "yunus aulaiman",
//     //   phone: "11111111111",
//     //   email: "yunusabdullateef95@gmail.com",
//     //   address_line_1: "43, Memudu Orile Iganmu Lagos",
//     //   address_line_2: "43, Memudu Orile Iganmu Lagos",
//     //   city: "Lagos",
//     //   state: "Lagos",
//     //   country: "Nigeria",
//     //   postal_code: "100001",
//     //   save_address: false,
//     //   label: "Home",
//     //   payment_method: "paystack",
//     //   notes: "Call before delivery.",
//     // },
//   })

//   const validateCheckout = !uiState.showFormAddress&&!uiState.selectedAddressId
//   // console.log(formState,'formState')
//   const subtotal = data?.total-1500
//   const total = data?.total
//   console.log(data,'data')
//   const handleExistingAddressOrder = async()=>{
//     // const data = {shipping_address_id:uiState.selectedAddressId,payment_method:'paystack'}
//      try{
//          const response =  await checkoutService.checkoutOrder({shipping_address_id:uiState.selectedAddressId,payment_method:'paystack'});
//         console.log(response)
//         window.location.href = response?.authorization_url ;
//         toast.success(response?.message || "Payment successful!")
//      }catch(error:any){
//          const message =
//         error?.response?.data?.message ?? "Payment failed. Please try again."
//         toast.error(message)
//      }


//   }

//   const onSubmit = async (data: CheckoutValues) => {

//   // const valid = await form.trigger();

//   // console.log("Is valid:", valid);
//   // console.log("Errors:", form.formState.errors);
//   // // console.log(form.formState.errors);

//     setUiState((prev) => ({ ...prev, loading: true }))
//     try {
//       const payload = {
//         address: {
//           full_name: data.full_name,
//           phone: data.phone,
//           email: data.email,
//           address_line_1: data.address_line_1,
//           address_line_2: data.address_line_2,
//           city: data.city,
//           state: data.state,
//           country: data.country,
//           postal_code: data.postal_code,
//           save_address: data.save_address,
//           label: data.label,
//         },
//         payment_method: data.payment_method,
//         notes: data.notes,
//         amount: total,
//       }

//       const response =  await checkoutService.checkoutOrder(payload);
//       console.log(response,'response')
//       toast.success(response?.message || "Payment successful!")
//       window.location.href = response?.authorization_url ;
//     } catch (err: any) {
//       const message =
//         err?.response?.data?.message ?? "Payment failed. Please try again."
//       toast.error(message)
//       setUiState((prev) => ({ ...prev, loading: false }))
//     }finally {
//       setUiState((prev) => ({ ...prev, loading: false }))
//     }
//   }

// //   useEffect(() => {
// //   console.log(form.formState.errors);
// // }, [form]);

// const handleActualAddress = () => {
//   setUiState((prev) => ({ ...prev, showFormAddress: !uiState.showFormAddress,selectedAddressId:null }))
//   console.log(uiState.selectedAddressId)
// }

// const isEmptyCart = data?.cart?.length === 0

//   return (
//     <section className="px-7">
//     {
//         isEmptyCart || <div className=" my-10  text-center">
//         <h2 className="text-2xl font-semibold">
//         Kindly checkout
//       </h2>
//         <p className="mb-s3">Select an existing shipping address, or scroll down to create a new address</p>

//     </div>
//     }
//     {
//       isLoading ? <CheckoutLoader/> : 
//       <>
//        {
//          isEmptyCart ? 
//          <div className="text-center mt-16">
//             <h1 className="text-2xl font-semibold ">Your cart is currently empty</h1>
//             <p>Nothing to checkout, click <Link href={'/'} className="text-blue-500">here</Link> to continue shopping</p>

//          </div>:
//         <div className="min-h-screen w-full bg-white  ">
//       <div className=" grid gap-6 lg:grid-cols-[1fr_360px]">
//         {/* ---------- LEFT: SHIPPING ADDRESS ---------- */}

//        <div>
//          {
//           uiState.showFormAddress ?   <Card >
//           <CardContent className="p-6 sm:p-8">
//             <div className="mb-6 flex items-center gap-2">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10">
//                 <MapPin className="h-4 w-4 text-black" />
//               </div>
//               <div>
//                 <h1 className="text-gray-900 text-lg font-semibold">
//                   Shipping Address
//                 </h1>
//                 <p className="text-gray-400 text-sm">
//                   Where should we deliver your order?
//                 </p>
//               </div>
//             </div>

              // <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)}>
              // <FieldGroup>
              //   {/* Full name / Phone */}
              //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              //     <Controller
              //       name="full_name"
              //       control={form.control}
              //       render={({ field, fieldState }) => (
              //         <Field data-invalid={fieldState.invalid}>
              //           <FieldLabel htmlFor="full_name" className="text-gray-600">
              //             Full Name
              //           </FieldLabel>
              //           <Input
              //             {...field}
              //             id="full_name"
              //             aria-invalid={fieldState.invalid}
              //             placeholder="John Doe"
              //             autoComplete="off"
              //             className="py-6 border-gray-200 "
              //           />
              //           {fieldState.invalid && (
              //             <FieldError errors={[fieldState.error]} />
              //           )}
              //         </Field>
              //       )}
              //     />
//                   <Controller
//                     name="phone"
//                     control={form.control}
//                     render={({ field, fieldState }) => (
//                       <Field data-invalid={fieldState.invalid}>
//                         <FieldLabel htmlFor="phone" className="text-gray-600">
//                           Phone Number
//                         </FieldLabel>
//                         <Input
//                           {...field}
//                           id="phone"
//                           aria-invalid={fieldState.invalid}
//                           placeholder="08012345678"
//                           autoComplete="off"
//                           type="tel"
//                           className="py-6 border-gray-200 "
//                         />
//                         {fieldState.invalid && (
//                           <FieldError errors={[fieldState.error]} />
//                         )}
//                       </Field>
//                     )}
//                   />
//                 </div>

//                 {/* Email */}
//                 <Controller
//                   name="email"
//                   control={form.control}
//                   render={({ field, fieldState }) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor="email" className="text-gray-600">
//                         Email
//                       </FieldLabel>
//                       <Input
//                         {...field}
//                         id="email"
//                         aria-invalid={fieldState.invalid}
//                         placeholder="john@example.com"
//                         autoComplete="off"
//                         className="py-6 border-gray-200 "
//                       />
//                       {fieldState.invalid && (
//                         <FieldError errors={[fieldState.error]} />
//                       )}
//                     </Field>
//                   )}
//                 />

//                 {/* Address line 1 & 2 */}
//                 <Controller
//                   name="address_line_1"
//                   control={form.control}
//                   render={({ field, fieldState }) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor="address_line_1" className="text-gray-600">
//                         Address Line 1
//                       </FieldLabel>
//                       <Input
//                         {...field}
//                         id="address_line_1"
//                         aria-invalid={fieldState.invalid}
//                         placeholder="12 Admiralty Way"
//                         autoComplete="off"
//                         className="py-6 border-gray-200 "
//                       />
//                       {fieldState.invalid && (
//                         <FieldError errors={[fieldState.error]} />
//                       )}
//                     </Field>
//                   )}
//                 />
//                 <Controller
//                   name="address_line_2"
//                   control={form.control}
//                   render={({ field, fieldState }) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor="address_line_2" className="text-gray-600">
//                         Address Line 2{" "}
//                         <span className="text-gray-400 font-normal">(optional)</span>
//                       </FieldLabel>
//                       <Input
//                         {...field}
//                         id="address_line_2"
//                         aria-invalid={fieldState.invalid}
//                         placeholder="Opposite GTBank"
//                         autoComplete="off"
//                         className="py-6 border-gray-200 "
//                       />
//                       {fieldState.invalid && (
//                         <FieldError errors={[fieldState.error]} />
//                       )}
//                     </Field>
//                   )}
//                 />

//                 {/* City / State */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <Controller
//                     name="city"
//                     control={form.control}
//                     render={({ field, fieldState }) => (
//                       <Field data-invalid={fieldState.invalid}>
//                         <FieldLabel htmlFor="city" className="text-gray-600">
//                           City
//                         </FieldLabel>
//                         <Input
//                           {...field}
//                           id="city"
//                           aria-invalid={fieldState.invalid}
//                           placeholder="Lekki"
//                           autoComplete="off"
//                           className="py-6 border-gray-200 "
//                         />
//                         {fieldState.invalid && (
//                           <FieldError errors={[fieldState.error]} />
//                         )}
//                       </Field>
//                     )}
//                   />
//                   <Controller
//                     name="state"
//                     control={form.control}
//                     render={({ field, fieldState }) => (
//                       <Field data-invalid={fieldState.invalid}>
//                         <FieldLabel htmlFor="state" className="text-gray-600">
//                           State
//                         </FieldLabel>
//                         <Input
//                           {...field}
//                           id="state"
//                           aria-invalid={fieldState.invalid}
//                           placeholder="Lagos"
//                           autoComplete="off"
//                           className="py-6 border-gray-200 "
//                         />
//                         {fieldState.invalid && (
//                           <FieldError errors={[fieldState.error]} />
//                         )}
//                       </Field>
//                     )}
//                   />
//                 </div>

//                 {/* Country / Postal code */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <Controller
//                     name="country"
//                     control={form.control}
//                     render={({ field, fieldState }) => (
//                       <Field data-invalid={fieldState.invalid}>
//                         <FieldLabel htmlFor="country" className="text-gray-600">
//                           Country
//                         </FieldLabel>
//                         <Input
//                           {...field}
//                           id="country"
//                           aria-invalid={fieldState.invalid}
//                           placeholder="Nigeria"
//                           autoComplete="off"
//                           className="py-6 border-gray-200 "
//                         />
//                         {fieldState.invalid && (
//                           <FieldError errors={[fieldState.error]} />
//                         )}
//                       </Field>
//                     )}
//                   />
//                   <Controller
//                     name="postal_code"
//                     control={form.control}
//                     render={({ field, fieldState }) => (
//                       <Field data-invalid={fieldState.invalid}>
//                         <FieldLabel htmlFor="postal_code" className="text-gray-600">
//                           Postal Code
//                         </FieldLabel>
//                         <Input
//                           {...field}
//                           id="postal_code"
//                           aria-invalid={fieldState.invalid}
//                           placeholder="100001"
//                           autoComplete="off"
//                           className="py-6 border-gray-200 "
//                         />
//                         {fieldState.invalid && (
//                           <FieldError errors={[fieldState.error]} />
//                         )}
//                       </Field>
//                     )}
//                   />
//                 </div>

//                 {/* Label (Home/Office/Other) */}
//                 <Controller
//                   name="label"
//                   control={form.control}
//                   render={({ field, fieldState }) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor="label" className="text-gray-600">
//                         Address Label
//                       </FieldLabel>
//                       <Select
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger
//                           id="label"
//                           className="py-6 border-gray-200 "
//                         >
//                           <SelectValue placeholder="Select a label" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Home">Home</SelectItem>
//                           <SelectItem value="Office">Office</SelectItem>
//                           <SelectItem value="Other">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       {fieldState.invalid && (
//                         <FieldError errors={[fieldState.error]} />
//                       )}
//                     </Field>
//                   )}
//                 />

//                 {/* Save address checkbox */}
//                 <Controller
//                   name="save_address"
//                   control={form.control}
//                   render={({ field }) => (
//                     <label className="flex items-center gap-2.5 cursor-pointer select-none">
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                         className="data-[state=checked]:bg-black data-[state=checked]:border-black"
//                       />
//                       <span className="text-sm text-gray-600">
//                         Save this address for future orders
//                       </span>
//                     </label>
//                   )}
//                 />

//                 {/* Delivery notes */}
//                 <Controller
//                   name="notes"
//                   control={form.control}
//                   render={({ field, fieldState }) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor="notes" className="text-gray-600">
//                         Delivery Notes{" "}
//                         <span className="text-gray-400 font-normal">(optional)</span>
//                       </FieldLabel>
//                       <Textarea
//                         {...field}
//                         id="notes"
//                         placeholder="Call before delivery."
//                         rows={3}
//                         className="border-gray-200  resize-none"
//                       />
//                       {fieldState.invalid && (
//                         <FieldError errors={[fieldState.error]} />
//                       )}
//                     </Field>
//                   )}
//                 />

//                 {/* Payment method */}
//                 <Controller
//                   name="payment_method"
//                   control={form.control}
//                   render={({ field }) => (
//                     <Field>
//                       <FieldLabel className="text-gray-600">
//                         Payment Method
//                       </FieldLabel>
//                       <div className="space-y-3">
//                         {paymentOptions.map((opt) => {
//                           const Icon = opt.icon
//                           const active = field.value === opt.value
//                           return (
//                             <button
//                               key={opt.value}
//                               type="button"
//                               onClick={() => field.onChange(opt.value)}
//                               className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-4 transition-colors ${
//                                 active
//                                   ? "border-black/20 bg-black/5"
//                                   : "border-gray-200 bg-white hover:border-black/30"
//                               }`}
//                             >
//                               <div className="flex items-center gap-3">
//                                 <div
//                                   className={`flex h-9 w-9 items-center justify-center rounded-full border ${
//                                     active
//                                       ? "bg-white border-emerald-200"
//                                       : "bg-gray-50 border-gray-200"
//                                   }`}
//                                 >
//                                   <Icon
//                                     className={`h-4 w-4 ${
//                                       active ? "text-black/20" : "text-gray-400"
//                                     }`}
//                                   />
//                                 </div>
//                                 <div className="text-left">
//                                   <p className="text-sm font-medium text-gray-900">
//                                     {opt.label}
//                                   </p>
//                                   <p className="text-xs text-gray-500">
//                                     {opt.description}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div
//                                 className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
//                                   active
//                                     ? "border-black/10 bg-black/30"
//                                     : "border-gray-300 bg-white"
//                                 }`}
//                               >
//                                 {active && (
//                                   <div className="h-2 w-2 rounded-full bg-white" />
//                                 )}
//                               </div>
//                             </button>
//                           )
//                         })}
//                       </div>
//                     </Field>
//                   )}
//                 />
//               </FieldGroup>
//             </form>
//           </CardContent>
//         </Card> : <LatestShippingAddresses addresses={data?.defaultShippingAddress} setUiState={setUiState} selectedAddressId={uiState.selectedAddressId} />
        
//         }
//         <Button className="mt-4 w-full py-5 rounded-md" onClick={handleActualAddress}>
//           {uiState.showFormAddress ? 'View Saved Addresses' : 'Add New Address'}
//         </Button>
//        </div>
      
// {/* opi */}
//         {/* ---------- RIGHT: ORDER SUMMARY ---------- */}
//         <div className="lg:sticky lg:top-10 h-fit">
//           <Card >
//             <CardContent className="p-6">
//               <h2 className="text-gray-900 font-semibold mb-4">
//                 Order Summary
//               </h2>

//               {
//                 data?.cart?.items.map((item:CheckoutItemsProps)=>(
//                     <CheckoutItems item={item} key={item.id} />
//                 ))
//               }

//               <div className="space-y-2 py-4 text-sm font-mono">
//                 <div className="flex justify-between text-gray-500">
//                   <span>Subtotal</span>
//                   <span className="text-gray-700">
//                     {formatCurrency(subtotal)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-gray-500">
//                   <span>Shipping Fee</span>
//                   <span className="text-gray-700">
//                     {formatCurrency(1500)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                 <span className="text-gray-500 text-sm uppercase tracking-wider font-mono">
//                   Total
//                 </span>
//                 <span className="text-black text-2xl font-bold font-mono">
//                   {formatCurrency(total)}
//                 </span>
//               </div>
                
//                       <h1 className=" text-gray-900 mt-4 pt-4 border-t border-gray-200">
//                         Payment Method
//                       </h1>
//                       <div className="space-y-3 mt-4">
//                         {paymentOptions.map((opt) => {
//                           const Icon = opt.icon
//                           // const active = field.value === opt.value
//                           return (
//                             <button
//                               type="button"
//                               // onClick={() => field.onChange(opt.value)}
//                               className={`w-full flsex flex-col  items-center justify-between`}
                          
//                             >

//                               <div className="flex items-center mb-2 gap-3">
//                                 <div className="text-left">
//                                   <p className="text-sm font-medium text-gray-600">
//                                     {opt.label}
//                                   </p>
//                                   <p className="text-xs text-gray-500">
//                                     {opt.description}
//                                   </p>
//                                 </div>
//                               </div>
//                               <Image height={100} width={100} className="w-full" alt='paystack-logo' src={'/paystack.png'}/>

//                               {/* <div
//                                 className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
//                                     "border-gray-300 bg-white"
//                                 }`}
//                               >
//                                 {!true && (
//                                   <div className="h-2 w-2 rounded-full bg-white" />
//                                 )}
//                               </div> */}
//                             </button>
//                           )
//                         })}
//                       </div>
//                     {/* </Field> */}
//                   {/* )} */}
//                 {/* /> */}
//                 {
//                   validateCheckout&&<p className="text-red-500 mt-3">Select an existing address or create new address</p>
//                 }

//              {
//               uiState.selectedAddressId ?  
//               // address id exist
//               <Button
//                 type="button"
//                 disabled={uiState.loading}
//                 onClick={handleExistingAddressOrder}
//                 className="w-full mt-6 py-6 cursor-pointer text-white font-semibold"
//               >
//                 {uiState.loading ? (
//                   <span className="flex items-center animate-pulse">
//                     <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                     Processing payment...
//                   </span>
//                 ) : (
//                   <span className="flex items-center">
//                     <Lock className="mr-2 h-4 w-4" />
//                     Pay {formatCurrency(total)}  
//                   </span>
//                 )}
//               </Button>:
//                <Button
//                 type="submit"
//                 form="checkout-form"
//                 disabled={uiState.loading}
//                 className="w-full mt-6 py-6  text-white font-semibold"
//               >
//                 {uiState.loading ? (
//                   <span className="flex items-center animate-pulse">
//                     <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                     Processing payment...
//                   </span>
//                 ) : (
//                   <span className="flex items-center">
//                     <Lock className="mr-2 h-4 w-4" />
//                     Pay {formatCurrency(total)} kk
//                   </span>
//                 )}
//               </Button>
//              }

//               <p className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mt-4">
//                 <ShieldCheck className="h-3.5 w-3.5 text-black" />
//                 Payments are encrypted and secure
//               </p>
//             </CardContent>
//           </Card>
          
//         </div>
//       </div>
//     </div>
//        }
//       </>
//     }
    
//     </section>
//   )
// }