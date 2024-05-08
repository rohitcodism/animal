import express from 'express';
import cors from 'cors';
import animalRouter from './routes/animal.routes.js';



const app = express();

app.use(cors(
    {
        origin: '*', // allow all origins
    }
))

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(express.static('public'));

app.use('/api/v1/animals', animalRouter);

export { app }
