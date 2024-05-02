import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function salvarAluno(req, res) {
  try {
    console.log(req.body);
    const { nome, email, endereco, nomeResponsavel, celular, celularResponsavel, idTurma } = req.body;

    const novoAluno = await prisma.aluno.create({
      data: {
        nome: nome,
        email: email,
        endereco: endereco,
        nomeResponsavel: nomeResponsavel,
        celular: celular,
        celularResponsavel: celularResponsavel,
        turma: {
          connect: { id: idTurma }
        }
      }
    });
    res.status(200).json(novoAluno);
  } catch (error) {
    res.status(500).json({ error: `Erro ao salvar aluno no banco de dados: ${error.message}` });
  }
}
