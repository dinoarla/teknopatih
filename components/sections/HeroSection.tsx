'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const STYLES = `
  @keyframes flameOuter {
    0%,100% { transform:scaleY(1) scaleX(1); opacity:0.82; }
    20%     { transform:scaleY(1.22) scaleX(0.88); opacity:0.95; }
    45%     { transform:scaleY(0.88) scaleX(1.10); opacity:0.72; }
    70%     { transform:scaleY(1.15) scaleX(0.92); opacity:0.90; }
  }
  @keyframes flameMid {
    0%,100% { transform:scaleY(1) scaleX(1); opacity:0.90; }
    25%     { transform:scaleY(1.30) scaleX(0.84); opacity:1; }
    55%     { transform:scaleY(0.90) scaleX(1.12); opacity:0.82; }
    80%     { transform:scaleY(1.20) scaleX(0.88); opacity:0.96; }
  }
  @keyframes flameCore {
    0%,100% { transform:scaleY(1) scaleX(1); opacity:0.96; }
    30%     { transform:scaleY(1.35) scaleX(0.80); opacity:1; }
    60%     { transform:scaleY(0.88) scaleX(1.14); opacity:0.88; }
  }
  @keyframes flameTip {
    0%,100% { transform:scaleY(1); opacity:0.7; }
    50%     { transform:scaleY(1.6); opacity:1; }
  }
  @keyframes machDisc {
    0%,100% { opacity:0.55; transform:scaleX(1); }
    40%     { opacity:0.85; transform:scaleX(0.9); }
    70%     { opacity:0.4; transform:scaleX(1.1); }
  }
  @keyframes sparkFloat {
    0%   { transform:translate(0,0) scale(1); opacity:0.95; }
    100% { transform:translate(var(--sx),var(--sy)) scale(0); opacity:0; }
  }
  @keyframes windowGlow {
    0%,100% { opacity:0.75; }
    50%     { opacity:1; }
  }
  @keyframes thrusterGlow {
    0%,100% { opacity:0.35; }
    50%     { opacity:0.90; }
  }
  @keyframes antennaGlow {
    0%,100% { opacity:0.6; }
    50%     { opacity:1; }
  }
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes earthPulse {
    0%,100% { opacity:0.15; }
    50%     { opacity:0.25; }
  }
  @keyframes orbitDash {
    from { stroke-dashoffset:0; }
    to   { stroke-dashoffset:-800; }
  }
`;

// ── Space canvas ──────────────────────────────────────────────
function SpaceCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    resize();
    const N = Math.min(280, Math.floor(window.innerWidth / 5.5));
    const stars = Array.from({ length: N }, () => ({
      x: Math.random()*cv.width, y: Math.random()*cv.height,
      r: Math.random()*1.8+0.2,
      op: Math.random()*0.7+0.2,
      ts: Math.random()*0.016+0.004,
      to: Math.random()*Math.PI*2,
    }));
    const blobs = [
      { x:cv.width*.14,y:cv.height*.28,r:360,c:'rgba(30,90,168,',  d:.0004,p:0 },
      { x:cv.width*.82,y:cv.height*.16,r:300,c:'rgba(0,200,232,',  d:.0003,p:1 },
      { x:cv.width*.5, y:cv.height*.74,r:400,c:'rgba(30,90,168,',  d:.0005,p:2 },
      { x:cv.width*.88,y:cv.height*.8, r:260,c:'rgba(212,168,67,', d:.0006,p:3 },
    ];
    let t = 0;
    const draw = () => {
      t++; ctx.clearRect(0,0,cv.width,cv.height);
      blobs.forEach(b => {
        const p = Math.sin(t*b.d*100+b.p)*.012+.05;
        const g = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
        g.addColorStop(0,b.c+p+')'); g.addColorStop(.5,b.c+(p*.35)+')'); g.addColorStop(1,b.c+'0)');
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill();
      });
      stars.forEach(s => {
        const tw = Math.sin(t*s.ts+s.to)*.3+.7;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${s.op*tw})`; ctx.fill();
      });
      if (t%420===0) {
        const sx=Math.random()*cv.width*.5, sy=Math.random()*cv.height*.35;
        const g=ctx.createLinearGradient(sx,sy,sx+160,sy+52);
        g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.85)');g.addColorStop(1,'rgba(255,255,255,0)');
        ctx.strokeStyle=g; ctx.lineWidth=0.8;
        ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sx+160,sy+52); ctx.stroke();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize, { passive:true });
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize',resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden="true"/>;
}

