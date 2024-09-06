import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
      const response = await prisma.atividade.findMany();
      return response;
    } catch (error) {
      return {
        status: 500,
        body: error,
      }
    }
})
