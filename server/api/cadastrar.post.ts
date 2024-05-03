import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    const hashedSenha = await bcrypt.hash(body.senha, 10);
    const usuario = await prisma.usuario.create({
      data: {
        nome: body.nome,
        email: body.email,
        senha: hashedSenha,
        celular: body.celular,
      },
    });
    return usuario;
  } catch (error) {
    return error;
  }
})