// ── Rocket SVG ────────────────────────────────────────────────
function RocketSVG() {
  const sparks = [
    { x:96,  dy:22, dx:-8,  delay:'0s',    dur:'0.55s' },
    { x:104, dy:28, dx:9,   delay:'0.12s', dur:'0.48s' },
    { x:100, dy:34, dx:-4,  delay:'0.22s', dur:'0.62s' },
    { x:93,  dy:18, dx:-12, delay:'0.08s', dur:'0.44s' },
    { x:107, dy:20, dx:12,  delay:'0.18s', dur:'0.50s' },
    { x:100, dy:40, dx:5,   delay:'0.30s', dur:'0.70s' },
    { x:98,  dy:15, dx:-6,  delay:'0.35s', dur:'0.42s' },
    { x:102, dy:26, dx:7,   delay:'0.40s', dur:'0.58s' },
  ];
  return (
    <svg viewBox="0 0 200 340" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="rBody" x1="60" y1="40" x2="150" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#D8E4EE"/>
          <stop offset="20%"  stopColor="#B8C8D8"/>
          <stop offset="55%"  stopColor="#8898A8"/>
          <stop offset="80%"  stopColor="#5a6a7a"/>
          <stop offset="100%" stopColor="#3a4a58"/>
        </linearGradient>
        <linearGradient id="rBodyShade" x1="110" y1="0" x2="190" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#1a2a38" stopOpacity="0"/>
          <stop offset="100%" stopColor="#0a1520" stopOpacity="0.75"/>
        </linearGradient>
        <linearGradient id="rBodyLight" x1="60" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="rNose" x1="72" y1="18" x2="128" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E8F0F8"/>
          <stop offset="35%"  stopColor="#B0C4D8"/>
          <stop offset="70%"  stopColor="#7898B8"/>
          <stop offset="100%" stopColor="#4a6882"/>
        </linearGradient>
        <linearGradient id="rRing" x1="68" y1="0" x2="132" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6080A0"/>
          <stop offset="50%"  stopColor="#3a5070"/>
          <stop offset="100%" stopColor="#202a38"/>
        </linearGradient>
        <linearGradient id="rBell" x1="72" y1="215" x2="128" y2="255" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#708090"/>
          <stop offset="40%" stopColor="#4a5868"/>
          <stop offset="100%" stopColor="#252f3a"/>
        </linearGradient>
        <linearGradient id="rFinL" x1="30" y1="200" x2="72" y2="225" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#7890A8"/>
          <stop offset="100%" stopColor="#283848"/>
        </linearGradient>
        <linearGradient id="rFinR" x1="128" y1="200" x2="170" y2="225" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#283848"/>
          <stop offset="100%" stopColor="#7890A8"/>
        </linearGradient>
        <radialGradient id="rWin" cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#C8E8FF" stopOpacity="0.98"/>
          <stop offset="35%"  stopColor="#68B8E8" stopOpacity="0.85"/>
          <stop offset="75%"  stopColor="#1848A0" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#082040" stopOpacity="0.5"/>
        </radialGradient>
        <radialGradient id="fOuter" cx="50%" cy="5%" r="100%">
          <stop offset="0%"   stopColor="#FF6A00"/>
          <stop offset="25%"  stopColor="#E84800"/>
          <stop offset="55%"  stopColor="#C02800"/>
          <stop offset="80%"  stopColor="#801200"/>
          <stop offset="100%" stopColor="#400000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="fMid" cx="50%" cy="3%" r="85%">
          <stop offset="0%"   stopColor="#FFD200"/>
          <stop offset="20%"  stopColor="#FFB000"/>
          <stop offset="50%"  stopColor="#FF7800"/>
          <stop offset="85%"  stopColor="#E84000"/>
          <stop offset="100%" stopColor="#C03000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="fCore" cx="50%" cy="2%" r="70%">
          <stop offset="0%"   stopColor="#FFFFFF"/>
          <stop offset="15%"  stopColor="#FFFCE0"/>
          <stop offset="40%"  stopColor="#FFE880"/>
          <stop offset="75%"  stopColor="#FFB800"/>
          <stop offset="100%" stopColor="#FF6600" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="fPlume" cx="50%" cy="0%" r="100%">
          <stop offset="0%"   stopColor="#FF9000" stopOpacity="0.55"/>
          <stop offset="40%"  stopColor="#FF5000" stopOpacity="0.20"/>
          <stop offset="75%"  stopColor="#CC2000" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#880000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="fShock" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.92"/>
          <stop offset="45%"  stopColor="#FFE040" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#FF8000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="thrustGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00D4FF" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0"/>
        </radialGradient>
        <clipPath id="lc"><circle cx="100" cy="164" r="16"/></clipPath>
      </defs>

      {/* Exhaust plume */}
      <ellipse cx="100" cy="320" rx="44" ry="72" fill="url(#fPlume)"
        style={{ animation:'flameOuter 0.38s ease-in-out infinite', transformOrigin:'100px 248px' }}/>
      {/* Mach shock diamonds */}
      {[{cy:268,rx:12,ry:9,op:0.60,dur:'0.32s'},{cy:288,rx:9,ry:6.5,op:0.45,dur:'0.28s',d:'0.06s'},
        {cy:304,rx:7,ry:4.5,op:0.32,dur:'0.36s',d:'0.03s'},{cy:316,rx:5,ry:3,op:0.20,dur:'0.30s',d:'0.09s'}
      ].map((d,i)=>(
        <ellipse key={i} cx="100" cy={d.cy} rx={d.rx} ry={d.ry}
          fill="url(#fShock)" opacity={d.op}
          style={{ animation:`machDisc ${d.dur} ease-in-out infinite`, animationDelay:(d as any).d||'0s', transformOrigin:'100px 248px' }}/>
      ))}
      {/* Sparks */}
      {sparks.map((s,i)=>(
        <circle key={i} cx={s.x} cy={248+s.dy} r="1.8"
          fill={i%3===0?'#FFE000':i%3===1?'#FF8800':'#FFFFFF'}
          style={{ animation:`sparkFloat ${s.dur} ease-out infinite`, animationDelay:s.delay,
            ['--sx' as any]:`${s.dx}px`, ['--sy' as any]:`${s.dy+12}px` } as React.CSSProperties}/>
      ))}
      {/* Outer flame */}
      <ellipse cx="100" cy="260" rx="26" ry="38" fill="url(#fOuter)"
        style={{ animation:'flameOuter 0.36s ease-in-out infinite', transformOrigin:'100px 248px' }}/>
      {/* Mid flame */}
      <ellipse cx="100" cy="256" rx="17" ry="26" fill="url(#fMid)"
        style={{ animation:'flameMid 0.28s ease-in-out infinite', transformOrigin:'100px 248px' }}/>
      {/* Core flame */}
      <ellipse cx="100" cy="252" rx="9" ry="16" fill="url(#fCore)"
        style={{ animation:'flameCore 0.22s ease-in-out infinite 0.04s', transformOrigin:'100px 248px' }}/>
      <ellipse cx="100" cy="249" rx="4" ry="7" fill="white" fillOpacity="0.97"
        style={{ animation:'flameTip 0.18s ease-in-out infinite alternate' }}/>
      <ellipse cx="100" cy="247" rx="2" ry="4" fill="white" fillOpacity="1"
        style={{ animation:'flameTip 0.14s ease-in-out infinite alternate 0.04s' }}/>

      {/* Fins */}
      <path d="M 70 192 L 24 234 L 38 240 L 56 218 L 70 210 Z" fill="url(#rFinL)" stroke="#485868" strokeWidth="0.6"/>
      <path d="M 70 192 L 36 232 L 44 230 L 68 205 Z" fill="white" fillOpacity="0.06"/>
      <path d="M 130 192 L 176 234 L 162 240 L 144 218 L 130 210 Z" fill="url(#rFinR)" stroke="#485868" strokeWidth="0.6"/>
      <path d="M 130 192 L 162 232 L 154 230 L 132 205 Z" fill="#0a1520" fillOpacity="0.25"/>

      {/* Engine */}
      <path d="M 70 215 L 66 242 L 134 242 L 130 215 Z" fill="url(#rBell)" stroke="#303a48" strokeWidth="0.5"/>
      <path d="M 78 242 Q 72 247 70 256 L 130 256 Q 128 247 122 242 Z" fill="url(#rBell)"/>
      <ellipse cx="100" cy="256" rx="30" ry="4" fill="#1a2430" stroke="#4a5a70" strokeWidth="0.8"/>
      <rect x="72" y="222" width="56" height="3" rx="1" fill="#5a7090" fillOpacity="0.5"/>
      <rect x="73" y="229" width="54" height="2" rx="1" fill="#4a6080" fillOpacity="0.35"/>
      <rect x="66" y="213" width="68" height="4" rx="1" fill="#C84000" fillOpacity="0.35"/>

      {/* Body */}
      <path d="M 68 85 L 64 215 L 136 215 L 132 85 Z" fill="url(#rBody)"/>
      <path d="M 112 85 L 110 215 L 136 215 L 132 85 Z" fill="url(#rBodyShade)"/>
      <path d="M 68 85 L 70 215 L 80 215 L 82 85 Z" fill="url(#rBodyLight)"/>
      <line x1="84" y1="87" x2="82" y2="213" stroke="#8098B2" strokeWidth="0.5" strokeOpacity="0.40"/>
      <line x1="116" y1="87" x2="118" y2="213" stroke="#304050" strokeWidth="0.5" strokeOpacity="0.50"/>
      <rect x="68" y="110" width="64" height="2" rx="0.5" fill="#7090B0" fillOpacity="0.25"/>
      <rect x="68" y="148" width="64" height="2" rx="0.5" fill="#7090B0" fillOpacity="0.25"/>
      <rect x="68" y="185" width="64" height="2" rx="0.5" fill="#7090B0" fillOpacity="0.25"/>

      {/* Interstage ring */}
      <rect x="66" y="82" width="68" height="6" rx="1" fill="url(#rRing)" stroke="#303848" strokeWidth="0.5"/>

      {/* Nose cone */}
      <path d="M 68 84 Q 66 52 100 20 Q 134 52 132 84 Z" fill="url(#rNose)"/>
      <path d="M 68 84 Q 70 56 100 22 Q 88 58 84 84 Z" fill="white" fillOpacity="0.16"/>

      {/* Window */}
      <circle cx="100" cy="120" r="18" fill="#283848" stroke="#5878A0" strokeWidth="1.8"/>
      <circle cx="100" cy="120" r="14" fill="url(#rWin)"
        style={{ animation:'windowGlow 3.5s ease-in-out infinite' }}/>
      <circle cx="100" cy="120" r="14" fill="none" stroke="#90C0E0" strokeWidth="0.6" strokeOpacity="0.55"/>
      <ellipse cx="94" cy="114" rx="5.5" ry="4" fill="white" fillOpacity="0.20" transform="rotate(-22,94,114)"/>
      <ellipse cx="96" cy="112" rx="2.2" ry="1.5" fill="white" fillOpacity="0.48" transform="rotate(-22,96,112)"/>

      {/* AIT Logo */}
      <circle cx="100" cy="164" r="18" fill="white" fillOpacity="0.92" stroke="#B0C4D8" strokeWidth="0.8"/>
      <image href="/logos/ait-mark.svg" x="82" y="146" width="36" height="36" clipPath="url(#lc)"/>

      {/* Thrusters */}
      <rect x="58" y="140" width="10" height="16" rx="2.5" fill="#384858" stroke="#506070" strokeWidth="0.5"/>
      <rect x="132" y="140" width="10" height="16" rx="2.5" fill="#283848" stroke="#506070" strokeWidth="0.5"/>
      <circle cx="63" cy="157" r="6" fill="url(#thrustGlow)"
        style={{ animation:'thrusterGlow 2.2s ease-in-out infinite' }}/>
      <circle cx="137" cy="157" r="6" fill="url(#thrustGlow)"
        style={{ animation:'thrusterGlow 2.2s ease-in-out infinite 1.1s' }}/>
      <circle cx="63" cy="157" r="2.5" fill="#00D4FF" fillOpacity="0.85"
        style={{ animation:'thrusterGlow 2.2s ease-in-out infinite' }}/>
      <circle cx="137" cy="157" r="2.5" fill="#00D4FF" fillOpacity="0.85"
        style={{ animation:'thrusterGlow 2.2s ease-in-out infinite 1.1s' }}/>

      {/* Antenna */}
      <line x1="100" y1="20" x2="100" y2="4" stroke="#A8C0D8" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="100" cy="3.5" r="3" fill="#00D4FF" fillOpacity="0.85"
        style={{ animation:'antennaGlow 1.8s ease-in-out infinite' }}/>
      <line x1="100" y1="20" x2="112" y2="14" stroke="#A0B8D0" strokeWidth="0.7" strokeLinecap="round"/>
      <circle cx="113" cy="13.5" r="1.5" fill="#00C8E8" fillOpacity="0.7"
        style={{ animation:'antennaGlow 1.8s ease-in-out infinite 0.6s' }}/>
    </svg>
  );
}

