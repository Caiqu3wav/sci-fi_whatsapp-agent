'use client'
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { User, Mail, Lock, Building, Globe } from "lucide-react"
import { Footer } from "@/app/components/sections/Footer"
import { languageOptions } from '@/app/utils/index'
import { signIn } from "next-auth/react";

// Define the form schema with validation
const signUpSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().max(15, {
    message: "Please enter your phone number.",
  }),
  language: z.string().min(1, {
    message: "Please specify your language.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password confirmation must be at least 6 characters long.",
  }),
  companyOption: z.enum(["create", "join"], {
    required_error: "Please select a company option.",
  }),
  companyName: z.string().optional(),
  companyCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
}).refine(
  (data) => {
    if (data.companyOption === "create") {
      return !!data.companyName;
    }
    if (data.companyOption === "join") {
      return !!data.companyCode;
    }
    return true;
  },
  {
    message: "Este campo é obrigatório.",
    path: ["companyName"],
  }
);

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpSucess, setSignUpSucess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      companyOption: "create",
      companyName: "",
      companyCode: "",
    },
  });

  // Watch for changes to the companyOption field
  const companyOption = form.watch("companyOption");

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    
    // This would be replaced with actual registration logic
    console.log(values);
    
    // Create object to send to backend
    const userData = {
      name: values.name,
      email: values.email,
      phone_number: values.phone,
      password: values.password,
      company: {
        name: values.companyName || "",
      },
      status: values.companyOption === "create" ? "APPROVED" : "PENDING",
      role: values.companyOption === "create" ? "ADMIN" : "USER",
    };
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        setSignUpSucess(true);
      }
    } catch (error) {
      setIsError(true);
      console.error("Error during registration:", error);
    } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="min-h-screen hero-bg flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6 text-white">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-gradient text-purple-800">Sci-Fi AI</span>
            </h1>
            <h2 className="mt-2 text-2xl font-semibold">Crie sua conta</h2>
            <p className="mt-2 text-gray-400">
              Entre para o futuro da comunicação inteligente
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full flex cursor-pointer items-center justify-center gap-2 border-gray-600 text-black bg-white hover:bg-white/40transition mt-4"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <svg className="h-5 w-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.52 1.22 8.95 3.21l6.69-6.69C35.64 2.56 30.24 0 24 0 14.64 0 6.74 5.4 2.9 13.26l7.91 6.15C13.18 13.53 18.22 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.14 24.5c0-1.54-.14-3.03-.4-4.47H24v8.47h12.55c-.55 2.95-2.2 5.45-4.67 7.14l7.24 5.63c4.25-3.93 6.67-9.72 6.67-16.77z"/>
              <path fill="#FBBC05" d="M10.81 28.21a14.94 14.94 0 010-8.43l-7.91-6.15A24.02 24.02 0 000 24c0 3.89.93 7.56 2.9 10.82l7.91-6.61z"/>
              <path fill="#34A853" d="M24 48c6.24 0 11.46-2.07 15.26-5.61l-7.24-5.63c-2.04 1.38-4.65 2.2-8.02 2.2-5.78 0-10.82-4.03-12.57-9.47l-7.91 6.61C6.74 42.6 14.64 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continuar com Google
          </Button>

          <div className="card-gradient rounded-xl p-8 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex items-center flex-col ">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2 border-b border-purple-500/20 pb-2">
                    <User className="h-5 w-5 text-purple-400" />
                    Informações Pessoais
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell us your Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input placeholder="Your name" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prefered language</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-3 h-5 w-5 text- z-10" />
                            <div className="pl-10">
                              <select
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="w-full appearance-none bg-white text-black border border-zinc-300 rounded px-4 py-2"
                              >
                                <option value="" disabled>Select your language</option>
                                {languageOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
 )}
/>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input placeholder="seu@email.com" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your phone number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input placeholder="(99) 99999-9999" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              type="password"
                              placeholder="******"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmação de senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              type="password"
                              placeholder="******"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-medium flex items-center gap-2 border-b border-purple-500/20 pb-2">
                    <Building className="h-5 w-5 text-purple-400" />
                    Informações da Empresa
                  </h3>

                  <FormField
                    control={form.control}
                    name="companyOption"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Escolha uma opção:</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="create" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Criar nova empresa
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="join" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Entrar em empresa existente
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {companyOption === "create" && (
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da empresa</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input 
                                placeholder="Nome da sua empresa" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {companyOption === "join" && (
                    <FormField
                      control={form.control}
                      name="companyCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código ou nome da empresa</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input 
                                placeholder="Código ou nome da empresa" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 mt-6" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registrando...
                    </span>
                  ) : (
                    "Criar conta"
                  )}
                </Button>
                    {isError && (
                       <p className="text-red-400 font-bold">Error registering</p>
                    )}
                    {signUpSucess && (
                       <p className="text-green-500 font-bold">Registered with success</p>
                    )}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-400">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300">
                      Faça login
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};