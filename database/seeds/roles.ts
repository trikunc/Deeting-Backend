import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("roles").del();

    // Inserts seed entries
    await knex("roles").insert([
        {  user_id: 1 , role_name : "admin"},
        {  user_id: 2 , role_name : "manager"},
        {  user_id: 3 , role_name : "user"},
    ]);
};
