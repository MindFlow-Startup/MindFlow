/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Psicologo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Psicologo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Psicologo" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "especialidades" TEXT[];
