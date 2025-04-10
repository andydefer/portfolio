// formSchema.ts

import { z } from "zod";

/**
 * Schéma de validation Zod pour le formulaire de contact
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." })
    .max(50, { message: "Le nom ne doit pas dépasser 50 caractères." }),

  email: z
    .string()
    .min(5, { message: "L'adresse e-mail est trop courte." })
    .email({ message: "Adresse e-mail invalide." }),

  subject: z
    .string()
    .min(3, { message: "Le sujet doit contenir au moins 3 caractères." })
    .max(100, { message: "Le sujet ne doit pas dépasser 100 caractères." }),

  message: z
    .string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères." })
    .max(1000, { message: "Le message ne doit pas dépasser 1000 caractères." }),
  captchaToken: z.string().min(1, "Captcha requis."),
});

/**
 * Type TypeScript correspondant au schéma de formulaire
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;
