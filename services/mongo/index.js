'use strict'

module.exports = async function routes(fastify, options, next) {

    fastify.register(require('./db'), {
        url: 'mongodb://localhost:27017/',
        useNewUrlParser: true
    })

    fastify.get('/search/:id', async (request, reply) => {
        const database = await fastify.mongo.db('db')
        const collection = await database.collection('test')
        const result = await collection.findOne({ id: request.params.id })
        if (result.value === null) {
            throw new Error('Invalid value')
        }
        return result.value
    })
    next()

}
