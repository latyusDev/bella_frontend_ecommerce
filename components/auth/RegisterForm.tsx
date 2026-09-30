"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { registerSchema } from "@/lib/validations/auth"
import { authService } from "@/services/authSevice"
import Cookies from "js-cookie"




export function RegisterForm() {
    const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const navigate = useRouter();

      const handleShowPassword = () => {
      setShowPassword(!showPassword);
  }
  
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
    },
  })

    const onSubmit = async(data: z.infer<typeof registerSchema>) => {
    setLoading(true);
      const result = await authService.register(data);
      if(result.status === 201){
            toast.success("Registration successful!");
            navigate.push("/profile");
    }
      if(result.status === 422){
            const message = result?.response?.data?.message
            form.setError("email", { type: "manual", message });
            toast.error(message);
            setLoading(false);
    }
   
  }

  return (
    <Card className="w-full sm:max-w-lg shadow- px-5">
        <h1 className="text-center font-semibold text-xl">Register</h1>
        <p className="text-center text-muted-foreground">
          Provide your credentials to register
        </p>
      <CardContent className="bg-white">
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">
                   Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
                    autoComplete="off"
                    className="py-6"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    autoComplete="off"
                    className="py-6"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          
           <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    Password
                  </FieldLabel>
                  <div className='relative'>
                                        {
                                      showPassword ? <EyeOff
                                        onClick={handleShowPassword} 
                                        className="absolute z-20  cursor-pointer right-3  top-3 text-gray-400 " 
                                      />: <Eye
                                        onClick={handleShowPassword} 
                                        className="absolute z-20 cursor-pointer right-3  top-3 text-gray-400" 
                                      />
                                      }
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="off"
                    className="py-6"
                    type={showPassword ? "text" : "password"}
                  />
                    </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-phone">
                    Phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="07040834109"
                    autoComplete="off"
                    className="py-6"
                    type="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           
          </FieldGroup>
        </form>
          <Button type="submit" disabled={loading} form="register-form" className="py-5 w-full mt-7">
             {
                loading ? <span className="flex items-center animate-pulse"> <Loader2 className="animate-spin mr-2 h-4 w-4" /> Registering...</span>: <span>Register</span>
            }
          </Button>
      </CardContent>
    
    </Card>
  )
}
