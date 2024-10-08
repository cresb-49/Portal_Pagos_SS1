import { Response } from "express";
import { HttpStatusCode } from "../utils/httpStatusCodes";

export const apiResponse = (res: Response, status: HttpStatusCode, message: string, data?: any, error?: string | null) => {
    return res.status(status).json({
        code: status,
        message,
        data: data || null,
        error: error || null
    });
}
