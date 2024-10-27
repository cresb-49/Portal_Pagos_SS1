import { Request, Response } from 'express';
import { generateTransactionPDF } from './../services/pdfGenerator';
import path from 'path';

export const generateTransactionPDFHandler = async (req: Request, res: Response) => {
    // Datos de la transacción (podrías obtenerlos de req.body en una app real)
    const transactionData = {
        storeName: 'Tienda Ejemplo',
        amount: 150.75,
        receiverEmail: 'receptor@correo.com',
        senderEmail: 'emisor@correo.com',
        currency: 'Q',
    };

    const outputPath = path.join(__dirname, '../output', 'comprobante-transaccion.pdf');

    try {
        await generateTransactionPDF(transactionData, outputPath);
        res.sendFile(outputPath);
    } catch (error:Error | any) {
        res.status(500).send('Error al generar el comprobante de transacción en PDF');
        console.log(error.message ?? 'Error inesperado');

    }
};
