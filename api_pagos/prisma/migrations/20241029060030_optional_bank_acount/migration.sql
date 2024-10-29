-- DropForeignKey
ALTER TABLE `cuenta` DROP FOREIGN KEY `cuenta_id_entidad_financiera_fkey`;

-- AlterTable
ALTER TABLE `cuenta` MODIFY `id_entidad_financiera` INTEGER NULL,
    MODIFY `numero_cuenta` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `cuenta` ADD CONSTRAINT `cuenta_id_entidad_financiera_fkey` FOREIGN KEY (`id_entidad_financiera`) REFERENCES `entidad_financiera`(`id_entidad_financiera`) ON DELETE SET NULL ON UPDATE CASCADE;
