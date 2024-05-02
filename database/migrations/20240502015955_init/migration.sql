-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "celular" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateTable Turma
CREATE TABLE "Turma" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "nome" TEXT NOT NULL
);

-- CreateTable Aluno
CREATE TABLE "Aluno" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "nome" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "endereco" TEXT NOT NULL,
  "nome_responsavel" TEXT NOT NULL,
  "telefone" TEXT NOT NULL,
  "telefone_responsavel" TEXT NOT NULL,
  "id_turma" INTEGER,
  FOREIGN KEY ("id_turma") REFERENCES "Turma"("id")
);