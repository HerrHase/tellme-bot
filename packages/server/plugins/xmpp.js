/**
 *  plugin for handle xmpp in tellme-bot
 *
 *  create event send-message
 *
 *  @author Björn Hase
 *  @license hhttps://www.gnu.org/licenses/gpl-3.0.en.html GPL-3
 *  @link https://gitea.node001.net/HerrHase/tellme-bot.git
 *
 */

import { client, xml } from '@xmpp/client'

export default function (fastify, options, done) {

    /**
     *  handler for send-message event
     *
     *  @param  {object} data
     *
     */
    async function handleSendMessage(data) {

        // Sends a chat message to itself
        const message = xml(
            'message',
            {
                type: 'chat',
                to: options.to
            },
            xml('body', {}, data.message)
        )

        await xmpp.send(message)
    }

    const xmpp = client({
        service: options.service,
        domain: options.domain,
        username: options.username,
        password: options.password
    })

    // handle if client has errors
    xmpp.on('error', (error) => {
        console.error(error)
    })

    // handle if client goes online
    xmpp.on('online', (address) =>
    {
        console.log('connected to ' + address)

        // check for event and remove it
        if (fastify.eventEmitter.listeners('send-message').length > 0) {
            fastify.eventEmitter.off('send-message', handleSendMessage)
        }

        // add event if client going online
        fastify.eventEmitter.on('send-message', handleSendMessage)
    })

    // connect
    xmpp
        .start()
        .catch(console.log)

    done()
}