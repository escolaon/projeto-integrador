import path from "path";
import { readdirSync, readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __seedDir = path.join(__dirname, "seeds");
console.log(__seedDir);
function getSeeds(model) {

  try {
    
    const seed = path.join(__seedDir, `${model}.json`);
    const data = readFileSync(
      seed,
      "utf8"
    );
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function InsertItem(model, item) {
  try {
    if (!item) {
      return;
    }
    await prisma[model].create({ data: item });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function getAllModels() {
  try {
    const models = readdirSync(__seedDir);
    return models.map((model) => model.split(".")[0]);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

for (const model of getAllModels()) {
  const itens = getSeeds(model);
  if (!itens) {
    continue;
  }
  await prisma[model].deleteMany({ where: {} });
  for (const item of itens) {
    await InsertItem(model, item);
  }
}