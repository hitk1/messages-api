import { describe, it, expect } from 'vitest'
import { ChatNewMessageService } from './Service'
import { MessagesInMemoryRepository } from '@modules/chat/domains/fakes/repositories/message-in-memory'


describe('New Message Service', () => {
    const make = () => {
        const messageRepo = new MessagesInMemoryRepository()
        const createMessageService = new ChatNewMessageService(messageRepo)

        return {
            createMessageService,
        }
    }

    it('should be able to create a message', async () => {
        const { createMessageService } = make()

        const created = await createMessageService.execute({
            author: 'Luis Degini',
            message: 'This is a test'
        })

        expect(created).toHaveProperty('id')
    })
})