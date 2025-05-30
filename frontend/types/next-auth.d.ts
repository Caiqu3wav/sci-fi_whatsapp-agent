import { DefaultSession } from 'next-auth'

declare module "next-auth" {
    interface Session {
      user: {
        id: string
        name?: string | null
        email?: string | null
        role?: "ADMIN" | "USER"
        status?: "APPROVED" | "PENDING"
        companyId?: string | null
      } & DefaultSession["user"];
    }
  
    interface User {
      id: string
      name?: string | null
      email?: string | null
      role?: "ADMIN" | "USER"
      status?: "APPROVED" | "PENDING"
      companyId?: string | null
    }
  }