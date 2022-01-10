import Parser from './parser.js'

/**
 *
 *
 *
 */
class Kuma extends Parser
{
    parse()
    {
        this.message = this.body.msg
    }
}

export default Kuma