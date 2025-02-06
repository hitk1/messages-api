import { inject, injectable } from "tsyringe";

import { IParamsUpdateNewMessage } from "./Interfaces";
import { updateMessageValidation } from "@modules/chat/validations/update-message-vlaidation";
import { IMessageRepository } from "@modules/chat/domains/repositories/message";
import { idStringToBinary } from "@core/utils/identifier";
import { AppError } from "@shared/errors/app-error";

@injectable()
export class ChatUpdateMessageService {
    constructor(
        @inject('MessagesRepository') private readonly messageRepo: IMessageRepository,
    ) { }

    async execute(params: IParamsUpdateNewMessage) {
        const {
            content,
            message_id
        } = updateMessageValidation.parse(params)
        const binaryMessageId = idStringToBinary(message_id)

        const existingMessage = await this.messageRepo.findOneByArgs({
            where: {
                id: binaryMessageId
            }
        })

        if (!existingMessage)
            throw new AppError('Message not found', 404)

        await this.messageRepo.updateByArgs({
            where: {
                id: binaryMessageId
            },
            data: {
                content,
                updated_at: new Date()
            }
        })

        return { id: message_id }
    }
}