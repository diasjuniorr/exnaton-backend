import 'reflect-metadata';
import express, { Express } from 'express';
import { db } from './database';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

db.initialize()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((err) => {
    console.log('Database initialization failed', err);
  });

import { router } from './routes';
const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
