-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `id_estado_usuario` INTEGER NULL;

-- CreateTable
CREATE TABLE `estado_usuario` (
    `id_estado_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_estado_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_estado_usuario_fkey` FOREIGN KEY (`id_estado_usuario`) REFERENCES `estado_usuario`(`id_estado_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;
