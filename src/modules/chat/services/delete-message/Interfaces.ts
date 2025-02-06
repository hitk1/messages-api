import { z } from "zod";
import { deleteMessageValidation } from "@modules/chat/validations/delete-message-validation";

export type IParamsDeleteMessage = z.infer<typeof deleteMessageValidation>