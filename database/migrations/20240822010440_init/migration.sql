/*
  Warnings:

  - You are about to drop the column `celularResponsavel` on the `Atividade` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Atividade` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `Atividade` table. All the data in the column will be lost.
  - You are about to drop the column `nomeResponsavel` on the `Atividade` table. All the data in the column will be lost.
  - Added the required column `dt` to the `Atividade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Atividade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nota` to the `Atividade` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Atividade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dt" DATETIME NOT NULL,
    "nota" REAL NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,
    CONSTRAINT "Atividade_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Atividade_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Atividade" ("alunoId", "id", "nome", "turmaId") SELECT "alunoId", "id", "nome", "turmaId" FROM "Atividade";
DROP TABLE "Atividade";
ALTER TABLE "new_Atividade" RENAME TO "Atividade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
