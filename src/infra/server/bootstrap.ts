import { database } from "@infra/database/prisma/client"
import { appLogger } from "@shared/helpers/logger"

export default async () => {
    try {
        await database.$connect()
        appLogger.info('Database -> Connected')
    } catch (error) {
        appLogger.error(
            { error },
            'Error on execute bootstrap process'
        )
    }
}