// utils/getModelMetadata.ts
import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type PrismaModels = Prisma.ModelName;

export async function getModelMetadata(modelName: PrismaModels) {
  const model = (prisma as any)[modelName];
  if (!model) {
    throw new Error(`Model ${modelName} not found`);
  }
  
  const dmmf = (prisma as any)._dmmf.modelMap[modelName];
  if (!dmmf) {
    throw new Error(`Metadata for model ${modelName} not found`);
  }

  const modelMetadata = dmmf.fields.map((field: any) => ({
    name: field.name,
    type: field.type,
    isRequired: field.isRequired,
  }));

  return modelMetadata;
}