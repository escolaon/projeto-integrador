import { PrismaClient } from "@prisma/client"
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  
  const body = await readBody(event);
  console.log(body)
  
  try {
      const response = await prisma.aluno.create({
        data: {
          nome: body.nome,
          email: body.email,
          endereco: body.endereco,
          nomeResponsavel: body.nomeResponsavel,
          celular: body.celular,
          celularResponsavel: body.celularResponsavel,
          turmaId: body.turmaId,
          turmaNome: body.turmaNome
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