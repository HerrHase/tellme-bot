import Parser from './parser.js'
import DOMPurify from 'isomorphic-dompurify'

/**
 *  Parser for Kuma, getting only error message
 *
 *  @author Björn Hase
 *  @license hhttps://www.gnu.org/licenses/gpl-3.0.en.html GPL-3
 *  @link https://gitea.node001.net/HerrHase/tellme-bot.git
 *
 */
class Kuma extends Parser
{
    parse()
    {
        // check for msg and clean it
        if (this.body.msg) {
            this.message = DOMPurify.sanitize(this.body.msg)
        }
    }
}

export default Kuma