import tokenHandler from './../../handlers/token.js'
import parserHandler from './../../handlers/parser.js'

/**
 *  handle webhook
 *
 *  @author Björn Hase
 *  @license hhttps://www.gnu.org/licenses/gpl-3.0.en.html GPL-3
 *  @link https://gitea.node001.net/HerrHase/tellme-bot.git
 *
 */

export default async function(fastify, options) {

    fastify.addHook('preHandler', tokenHandler)
    fastify.addHook('preHandler', parserHandler)

    /**
     *  getting post getting allowed parser class and send over xmpp
     *
     *  @param  {object} request
     *  @param  {object} response
     *
     */
    fastify.post('/v1/:parser/:token', async function (request, response) {

        // getting parser from preHandler: parserHandler
        const result = response.locals.parser.run()

        // send event for send xmpp
        fastify.eventEmitter.emit('send-message', {
            'message': result
        })

        response
            .code(200)
            .send()
    })

}
