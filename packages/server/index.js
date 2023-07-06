import server from './_bootstrap.js'

// let it rain
const start = async () => {
    try {
        await server.listen({
            port: process.env.APP_PORT
        })

        console.log('Server: start')
        console.log('Server: running on port ' + process.env.APP_PORT)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
