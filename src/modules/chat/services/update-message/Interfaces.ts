import { z } from "zod";
import { updateMessageValidation } from "@modules/chat/validations/update-message-vlaidation";

export type IParamsUpdateNewMessage = z.infer<typeof updateMessageValidation>