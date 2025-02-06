import { Router } from 'express'
import { ChatNewMessageController } from '@modules/chat/services/new-message/Controller'
import { ChatUpdateMessageController } from '@modules/chat/services/update-message/Controller'

const chatRoutes = Router()

//Controllers
const newMessageController = new ChatNewMessageController()
const updateMessageController = new ChatUpdateMessageController()

chatRoutes.post(
    '/new-message',
    newMessageController.handle
)

chatRoutes.put(
    '/:message_id',
    updateMessageController.handle
)

export { chatRoutes }