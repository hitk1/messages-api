import { beforeAll, describe, expect, it } from "vitest";
import { uuidv7 } from "uuidv7";

import { MessagesInMemoryRepository } from "@modules/chat/domains/fakes/repositories/message-in-memory";
import { ChatReplyMessageService } from "./Service";
import { ChatNewMessageService } from "../new-message/Service";
import { messagesMock } from "@core/test";
import { AppError } from "@shared/errors/app-error";

let messages: {
    id: string;
    replied_message: string | null;
    content: string;
    author: string;
    created_at: Date;
    updated_at: Date;
}[] = []

let messageRepo: MessagesInMemoryRepository
let replyService: ChatReplyMessageService

describe('Reply Message Service', () => {
    beforeAll(async () => {
        messageRepo = new MessagesInMemoryRepository()
        replyService = new ChatReplyMessageService(messageRepo)
        const createMessageService = new ChatNewMessageService(messageRepo)

        for (const singleMessage of messagesMock)
            messages.push(await createMessageService.execute(singleMessage))
    })

    it('should be able to reply an existing message', async () => {
        const single = messages[0]

        const repliedMessage = await replyService.execute({
            author: 'Luis Degini',
            message: 'Replying message test',
            message_id: single.id
        })

        expect(repliedMessage).toHaveProperty('id')
    })

    it('should not be able to reply an unexisting message', async () => {
        await expect(
            replyService.execute({
                author: 'Luis Degini',
                message: 'Replying message test',
                message_id: uuidv7()
            })
        ).rejects.toEqual(new AppError('Message not found', 404))
    })
})