import { z } from 'zod';

// ============================================================
// Contact Form Schema
// ============================================================
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter')
    .regex(/^[a-zA-Z\s\-'.]+$/, 'Nama hanya boleh berisi huruf'),

  email: z
    .string()
    .email('Format email tidak valid')
    .max(254, 'Email terlalu panjang')
    .toLowerCase(),

  company: z
    .string()
    .max(200, 'Nama perusahaan terlalu panjang')
    .optional()
    .transform((val) => val?.trim()),

  division: z.enum(
    [
      'industrial-iot',
      'data-intelligence',
      'creative-media',
      'fb-ventures',
      'edutech',
      'social-impact',
      'spiritual-travel',
      'general',
    ],
    { errorMap: () => ({ message: 'Pilih divisi yang valid' }) }
  ),

  message: z
    .string()
    .min(10, 'Pesan minimal 10 karakter')
    .max(2000, 'Pesan maksimal 2000 karakter')
    .trim(),

  csrfToken: z.string().min(32, 'CSRF token tidak valid'),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormOutput = z.output<typeof contactFormSchema>;

// ============================================================
// Newsletter Schema
// ============================================================
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Format email tidak valid')
    .toLowerCase()
    .trim(),
  csrfToken: z.string().min(32, 'CSRF token tidak valid'),
});

export type NewsletterInput = z.input<typeof newsletterSchema>;

// ============================================================
// Division slug schema
// ============================================================
export const divisionSlugSchema = z.enum([
  'industrial-iot',
  'data-intelligence',
  'creative-media',
  'fb-ventures',
  'edutech',
  'social-impact',
  'spiritual-travel',
]);

export type DivisionSlug = z.infer<typeof divisionSlugSchema>;

// ============================================================
// API Error Response
// ============================================================
export const apiErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.string(), z.array(z.string())).optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
