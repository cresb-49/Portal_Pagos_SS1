import { PrismaClient } from "@prisma/client";

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
    console.log("Seeding finished.");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
