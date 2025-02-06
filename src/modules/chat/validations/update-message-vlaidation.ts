import { z } from "zod";

export const updateMessageValidation = z.object({
    message_id: z.string().uuid().min(1),
    content: z.string().min(1).max(600)
})