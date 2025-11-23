import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

export const LogInSchema = z.object({
  username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد").regex(passwordRegex, "رمز باید شامل حرف کوچک، حرف بزرگ، عدد و کاراکتر خاص باشد"), // ← اینجا اختیاری شد
});
