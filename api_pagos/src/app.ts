import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/useRoutes';
import pdfRoutes from './routes/pdfRoutes';
import transaccionRoutes from './routes/transaccionRoutes';
import otherRoutes from './routes/otherRoutes';

const app = express();

app.use(cors({
    origin: '*', // Permite cualquier origen
}));

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', pdfRoutes);
app.use('/api', transaccionRoutes);
app.use('/api', otherRoutes);
app.use('/api/saludo', (req, res) => {
    res.send('Hola mundo!');
});

export default app;
