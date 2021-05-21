'use strict'

module.exports = async function (fastify, opts) {
  fastify.route({
    method:'GET',
    url:'/',
    handler:(req, res) => {
      res.send({model:"access management apis"})
    }
  })
}
