import { User } from "entity/User";
import { Knex } from "knex";
import faker from "faker"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    for (let index = 1; index <= 10000; index++) {
        await knex("users").insert([
            {
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: "password",
                displayName: faker.name.firstName(),
                avatar: faker.image.avatar(),
            }

        ] as User[]);
    }
    // Inserts seed entries

};
