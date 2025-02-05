import { Request, Response} from 'express'
import { container } from 'tsyringe'
import { ChatNewMessageService } from './Service'

export class ChatNewMessageController {
    async handle(request: Request, response: Response){
        const service = container.resolve(ChatNewMessageService)
        const result = await service.execute(request.body)

        return response.status(201).json(result)
    }
}