import DOMPurify from 'isomorphic-dompurify'
import { EventEmitter } from 'events'

/**
 *  handle auth
 *
 *  @author Björn Hase, Tentakelfabrik
 *  @license http://opensource.org/licenses/MIT The MIT License
 *  @link https://gitea.tentakelfabrik.de:tentakelfabrik/tellme-bot.git
 *
 */

export default async function(fastify, opts)
{
    /**
     *  auth
     *
     *  @param  {object} request
     *  @param  {object} response
     *
     */
    fastify.post('/v1/:parser([a-zA-Z0-9]{0,255})/:token([a-zA-Z0-9])', async function (request, reply)
    {
        if (request.params.token !== process.env.APP_API_TOKEN) {
            return reply
                .code(401)
                .send()
        }

        // getting allowed parsers from .env as array
        const allowedParsers = process.env.APP_API_ALLOWED_PARSERS.split(',')

        if (allowedParsers.indexOf(request.params.parser) === -1) {
            return reply
                .code(404)
                .send()
        }

        const Parser = await import('./../../parsers/' + request.params.parser + '.js')
        const parser = new Parser.default(request.body)

        const result = parser.run()

        // send event for send xmpp
        opts.eventEmitter.emit('send-xmpp', {
            'message': result
        })

        reply
            .code(200)
            .send()
    })
}