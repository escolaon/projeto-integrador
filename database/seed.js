import path from "path";
import { readdirSync, readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __seedDir = path.join(__dirname, "seeds");

function getSeeds(filePath) {
  try {
    const data = readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (e) {
    console.error(`Error reading seed file ${filePath}:`, e);
    process.exit(1);
  }
}

async function insertItem(model, item) {
  try {
    if (!item) {
      return;
    }
    await prisma[model].create({ data: item });
  } catch (e) {
    console.error(`Error inserting item into ${model}:`, e);
    process.exit(1);
  }
}

async function seedModel(model, filePath) {
  const items = getSeeds(filePath);
  if (!items) {
    return;
  }
  // await prisma[model].deleteMany({ where: {} });
  for (const item of items) {
    await insertItem(model, item);
  }
}

(async function seed() {
  try {
    const seedFiles = readdirSync(__seedDir).sort();
    for (const seedFile of seedFiles) {
      const model = seedFile.split('_')[1].split('.')[0]; // Extract the model name
      const filePath = path.join(__seedDir, seedFile);
      await seedModel(model, filePath);
    }
    console.log("Seeding completed successfully.");
  } catch (e) {
    console.error("Seeding failed:", e);
  } finally {
    await prisma.$disconnect();
  }
})();
