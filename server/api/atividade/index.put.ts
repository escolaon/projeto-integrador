import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event);

  const nome = body.nome;
  const alunoId = body.alunoId;
  const alunoNome = body.alunoNome
  const turmaId = body.turmaId;
  const turmaNome = body.turmaNome;
  const dt = new Date(body.dt);
  const nota = parseFloat(body.nota);
  const disciplinaId = body.disciplinaId;
  const disciplinaNome = body.disciplinaNome;
  
  const atividade = await prisma.atividade.update({
    where: {
      id: body.id
    },
    data: {
      nome: nome,
      dt: dt,
      nota: nota,
      turmaId: turmaId,
      turmaNome: turmaNome,
      alunoId: alunoId,
      alunoNome: alunoNome,
      disciplinaId: disciplinaId,
      disciplinaNome: disciplinaNome
    }
  })


  return atividade
})