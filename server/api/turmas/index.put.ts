import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event);

  const nome = body.nome;
  
  const turma = await prisma.turma.update({
    where: {
      id: body.id
    },
    data: {
      nome: nome,
    }
  })


  return turma
})
