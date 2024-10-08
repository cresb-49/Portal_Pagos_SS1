import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding ...");
    // Seed your database here

    //Entidades Financieras
    await prisma.entidadFinanciera.create({
        data:{
            nombre: "Financiera A",
            codigo: "A",
        }
    })
    await prisma.entidadFinanciera.create({
        data:{
            nombre: "Financiera B",
            codigo: "B",
        }
    })
    // Tipos de Transacciones
    await prisma.tipoTransaccion.create({
        data:{
            nombre: "Credito",
        }
    });
    await prisma.tipoTransaccion.create({
        data:{
            nombre: "Debito",
        }
    });
    await prisma.tipoTransaccion.create({
        data:{
            nombre: "Retiro",
        }
    });
    //Estados de Transacciones
    await prisma.estadoTransaccion.create({
        data:{
            nombre: "Exitoso",
        }
    });
    await prisma.estadoTransaccion.create({
        data:{
            nombre: "Fallido",
        }
    });
    await prisma.estadoTransaccion.create({
        data:{
            nombre: "Pendiente",
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
