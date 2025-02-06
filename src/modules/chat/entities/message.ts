import { idStringToBinary } from "@core/utils/identifier";
import { IMessage } from "../domains/models/message";

export class Messages implements IMessage {
    id: Buffer
    content: string;
    author: string;
    replied_message: Buffer | null;
    created_at: Date;
    updated_at: Date;

    constructor(){
        this.id = idStringToBinary()

        this.created_at = new Date()
        this.updated_at = new Date()
    }
}