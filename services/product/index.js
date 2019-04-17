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
        '/products',
        async (request, reply) => {
            let products = []
            await fastify.fs.collection('products').get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        //console.log(doc.id, '=>', doc.data())
                        let product = doc.data()
                        product.id = doc.id
                        products.push(product)
                        /*
                        products.push({
                            [doc.id]: doc.data()
                        })
                        */
                    });
                })
                .catch((err) => {
                    //console.log('Error getting documents', err);
                    reply.send(err);
                })
            //console.log(products)
            await reply.send({ products: products })
        }
    )

    next()
}