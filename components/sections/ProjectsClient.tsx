'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from '@/lib/projects';
import { cn } from '@/lib/utils';
import { Search, ArrowRight, Mail } from 'lucide-react';

// ============================================================
// Category accent colors
// ============================================================
const CATEGORY_COLORS: Record<ProjectCategory, { pill: string; glow: string }> = {
  'IoT & Industrial':       { pill: 'text-tech-blue border-tech-blue/30 bg-tech-blue/10',          glow: '#1E5AA8' },
  'Web Development':        { pill: 'text-teal-intelligence border-teal-intelligence/30 bg-teal-intelligence/10', glow: '#0EA5A0' },
  'Data & AI':              { pill: 'text-teal-intelligence border-teal-intelligence/30 bg-teal-intelligence/10', glow: '#0EA5A0' },
  'E-Commerce':             { pill: 'text-gold-patih border-gold-patih/30 bg-gold-patih/10',        glow: '#D4A843' },
  'Government & Public':    { pill: 'text-tech-blue border-tech-blue/30 bg-tech-blue/10',           glow: '#1E5AA8' },
  'Education':              { pill: 'text-[#5B9AF5] border-[#5B9AF5]/30 bg-[#5B9AF5]/10',          glow: '#5B9AF5' },
  'Finance & Accounting':   { pill: 'text-gold-patih border-gold-patih/30 bg-gold-patih/10',        glow: '#D4A843' },
  'Mobile & App':           { pill: 'text-teal-intelligence border-teal-intelligence/30 bg-teal-intelligence/10', glow: '#0EA5A0' },
  'Internal Product':       { pill: 'text-white/50 border-white/20 bg-white/5',                    glow: '#5B9AF5' },
};

// ============================================================
// Project Card
// ============================================================
function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const catStyle = CATEGORY_COLORS[project.category];

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] transition-all duration-400 hover:border-white/20 hover:-translate-y-1"
      style={{
        background: 'rgba(255,255,255,0.02)',
        animationDelay: `${(index % 15) * 35}ms`,
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 30px ${project.accentColor}18` }}
      />

      {/* Top — icon area */}
      <div
        className="relative flex items-center justify-between px-5 pt-5 pb-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Emoji icon in styled box */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${project.accentColor}18`,
            border: `1px solid ${project.accentColor}30`,
          }}
        >
          {project.icon}
        </div>

        {/* Year badge */}
        <span
          className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
          style={{ color: project.accentColor + 'cc', borderColor: project.accentColor + '30', background: project.accentColor + '10' }}
        >
          {project.year}
        </span>
      </div>

      {/* Bottom — info */}
      <div className="flex flex-col flex-1 p-5 pt-4">
        {/* Project name */}
        <h3
          className="font-heading text-white text-base leading-snug mb-2 group-hover:text-white transition-colors"
          style={{ fontWeight: 700 }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-white/45 leading-relaxed mb-3 font-body line-clamp-2">
          {project.description}
        </p>

        {/* Category pill */}
        <span className={cn('self-start text-[9px] font-mono px-2.5 py-1 rounded-full border mb-3', catStyle.pill)}>
          {project.category}
        </span>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[9px] font-mono px-2 py-0.5 rounded text-white/30 border border-white/[0.07]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CTA Banner
// ============================================================
function ProjectsCTA() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl mt-24 p-10 md:p-14 text-center"
      style={{ background: 'linear-gradient(135deg,#0a1e44 0%,#061830 50%,#071020 100%)', border: '1px solid rgba(14,165,160,0.2)' }}
    >
      {/* Star dots */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none rounded-3xl"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        aria-hidden="true"
      />
      {/* Nebula glows */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(30,90,168,0.2) 0%,transparent 70%)', filter: 'blur(40px)' }} aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(14,165,160,0.15) 0%,transparent 70%)', filter: 'blur(40px)' }} aria-hidden="true" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-teal-intelligence mb-5">
          <span className="w-6 h-px bg-teal-intelligence" />
          Work With Us
        </div>
        <h2 className="font-heading text-3xl md:text-4xl text-white leading-tight mb-4" style={{ fontWeight: 800 }}>
          Your Project Could Be{' '}
          <span style={{ background: 'linear-gradient(90deg,#5B9AF5,#0EA5A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Next
          </span>
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed mb-10 font-body">
          Dari IoT industri, platform data AI, hingga aplikasi pemerintah — kami telah membangun
          60+ proyek sejak 2013. Ceritakan kebutuhan Anda kepada kami.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-heading tracking-wider uppercase transition-all hover:-translate-y-px hover:shadow-glow-teal"
            style={{ fontWeight: 600, background: 'linear-gradient(135deg,#1E5AA8,#0EA5A0)' }}
          >
            <Mail size={16} />
            <span>Start a Project</span>
          </Link>
          <Link
            href="/divisions"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-gold-patih text-sm font-heading tracking-wider uppercase border border-gold-patih/40 transition-all hover:bg-gold-patih/10"
            style={{ fontWeight: 600 }}
          >
            <span>Explore Divisions</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mini stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-14 pt-10 border-t border-white/[0.07]">
          {[
            { value: '60+', label: 'Projects Completed' },
            { value: '13+', label: 'Years Experience' },
            { value: '7', label: 'Business Divisions' },
            { value: '12+', label: 'Cities Reached' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl text-white" style={{ fontWeight: 800 }}>
                {stat.value}
              </p>
              <p className="text-xs font-mono text-white/35 mt-0.5 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Client Component
// ============================================================
export function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q
        || p.name.toLowerCase().includes(q)
        || p.originalName.toLowerCase().includes(q)
        || p.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div>
      {/* Top bar: count + search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2.5">
          <span className="text-4xl font-heading text-white" style={{ fontWeight: 800 }}>{filtered.length}</span>
          <span className="text-white/35 font-body text-sm">
            {filtered.length === PROJECTS.length ? 'total projects' : `of ${PROJECTS.length}`}
          </span>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search project or technology..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl text-sm font-body text-white placeholder-white/25 outline-none w-72 transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('All')}
          className={cn(
            'px-4 py-1.5 rounded-full text-xs font-mono border transition-all',
            activeCategory === 'All'
              ? 'bg-teal-intelligence/20 border-teal-intelligence/50 text-teal-intelligence'
              : 'border-white/10 text-white/40 hover:text-white/70 hover:border-white/25'
          )}
        >
          All ({PROJECTS.length})
        </button>
        {PROJECT_CATEGORIES.map(cat => {
          const count = PROJECTS.filter(p => p.category === cat).length;
          const style = CATEGORY_COLORS[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-mono border transition-all',
                activeCategory === cat ? style.pill : 'border-white/10 text-white/40 hover:text-white/70 hover:border-white/25'
              )}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-white/25 font-mono text-sm">
          No projects found for "{search}"
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}

      {/* CTA */}
      <ProjectsCTA />
    </div>
  );
}
