/*
  Warnings:

  - You are about to drop the `_DisciplinaToTurma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `disciplinaId` on the `Ocorrencia` table. All the data in the column will be lost.
  - Added the required column `professorId` to the `Disciplina` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_DisciplinaToTurma_B_index";

-- DropIndex
DROP INDEX "_DisciplinaToTurma_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DisciplinaToTurma";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Disciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "professorId" INTEGER NOT NULL,
    CONSTRAINT "Disciplina_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Disciplina" ("id", "nome") SELECT "id", "nome" FROM "Disciplina";
DROP TABLE "Disciplina";
ALTER TABLE "new_Disciplina" RENAME TO "Disciplina";
CREATE TABLE "new_Ocorrencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "turmaId" INTEGER NOT NULL,
    "turmaNome" TEXT NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "alunoNome" TEXT NOT NULL,
    "professorId" INTEGER NOT NULL,
    "professorNome" TEXT NOT NULL,
    "disciplinaNome" TEXT NOT NULL,
    "notificacaoId" INTEGER,
    CONSTRAINT "Ocorrencia_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_notificacaoId_fkey" FOREIGN KEY ("notificacaoId") REFERENCES "Notificacao" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ocorrencia" ("alunoId", "alunoNome", "disciplinaNome", "id", "notificacaoId", "professorId", "professorNome", "turmaId", "turmaNome") SELECT "alunoId", "alunoNome", "disciplinaNome", "id", "notificacaoId", "professorId", "professorNome", "turmaId", "turmaNome" FROM "Ocorrencia";
DROP TABLE "Ocorrencia";
ALTER TABLE "new_Ocorrencia" RENAME TO "Ocorrencia";
PRAGMA foreign_key_check("Disciplina");
PRAGMA foreign_key_check("Ocorrencia");
PRAGMA foreign_keys=ON;
