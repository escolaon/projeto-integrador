import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const response = await prisma.disciplina.findMany();
    return response;
  } catch (error) {
    throw new Error(`Erro ao carregar as disciplinas: ${error}`);
  }
});