import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("role_users", (table) => {
        table.string("user_id").nullable()
        table.string("role_id").nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("role_users")
}

