import { PrismaClient } from "@prisma/client"
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  
  const body = await readBody(event);
  
  try {
      const response = await prisma.usuario.create({
        data: {
          nome: body.nome,
          email: body.email,
          senha: "$2b$10$PmI51SqJpTJ4stgWqPZIyefKyeIckhIixW2QQmzDBG5L464jNYnKa", // Senha padrão "password"
          celular: body.celular,
          tipo: "professor",
        },
      });
      return response;
    } catch (error) {
      return {
        status: 500,
        body: error,
        headers: {
          "Content-Type": "application/json",
        },
      }
    }
})
