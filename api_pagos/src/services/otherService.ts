import { PrismaClient } from "@prisma/client";
import { UserToken } from "../models/usuario";
import { crearEmpresa, eliminarEmpresa, obtenerEmpresas, updateEmpresa } from "../repository/empresaRepository";
import e from "express";
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
