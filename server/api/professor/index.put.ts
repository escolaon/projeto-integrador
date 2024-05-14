import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event);
  console.log(body);

  const nome = body.nome;
  const email = body.email;
  const celular = body.celular;
  
  const usuario = await prisma.usuario.update({
    where: {
      id: body.id
    },
    data: {
      email: email,
      nome: nome,
      celular: celular,
    }
  })


  return usuario
})
