import { inject, injectable } from "tsyringe";

import { IMessageRepository } from "@modules/chat/domains/repositories/message";
import { IParamsNewMessage } from "./Interfaces";
import { newMessageValidation } from "@modules/chat/validations/new-message-validation";
import { MessageMapper } from "@modules/chat/mappers/message";

@injectable()
export class ChatNewMessageService {
    constructor(
        @inject('MessagesRepository') private readonly messageRepo: IMessageRepository,
    ){}

    async execute(params: IParamsNewMessage){
        const validatedParams = newMessageValidation.parse(params)
        const result = await this.messageRepo.create(validatedParams)

        return MessageMapper.toMessage(result)
    }
}