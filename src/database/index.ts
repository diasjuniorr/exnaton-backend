import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const db = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  synchronize: false,
  entities: ['dist/**/**.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
});
