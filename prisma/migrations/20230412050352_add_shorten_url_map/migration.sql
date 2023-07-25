/*
  Warnings:

  - You are about to drop the `OrderDetil` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OrderDetil";

-- CreateTable
CREATE TABLE "OrderDetail" (
    "id" SERIAL NOT NULL,
    "docNumber" TEXT,
    "menuCode" TEXT,
    "qty" TEXT,
    "statusDtl" TEXT,
    "createdBy" TEXT,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" TEXT,
    "lastModifiedDate" TIMESTAMP(3),

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortenUrlMap" (
    "id" SERIAL NOT NULL,
    "fullUrl" TEXT,
    "ShortenUrl" TEXT,
    "expiredDate" TEXT,
    "createdBy" TEXT,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" TEXT,
    "lastModifiedDate" TIMESTAMP(3),

    CONSTRAINT "ShortenUrlMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetail_docNumber_key" ON "OrderDetail"("docNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetail_menuCode_key" ON "OrderDetail"("menuCode");
