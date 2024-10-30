import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import pdf from 'html-pdf';
import fs from 'fs';
import path from 'path';

export interface TransactionData {
    storeName: string;
    amount: number;
    receiverEmail: string;
    senderEmail: string;
    description: string;
    currency: string;
    transactionDate: Date;
    message: string;
}

export const compileTemplate = async (templatePath: string, data: TransactionData): Promise<string> => {
    const html = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(html);
    return template(data);
};

export const generateTransactionPDF = async (data: TransactionData, outputPath: string | null = null): Promise<Uint8Array> => {
    const templatePath = path.join(__dirname, '../templates', 'transaction-template.html');
    const htmlContent = await compileTemplate(templatePath, data);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Genera el PDF en un buffer
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    await browser.close();
    return pdfBuffer;
};

export const generateTransactionPDF2 = async (data: TransactionData): Promise<Buffer> => {
    const htmlContent = await compileTemplate(path.join(__dirname, '../templates/transaction-template.html'), data);
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, { format: 'A4' }).toBuffer((err: any, buffer: any) => {
            if (err) return reject(err);
            resolve(buffer);
        });
    });
};

export const generateTransactionPDF2_name_template = async (data: any, template: string): Promise<Buffer> => {
    const htmlContent = await compileTemplate(path.join(__dirname, `../templates/${template}.html`), data);
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, { format: 'A4' }).toBuffer((err: any, buffer: any) => {
            if (err) return reject(err);
            resolve(buffer);
        });
    });
};
