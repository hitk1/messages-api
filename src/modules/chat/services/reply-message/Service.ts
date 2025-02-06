import { inject, injectable } from "tsyringe";

import { IMessageRepository } from "@modules/chat/domains/repositories/message";
import { replyMessageValidation } from "@modules/chat/validations/reply-message-validation";
import { IParamsReplyMessage } from "./Interfaces";
import { idStringToBinary } from "@core/utils/identifier";
import { AppError } from "@shared/errors/app-error";
import { MessageMapper } from "@modules/chat/mappers/message";

@injectable()
export class ChatReplyMessageService {
    constructor(
        @inject('MessagesRepository') private readonly messageRepo: IMessageRepository,
    ) { }

    async execute(params: IParamsReplyMessage) {
        const {
            message_id,
            ...restParams
        } = replyMessageValidation.parse(params)
        const idBinary = idStringToBinary(message_id)

        const existingMessage = await this.messageRepo.findOneByArgs({
            where: {
                id: idBinary
            }
        })

        if (!existingMessage)
            throw new AppError('Message not found', 404)

        const newMessage = await this.messageRepo.create({
            ...restParams,
            reply_message_id: idBinary
        })

        return MessageMapper.toMessage(newMessage)
    }

}