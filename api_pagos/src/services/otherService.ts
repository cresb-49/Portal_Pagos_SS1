import { PrismaClient } from "@prisma/client";
import { UserToken } from "../models/usuario";
import { crearEmpresa, eliminarEmpresa, obtenerEmpresas, updateEmpresa } from "../repository/empresaRepository";
import e from "express";
import { crearCuenta, eliminarCuentaById, obtenerCuentaById, obtenerCuentaPorIdCliente, updateCuenta } from "../repository/cuentaRepository";
const prisma = new PrismaClient()


export const getAllEmpresas = async () => {
    return await obtenerEmpresas(prisma);
}

export const deleteEmpresaById = async (id_empresa: number) => {
    return await eliminarEmpresa(id_empresa, prisma);
}


export const actualizardatosEmpresa = async (id_empresa: number, empresa: any) => {
    return await updateEmpresa(id_empresa, empresa, prisma);
}

export const createNewEmpresa = async (empresa: any) => {
    return await crearEmpresa(empresa, prisma);
}

//Acciones de la cuenta

export const deleteCuentaById = async (id_cuenta: number) => {
    try {
        await prisma.$transaction(async (prismaTransaction) => {
            await eliminarCuentaById(id_cuenta, prismaTransaction);
        });
    } catch (error) {
        throw error;
    }
}

export const actualizarDatosCuenta = async (id_cuenta: number, cuenta: any) => {
    try {
        await prisma.$transaction(async (prismaTransaction) => {
            await updateCuenta(id_cuenta, cuenta, prismaTransaction);
        });
    } catch (error: Error | any) {
        console.log(error.message);
        throw error;
    }
};

export const crearNuevaCuenta = async (cuenta: any) => {
    try {
        await prisma.$transaction(async (prismaTransaction) => {
            return await crearCuenta(cuenta, prismaTransaction);
        });
    } catch (error) {
        throw error;
    }
}

export const obtenerCuentaIdCliente = async (id_usuario: number) => {
    return await obtenerCuentaPorIdCliente(id_usuario, prisma);
}

export const obtenerCuentaId = async (id_cuenta: number) => {
    return await obtenerCuentaById(id_cuenta, prisma);
};
