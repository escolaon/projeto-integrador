import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateNotificacao(id: number) {
    try {
        const response = await prisma.notificacao.update({
            where: { id },
            data: { status: 'enviada' },
        });
        return response;
    } catch (error) {
        return error;
    }
}

export default defineEventHandler(async (event) => {
    const { id } = await readBody(event);

    updateNotificacao(id);

});