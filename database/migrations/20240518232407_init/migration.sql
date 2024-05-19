/*
  Warnings:

  - Added the required column `alunoNome` to the `Notificacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turmaNome` to the `Notificacao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notificacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "turmaNome" TEXT NOT NULL,
    "alunoNome" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Notificacao" ("celular", "createdAt", "id", "mensagem", "status", "updatedAt") SELECT "celular", "createdAt", "id", "mensagem", "status", "updatedAt" FROM "Notificacao";
DROP TABLE "Notificacao";
ALTER TABLE "new_Notificacao" RENAME TO "Notificacao";
PRAGMA foreign_key_check("Notificacao");
PRAGMA foreign_keys=ON;
