import { PrismaClient } from "@prisma/client"
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  
  const body = await readBody(event);

  console.log(body);

  const nome = body.nome;
  const email = body.email;
  const celular = body.celular;
  

  const usuario = await prisma.usuario.create({
    data: {
      nome: nome,
      email: email,
      senha: "$2b$10$PmI51SqJpTJ4stgWqPZIyefKyeIckhIixW2QQmzDBG5L464jNYnKa", // Senha padrão password
      celular: celular,
      tipo: "professor",
    }
  })
  return usuario

})