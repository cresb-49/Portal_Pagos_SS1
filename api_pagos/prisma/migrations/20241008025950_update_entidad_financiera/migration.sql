/*
  Warnings:

  - You are about to drop the column `correo` on the `entidad_financiera` table. All the data in the column will be lost.
  - You are about to drop the column `direccion` on the `entidad_financiera` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `entidad_financiera` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `entidad_financiera` DROP COLUMN `correo`,
    DROP COLUMN `direccion`,
    DROP COLUMN `telefono`;
