import server from './bootstrap.js'

// let it rain
const start = async () => {
    try {
        await server.listen(process.env.APP_PORT)
        console.log('Server is running on port ' + process.env.APP_PORT)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()