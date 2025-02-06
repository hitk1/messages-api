import { Prisma } from "@prisma/client";

import { Messages } from "@modules/chat/entities/message";
import { IParamsNewMessage } from "@modules/chat/services/new-message/Interfaces";
import { IMessage } from "../models/message";

export interface IMessageRepository {
    deleteById(message_id: string): Promise<number>
    updateByArgs(params: Prisma.MessagesUpdateManyArgs): Promise<number>
    findOneByArgs(params: Prisma.MessagesFindFirstArgs): Promise<IMessage | null>
    create(params: IParamsNewMessage): Promise<Messages>

}