-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cuenta_portal` (
    `id_cuenta_portal` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_cuenta` VARCHAR(191) NOT NULL,
    `saldo` DOUBLE NOT NULL DEFAULT 0.0,
    `tipo_cuenta` VARCHAR(191) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado_cuenta` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `financiera_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_cuenta_portal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entidad_financiera` (
    `id_financiera` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_financiera` VARCHAR(191) NOT NULL,
    `tipo_financiera` VARCHAR(191) NOT NULL,
    `codigo_empresa` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_financiera`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaccion` (
    `id_transaccion` INTEGER NOT NULL AUTO_INCREMENT,
    `monto` DOUBLE NOT NULL,
    `tipo_transaccion` VARCHAR(191) NOT NULL,
    `fecha_transaccion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descripcion` VARCHAR(191) NOT NULL,
    `estado_transaccion` VARCHAR(191) NOT NULL,
    `cuenta_portal_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_transaccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movilizacion_fondos` (
    `id_movilizacion` INTEGER NOT NULL AUTO_INCREMENT,
    `monto` DOUBLE NOT NULL,
    `comision` DOUBLE NOT NULL DEFAULT 0.013,
    `fecha_movilizacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cuenta_portal_id` INTEGER NOT NULL,
    `financiera_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_movilizacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cuenta_portal` ADD CONSTRAINT `cuenta_portal_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cuenta_portal` ADD CONSTRAINT `cuenta_portal_financiera_id_fkey` FOREIGN KEY (`financiera_id`) REFERENCES `entidad_financiera`(`id_financiera`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaccion` ADD CONSTRAINT `transaccion_cuenta_portal_id_fkey` FOREIGN KEY (`cuenta_portal_id`) REFERENCES `cuenta_portal`(`id_cuenta_portal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movilizacion_fondos` ADD CONSTRAINT `movilizacion_fondos_cuenta_portal_id_fkey` FOREIGN KEY (`cuenta_portal_id`) REFERENCES `cuenta_portal`(`id_cuenta_portal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movilizacion_fondos` ADD CONSTRAINT `movilizacion_fondos_financiera_id_fkey` FOREIGN KEY (`financiera_id`) REFERENCES `entidad_financiera`(`id_financiera`) ON DELETE RESTRICT ON UPDATE CASCADE;
