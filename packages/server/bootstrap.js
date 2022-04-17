import fastify from 'fastify'
import dotenv from 'dotenv'
import path from 'path'
import { EventEmitter } from 'events'

// getting .env
dotenv.config({ path: path.join(path.resolve(), '/../../.env') })

// create server
const server = fastify()

// adding eventEmitter
server.decorate('eventEmitter', new EventEmitter())

// adding xmpp
import xmpp from './plugins/xmpp.js'

server.register(xmpp, {
    service: process.env.XMPP_SERVICE,
    domain: process.env.XMPP_DOMAIN,
    username: process.env.XMPP_USERNAME,
    password: process.env.XMPP_PASSWORD,
    to: process.env.XMPP_TO
})

/**
 *  add routes
 *
 *
 */
import webhookHttp from './http/api/webhook.js'
import healthHttp from './http/api/health.js'

server
    .register(webhookHttp, {
        'prefix': '/api/webhook'
    })
    .register(healthHttp, {
        'prefix': '/api/health'
    })

export default server