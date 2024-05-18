import { PrismaClient } from '@prisma/client';
import Alunos from '~/pages/alunos.vue';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { turmaId, alunoId, professorId, disciplinaId } = await readBody(event);
  
  const turma = await prisma.turma.findUnique({
    where: { id: turmaId },
    select: { nome: true }
  });
  
  const turmaNome = turma?.nome ?? '';
  
  const aluno = await prisma.aluno.findUnique({
    where: { id: alunoId },
    select: { nome: true, celularResponsavel: true }
  });
  
  const alunoNome = aluno?.nome ?? '';
  const alunoCelularResponsavel = aluno?.celularResponsavel ?? '';
  
  const professor = await prisma.usuario.findUnique({
    where: { id: professorId },
    select: { nome: true, Disciplina: { where: { professorId: professorId }, select: { nome: true } } }
  });
  
  const professorNome = professor?.nome ?? '';
  const disciplinaNome = professor?.Disciplina[0].nome ?? '';
      

  const mensagem = "Faltou na aula de " + disciplinaNome;

  // Verifica se já existe uma notificação pendente para o aluno
  let notificacao = await prisma.notificacao.findFirst({
    where: {
      status: 'pendente',
      ocorrencias: {
        some: {
          alunoId: alunoId
        }
      }
    }
  });

  // Se não existe, cria uma nova notificação
  if (!notificacao) {
    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId },
    });

    // Verifique se o aluno foi encontrado
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    notificacao = await prisma.notificacao.create({
      data: {
        celular: aluno.celularResponsavel,
        mensagem: mensagem,
        status: 'pendente',
        ocorrencias: {
          create: []
        }
      }
    });
  } else {
    // Atualiza a mensagem da notificação existente
    await prisma.notificacao.update({
      where: { id: notificacao.id },
      data: {
        mensagem: notificacao.mensagem + '\n' + mensagem
      }
    });
  }

  // Adiciona a ocorrência à notificação existente ou nova
  const ocorrencia = await prisma.ocorrencia.create({
    data: {
      turmaId: turmaId,
      turmaNome: turmaNome,
      alunoId: alunoId,
      alunoNome: alunoNome,
      professorId: professorId,
      professorNome: professorNome,
      disciplinaNome: disciplinaNome,
      notificacaoId: notificacao.id
    }
  });

  return ocorrencia;
});
