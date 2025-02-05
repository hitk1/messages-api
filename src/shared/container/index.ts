import { container } from 'tsyringe'

import { IMessageRepository } from '@modules/chat/domains/repositories/message'
import { MessagesRepository } from '@modules/chat/infra/database/repositories/messsage'

container.registerSingleton<IMessageRepository>('MessagesRepository', MessagesRepository)