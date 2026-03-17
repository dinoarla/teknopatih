'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

// ============================================================
// Hero Section – Full-screen with canvas particle network
// ============================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

const PARTICLE_COLORS = ['#1E5AA8', '#0EA5A0', '#D4A843', '#5B9AF5'] as const;

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Init particles
    const count = Math.min(60, Math.floor(window.innerWidth / 22));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particlesRef.current;

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14, 165, 160, ${(1 - dist / 140) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const resizeHandler = () => { resize(); };
    window.addEventListener('resize', resizeHandler, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-patih noise-overlay"
      aria-label="Hero"
    >
      {/* Radial mesh gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-tech-blue/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-intelligence/6 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-patih/3 blur-[150px]" />
      </div>

      {/* Particle network */}
      <ParticleCanvas />

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-intelligence/20 to-transparent pointer-events-none"
        style={{ top: '30%', animation: 'scanLine 8s ease-in-out infinite' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-5xl">
          {/* Tag */}
          <div className="section-tag mb-8 opacity-0 animate-fade-up delay-100">
            Est. 2013 · Pontianak, Kalimantan Barat
          </div>

          {/* Headline */}
          <h1 className="font-heading font-800 leading-[1.08] tracking-tight mb-8">
            <span className="block text-5xl md:text-7xl lg:text-8xl text-white opacity-0 animate-fade-up delay-200">
              We Turn Data
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl opacity-0 animate-fade-up delay-300">
              <span className="text-gradient-blue">Into Decisions</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/55 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 opacity-0 animate-fade-up delay-400 font-body">
            Arla Industri Teknopatih adalah holding company teknologi dari Pontianak
            dengan{' '}
            <span className="text-white/80 font-500">7 divisi aktif</span> — dari
            Industrial IoT hingga Data Intelligence, membangun ekosistem bisnis
            berbasis AI untuk Indonesia dan Asia Tenggara.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up delay-500">
            <Link href="/divisions" className="btn-primary text-white">
              <span>Explore Divisions</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-outline">
              Our Story
            </Link>
          </div>

          {/* Tagline badge */}
          <div className="mt-16 inline-flex items-center gap-3 opacity-0 animate-fade-up delay-600">
            <div className="flex gap-1.5">
              {['#1E5AA8', '#0EA5A0', '#D4A843'].map((color) => (
                <span
                  key={color}
                  className="w-2 h-2 rounded-full animate-pulse-slow"
                  style={{ backgroundColor: color, animationDelay: `${Math.random() * 1}s` }}
                />
              ))}
            </div>
            <span className="text-xs font-mono tracking-widest text-white/35 uppercase">
              AI Driven Data Decision Company
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-up delay-700">
        <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
          Scroll
        </span>
        <ChevronDown size={16} className="text-white/30 animate-bounce" />
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="256" cy="256" r="200" stroke="white" strokeWidth="1" />
          <circle cx="256" cy="256" r="140" stroke="white" strokeWidth="1" />
          <circle cx="256" cy="256" r="80" stroke="white" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
