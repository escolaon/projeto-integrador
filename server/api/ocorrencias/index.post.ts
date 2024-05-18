// server/api/ocorrencias.post.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Criação de uma nova ocorrência
    const ocorrencia = await prisma.ocorrencia.create({
        data: {
            turmaId: body.turmaId,
            alunoId: body.alunoId,
            descricao: body.descricao,
            status: 'pendente'
        }
    });

    return ocorrencia;
});
