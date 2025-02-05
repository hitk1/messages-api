import { Router } from 'express'
import { ChatNewMessageController } from '@modules/chat/services/new-message/Controller'

const chatRoutes = Router()

//Controllers
const newMessageController = new ChatNewMessageController()

chatRoutes.post(
    '/new-message',
    newMessageController.handle
)

export { chatRoutes }