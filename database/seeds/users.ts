import { User } from "entity/User";
import { Knex } from "knex";
import faker from "faker"
import { hashingPassword } from "../../src/helper/hashing_password";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    for (let index = 1; index <= 100; index++) {
        await knex("users").insert([
            {
                username: faker.name.findName(),
                email: faker.internet.email(),
                password: await hashingPassword("password"),
                displayName: faker.name.firstName(),
                avatar: faker.image.avatar(),
            }

        ] as User[]);
    }
    // Inserts seed entries
};
