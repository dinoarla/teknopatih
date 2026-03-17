'use server';

import { generateCsrfToken, validateCsrfToken, setCsrfCookie } from '@/lib/csrf';
import { contactFormSchema, newsletterSchema } from '@/lib/schemas';
import type { ApiResponse, ContactFormData } from '@/types';

// ============================================================
// Server Action: Get CSRF Token
// ============================================================

export async function getCsrfTokenAction(): Promise<string> {
  const token = generateCsrfToken();
  await setCsrfCookie(token);
  return token;
}

// ============================================================
// Server Action: Submit Contact Form
// ============================================================

export async function submitContactForm(
  formData: unknown
): Promise<ApiResponse<{ message: string }>> {
  try {
    // 1. Parse & validate with Zod
    const parsed = contactFormSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors)[0]?.[0] ?? 'Validasi gagal';
      return { success: false, error: firstError };
    }

    const data = parsed.data;

    // 2. Validate CSRF token
    if (!validateCsrfToken(data.csrfToken)) {
      return { success: false, error: 'Sesi tidak valid. Silahkan muat ulang halaman.' };
    }

    // 3. Process form (in production: send email, save to DB, etc.)
    // Simulated async processing
    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    console.info('[Contact Form] New submission from:', data.email, 'Division:', data.division);

    return {
      success: true,
      data: { message: 'Pesan Anda telah kami terima. Tim kami akan menghubungi dalam 1x24 jam.' },
    };
  } catch (error) {
    console.error('[Contact Form] Unexpected error:', error);
    return { success: false, error: 'Terjadi kesalahan. Silahkan coba lagi.' };
  }
}

// ============================================================
// Server Action: Newsletter Signup
// ============================================================

export async function subscribeNewsletter(
  formData: unknown
): Promise<ApiResponse<{ message: string }>> {
  try {
    const parsed = newsletterSchema.safeParse(formData);

    if (!parsed.success) {
      return { success: false, error: 'Format email tidak valid' };
    }

    if (!validateCsrfToken(parsed.data.csrfToken)) {
      return { success: false, error: 'Sesi tidak valid.' };
    }

    // In production: add to mailing list
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    return {
      success: true,
      data: { message: 'Terima kasih telah berlangganan newsletter AIT!' },
    };
  } catch (error) {
    console.error('[Newsletter] Error:', error);
    return { success: false, error: 'Terjadi kesalahan.' };
  }
}
