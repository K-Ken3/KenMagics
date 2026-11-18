import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'KenDesigns — Design, Digital, Motion';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public', 'logo-mark.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0b0b0b',
          color: '#f3f1ec',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <img src={logoSrc} width={52} height={60} alt="" />
          <span style={{ display: 'flex', fontSize: 22, letterSpacing: 6, color: '#8c8c8c', textTransform: 'uppercase' }}>
            KenDesigns / Kigali, Rwanda
          </span>
        </div>
        <div style={{ display: 'flex', fontSize: 104, lineHeight: 1.02, letterSpacing: -6 }}>
          Crafting digital work worth keeping.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#8c8c8c' }}>
          <span>Design · Digital · Motion</span>
          <span>ken-portfolio</span>
        </div>
      </div>
    ),
    size,
  );
}
