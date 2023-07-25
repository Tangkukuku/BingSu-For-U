/*
  Warnings:

  - You are about to drop the column `fristName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fristName",
ADD COLUMN     "firstName" TEXT;
