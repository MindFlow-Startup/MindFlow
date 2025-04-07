/*
  Warnings:

  - You are about to drop the `psicologos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "psicologos";

-- CreateTable
CREATE TABLE "Psicologo" (
    "id" SERIAL NOT NULL,
    "crp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Psicologo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Psicologo_email_key" ON "Psicologo"("email");
