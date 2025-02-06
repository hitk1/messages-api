import { Prisma } from "@prisma/client";

import { Messages } from "@modules/chat/entities/message";
import { IMessage } from "../../models/message";
import { IMessageRepository, IParamsCreateMessageRepository } from "../../repositories/message";
import { idBinaryToString } from "@core/utils/identifier";

export class MessagesInMemoryRepository implements IMessageRepository {

    private repository: IMessage[] = []

    async deleteById(message_id: string): Promise<number> {
        const itemIndex = this.repository.findIndex(item => idBinaryToString(item.id as any) === message_id)

        if (itemIndex >= 0){
            this.repository.splice(itemIndex, 1)
            return 1
        }

        return 0
    }

    async updateByArgs(params: Prisma.MessagesUpdateManyArgs): Promise<number> {
        let targetItem = this.repository.filter(item =>
            Object.entries(params.where!).every(([keys, value]) => {
                if (keys === 'id')
                    return item[keys].toString() === value?.toString()

                return item[keys as keyof IMessage] === value
            })
        )[0]

        if (!targetItem)
            return 0

        const targetItemIndex = this.repository.findIndex(item => item.id === targetItem.id)

        targetItem = {
            ...targetItem,
            ...params.data
        } as any

        this.repository[targetItemIndex] = targetItem

        return 1
    }

    async findOneByArgs(params: Prisma.MessagesFindFirstArgs): Promise<IMessage | null> {
        const result = this.repository.filter(item =>
            Object.entries(params.where!).every(([keys, value]) => {
                if (keys === 'id')
                    return item[keys].toString() === value?.toString()

                return item[keys as keyof IMessage] === value
            })
        )[0]

        return result
    }

    async create(params: IParamsCreateMessageRepository): Promise<Messages> {
        const message = new Messages()
        message.author = params.author
        message.content = params.message

        if (params.reply_message_id)
            message.replied_message = params.reply_message_id

        this.repository.push(message)
        return message
    }

}