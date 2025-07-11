import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .email("Format d'email invalide")
    .min(5)
    .max(100)
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(100, "Le mot de passe est trop long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]/,
      "Le mot de passe doit contenir au moins : une minuscule, une majuscule et un chiffre"
    ),
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom est trop long")
    .trim()
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom contient des caractères invalides"),
});

export const loginSchema = z.object({
  email: z
    .email("Format d'email invalide")
    .min(1, "Email requis")
    .toLowerCase()
    .trim(),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
