import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

interface TransactionData {
    storeName: string;
    amount: number;
    receiverEmail: string;
    senderEmail: string;
    currency: string;
}

const compileTemplate = async (templatePath: string, data: TransactionData): Promise<string> => {
    const html = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(html);
    return template(data);
};

export const generateTransactionPDF = async (data: TransactionData, outputPath: string): Promise<void> => {
    const templatePath = path.join(__dirname, '../templates', 'transaction-template.html');
    const htmlContent = await compileTemplate(templatePath, data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
    });

    await browser.close();
};
