import { PrismaClient } from "@prisma/client"
import { H3Event } from 'h3'


const prisma = new PrismaClient()


export default defineEventHandler(async (event: H3Event) => {
  
  const body = await readBody(event);

  const id = body.user.id

  const disciplina = await prisma.disciplina.delete({
    where: {
      id: id
    }
  })
  
  return true
})