import type { Knex } from 'knex';
import { devDatabaseConfig, prodDatabaseConfig } from './src/config/db.config';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: devDatabaseConfig,

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: prodDatabaseConfig,
};

module.exports = config;
