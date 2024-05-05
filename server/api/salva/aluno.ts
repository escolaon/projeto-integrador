import { H3Event } from 'h3'
// @ts-ignore
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  const { nome, email, endereco, nomeResponsavel, celular, celularResponsavel, idTurma } = await readBody(event);
  const novoAluno = await prisma.aluno.create({
    data: {
      nome,
      email,
      endereco,
      nomeResponsavel,
      celular,
      celularResponsavel,
      turma: {
        connect: { id: idTurma }
      }
    }
  });
  return (novoAluno);
})
