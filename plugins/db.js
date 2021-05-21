const fp = require('fastify-plugin')
const DbMigrate = require('db-migrate')
const mysql = require('mysql')
const keys = require('../config/keys')

const runMigrations = () => {
  return new Promise((resolve, reject) => {
    const dbMigrate = DbMigrate.getInstance(true)
    dbMigrate.silence(true)

    dbMigrate.up((error, results = []) => {
      if (error) {
        return reject(error)
      }

      resolve(results)
    })
  })
}

/**
 * @param { import ('fastify').FastifyInstance } fastify
 */
const plugin = async (fastify, opts) => {
  const db = mysql.createConnection({
    host: keys.mysqlHost,
    user: keys.mysqlUser,
    password: keys.mysqlPassword,
    database: keys.mysqlDB,
    port: 3306
  })
  
  db.connect()
  
  fastify.decorate('db', db).addHook('onClose', async (instance, done) => {
    db.destroy()
    done()
  })

  // const migrationsRan = await runMigrations()

  // if (migrationsRan.length) {
  //     fastify.log.info({ migrationsCount: migrationsRan.length, msg: 'Successfully ran migrations' })
  // }
}

module.exports = fp(plugin)
