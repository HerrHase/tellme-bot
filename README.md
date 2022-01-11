# tellme-bot

Small bot to handle Webhooks, Parse and Send them with Xmpp. This is a Prototype and only exists
because [Kuma](https://github.com/louislam/uptime-kuma) offers no Notifications for Xmpp.

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

## Parsers

There is only one Parser Class for Kuma, but it is possible to add Additional Classes.

Create a new Class, extends is with parser.js, add a parser-function and add the name of the file in the .env to
APP_API_ALLOWED_PARSERS.
