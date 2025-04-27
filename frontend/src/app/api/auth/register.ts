import prisma from "@/app/lib/prisma"
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return new Response(JSON.stringify({ error: "Usuário já existe" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return new Response(JSON.stringify(user), { status: 201 });
}