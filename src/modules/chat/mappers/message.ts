import { idBinaryToString } from "@core/utils/identifier";
import { IMessage } from "../domains/models/message";

export class MessageMapper {
    static toMessage(message: IMessage) {
        return {
            ...message,
            id: idBinaryToString(message.id as Buffer),
            replied_message: message.replied_message ? idBinaryToString(message.replied_message as Buffer) : null,
        }
    }
}