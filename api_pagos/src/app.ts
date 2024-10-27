import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/useRoutes';
import pdfRoutes from './routes/pdfRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api',pdfRoutes);

export default app;
