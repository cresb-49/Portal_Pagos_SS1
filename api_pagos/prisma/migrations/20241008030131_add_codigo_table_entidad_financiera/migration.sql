/*
  Warnings:

  - Added the required column `codigo` to the `entidad_financiera` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `entidad_financiera` ADD COLUMN `codigo` VARCHAR(191) NOT NULL;
