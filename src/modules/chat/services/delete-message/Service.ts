import { inject, injectable } from "tsyringe";

import { IParamsDeleteMessage } from "./Interfaces";
import { deleteMessageValidation } from "@modules/chat/validations/delete-message-validation";
import { IMessageRepository } from "@modules/chat/domains/repositories/message";
import { AppError } from "@shared/errors/app-error";

@injectable()
export class ChatDeleteMessageService {
    constructor(
        @inject('MessagesRepository') private readonly messageRepo: IMessageRepository,
    ) { }

    async execute(params: IParamsDeleteMessage) {
        const { message_id } = deleteMessageValidation.parse(params)

        const result = await this.messageRepo.deleteById(message_id)

        if(result === 0)
            throw new AppError('Message not found', 404)
    }
}