import 'reflect-metadata'
import 'dotenv/config'

import { Server, IncomingMessage, ServerResponse } from 'http'

import bootstrap  from './bootstrap'
import { api } from '../express/app'
import { appLogger } from '@shared/helpers/logger'
import { database } from '@infra/database/prisma/client'

let server: Server<typeof IncomingMessage, typeof ServerResponse>

function gracefulShutdown(_code: string) {
    return (event: any) => {
        console.info(`${event} signal received with code ${event}`)
        console.info('Closing http server...')


        server.close(async () => {
            console.info('Http server closed.')

            await database.$disconnect()
            console.info('Database connection closed.')
            process.exit(1)
        })
    }
}

(async () => {
    const port = Number(process.env.PORT) || 3333
    
    await bootstrap()
    server = api.listen(port, () => appLogger.info(`Server is running on port: ${port}`))
})()

process.on('SIGTERM', gracefulShutdown('SIGTERM'))
process.on('SIGINT', gracefulShutdown('SIGINT'))

process.on('unhandledRejection', (error, _origin) => console.info('\nUnhandled rejection signal received.', error))
process.on('uncaughtException', (error, origin) => console.info(`\n${origin} signal received.`, error))
process.on('exit', code => console.info('Exit signal received.', code))
