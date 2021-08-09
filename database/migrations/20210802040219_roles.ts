import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("roles", (table) => {
        table.increments()
        table.string("role_name")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("roles")
}

