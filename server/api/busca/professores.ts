import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const response = await prisma.professor.findMany();
    return response;
  } catch (error) {
    throw new Error(`Erro ao carregar os professores: ${error}`);
  }
});