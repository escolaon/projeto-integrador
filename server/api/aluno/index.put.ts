import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event);

  const nome = body.nome;
  const email = body.email;
  const endereco = body.endereco;
  const nomeResponsavel = body.nomeResponsavel;
  const celularResponsavel = body.celularResponsavel;
  const turmaId = body.turmaId;
  const emailResponsavel = body.emailResponsavel;
  const turmaNome = body.turmaNome;

  
  const aluno = await prisma.aluno.update({
    where: {
      id: body.id
    },
    data: {
      email: email,
      nome: nome,
      endereco: endereco,
      nomeResponsavel: nomeResponsavel,
      celularResponsavel: celularResponsavel,
      emailResponsavel: emailResponsavel,
      turmaId: turmaId,
      turmaNome: turmaNome
    }
  })


  return aluno
})