// ── Orbit decoration ──────────────────────────────────────────
function OrbitDecoration() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <radialGradient id="earthGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1E5AA8" stopOpacity="0.35"/>
          <stop offset="50%"  stopColor="#0EA5A0" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#1E5AA8" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="86%" cy="94%" rx="26%" ry="20%"
        fill="url(#earthGrad)"
        style={{ animation:'earthPulse 5s ease-in-out infinite' }}/>
      <ellipse cx="86%" cy="94%" rx="26%" ry="20%"
        fill="none" stroke="#1E5AA8" strokeWidth="0.5" strokeOpacity="0.20"
        strokeDasharray="5 10"/>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════
// JS-DRIVEN ORBIT — true elliptical path around the screen
// ══════════════════════════════════════════════════════════════
function InteractiveRocket() {
  return (
    <div
      className="hidden lg:block absolute select-none pointer-events-none"
      style={{
        right: '4%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(260px, 20vw, 320px)',
        zIndex: 10,
      }}
      aria-hidden="true"
    >
      <RocketSVG />
    </div>
  );
}

// ── Word ticker───────────────────────────────
const WORDS = ['Business','Social','Environment','Travel','Military'] as const;
type Word = typeof WORDS[number];
const COLORS: Record<Word,string> = {
  Business:'#5B9AF5', Social:'#0EA5A0', Environment:'#4ade80', Travel:'#D4A843', Military:'#f87171',
};

