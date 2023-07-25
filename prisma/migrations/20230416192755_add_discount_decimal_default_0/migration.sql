-- AlterTable
ALTER TABLE "OrderDtl" ADD COLUMN     "discount" DECIMAL(65,30) DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderHdr" ADD COLUMN     "discount" DECIMAL(65,30) DEFAULT 0;
