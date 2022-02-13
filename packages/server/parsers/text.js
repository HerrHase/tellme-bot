import Parser from './parser.js'
import DOMPurify from 'isomorphic-dompurify'

/**
 *  Parser for "text" in Json, is used by slack
 *
 *  @author Björn Hase, Tentakelfabrik
 *  @license hhttps://www.gnu.org/licenses/gpl-3.0.en.html GPL-3
 *  @link https://gitea.tentakelfabrik.de:tentakelfabrik/tellme-bot.git
 *
 */
class Text extends Parser
{
    parse()
    {
        // check for msg and clean it
        if (this.body.text) {
            this.message = DOMPurify.sanitize(this.body.text)
        }
    }
}

export default Text