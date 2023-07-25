-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userCode" TEXT,
    "userName" TEXT,
    "password" TEXT,
    "fristName" TEXT,
    "lastName" TEXT,
    "point" TEXT,
    "btirthDay" TIMESTAMP(3),
    "email" TEXT,
    "telephone" TEXT,
    "active" TEXT,
    "createdBy" TEXT,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" TEXT,
    "lastModifiedDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "menuCode" TEXT,
    "nameFood" TEXT,
    "price" DECIMAL(65,30),
    "statusMenu" TEXT,
    "category" TEXT,
    "number" TEXT,
    "createdBy" TEXT,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" TEXT,
    "lastModifiedDate" TIMESTAMP(3),

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderHdr" (
    "id" SERIAL NOT NULL,
    "userCode" TEXT,
    "docNumber" TEXT,
    "employee" TEXT,
    "tableNumber" TEXT,
    "people" TEXT,
    "statusBill" TEXT,
    "createdBy" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" TEXT,
    "lastModifiedDate" TIMESTAMP(3),

    CONSTRAINT "OrderHdr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDetil" (
    "id" SERIAL NOT NULL,
    "docNumber" TEXT,
    "menuCode" TEXT,
    "qty" TEXT,
    "statusDtl" TEXT,
    "createdBy" TEXT,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" TEXT,
    "lastModifiedDate" TIMESTAMP(3),

    CONSTRAINT "OrderDetil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileIni" (
    "id" SERIAL NOT NULL,
    "sector" TEXT,
    "header" TEXT,
    "value" TEXT,
    "remark" TEXT,
    "valueType" TEXT,
    "createdBy" TEXT,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" TEXT,
    "lastModifiedDate" TIMESTAMP(3),

    CONSTRAINT "FileIni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "tableNumber" TEXT,
    "docNumber" TEXT,
    "emptyFlag" TEXT,
    "createdBy" TEXT,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedBy" TEXT,
    "lastModifiedDate" TIMESTAMP(3),

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userCode_key" ON "User"("userCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_telephone_key" ON "User"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "OrderHdr_userCode_key" ON "OrderHdr"("userCode");

-- CreateIndex
CREATE UNIQUE INDEX "OrderHdr_docNumber_key" ON "OrderHdr"("docNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetil_docNumber_key" ON "OrderDetil"("docNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetil_menuCode_key" ON "OrderDetil"("menuCode");

-- CreateIndex
CREATE UNIQUE INDEX "Table_docNumber_key" ON "Table"("docNumber");
