/**
 *  Basic Class for Parsering Body from Webhook,
 *  extends Class need to write a parse function and add result to message variable
 *
 *  @author Björn Hase, Tentakelfabrik
 *  @license hhttps://www.gnu.org/licenses/gpl-3.0.en.html GPL-3
 *  @link https://gitea.tentakelfabrik.de:tentakelfabrik/tellme-bot.git
 *
 */
class Parser
{
    /**
     *
     *
     */
    constructor(body)
    {
        // body from webhook
        this.body = body

        // message
        this.message = undefined
    }

    /**
     *  run parser, call parse-function and return message
     *
     *  @return string
     *
     */
    run()
    {
        this.parse()
        return this.message
    }
}

export default Parser