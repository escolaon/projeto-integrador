-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "celular" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "celularResponsavel" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,
    CONSTRAINT "Aluno_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "professores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "disciplinas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "turmaId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    CONSTRAINT "Ocorrencia_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ocorrencia_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProfessorToTurma" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProfessorToTurma_A_fkey" FOREIGN KEY ("A") REFERENCES "professores" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfessorToTurma_B_fkey" FOREIGN KEY ("B") REFERENCES "Turma" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DisciplinaToTurma" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DisciplinaToTurma_A_fkey" FOREIGN KEY ("A") REFERENCES "disciplinas" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DisciplinaToTurma_B_fkey" FOREIGN KEY ("B") REFERENCES "Turma" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessorToTurma_AB_unique" ON "_ProfessorToTurma"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessorToTurma_B_index" ON "_ProfessorToTurma"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DisciplinaToTurma_AB_unique" ON "_DisciplinaToTurma"("A", "B");

-- CreateIndex
CREATE INDEX "_DisciplinaToTurma_B_index" ON "_DisciplinaToTurma"("B");
