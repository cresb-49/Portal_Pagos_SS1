/*
  Warnings:

  - Added the required column `id_cuenta_owner` to the `transaccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaccion` ADD COLUMN `id_cuenta_owner` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `transaccion` ADD CONSTRAINT `transaccion_id_cuenta_owner_fkey` FOREIGN KEY (`id_cuenta_owner`) REFERENCES `cuenta`(`id_cuenta`) ON DELETE RESTRICT ON UPDATE CASCADE;
