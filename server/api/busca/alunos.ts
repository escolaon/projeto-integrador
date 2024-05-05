import { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  try {
    const response = await prisma.aluno.findMany({
      where: { turmaId : event.params },
    });

    console.log(response);
    return response;
  } catch (error) {
    throw new Error(`Erro ao carregar os alunos da turma: ${error}`);
  }
});
