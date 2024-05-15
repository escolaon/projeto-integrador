import { PrismaClient } from "@prisma/client"
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  
  const body = await readBody(event);
  
  try {
      const response = await prisma.ocorrencia.create({
        data: {
          turmaId: body.turmaId,
          turmaNome: body.turmaNome,
          alunoId: body.alunoId,
          alunoNome: body.alunoNome,
          professorId: body.professorId,
          professorNome: body.professorNome,
          disciplinaId: body.disciplinaId,
          disciplinaNome: body.disciplinaNome,
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