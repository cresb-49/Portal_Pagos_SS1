/*
  Warnings:

  - Added the required column `id_estado_transaccion` to the `transaccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaccion` ADD COLUMN `id_estado_transaccion` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `EstadoTransaccion` (
    `id_estado_transaccion` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_estado_transaccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaccion` ADD CONSTRAINT `transaccion_id_estado_transaccion_fkey` FOREIGN KEY (`id_estado_transaccion`) REFERENCES `EstadoTransaccion`(`id_estado_transaccion`) ON DELETE RESTRICT ON UPDATE CASCADE;
