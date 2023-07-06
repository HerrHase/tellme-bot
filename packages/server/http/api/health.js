/**
 *  handle health
 *
 *  @author Björn Hase
 *  @license hhttps://www.gnu.org/licenses/gpl-3.0.en.html GPL-3
 *  @link https://gitea.node001.net/HerrHase/tellme-bot.git
 *
 */

export default async function(fastify, opts) {

    /**
     *  getting post getting allowed parser class and send over xmpp
     *
     *  @param  {object} request
     *  @param  {object} response
     *
     */
    fastify.get('/v1', async function (request, response) {
        response
            .code(200)
            .send()
    })
}
