import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("role_users").del();

    // Inserts seed entries
    await knex("role_users").insert([
        { user_id: 1, role_id: 1 },
        { user_id: 2, role_id: 2 },
        { user_id: 3, role_id: 3 }
    ]);
};
