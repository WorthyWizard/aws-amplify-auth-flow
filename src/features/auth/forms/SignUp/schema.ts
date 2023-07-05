import { object, string, z } from "zod";

import { messages } from "../messages";
import {
  atLeastOneDigitRegex,
  atLeastOneLowercaseRegex,
  atLeastOneUppercaseRegex,
} from "../regex";

export const SignUpSchema = object({
  email: string().email(),
  password: string()
    .min(8, messages.minimumLength)
    .max(15, messages.maximumLength)
    .refine((password) => atLeastOneUppercaseRegex.test(password), {
      message: messages.atLeastOneUppercase,
    })
    .refine((password) => atLeastOneLowercaseRegex.test(password), {
      message: messages.atLeastOneLowercase,
    })
    .refine((password) => atLeastOneDigitRegex.test(password), {
      message: messages.atLeastOneDigit,
    }),
  confirmPassword: string(),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  path: ["confirmPassword"],
  message: messages.passwordDontMatch,
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;
