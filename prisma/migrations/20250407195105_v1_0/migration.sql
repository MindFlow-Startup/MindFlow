/*
  Warnings:

  - Changed the type of `dataNascimento` on the `psicologos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "psicologos" DROP COLUMN "dataNascimento",
ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL;
