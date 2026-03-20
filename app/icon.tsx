import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Kawung Core mark rendered as inline SVG — no external URL needed
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0A192F', borderRadius: 8,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" fill="#0A192F" stroke="#1E5AA8" strokeWidth="1"/>
          {/* NW petal */}
          <circle cx="20" cy="20" r="14" fill="#0D2545" stroke="#1B4A7A" strokeWidth="1"/>
          {/* SW petal */}
          <circle cx="20" cy="44" r="14" fill="#0D2545" stroke="#1B4A7A" strokeWidth="1"/>
          {/* SE petal */}
          <circle cx="44" cy="44" r="14" fill="#0D3A50" stroke="#1B6A7A" strokeWidth="1"/>
          {/* NE petal - active cyan */}
          <circle cx="44" cy="20" r="14" fill="#083040" stroke="#00C8E8" strokeWidth="1.5"/>
          {/* Center core */}
          <circle cx="32" cy="32" r="5" fill="#00E0F5"/>
          <circle cx="32" cy="32" r="2.5" fill="#0A192F"/>
        </svg>
      </div>
    ),
    { ...size }
  );
}
