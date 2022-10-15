import 'dotenv/config';
import { dbConfigInterface } from '../types/interface';

export const devDatabaseConfig: dbConfigInterface = {
  client: 'mysql',
  version: '5.7',
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

export const prodDatabaseConfig: dbConfigInterface = {
  client: 'mysql',
  version: '5.7',
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
