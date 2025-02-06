import { Router } from 'express'
import { ChatNewMessageController } from '@modules/chat/services/new-message/Controller'
import { ChatUpdateMessageController } from '@modules/chat/services/update-message/Controller'
import { ChatDeleteMessageController } from '@modules/chat/services/delete-message/Controller'
import { ChatReplyMessageController } from '@modules/chat/services/reply-message/Controller'

const chatRoutes = Router()

//Controllers
const newMessageController = new ChatNewMessageController()
const updateMessageController = new ChatUpdateMessageController()
const deleteMessageController = new ChatDeleteMessageController()
const replyMessageController = new ChatReplyMessageController()

chatRoutes.post(
    '/new-message',
    newMessageController.handle
)

chatRoutes.put(
    '/:message_id',
    updateMessageController.handle
)

chatRoutes.put(
    '/:message_id/reply',
    replyMessageController.handle
)

chatRoutes.delete(
    '/:message_id',
    deleteMessageController.handle
)

export { chatRoutes }