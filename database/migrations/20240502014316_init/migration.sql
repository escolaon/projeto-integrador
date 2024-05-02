/*
  Warnings:

  - You are about to drop the column `id_turma` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `nome_responsavel` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `telefone_responsavel` on the `Aluno` table. All the data in the column will be lost.
  - Added the required column `nomeResponsavel` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefoneResponsavel` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turmaId` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefoneResponsavel" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,
    CONSTRAINT "Aluno_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("email", "endereco", "id", "nome", "telefone") SELECT "email", "endereco", "id", "nome", "telefone" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
