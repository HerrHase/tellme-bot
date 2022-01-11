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
 */
import { client, xml } from '@xmpp/client'
import { EventEmitter } from 'events'


// create eventemitter for sending messages
// @TODO find a better solution, was only to use it with online event, but not working as expected
const eventEmitter = new EventEmitter()

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

    eventEmitter.on('send-message', async (data) =>
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
        'prefix': '/api/webhook',
        'eventEmitter': eventEmitter // @TODO shift to a more fastify-way
    })

export default server