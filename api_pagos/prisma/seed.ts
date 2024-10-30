import { PrismaClient } from "@prisma/client";
import { EstadoUsuarioType } from "./../src/enums/estadoUsuarioType";
import { encrypt } from "./../src/utils/encryptUtil"
import { RolType } from "./../src/enums/rolType"

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding ...");
    // Seed your database here

    //Entidades Financieras
    await prisma.entidadFinanciera.create({
        data: {
            nombre: "Portal Financiero Cuentas Bancarias",
            codigo: "A",
        }
    })
    await prisma.entidadFinanciera.create({
        data: {
            nombre: "Portal Financiero Tarjeta de Crédito",
            codigo: "B",
        }
    })
    // Tipos de Transacciones
    await prisma.tipoTransaccion.create({
        data: {
            nombre: "Credito",
        }
    });
    await prisma.tipoTransaccion.create({
        data: {
            nombre: "Debito",
        }
    });
    await prisma.tipoTransaccion.create({
        data: {
            nombre: "Retiro",
        }
    });
    //Estados de Transacciones
    await prisma.estadoTransaccion.create({
        data: {
            nombre: "Exitoso",
        }
    });
    await prisma.estadoTransaccion.create({
        data: {
            nombre: "Fallido",
        }
    });
    await prisma.estadoTransaccion.create({
        data: {
            nombre: "Pendiente",
        }
    });
    //Estado de Usuario [Activo, Inactivo, Bloqueado, Pendiente de Verificacion,Suspendido]
    await prisma.estadoUsuario.create({
        data: {
            nombre: "Activo",
        }
    });
    await prisma.estadoUsuario.create({
        data: {
            nombre: "Inactivo",
        }
    });
    await prisma.estadoUsuario.create({
        data: {
            nombre: "Bloqueado",
        }
    });
    await prisma.estadoUsuario.create({
        data: {
            nombre: "Pendiente de Verificacion",
        }
    });
    await prisma.estadoUsuario.create({
        data: {
            nombre: "Suspendido",
        }
    });
    // Roles de Usuario
    // Administrador, Cliente, Empleado
    await prisma.rol.create({
        data: {
            nombre: "Administrador",
        }
    });
    await prisma.rol.create({
        data: {
            nombre: "Cliente",
        }
    });
    await prisma.rol.create({
        data: {
            nombre: "Empleado",
        }
    });
    //Creamos la empresa Electric-Shop
    await prisma.empresa.create({
        data: {
            nombre: "Electric-Shop"
        }
    });

    //Cracion de un usuario cliente empresa 1
    const empresa = await prisma.usuario.create({
        data: {
            nombre_usuario: "Electric-Shop",
            nombres: " Electric-Shop",
            apellidos: "Cliente",
            email: "electricShop@gmail.com",
            password: await encrypt("12345"),
            id_estado_usuario: EstadoUsuarioType.ACTIVO,
            id_rol: RolType.CLIENTE,
        }
    });
    //Agregamos la cuenta de la empresa 1
    await prisma.cuenta.create({
        data: {
            numero_cuenta: "123b3421",
            saldo: 10000,
            id_usuario: empresa.id_usuario,
            id_entidad_financiera: 1,
        }
    });

    //Creamos un usuario administrador
    await prisma.usuario.create({
        data: {
            nombre_usuario: "admin",
            nombres: "Admin",
            apellidos: "Admin",
            email: "admin@admin.com",
            password: await encrypt("admin"),
            id_estado_usuario: EstadoUsuarioType.ACTIVO,
            id_rol: RolType.ADMINISTRADOR,
        }
    });
    //Creamos un usuario cliente para las pruebas
    let cliente = await prisma.usuario.create({
        data: {
            nombre_usuario: "cliente",
            nombres: "Cliente",
            apellidos: "Cliente",
            email: "cliente@cliente.com",
            password: await encrypt("12345"),
            id_estado_usuario: EstadoUsuarioType.ACTIVO,
            id_rol: RolType.CLIENTE,
        }
    });
    //Creamos un acuenta asociada al cliente
    let cuenta = await prisma.cuenta.create({
        data: {
            numero_cuenta: "123456789",
            saldo: 10000,
            id_usuario: cliente.id_usuario,
            id_entidad_financiera: 1,
        }
    });
    //Creamos un usuario cliente para las pruebas
    let cliente2 = await prisma.usuario.create({
        data: {
            nombre_usuario: "cliente2",
            nombres: "Cliente2",
            apellidos: "Cliente2",
            email: "cliente2@cliente2.com",
            password: await encrypt("12345"),
            id_estado_usuario: EstadoUsuarioType.ACTIVO,
            id_rol: RolType.CLIENTE,
        }
    });
    //Creamos un acuenta asociada al cliente
    let cuenta2 = await prisma.cuenta.create({
        data: {
            numero_cuenta: "123456709",
            saldo: 10000,
            id_usuario: cliente2.id_usuario,
            id_entidad_financiera: 1,
        }
    });
    //Generamos data de transacciones fallidas
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 2,
            descripcion: "Transferencia fallida",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });
    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta.id_cuenta,
            monto: -1000,
            id_tipo_transaccion: 2,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    await prisma.transaccion.create({
        data: {
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_cuenta_owner: cuenta2.id_cuenta,
            monto: 1000,
            id_tipo_transaccion: 1,
            id_estado_transaccion: 1,
            descripcion: "Transferencia Exitosa",
        }
    });

    console.log("Seeding finished.");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
