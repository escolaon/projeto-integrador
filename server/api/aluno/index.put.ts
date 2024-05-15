import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event);
  console.log(body);

  const nome = body.nome;
  const email = body.email;
  const celular = body.celular;
  
  const aluno = await prisma.aluno.update({
    where: {
      id: body.id
    },
    data: {
      email: email,
      nome: nome,
      celular: celular,
    }
  })


  return aluno
})
