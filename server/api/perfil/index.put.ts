import { PrismaClient } from "@prisma/client"
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event);

  const nome = body.nome;
  const email = body.email;
  const celular = body.celular;
  const senha = body.senha;

  const hashedPassword = await hash(senha, 10);
  
  const usuario = await prisma.usuario.update({
    where: {
      id: body.id
    },
    data: {
      email: email,
      nome: nome,
      celular: celular,
      senha: hashedPassword
    }
  })
  return {
    statusCode: 200,
    body: JSON.stringify(usuario)
  }
})
