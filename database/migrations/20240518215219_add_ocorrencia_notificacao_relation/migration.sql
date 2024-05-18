-- CreateTable
CREATE TABLE "Notificacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telefone" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ocorrencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "turmaId" INTEGER NOT NULL,
    "turmaNome" TEXT NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "alunoNome" TEXT NOT NULL,
    "professorId" INTEGER NOT NULL,
    "professorNome" TEXT NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "disciplinaNome" TEXT NOT NULL,
    "notificacaoId" INTEGER,
    CONSTRAINT "Ocorrencia_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_notificacaoId_fkey" FOREIGN KEY ("notificacaoId") REFERENCES "Notificacao" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ocorrencia" ("alunoId", "alunoNome", "disciplinaId", "disciplinaNome", "id", "professorId", "professorNome", "turmaId", "turmaNome") SELECT "alunoId", "alunoNome", "disciplinaId", "disciplinaNome", "id", "professorId", "professorNome", "turmaId", "turmaNome" FROM "Ocorrencia";
DROP TABLE "Ocorrencia";
ALTER TABLE "new_Ocorrencia" RENAME TO "Ocorrencia";
PRAGMA foreign_key_check("Ocorrencia");
PRAGMA foreign_keys=ON;
