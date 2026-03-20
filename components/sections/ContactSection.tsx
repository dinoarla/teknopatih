'use client';

import { useState, useEffect } from 'react';
import { submitContactForm } from '@/app/actions';
import { DIVISIONS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Send, CheckCircle, AlertCircle, MapPin, Mail } from 'lucide-react';

// ============================================================
// Contact Form – CSRF protected, Zod validated
// ============================================================

interface ContactFormProps {
  readonly csrfToken: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  company: string;
  division: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  company: '',
  division: '',
  message: '',
};

export function ContactForm({ csrfToken }: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');

    const result = await submitContactForm({
      ...formData,
      csrfToken,
    });

    if (result.success && result.data) {
      setStatus('success');
      setSuccessMsg(result.data.message);
      setFormData(INITIAL_STATE);
    } else {
      setStatus('error');
      setErrorMsg(result.error ?? 'Terjadi kesalahan');
    }
  };

  const inputClass = 'form-input';
  const labelClass = 'block text-xs font-mono tracking-wider text-white/45 uppercase mb-2';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Hidden CSRF field (belt-and-suspenders; token already in closure) */}
      <input type="hidden" name="csrfToken" value={csrfToken} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Nama <span className="text-teal-intelligence">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama lengkap Anda"
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-teal-intelligence">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="email@perusahaan.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Company */}
        <div>
          <label htmlFor="company" className={labelClass}>
            Perusahaan
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nama perusahaan (opsional)"
            className={inputClass}
          />
        </div>

        {/* Division selector */}
        <div>
          <label htmlFor="division" className={labelClass}>
            Divisi yang dituju <span className="text-teal-intelligence">*</span>
          </label>
          <select
            id="division"
            name="division"
            required
            value={formData.division}
            onChange={handleChange}
            className={cn(inputClass, 'cursor-pointer')}
          >
            <option value="" disabled>Pilih divisi</option>
            <option value="general">Umum / Holding</option>
            {DIVISIONS.map((div) => (
              <option key={div.id} value={div.slug}>
                {div.shortName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Pesan <span className="text-teal-intelligence">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Ceritakan kebutuhan atau pertanyaan Anda..."
          className={cn(inputClass, 'resize-none leading-relaxed')}
        />
        <p className="text-xs text-white/25 mt-1.5 font-mono">
          {formData.message.length}/2000 karakter
        </p>
      </div>

      {/* Status messages */}
      {status === 'success' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-teal-intelligence/10 border border-teal-intelligence/25">
          <CheckCircle size={18} className="text-teal-intelligence shrink-0 mt-0.5" />
          <p className="text-sm text-teal-intelligence">{successMsg}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className={cn(
          'w-full flex items-center justify-center gap-3 py-4 rounded-xl font-heading font-600 text-sm tracking-wider uppercase transition-all',
          status === 'loading'
            ? 'bg-white/10 text-white/50 cursor-not-allowed'
            : status === 'success'
            ? 'bg-teal-intelligence/20 text-teal-intelligence border border-teal-intelligence/30'
            : 'bg-gradient-to-r from-tech-blue to-teal-intelligence text-white hover:shadow-glow-teal hover:-translate-y-0.5'
        )}
      >
        {status === 'loading' ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Mengirim...
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle size={16} />
            Pesan Terkirim
          </>
        ) : (
          <>
            <Send size={16} />
            Kirim Pesan
          </>
        )}
      </button>
    </form>
  );
}

// ============================================================
// Full Contact Section (includes form + info)
// ============================================================

interface ContactSectionProps {
  readonly csrfToken: string;
}

export function ContactSection({ csrfToken }: ContactSectionProps) {
  return (
    <section className="relative py-28 bg-navy-patih" aria-label="Contact">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-tech-blue/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: info */}
          <div className="lg:col-span-2">
            <div className="section-tag mb-6">Contact Us</div>
            <h2 className="font-heading font-800 text-4xl text-white leading-tight mb-6">
              Let's Build{' '}
              <span className="text-gradient-blue">Something</span>{' '}
              Together
            </h2>
            <p className="text-white/50 leading-relaxed mb-10">
              Dengan <span className="text-white/80" style={{ fontWeight: 600 }}>60+ proyek</span> sejak
              2013 — dari IoT pembangkit listrik, platform data AI, aplikasi pemerintah, hingga e-commerce —
              kami siap mendiskusikan kebutuhan Anda berikutnya.{' '}
              <a href="/projects" className="text-teal-intelligence hover:underline transition-colors">
                Lihat portofolio lengkap →
              </a>
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-teal-intelligence/10 border border-teal-intelligence/20 flex items-center justify-center shrink-0 group-hover:bg-teal-intelligence/20 transition-colors">
                  <MapPin size={16} className="text-teal-intelligence" />
                </div>
                <div>
                  <p className="text-xs font-mono text-white/35 mb-0.5">Headquarter</p>
                  <p className="text-sm text-white/70">Pontianak, Kalimantan Barat, Indonesia</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-tech-blue/10 border border-tech-blue/20 flex items-center justify-center shrink-0 group-hover:bg-tech-blue/20 transition-colors">
                  <Mail size={16} className="text-tech-blue" />
                </div>
                <div>
                  <p className="text-xs font-mono text-white/35 mb-0.5">Email</p>
                  <a href="mailto:hello@ait.co.id" className="text-sm text-white/70 hover:text-white transition-colors">
                    hello@ait.co.id
                  </a>
                </div>
              </div>
            </div>

            {/* Division quick links */}
            <div className="mt-10 pt-8 border-t border-white/[0.06]">
              <p className="text-xs font-mono text-white/35 uppercase tracking-widest mb-4">
                Quick Division Contact
              </p>
              <div className="flex flex-wrap gap-2">
                {DIVISIONS.slice(0, 4).map((div) => (
                  <span
                    key={div.id}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/45 font-mono"
                  >
                    {div.shortName}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8">
              <ContactForm csrfToken={csrfToken} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
