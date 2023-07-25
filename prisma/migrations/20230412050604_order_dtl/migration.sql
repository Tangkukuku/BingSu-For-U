/*
  Warnings:

  - You are about to drop the `OrderDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OrderDetail";

-- CreateTable
CREATE TABLE "OrderDtl" (
    "id" SERIAL NOT NULL,
    "docNumber" TEXT,
    "menuCode" TEXT,
    "qty" TEXT,
    "statusDtl" TEXT,
    "createdBy" TEXT,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" TEXT,
    "lastModifiedDate" TIMESTAMP(3),

    CONSTRAINT "OrderDtl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderDtl_docNumber_key" ON "OrderDtl"("docNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OrderDtl_menuCode_key" ON "OrderDtl"("menuCode");
