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

/**
 *  add xmpp
 *
 */

import xmpp from './plugins/xmpp.js'

server.register(xmpp, {
    service: process.env.XMPP_SERVICE,
    domain: process.env.XMPP_DOMAIN,
    username: process.env.XMPP_USERNAME,
    password: process.env.XMPP_PASSWORD,
    to: process.env.XMPP_TO
})

/**
 *  add helmet
 *
 */

import helmet from '@fastify/helmet'
 
server.register(
    helmet, { 
        referrerPolicy: {
            policy: ['origin']
        }
    }
)

/**
 *  add rateLimit
 *
 */

import rateLimit from '@fastify/rate-limit'

const rateLimitSettings = {
    max: 100,
    timeWindow: 60000
}

if (process.env.APP_RATE_LIMIT_MAX) {
    rateLimitSettings.max = process.env.APP_RATE_LIMIT_MAX
}

if (process.env.APP_RATE_LIMIT_TIMEWINDOW) {
    rateLimitSettings.timeWindow = process.env.APP_RATE_LIMIT_TIMEWINDOW
}

server.register(rateLimit, rateLimitSettings)

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
