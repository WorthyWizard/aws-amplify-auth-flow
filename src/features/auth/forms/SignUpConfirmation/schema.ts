import { object, string, z } from "zod";

import { messages } from "../messages";

export const SignUpConfirmationSchema = object({
  code: string()
    .nonempty({ message: messages.notEmpty })
    .length(6, { message: messages.incorrectLength }),
});

export type SignUpConfirmationFormData = z.infer<
  typeof SignUpConfirmationSchema
>;
