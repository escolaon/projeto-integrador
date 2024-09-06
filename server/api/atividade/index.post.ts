import { PrismaClient } from "@prisma/client"
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  
  const body = await readBody(event);
  
  try {
      const response = await prisma.atividade.create({
        data: {
          nome: body.nome,
          dt: new Date(body.dt),
          nota: parseFloat(body.nota),
          turmaId: body.turmaId,
          alunoId: body.alunoId
        },
      });
      return response;
    } catch (error) {
      return {
        status: 500,
        body: error,
      }
    }
})