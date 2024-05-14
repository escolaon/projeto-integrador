import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
      const response = await prisma.usuario.findMany({
        where: { tipo: "professor" },
      });
      return response;
    } catch (error) {
      return {
        status: 500,
        body: error,
      }
    }
})
