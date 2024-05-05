import { H3Event } from 'h3'
// @ts-ignore
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  const { idAluno, idTurma, idProfessor, idDisciplina } = await readBody(event);
  const novoAluno = await prisma.ocorrencia.create({
    data: {
      turma: {
        connect: { id: idTurma }
      },
      aluno: {
        connect: { id: idAluno }
      },
      professor: {
        connect: { id: idProfessor }
      },
      disciplina: {
        connect: { id: idDisciplina }
      },
    }
  });
  return (novoAluno);
})
