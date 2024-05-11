// utils/getModelMetadata.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getModelMetadata(modelName: string) {
    const model = prisma[modelName];
    const modelMetadata = await model.findMany({
      // Add logic to fetch metadata, such as field types, required fields, etc.
      select: {
        name: true,
        type: true,
        isRequired: true,
      },
    });
    return modelMetadata;
}
