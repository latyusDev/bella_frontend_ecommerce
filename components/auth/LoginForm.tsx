"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Cookies from 'js-cookie'
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
import { authService } from "@/services/authSevice"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { loginSchema } from "@/lib/validations/auth"



export function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useRouter();
      const handleShowPassword = () => {
      setShowPassword(!showPassword);
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "yunusabdullateef68@gmail.com",
      password: "11111111",
    },
  })

  const onSubmit = async(data: z.infer<typeof loginSchema>) => {
    setLoading(true);
      const result = await authService.login(data);
      if(result.status === 200){
            toast.success("Login successful!");
            navigate.push("/profile");
    }
      if(result.status === 401){
            const message = result?.response?.data?.message
            form.setError("email", { type: "manual", message });
            toast.error(message);
            setLoading(false);
    }
   
  }

  return (
    <Card className="w-full sm:max-w-lg shadow- px-5">
        <h1 className="text-center font-semibold text-xl">Login</h1>
        <p className="text-center text-muted-foreground">
          Provide your credentials to login
        </p>
      <CardContent className="bg-white">
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
           
          </FieldGroup>
        </form>
          <Button type="submit" form="login-form" className="py-5 w-full mt-7 cursor-pointer">
            {
                loading ? <span className="flex items-center animate-pulse"> <Loader2 className="animate-spin mr-2 h-4 w-4" /> Logging in...</span>: <span>Login</span>
            }
          </Button>
      </CardContent>
    
    </Card>
  )
}
