/*
  Warnings:

  - A unique constraint covering the columns `[tableNumber]` on the table `Table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Table_tableNumber_key" ON "Table"("tableNumber");
