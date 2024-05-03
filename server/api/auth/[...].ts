// file: ~/server/api/auth/[...].ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET ?? 'test-123',
  pages: {
    signIn: '/entrar',
  },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      async authorize(credentials: any) {
        const email = credentials?.email
        const senha = credentials?.senha
        const usuario = await prisma.usuario.findUnique({
          where: { email },
        })
        if (!usuario) {
          return null
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (senhaCorreta) {
          return usuario
        } else {
          console.error(
            'Warning: Malicious login attempt registered, bad credentials provided'
          )
          return null
        }
      },
    }),
  ],
});

