import { injectable } from "tsyringe";
import { Prisma } from "@prisma/client";

import { IMessageRepository, IParamsCreateMessageRepository } from "@modules/chat/domains/repositories/message";
import { Messages } from "@modules/chat/entities/message";
import { database } from "@infra/database/prisma/client";
import { idStringToBinary } from "@core/utils/identifier";
import { IMessage } from "@modules/chat/domains/models/message";

@injectable()
export class MessagesRepository implements IMessageRepository {

    async deleteById(message_id: string): Promise<number> {
        const result = await database.messages.deleteMany({
            where: {
                id: idStringToBinary(message_id)
            }
        })

        return result.count
    }

    async updateByArgs(params: Prisma.MessagesUpdateManyArgs): Promise<number> {
        const result = await database.messages.updateMany(params)

        return result.count
    }

    async findOneByArgs(params: Prisma.MessagesFindFirstArgs): Promise<IMessage | null> {
        const result = await database.messages.findFirst(params)

        return result
    }

    async create(params: IParamsCreateMessageRepository): Promise<Messages> {
        const message = new Messages()
        message.author = params.author
        message.content = params.message

        if(params.reply_message_id)
            message.replied_message = params.reply_message_id

        await database.messages.create({ data: message })

        return message
    }

}