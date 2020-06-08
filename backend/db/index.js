const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  password: 'test',
  host: 'localhost',
  port: 5432,
  database: 'coral'
})
module.exports = pool;