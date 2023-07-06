import DOMPurify from 'isomorphic-dompurify'

/**
 *
 *  handle parser
 *
 *
 *  @author Björn Hase <me@herr-hase.wtf>
 *  @license http://opensource.org/licenses/MIT The MIT License
 *  @link https://gitea.node001.net/HerrHase/super-fastify-directus.git
 *
 */

async function parserHandler(request, response) {

    // getting allowed parsers from .env as array
    const allowedParsers = process.env.APP_API_ALLOWED_PARSERS.split(',')

    // getting name from request 
    const parserName = DOMPurify.sanitize(request.params.parser)

    // if parser not found send 404
    if (allowedParsers.indexOf(parserName) === -1) {

        console.log('Parsers: "' + parserName + '" not found!')

        return response
            .code(404)
            .send()
    }

    // getting parser and set body to parser
    const Parser = await import('./../parsers/' + parserName + '.js')

    response.locals = {
        parser: new Parser.default(request.body)
    }
}
  
export default parserHandler
