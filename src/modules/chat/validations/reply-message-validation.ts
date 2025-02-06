import { z } from "zod";

export const replyMessageValidation = z.object({
    message_id: z.string().uuid().min(1),
    message: z.string().min(1, 'Message content is required').max(600, 'Message content max 600 chars'),
    author: z.string().min(1, 'Author name is required').max(255, 'Author name must contain at maximum 255 charss')
}).strict()