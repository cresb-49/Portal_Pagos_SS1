import { Request, Response } from 'express';
import { compileTemplate, generateTransactionPDF, generateTransactionPDF2 } from './../services/pdfGenerator';
import path from 'path';
import { makePayment, RealizarPago } from '../services/transaccionService';
import { UserToken } from '../models/usuario';

export const generateTransactionPDFHandler = async (req: Request, res: Response) => {
    // Datos de la transacción (podrías obtenerlos de req.body en una app real)
    const transactionData = {
        storeName: 'Tienda Ejemplo',
        amount: 150.75,
        description: 'Compra de productos varios',
        receiverEmail: 'receptor@correo.com',
        senderEmail: 'emisor@correo.com',
        currency: 'Q',
    };

    const timestamp = new Date().getTime();

    try {
        const pdfBuffer = await generateTransactionPDF(transactionData);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="transaction-${timestamp}.pdf"`);
        // Envía el PDF en memoria
        res.end(pdfBuffer);
    } catch (error: Error | any) {
        res.status(500).send('Error al generar el comprobante de transacción en PDF');
        console.log(error.message ?? 'Error inesperado');

    }
};

export const generateTransactionPDFHandler2 = async (req: Request, res: Response) => {
    const transactionData = {
        storeName: 'Tienda Ejemplo',
        amount: 150.75,
        description: 'Compra de productos varios',
        receiverEmail: 'receptor@correo.com',
        senderEmail: 'emisor@correo.com',
        currency: 'Q',
    };

    const htmlContent = await compileTemplate(path.join(__dirname, '../templates/transaction-template.html'), transactionData);

    try {
        const pdfBuffer = await generateTransactionPDF2(htmlContent);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="transaction.pdf"');
        res.end(pdfBuffer);
    } catch (error: Error | any) {
        res.status(500).send('Error al generar el comprobante de transacción en PDF');
        console.log(error.message);
    }
};
