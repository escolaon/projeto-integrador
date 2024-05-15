import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event);
  console.log(body);

  const nome = body.nome;
  const email = body.email;
  const endereco = body.endereco;
  const nomeResponsavel = body.nomeResponsavel;
  const celular = body.celular;
  const celularResponsavel = body.celularResponsavel;
  const turmaId = body.turmaId;
  
  const aluno = await prisma.aluno.update({
    where: {
      id: body.id
    },
    data: {
      email: email,
      nome: nome,
      celular: celular,
      endereco: endereco,
      nomeResponsavel: nomeResponsavel,
      celularResponsavel: celularResponsavel,
      turmaId: turmaId
    }
  })


  return aluno
})
