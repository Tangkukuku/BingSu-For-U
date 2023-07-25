/*
  Warnings:

  - You are about to alter the column `point` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "point" SET DATA TYPE INTEGER;
