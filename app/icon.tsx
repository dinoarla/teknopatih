import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A192F', borderRadius: 8 }}>
        <img src={process.env.NEXT_PUBLIC_BASE_URL + '/logos/ait-mark.png'} width={26} height={26} style={{ objectFit: 'contain' }} />
      </div>
    ),
    { ...size }
  );
}
