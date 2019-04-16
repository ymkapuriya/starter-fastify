'use strict'

module.exports = async function routes(fastify, options, next) {
    const database = fastify.mongo.db('db')
    const collection = database.collection('test')

    fastify.get('/search/:id', async (request, reply) => {
        const result = await collection.findOne({ id: request.params.id })
        if (result.value === null) {
            throw new Error('Invalid value')
        }
        return result.value
    })

    next()

}
