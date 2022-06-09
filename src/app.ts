import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { router } from './routes';
const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
