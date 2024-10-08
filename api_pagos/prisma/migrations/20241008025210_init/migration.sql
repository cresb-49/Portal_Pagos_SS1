-- CreateTable
CREATE TABLE `empresa` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    UNIQUE INDEX `usuario_nombre_usuario_key`(`nombre_usuario`),
    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cuenta` (
    `id_cuenta` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_entidad_financiera` INTEGER NOT NULL,
    `id_empresa` INTEGER NULL,
    `numero_cuenta` VARCHAR(191) NOT NULL,
    `saldo` DOUBLE NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    UNIQUE INDEX `cuenta_id_usuario_key`(`id_usuario`),
    UNIQUE INDEX `cuenta_id_empresa_key`(`id_empresa`),
    PRIMARY KEY (`id_cuenta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entidad_financiera` (
    `id_entidad_financiera` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_entidad_financiera`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_transaccion` (
    `id_tipo_transaccion` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_tipo_transaccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaccion` (
    `id_transaccion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_tipo_transaccion` INTEGER NOT NULL,
    `id_cuenta_origen` INTEGER NOT NULL,
    `id_cuenta_destino` INTEGER NOT NULL,
    `monto` DOUBLE NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_transaccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cuenta` ADD CONSTRAINT `cuenta_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cuenta` ADD CONSTRAINT `cuenta_id_entidad_financiera_fkey` FOREIGN KEY (`id_entidad_financiera`) REFERENCES `entidad_financiera`(`id_entidad_financiera`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cuenta` ADD CONSTRAINT `cuenta_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `empresa`(`id_empresa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaccion` ADD CONSTRAINT `transaccion_id_tipo_transaccion_fkey` FOREIGN KEY (`id_tipo_transaccion`) REFERENCES `tipo_transaccion`(`id_tipo_transaccion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaccion` ADD CONSTRAINT `transaccion_id_cuenta_origen_fkey` FOREIGN KEY (`id_cuenta_origen`) REFERENCES `cuenta`(`id_cuenta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaccion` ADD CONSTRAINT `transaccion_id_cuenta_destino_fkey` FOREIGN KEY (`id_cuenta_destino`) REFERENCES `cuenta`(`id_cuenta`) ON DELETE RESTRICT ON UPDATE CASCADE;
