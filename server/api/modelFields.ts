import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getModelMetadata(modelName: string) {
    const model = prisma[modelName];
    const modelMetadata = await model.findMany({
    });
    return modelMetadata;
}


export default defineEventHandler(async (event) => {
  return getModelMetadata('Usuario');
})
