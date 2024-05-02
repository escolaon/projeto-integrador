import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function fetchTurmas() {
  try {
    const response = await prisma.turma.findMany();
    return response;
  } catch (error) {
    throw new Error(`Erro ao carregar as turmas: ${error}`);
  }
}
