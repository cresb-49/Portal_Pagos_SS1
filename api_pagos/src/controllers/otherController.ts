import { Request, Response } from 'express';
import { apiResponse } from '../response/apiResponse';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { actualizarDatosCuenta, actualizardatosEmpresa, createNewEmpresa, deleteEmpresaById, getAllEmpresas, reporte1, reporte2, reporte3, reporte4, reporte5 } from '../services/otherService';
import { crearEmpresa } from '../repository/empresaRepository';
import { generateTransactionPDF2_name_template } from '../services/pdfGenerator';
import { IncomeExpenseReport, TransaccionReport, UserStatusReport } from '../repository/reporteRepository';

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

//Seccion de reportes

export const getReport1 = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await reporte1();
        const payload: UserStatusReport = {
            fecha_generacion: new Date().toISOString(),
            total_estados: data.length,
            data: data
        }
        const pdfBuffer = await generateTransactionPDF2_name_template(payload, 'reporte1');
        const timestamp = new Date().getTime();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="transaction-${timestamp}.pdf"`);
        res.end(pdfBuffer);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Report Error', null, error.message ?? 'Unknown error');
    }
}

export const getReport2 = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await reporte2();
        const payload: TransaccionReport = {
            fecha_generacion: new Date().toISOString(),
            data: data
        }
        const pdfBuffer = await generateTransactionPDF2_name_template(payload, 'reporte2');
        const timestamp = new Date().getTime();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="transaction-${timestamp}.pdf"`);
        res.end(pdfBuffer);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Report Error', null, error.message ?? 'Unknown error');
    }
}

export const getReport3 = async (req: Request, res: Response): Promise<any> => {
    try {
        const { usuario_id, start_date, end_date } = req.body;
        const data = await reporte3(usuario_id, start_date, end_date);
        return apiResponse(res, HttpStatusCode.OK, 'Ok', data);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Report Error', null, error.message ?? 'Unknown error');
    }
}

export const getReport4 = async (req: Request, res: Response): Promise<any> => {
    try {
        const { start_date, end_date } = req.body;
        const data = await reporte4(start_date, end_date);
        const payload: IncomeExpenseReport = {
            fecha_generacion: new Date().toISOString(),
            mensaje_balance: data.mensaje_balance,
            total_egresos: data.total_egresos,
            total_ingresos: data.total_ingresos
        }
        const pdfBuffer = await generateTransactionPDF2_name_template(payload, 'reporte4');
        const timestamp = new Date().getTime();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="transaction-${timestamp}.pdf"`);
        res.end(pdfBuffer);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Report Error', null, error.message ?? 'Unknown error');
    }
}

export const getReport5 = async (req: Request, res: Response): Promise<any> => {
    try {
        const { start_date, end_date } = req.body;
        const data = await reporte5(start_date, end_date);
        return apiResponse(res, HttpStatusCode.OK, 'Ok', data);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Report Error', null, error.message ?? 'Unknown error');
    }
}

