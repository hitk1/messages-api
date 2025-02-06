import { Request, Response} from 'express'
import { container } from 'tsyringe'
import { ChatDeleteMessageService } from './Service'

export class ChatDeleteMessageController {
    async handle(request: Request, response: Response){
        const service = container.resolve(ChatDeleteMessageService)
        await service.execute(request.params)

        return response.status(204).send()
    }
}