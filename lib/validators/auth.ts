import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Düzgün email ünvanı daxil edin"),
  password: z.string().min(6, "Şifrə ən azı 6 simvol olmalıdır"),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Ad ən azı 2 simvol olmalıdır"),
    email: z.string().email("Düzgün email ünvanı daxil edin"),
    password: z.string().min(6, "Şifrə ən azı 6 simvol olmalıdır"),
    confirmPassword: z.string().min(6, "Şifrə təkrarı ən azı 6 simvol olmalıdır"),
    phone: z.string().min(10, "Telefon nömrəsi düzgün deyil"),
    terms: z.boolean().refine((val) => val === true, "Şərtləri qəbul etməlisiniz"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifrələr uyğun gəlmir",
    path: ["confirmPassword"],
  })

export const profileSchema = z.object({
  name: z.string().min(2, "Ad ən azı 2 simvol olmalıdır"),
  email: z.string().email("Düzgün email ünvanı daxil edin"),
  phone: z.string().min(10, "Telefon nömrəsi düzgün deyil"),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
