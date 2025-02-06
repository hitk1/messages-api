import { idBinaryToString } from "@core/utils/identifier";
import { IMessage } from "../domains/models/message";

export class MessageMapper {
    static toMessage(message: IMessage) {
        return {
            ...message,
            id: idBinaryToString(message.id as Buffer)
        }
    }
}