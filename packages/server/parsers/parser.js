/**
 *
 *
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