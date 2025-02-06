import { beforeAll, describe, expect, it } from "vitest";
import { uuidv7 } from 'uuidv7'

import { MessagesInMemoryRepository } from "@modules/chat/domains/fakes/repositories/message-in-memory";
import { ChatDeleteMessageService } from "./Service";
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
let deleteService: ChatDeleteMessageService

describe('Delete Message Service', () => {
    beforeAll(async () => {
        messageRepo = new MessagesInMemoryRepository()
        deleteService = new ChatDeleteMessageService(messageRepo)
        const createMessageService = new ChatNewMessageService(messageRepo)

        for (const singleMessage of messagesMock)
            messages.push(await createMessageService.execute(singleMessage))
    })

    it('should be able to delete an existing message', async () => {
        const single = messages[0]

        await expect(
            deleteService.execute({
                message_id: single.id
            })
        ).resolves.not.toThrow()
    })

    it('should not be able to delete an unexisting message', async () => {
        await expect(
            deleteService.execute({
                message_id: uuidv7()
            })
        ).rejects.toEqual(new AppError('Message not found', 404))
    })
})