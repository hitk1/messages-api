import { z } from "zod";
import { replyMessageValidation } from "@modules/chat/validations/reply-message-validation";

export type IParamsReplyMessage = z.infer<typeof replyMessageValidation>