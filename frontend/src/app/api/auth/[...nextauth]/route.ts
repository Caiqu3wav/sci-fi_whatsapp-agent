import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { verifyPassword } from "../../../utils";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password", placeholder: "••••••••" }
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

        try{
        // Busca o usuário pelo email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;


        // Verifica a senha (considerando que você armazena a senha hasheada, como bcrypt)
        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          companyId: user.companyId, // já pensando em associar usuários às empresas
        };
      } catch (err) {
        console.error('Erro no authorize:', err);
        return null; // Nunca throw aqui
      }}
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.companyId = user.companyId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.companyId = token.companyId as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };