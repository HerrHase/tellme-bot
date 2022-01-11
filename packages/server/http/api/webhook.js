/**
 *  handle webhook
 *
 *  @author Björn Hase, Tentakelfabrik
 *  @license hhttps://www.gnu.org/licenses/gpl-3.0.en.html GPL-3
 *  @link https://gitea.tentakelfabrik.de:tentakelfabrik/tellme-bot.git
 *
 */

export default async function(fastify, opts)
{
    /**
     *  getting post getting allowed parser class and send over xmpp
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

        // getting parser and set body to parser
        const Parser = await import('./../../parsers/' + request.params.parser + '.js')
        const parser = new Parser.default(request.body)

        const result = parser.run()

        // send event for send xmpp
        opts.eventEmitter.emit('send-message', {
            'message': result
        })

        reply
            .code(200)
            .send()
    })
}