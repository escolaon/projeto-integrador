import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default eventHandler(async (event) => {
  const session = await getServerSession(event)

  const email = session?.user?.email
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  })
  if (!usuario) {
    return null
  }
  return usuario
})