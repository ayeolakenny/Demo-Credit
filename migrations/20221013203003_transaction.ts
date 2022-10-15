import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transaction', (table) => {
    table.increments('id');
    table.string('description');
    table.enum('status', ['SUCCESSFUL', 'PENDING', 'FAILED']);
    table.string('reference').unique();
    table
      .integer('initiator')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('cascade');
    table.integer('recipient').nullable().references('id').inTable('user');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transaction');
}
