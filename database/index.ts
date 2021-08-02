import { Knex } from "knex"
import * as config from "../knexfile"

const knex: Knex = require('knex')(config)

export { knex }