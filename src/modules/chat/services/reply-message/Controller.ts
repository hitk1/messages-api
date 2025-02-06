import { Request, Response} from 'express'
import { container } from 'tsyringe'
import { ChatReplyMessageService } from './Service'

export class ChatReplyMessageController {
    async handle(request: Request, response: Response){
        const service = container.resolve(ChatReplyMessageService)
        const result = await service.execute({
            ...request.params,
            ...request.body
        })

        return response.json(result)
    }
}