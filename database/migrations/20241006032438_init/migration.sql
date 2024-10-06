/*
  Warnings:

  - Added the required column `turmaNome` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "emailResponsavel" TEXT NOT NULL,
    "celularResponsavel" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "turmaNome" TEXT NOT NULL,
    CONSTRAINT "Aluno_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("celularResponsavel", "email", "emailResponsavel", "endereco", "id", "nome", "nomeResponsavel", "turmaId") SELECT "celularResponsavel", "email", "emailResponsavel", "endereco", "id", "nome", "nomeResponsavel", "turmaId" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
