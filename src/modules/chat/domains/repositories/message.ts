import { Messages } from "@modules/chat/entities/message";
import { IParamsNewMessage } from "@modules/chat/services/new-message/Interfaces";

export interface IMessageRepository {
    create(params: IParamsNewMessage): Promise<Messages>
    
}