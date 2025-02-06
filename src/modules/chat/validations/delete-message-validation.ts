import { z } from "zod";

export const deleteMessageValidation = z.object({
    message_id: z.string().uuid().min(1)
}).strict()