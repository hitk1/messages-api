import { describe, it, expect, beforeAll } from 'vitest'
import { uuidv7 } from 'uuidv7'

import { MessagesInMemoryRepository } from '@modules/chat/domains/fakes/repositories/message-in-memory'
import { ChatNewMessageService } from '../new-message/Service'
import { ChatUpdateMessageService } from './Service'
import { messagesMock } from '@core/test'
import { AppError } from '@shared/errors/app-error'

let messages: {
    id: string;
    replied_message: string | null;
    content: string;
    author: string;
    created_at: Date;
    updated_at: Date;
}[] = []

let messageRepo: MessagesInMemoryRepository
let updateService: ChatUpdateMessageService

describe('Update Message Service', () => {
    beforeAll(async () => {
        messageRepo = new MessagesInMemoryRepository()
        updateService = new ChatUpdateMessageService(messageRepo)
        const createMessageService = new ChatNewMessageService(messageRepo)

        for (const singleMessage of messagesMock)
            messages.push(await createMessageService.execute(singleMessage))
    })

    it('should be able to update an existing message', async () => {
        const single = messages[0]

        const result = await updateService.execute({
            message_id: single.id,
            content: 'Testing'
        })

        expect(result).toHaveProperty('id')
    })

    it('should not be able to update an unexisting message', async () => {
        await expect(
            updateService.execute({
                message_id: uuidv7(),
                content: 'Testing'
            })
        ).rejects.toEqual(new AppError('Message not found', 404))
    })
})