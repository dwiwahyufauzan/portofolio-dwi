import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return json({ success: false, message: 'Nama harus diisi (minimal 2 karakter).' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return json({ success: false, message: 'Alamat email tidak valid.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return json({ success: false, message: 'Pesan terlalu pendek (minimal 10 karakter).' }, { status: 400 });
    }

    // 2. Simulated / Service Dispatch (Can be wired to Resend / EmailJS / Formspree)
    console.log(`[Contact API] Message from ${name} (${email}): Subject: ${subject || 'N/A'}`);

    // 3. Return Success JSON
    return json({
      success: true,
      message: 'Terima kasih! Pesan Anda telah berhasil terkirim. Saya akan segera menghubungi Anda kembali.',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return json(
      { success: false, message: 'Terjadi kesalahan pada server. Silakan coba lagi beberapa saat.' },
      { status: 500 }
    );
  }
};
