-- Elimina la base de datos y la vuelve a crear
DROP DATABASE IF EXISTS pagos_ss1;
CREATE DATABASE pagos_ss1;
-- Creamos el usuario si no existe
CREATE USER IF NOT EXISTS 'usuario_ss1' IDENTIFIED BY '12345';
GRANT ALL PRIVILEGES ON pagos_ss1.* TO 'usuario_ss1';
FLUSH PRIVILEGES;
