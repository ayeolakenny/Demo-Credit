import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('wallet', (table) => {
    table.increments('id');
    table.integer('balance');
    table
      .integer('userId')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('cascade');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('wallet');
}
