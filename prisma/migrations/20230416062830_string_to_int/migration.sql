/*
  Warnings:

  - The `people` column on the `OrderHdr` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "OrderHdr" DROP COLUMN "people",
ADD COLUMN     "people" INTEGER;
