import { Messages } from "@modules/chat/entities/message";
import { IParamsNewMessage } from "@modules/chat/services/new-message/Interfaces";
import { Prisma } from "@prisma/client";

export interface IMessageRepository {
    updateByArgs(params: Prisma.MessagesUpdateManyArgs): Promise<number>
    findOneByArgs(params: Prisma.MessagesFindFirstArgs): Promise<Messages | null>
    create(params: IParamsNewMessage): Promise<Messages>

}