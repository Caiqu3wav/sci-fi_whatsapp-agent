'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Mail, Lock, LogIn } from "lucide-react";
import { Footer } from "@/app/components/sections/Footer";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email({
        message: "Type a valid e-mail.",
    }),
    password: z.string().min(6, {
        message: "Password must have at least 6 characters.",
    }),
})

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loginError, setLoginError] = useState('');
    const router = useRouter();
    const { status: sessionStatus } = useSession();

    useEffect(() => {
      setInterval(() => {
        if (sessionStatus === "authenticated") {
          router.replace("/");
        }
      }, 5000);
    }, [sessionStatus, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isValidEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    if (isValidEmail(values.email)) {
      setLoginError("Invalid email.");
      return;
    }

    if (!values.password || values.password.length < 8) {
      setLoginError("Invalid password(min 8 characters).");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: '/'
      });

      if (!res || res.ok !== true) {
        setLoginError("Email ou senha não corresponder.");
        return;
      }

      setSuccessMessage("Usuário logged with success!")
    } catch (error) {
      setLoginError("Error signing account");
      console.error("Sign in error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen hero-bg flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full text-white max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-gradient text-purple-800">Sci-Fi AI</span>
            </h1>
            <h2 className="mt-2 text-2xl font-semibold">Entre na sua conta</h2>
            <p className="mt-2 text-gray-400">
              Acesse sua central de agentes de WhatsApp
            </p>
          </div>

          <div className="card-gradient rounded-xl p-8 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="seu@email.com" 
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

                <div className="flex items-center justify-between">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Entrando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="h-5 w-5" />
                      Entrar
                    </span>
                  )}
                </Button>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-400">
                    Ainda não tem conta?{" "}
                    <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300">
                      Registre-se
                    </Link>
                  </p>

                  {loginError && <p style={{color: 'red'}}>{loginError}</p>}
                  {successMessage && <p style={{color: 'blue'}}>{successMessage}</p>}
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