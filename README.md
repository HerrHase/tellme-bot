# tellme-bot

Simple Bot to receive Webhooks, parse and send them as Message to a [XMPP](https://xmpp.org/)-account. The idea result
from the missing support of [Kuma](https://github.com/louislam/uptime-kuma) for sending Notifications with
[XMPP](https://xmpp.org/).

## Install

```
yarn install
yarn start

or

pm2 start yarn start --name=tellme-bot
```

## Konfiguration

```
APP_DEBUG=false
APP_PORT=

APP_API_TOKEN=
APP_API_ALLOWED_PARSERS=kuma

XMPP_SERVICE=
XMPP_DOMAIN=
XMPP_USERNAME=
XMPP_PASSWORD=
XMPP_TO=
```

## Webhook

\<domain\>/api/v1/webhook/\<parser\>/\<api-token\>

## health

\<domain\>/api/v1/health

## Parsers

Existing Parsers,

* Kuma / Getting Notifications from [Kuma](https://github.com/louislam/uptime-kuma)
* Text / Getting "text" Parameter in JSON-Body

## Custom Parsers

Create a new Class, extends is with parser.js, add a parser-function and add the name of the file in the .env to
**APP_API_ALLOWED_PARSERS**.
