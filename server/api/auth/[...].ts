// file: ~/server/api/auth/[...].ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/entrar',
  },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      async authorize(credentials: any) {
        const { email, senha } = credentials || {};

        if (!email || !senha) {
          console.error('Missing email or senha in credentials');
          return null;
        }

        try {
          const usuario = await prisma.usuario.findUnique({
            where: { email },
          });

          if (!usuario) {
            console.error('No user found with the provided email');
            return null;
          }

          const isSenhaCorreta = await bcrypt.compare(senha, usuario.senha);

          if (isSenhaCorreta) {
            return usuario;
          } else {
            console.error('Invalid password provided');
            return null;
          }
        } catch (error) {
          console.error('Error during user authorization:', error);
          return null;
        }
      },
    }),
  ],
});
