import { Prisma } from "@prisma/client";

import { Messages } from "@modules/chat/entities/message";
import { IParamsNewMessage } from "@modules/chat/services/new-message/Interfaces";
import { IMessage } from "../models/message";
import { Pretiffy } from "@core/interfaces";

export type IParamsCreateMessageRepository = Pretiffy<IParamsNewMessage & { reply_message_id?: Buffer | null }>

export interface IMessageRepository {
    deleteById(message_id: string): Promise<number>
    updateByArgs(params: Prisma.MessagesUpdateManyArgs): Promise<number>
    findOneByArgs(params: Prisma.MessagesFindFirstArgs): Promise<IMessage | null>
    create(params: IParamsCreateMessageRepository): Promise<Messages>
}