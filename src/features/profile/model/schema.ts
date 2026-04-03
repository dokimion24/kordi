import { z } from "zod";

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "nicknameTooShort" })
    .max(20, { message: "nicknameTooLong" })
    .regex(/^[a-zA-Z0-9가-힣_]+$/, { message: "nicknameInvalid" }),
});

export type NicknameFormValues = z.infer<typeof nicknameSchema>;
