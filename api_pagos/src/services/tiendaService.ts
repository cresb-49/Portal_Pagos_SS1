import { GET, POST } from './httpService';
import config from '../config/config';

export interface ResponseTiendaElvis {
    id: number;
    name: string;
    email: string;
    address: string;
    image: string;
}

export interface ResponseTiendaElvisError {
    message: string;
    error: string;
    statusCode: number;
}

export const getInfoTiendaElvis = async (): Promise<any> => {
    return GET(`${config.ecommerce1}/electric-shop/api/v1/public/company`);
}

export const dataTiendaElvis = async (): Promise<ResponseTiendaElvis | ResponseTiendaElvisError> => {
    const data = await getInfoTiendaElvis();
    //verificamos si existe el campo statusCode
    if (data.statusCode) {
        return data as ResponseTiendaElvisError;
    } else {
        return data as ResponseTiendaElvis;
    }
}
