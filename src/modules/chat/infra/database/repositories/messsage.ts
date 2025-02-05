import { injectable } from "tsyringe";

import { IMessageRepository } from "@modules/chat/domains/repositories/message";
import { Messages } from "@modules/chat/entities/message";
import { IParamsNewMessage } from "@modules/chat/services/new-message/Interfaces";
import { database } from "@infra/database/prisma/client";

@injectable()
export class MessagesRepository implements IMessageRepository {

    async create(params: IParamsNewMessage): Promise<Messages> {
        const message = new Messages()
        message.author = params.author
        message.content = params.message

        await database.messages.create({ data: message })

        return message
    }

}