/**
 *  handle token
 *
 *  @author Björn Hase <me@herr-hase.wtf>
 *  @license http://opensource.org/licenses/MIT The MIT License
 *  @link https://gitea.node001.net/HerrHase/super-fastify-directus.git
 *
 */

async function tokenHandler(request, token) {
    if (request.params.token !== process.env.APP_API_TOKEN) {
        return response
            .code(401)
            .send()
    }
}
 
export default tokenHandler
