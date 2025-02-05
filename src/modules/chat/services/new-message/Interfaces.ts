import { z } from "zod";
import { newMessageValidation } from "@modules/chat/validations/new-message-validation";

export type IParamsNewMessage = z.infer<typeof newMessageValidation>