import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("username" , 50).nullable();
        table.string("displayName" , 50).nullable();
        table.string("email" , 50).notNullable().unique();
        table.string("password").notNullable();
        table.string("avatar").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("users");
}

