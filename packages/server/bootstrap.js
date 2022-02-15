import fastify from 'fastify'
import dotenv from 'dotenv'
import path from 'path'

// getting .env
dotenv.config({ path: path.join(path.resolve(), '/../../.env') })

// create server
const server = fastify()

/**
 *  xmpp
 *
 *  import client for xmpp, adding events for handling
 *
 */
import { client, xml } from '@xmpp/client'
import { EventEmitter } from 'events'

// create eventemitter for sending messages
server.decorate('eventEmitter', new EventEmitter())

const xmpp = client({
    service: process.env.XMPP_SERVICE,
    domain: process.env.XMPP_DOMAIN,
    username: process.env.XMPP_USERNAME,
    password: process.env.XMPP_PASSWORD
})

xmpp.on('error', (error) => {
    console.error(error)
})

xmpp.on('online', (address) =>
{
    console.log('connected to ' + address)

    // add event if client going online
    server.eventEmitter.on('send-message', async (data) =>
    {
        // Sends a chat message to itself
        const message = xml(
            'message',
            {
                type: 'chat',
                to: process.env.XMPP_TO
             },
             xml('body', {}, data.message)
        )

        await xmpp.send(message)
    })
})

xmpp.on('offline', (error) => {
    console.log('offline')

    // remove event if client going offline
    server.eventEmitter.off('send-message')
})

xmpp.start().catch(console.error)


/**
 *  add routes
 *
 *
 */
import webhookHttp from './http/api/webhook.js'

server
    .register(webhookHttp, {
        'prefix': '/api/webhook'
    })

export default server