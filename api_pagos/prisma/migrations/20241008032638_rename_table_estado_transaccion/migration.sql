/*
  Warnings:

  - You are about to drop the `EstadoTransaccion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaccion` DROP FOREIGN KEY `transaccion_id_estado_transaccion_fkey`;

-- DropTable
DROP TABLE `EstadoTransaccion`;

-- CreateTable
CREATE TABLE `estado_transaccion` (
    `id_estado_transaccion` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_estado_transaccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaccion` ADD CONSTRAINT `transaccion_id_estado_transaccion_fkey` FOREIGN KEY (`id_estado_transaccion`) REFERENCES `estado_transaccion`(`id_estado_transaccion`) ON DELETE RESTRICT ON UPDATE CASCADE;
