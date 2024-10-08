import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/useRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

export default app;
