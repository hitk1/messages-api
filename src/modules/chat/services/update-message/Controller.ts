import { Request, Response} from 'express'
import { container } from 'tsyringe'
import { ChatUpdateMessageService } from './Service'

export class ChatUpdateMessageController {
    async handle(request: Request, response: Response){
        const service = container.resolve(ChatUpdateMessageService)
        const result = await service.execute({
            ...request.params,
            ...request.body
        })

        return response.json(result)
    }
}