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
            nombre: "Financiera A",
            codigo: "A",
        }
    })
    await prisma.entidadFinanciera.create({
        data: {
            nombre: "Financiera B",
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
    //Cracion de un usuario cliente empresa 1
    await prisma.usuario.create({
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
    //Creamos un usuario administrador
    await prisma.usuario.create({
        data: {
            nombre_usuario: "admin",
            nombres: "Admin",
            apellidos: "Admin",
            email: "admnin@admin.com",
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
            saldo: 1000,
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
    //Creamos unas transacciones de ejemplo
    await prisma.transaccion.create({
        data: {
            monto: -100,
            descripcion: "Pago de Servicio 1",
            id_tipo_transaccion: 2,
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: cuenta2.id_cuenta,
            id_estado_transaccion: 1,
        }
    });
    await prisma.transaccion.create({
        data: {
            monto: 100,
            descripcion: "Pago de Servicio 2",
            id_tipo_transaccion: 1,
            id_cuenta_origen: cuenta2.id_cuenta,
            id_cuenta_destino: cuenta.id_cuenta,
            id_estado_transaccion: 1,
        }
    });
    await prisma.transaccion.create({
        data: {
            monto: -100,
            descripcion: "Pago de Servicio 3",
            id_tipo_transaccion: 3,
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: null,
            id_estado_transaccion: 1,
        }
    });
    await prisma.transaccion.create({
        data: {
            monto: -100,
            descripcion: "Pago de Servicio 3",
            id_tipo_transaccion: 3,
            id_cuenta_origen: cuenta.id_cuenta,
            id_cuenta_destino: null,
            id_estado_transaccion: 1,
        }
    });
    //Se asocia la cuenta de la empresa 1 a la entidad financiera A o B
    console.log("Seeding finished.");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