function WordTicker() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'in'|'hold'|'out'>('hold');
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase==='hold') t=setTimeout(()=>setPhase('out'),2200);
    if (phase==='out')  t=setTimeout(()=>{setIdx(i=>(i+1)%WORDS.length);setPhase('in');},160);
    if (phase==='in')   t=setTimeout(()=>setPhase('hold'),160);
    return ()=>clearTimeout(t);
  },[phase]);
  const w=WORDS[idx]; const col=COLORS[w];
  return (
    <span style={{
      color:col, display:'inline-block', minWidth:'220px',
      transition:'opacity .16s ease, transform .16s ease',
      opacity:phase==='out'?0:1,
      transform:phase==='out'?'translateY(-14px)':phase==='in'?'translateY(12px)':'translateY(0)',
      textShadow:`0 0 32px ${col}55`,
    }} aria-live="polite">{w}</span>
  );
}

function scrollToNext() {
  const el = document.getElementById('hero-section');
  if (el) window.scrollTo({ top: el.offsetHeight, behavior:'smooth' });
}

// ── Hero ──────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <>
      <style>{STYLES}</style>
      <section id="hero-section"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background:'linear-gradient(160deg,#020b18 0%,#030e1f 40%,#040c1a 70%,#020810 100%)' }}
        aria-label="Hero">

        <SpaceCanvas/>
        <OrbitDecoration/>
        <InteractiveRocket/>

        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background:'linear-gradient(to top,rgba(14,165,160,0.04),transparent)' }} aria-hidden="true"/>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-28">
          <div className="max-w-4xl">
            <div className="section-tag mb-8" style={{ animation:'fadeInUp .6s ease .1s both' }}>
              Est. 2013 · Pontianak, Kalimantan Barat
            </div>
            <h1 className="font-heading leading-[1.08] tracking-tight mb-0"
              style={{ fontWeight:800, animation:'fadeInUp .6s ease .2s both' }}>
              <span className="block text-[6.8vw] sm:text-4xl md:text-6xl lg:text-7xl text-white whitespace-nowrap">
                Applied Trustworthy AI,
              </span>
              <span className="block text-[6.8vw] sm:text-4xl md:text-6xl lg:text-7xl text-gradient-blue mt-1">
                To Create Impact
              </span>
            </h1>
            <div className="mt-5 mb-8" style={{ animation:'fadeInUp .6s ease .3s both' }}>
              <span className="font-heading text-3xl md:text-5xl lg:text-6xl text-white/40" style={{ fontWeight:700 }}>In </span>
              <span className="font-heading text-3xl md:text-5xl lg:text-6xl" style={{ fontWeight:800 }}>
                <WordTicker/>
              </span>
            </div>
            <div className="w-16 h-px mb-8"
              style={{ background:'linear-gradient(90deg,#0EA5A0,transparent)', animation:'fadeInUp .6s ease .35s both' }}/>
            <p className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed mb-12 font-body"
              style={{ animation:'fadeInUp .6s ease .4s both' }}>
              Arla Industri Teknopatih adalah holding company teknologi dari Pontianak dengan{' '}
              <span className="text-white/80" style={{ fontWeight:600 }}>7 divisi aktif</span>
              {' '}— dari Industrial IoT hingga Data Intelligence, membangun ekosistem bisnis berbasis AI untuk Indonesia dan Asia Tenggara.
            </p>
            <div className="flex flex-wrap gap-4" style={{ animation:'fadeInUp .6s ease .5s both' }}>
              <button onClick={scrollToNext} className="btn-primary text-white" aria-label="Scroll to explore">
                <span>Explore</span><ChevronDown size={16}/>
              </button>
              <Link href="/about" className="btn-outline">Our Story</Link>
            </div>
            <div className="mt-16 inline-flex items-center gap-3" style={{ animation:'fadeInUp .6s ease .6s both' }}>
              <div className="flex gap-1.5">
                {(['#1E5AA8','#0EA5A0','#D4A843'] as const).map((color,i)=>(
                  <span key={color} className="w-2 h-2 rounded-full"
                    style={{ backgroundColor:color, animation:`pulse 2.5s ease-in-out ${i*.4}s infinite` }}/>
                ))}
              </div>
              <span className="text-xs font-mono tracking-widest text-white/30 uppercase">
                AI Driven Data Decision Company
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-white/25 uppercase">Scroll</span>
          <ChevronDown size={14} className="text-white/25 animate-bounce"/>
        </div>
      </section>
    </>
  );
}
