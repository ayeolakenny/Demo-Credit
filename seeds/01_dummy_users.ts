import { Knex } from 'knex';
import { User } from '../src/types/interface';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del();

  // Inserts seed entries
  await knex<User>('user').insert([
    {
      id: 1,
      name: 'Ayeola Kehinde',
      email: 'ayeolakenny@gmail.com',
      passwordHash:
        '$argon2i$v=19$m=4096,t=3,p=1$AEJPLQZMLIgauhqh9Wrleg$yoDn8DH462vhP1l7lTCFejaj6O141Cq1oojE9NZlQAk',
    },
  ]);
}
