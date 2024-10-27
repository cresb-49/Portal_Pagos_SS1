-- DropForeignKey
ALTER TABLE `transaccion` DROP FOREIGN KEY `transaccion_id_cuenta_destino_fkey`;

-- AlterTable
ALTER TABLE `transaccion` MODIFY `id_cuenta_destino` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `transaccion` ADD CONSTRAINT `transaccion_id_cuenta_destino_fkey` FOREIGN KEY (`id_cuenta_destino`) REFERENCES `cuenta`(`id_cuenta`) ON DELETE SET NULL ON UPDATE CASCADE;
