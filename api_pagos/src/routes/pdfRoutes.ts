import { Router } from 'express';
import { generateTransactionPDFHandler, generateTransactionPDFHandler2 } from './../controllers/pdfController';

const router = Router();

router.get('/pdf/example', generateTransactionPDFHandler);
router.get('/pdf/example2', generateTransactionPDFHandler2);

export default router;
