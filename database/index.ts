import * as config from "../knexfile"

const knex = require('knex')(config)

export { knex }