/*
  Warnings:

  - Added the required column `alunoNome` to the `Atividade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turmaNome` to the `Atividade` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Atividade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dt" DATETIME NOT NULL,
    "nota" REAL NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "turmaNome" TEXT NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "alunoNome" TEXT NOT NULL,
    CONSTRAINT "Atividade_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Atividade_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Atividade" ("alunoId", "dt", "id", "nome", "nota", "turmaId") SELECT "alunoId", "dt", "id", "nome", "nota", "turmaId" FROM "Atividade";
DROP TABLE "Atividade";
ALTER TABLE "new_Atividade" RENAME TO "Atividade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
