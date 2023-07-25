/*
  Warnings:

  - The `price` column on the `OrderDtl` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `price` column on the `OrderHdr` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderDtl" DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(65,30) DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderHdr" DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(65,30) DEFAULT 0;
