import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  return await prisma.usuario.findMany({
    where: { tipo: "professor" },
  })
})