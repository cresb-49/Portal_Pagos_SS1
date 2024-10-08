/*
  Warnings:

  - A unique constraint covering the columns `[numero_cuenta]` on the table `cuenta` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cuenta_numero_cuenta_key` ON `cuenta`(`numero_cuenta`);
