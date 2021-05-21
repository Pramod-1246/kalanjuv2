const fastify = require('fastify').default
const path = require('path')
const AutoLoad = require('fastify-autoload')

const app = fastify({ logger: true })

app.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: Object.assign({})
})

app.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: Object.assign({})
})

app.listen(4003, '0.0.0.0', async (err) => {
  if (err) {
    console.log('connection error')
    console.log(err)
  }

  console.log('resources listening on port 4003')
})