import { chatRoutes } from '@modules/chat/infra/http/routes'
import { Router } from 'express'

const apiRoutes = Router()

apiRoutes.use(
    '/chats',
    chatRoutes
)

export { apiRoutes }