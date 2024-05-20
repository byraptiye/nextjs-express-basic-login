import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { Routes } from 'routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 2000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

Routes.map(item => app.use(item.prefix,item.controller));


app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at http://localhost:${port}`);
});