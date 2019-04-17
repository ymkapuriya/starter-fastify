'use strict'

module.exports = async function routes(fastify, options, next) {

    /**
     * Google cloudstore plugin registration
     */
    fastify.register(require('@now-ims/fastify-firestore'), {
        projectId: 'fastify-starter-app',
        keyFilename: './config/google-firestore-config.json'
    })

    fastify.get(
        '/users',
        async (request, reply) => {
            let users = []
            await fastify.fs.collection('users').get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        //console.log(doc.id, '=>', doc.data())
                        users.push({ [doc.id]: doc.data() })
                    });
                })
                .catch((err) => {
                    //console.log('Error getting documents', err);
                    reply.send(err);
                })
            await reply.send(users)
        }
    )

    fastify.get(
        '/users/:id',
        async (request, reply) => {
            const { id } = request.params;
            let user = {}
            await fastify.fs.collection('users').doc(id).get()
                .then((doc) => {
                    //console.log(doc.id, '=>', doc.data())
                    if (doc.exists) {
                        user = doc.data()
                    }
                })
                .catch((err) => {
                    //console.log('Error getting document', err);
                    reply.send(err);
                })
            await reply.send(user)
        },
    )

    next()
}