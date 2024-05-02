import { H3Event } from 'h3'
// @ts-ignore
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  const { email, senha } = await readBody(event);

  const usuario = await prisma.usuario.findUnique({
    where: { email },
  })

  if (!usuario) {
    return {
      status: 401,
      body: {
        error: 'Usuário não encontrado',
      },
    }
  }
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

  if (!senhaCorreta) {
    return {
      status: 401,
      body: {
        error: 'Senha incorreta',
      },
    }
  } else {
    return "sucesso"
  }
})
