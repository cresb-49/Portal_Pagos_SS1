import { Request, Response } from 'express';
import { apiResponse } from '../response/apiResponse';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { actualizarDatosCuenta, actualizardatosEmpresa, createNewEmpresa, deleteEmpresaById, getAllEmpresas } from '../services/otherService';
import { crearEmpresa } from '../repository/empresaRepository';

export const findAllEmpresas = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await getAllEmpresas();
        return apiResponse(res, HttpStatusCode.OK, 'Ok', data);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error signing up', null, error.message ?? 'Unknown error');
    }
}

export const deleteEmpresa = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const data = await deleteEmpresaById(Number(id));
        return apiResponse(res, HttpStatusCode.OK, 'Ok', data);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error signing up', null, error.message ?? 'Unknown error');
    }
}

export const actualizarEmpresa = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const data = await actualizardatosEmpresa(Number(id), req.body);
        return apiResponse(res, HttpStatusCode.OK, 'Ok', data);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error signing up', null, error.message ?? 'Unknown error');
    }
}

export const createEmpresa = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await createNewEmpresa(req.body);
        return apiResponse(res, HttpStatusCode.OK, 'Ok', data);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error signing up', null, error.message ?? 'Unknown error');
    }
}

//Acciones de la cuenta
export const updateDataCuenta = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const data = await actualizarDatosCuenta(Number(id), req.body);
        return apiResponse(res, HttpStatusCode.OK, 'Ok', data);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error signing up', null, error.message ?? 'Unknown error');
    }
}
