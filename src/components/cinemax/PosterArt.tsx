import { useState } from 'react';
import { CinemaXMovie } from '../../data/cinemaXMovies';

interface PosterArtProps {
  src: string;
  alt: string;
  theme: CinemaXMovie['posterTheme'] | 'hero-dune';
  className?: string;
}

function PosterSvgFallback({
  theme,
  title,
}: {
  theme: PosterArtProps['theme'];
  title: string;
}) {
  switch (theme) {
    case 'hero-dune':
    case 'dune':
      return (
        <svg viewBox="0 0 600 800" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="cx-dune" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A0B07" />
              <stop offset="55%" stopColor="#9A3412" />
              <stop offset="100%" stopColor="#09080B" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="url(#cx-dune)" />
          <circle cx="300" cy="270" r="120" fill="#FDBA74" opacity="0.72" />
          <path d="M0 540 Q180 460 350 530 T600 500 L600 800 L0 800 Z" fill="#2A120A" />
          <path d="M0 640 Q240 570 480 650 T600 620 L600 800 L0 800 Z" fill="#120908" />
        </svg>
      );
    case 'inception':
      return (
        <svg viewBox="0 0 600 800" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="cx-inc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0A1628" />
              <stop offset="60%" stopColor="#1E3A5F" />
              <stop offset="100%" stopColor="#090B10" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="url(#cx-inc)" />
          <g fill="#0F172A" stroke="#38BDF8" strokeOpacity="0.3" strokeWidth="1.5">
            <rect x="70" y="340" width="90" height="460" />
            <rect x="190" y="250" width="110" height="550" />
            <rect x="330" y="290" width="95" height="510" />
            <rect x="450" y="370" width="85" height="430" />
            <rect x="140" y="0" width="320" height="140" transform="rotate(8 300 70)" fill="#0B1324" />
          </g>
          <circle cx="300" cy="540" r="46" fill="#FF1744" opacity="0.28" />
        </svg>
      );
    case 'interstellar':
      return (
        <svg viewBox="0 0 600 800" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="600" height="800" fill="#05070D" />
          <circle cx="300" cy="340" r="145" fill="#FDE68A" opacity="0.18" />
          <ellipse cx="300" cy="340" rx="220" ry="44" fill="none" stroke="#FBBF24" strokeWidth="10" strokeOpacity="0.82" />
          <circle cx="300" cy="340" r="88" fill="#020306" stroke="#FDE68A" strokeWidth="3" />
          <g fill="#E2E8F0" opacity="0.7">
            <circle cx="110" cy="120" r="2" />
            <circle cx="480" cy="160" r="2.2" />
            <circle cx="160" cy="580" r="1.6" />
            <circle cx="430" cy="640" r="1.8" />
          </g>
        </svg>
      );
    case 'batman':
      return (
        <svg viewBox="0 0 600 800" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="cx-bat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B0609" />
              <stop offset="55%" stopColor="#7F1D1D" />
              <stop offset="100%" stopColor="#08090D" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="url(#cx-bat)" />
          <g fill="#0A0A0E">
            <rect x="40" y="380" width="90" height="420" />
            <rect x="160" y="290" width="105" height="510" />
            <rect x="335" y="320" width="110" height="480" />
            <rect x="470" y="400" width="90" height="400" />
          </g>
          <circle cx="300" cy="240" r="82" fill="#FF1744" opacity="0.78" />
        </svg>
      );
    case 'joker':
      return (
        <svg viewBox="0 0 600 800" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="cx-jok" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0C1F1C" />
              <stop offset="55%" stopColor="#115E59" />
              <stop offset="100%" stopColor="#7C2D12" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="url(#cx-jok)" />
          <g fill="#0B1314" opacity="0.72">
            <rect x="120" y="460" width="360" height="32" />
            <rect x="90" y="520" width="420" height="36" />
            <rect x="60" y="590" width="480" height="42" />
            <rect x="30" y="670" width="540" height="130" />
          </g>
          <circle cx="300" cy="310" r="78" fill="#F59E0B" opacity="0.35" />
        </svg>
      );
    case 'avatar':
      return (
        <svg viewBox="0 0 600 800" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="cx-ava" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#031525" />
              <stop offset="55%" stopColor="#0E7490" />
              <stop offset="100%" stopColor="#04121C" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="url(#cx-ava)" />
          <ellipse cx="300" cy="240" rx="140" ry="70" fill="#22D3EE" opacity="0.25" />
          <polygon points="120,380 260,210 380,380" fill="#082F49" />
          <polygon points="320,440 460,250 560,440" fill="#062135" />
          <circle cx="190" cy="540" r="6" fill="#67E8F9" />
          <circle cx="390" cy="600" r="8" fill="#67E8F9" />
        </svg>
      );
    case 'avengers':
      return (
        <svg viewBox="0 0 600 800" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="cx-ave" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="55%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#09090E" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="url(#cx-ave)" />
          <circle cx="300" cy="340" r="140" fill="none" stroke="#F59E0B" strokeWidth="8" strokeDasharray="18 8" strokeOpacity="0.8" />
          <circle cx="300" cy="340" r="105" fill="#FF1744" opacity="0.2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 600 800" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="cx-spi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1D0B14" />
              <stop offset="50%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#090D16" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="url(#cx-spi)" />
          <g stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
            <circle cx="300" cy="340" r="70" />
            <circle cx="300" cy="340" r="140" />
            <circle cx="300" cy="340" r="210" />
            <line x1="300" y1="0" x2="300" y2="800" />
            <line x1="0" y1="340" x2="600" y2="340" />
          </g>
          <text
            x="300"
            y="710"
            textAnchor="middle"
            fill="#FFFFFF"
            opacity="0.15"
            className="font-display font-bold"
            style={{ fontSize: '42px' }}
          >
            {title}
          </text>
        </svg>
      );
  }
}

export function PosterArt({ src, alt, theme, className = '' }: PosterArtProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#151720] ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out"
        />
      ) : (
        <PosterSvgFallback theme={theme} title={alt} />
      )}
    </div>
  );
}
