const fp = require('fastify-plugin');

module.exports = fp(async function (fastify,action){
    fastify.register(require('fastify-swagger'), {
        routePrefix: '/docs',
        swagger: {
          info: {
            title: 'Access Management API',
            description: 'Kalanju access management api docs',
            version: '0.1.0'
          },
          externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
          },
          host: 'localhost',
          schemes: ['http'],
          consumes: ['application/json'],
          produces: ['application/json'],
        },
        uiConfig: {
          docExpansion: 'full',
          deepLinking: false
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        exposeRoute: true
      })
})