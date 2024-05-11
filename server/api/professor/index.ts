import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
const professores = await prisma.usuario.findMany({
        where: { tipo: 'professor' },
      })
      return professores;
})