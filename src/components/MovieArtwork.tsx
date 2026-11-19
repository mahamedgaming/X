import { useState } from 'react';
import { ArtworkTheme } from '../types/movie';

interface MovieArtworkProps {
  theme: ArtworkTheme;
  imageSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

function SceneIllustration({ theme }: { theme: ArtworkTheme }) {
  switch (theme) {
    case 'eclipse-desert':
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="ed-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#120709" />
              <stop offset="48%" stopColor="#5C1414" />
              <stop offset="82%" stopColor="#C2410C" />
              <stop offset="100%" stopColor="#1C0E0A" />
            </linearGradient>
            <radialGradient id="ed-corona" cx="50%" cy="38%" r="34%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
              <stop offset="28%" stopColor="#EF4444" stopOpacity="0.7" />
              <stop offset="68%" stopColor="#991B1B" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#120709" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#ed-sky)" />
          <rect width="1600" height="900" fill="url(#ed-corona)" />
          {/* Eclipse Corona & Disc */}
          <circle cx="800" cy="340" r="142" fill="#FDE68A" opacity="0.22" />
          <circle cx="800" cy="340" r="118" fill="#0B090A" stroke="#FCA5A5" strokeWidth="3" strokeOpacity="0.7" />
          {/* Distant Obsidian Monolith */}
          <polygon points="1030,620 1075,270 1120,620" fill="#09080A" opacity="0.92" />
          <line x1="1075" y1="270" x2="1075" y2="620" stroke="#EF4444" strokeWidth="2" strokeOpacity="0.55" />
          {/* Sand Dunes */}
          <path d="M0 640 Q320 530 680 610 T1600 580 L1600 900 L0 900 Z" fill="#2A120D" />
          <path d="M0 710 Q420 600 940 700 T1600 660 L1600 900 L0 900 Z" fill="#170A08" />
          <path d="M0 790 Q550 715 1100 800 T1600 760 L1600 900 L0 900 Z" fill="#0C0707" />
          {/* Lone Figure Silhouette */}
          <g transform="translate(520,572)" fill="#090607">
            <circle cx="0" cy="-28" r="7" />
            <path d="M-9,-18 L9,-18 L14,22 L6,22 L4,48 L-4,48 L-6,22 L-14,22 Z" />
          </g>
        </svg>
      );

    case 'midnight-bridge':
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="mb-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#050914" />
              <stop offset="58%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <radialGradient id="mb-glow" cx="65%" cy="62%" r="42%">
              <stop offset="0%" stopColor="#DC2626" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#0EA5E9" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#050914" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#mb-sky)" />
          <rect width="1600" height="900" fill="url(#mb-glow)" />
          {/* Distant City Skyline */}
          <g fill="#090F1C" opacity="0.9">
            <rect x="120" y="340" width="75" height="280" />
            <rect x="210" y="260" width="90" height="360" />
            <rect x="330" y="390" width="68" height="230" />
            <rect x="1150" y="290" width="95" height="330" />
            <rect x="1260" y="210" width="110" height="410" />
            <rect x="1390" y="330" width="85" height="290" />
          </g>
          {/* Suspension Bridge Tower & Cables */}
          <path d="M510 150 L535 150 L548 640 L498 640 Z" fill="#0B1120" />
          <path d="M1040 180 L1062 180 L1075 640 L1028 640 Z" fill="#0B1120" />
          <path d="M0 440 Q260 400 522 170 Q785 450 1050 195 Q1320 410 1600 450" fill="none" stroke="#38BDF8" strokeWidth="3" strokeOpacity="0.35" />
          <line x1="0" y1="590" x2="1600" y2="590" stroke="#1E293B" strokeWidth="18" />
          {/* Bridge Asphalt & Reflections */}
          <rect y="600" width="1600" height="300" fill="#060911" />
          <line x1="0" y1="680" x2="1600" y2="680" stroke="#E50914" strokeWidth="4" strokeOpacity="0.65" />
          <line x1="120" y1="715" x2="1480" y2="715" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.35" />
          {/* Speeding Car Lights */}
          <ellipse cx="960" cy="655" rx="18" ry="6" fill="#EF4444" />
          <ellipse cx="1020" cy="655" rx="18" ry="6" fill="#EF4444" />
          <ellipse cx="990" cy="700" rx="110" ry="18" fill="#EF4444" opacity="0.28" />
        </svg>
      );

    case 'orbital-ring':
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="or-space" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#020408" />
              <stop offset="65%" stopColor="#071121" />
              <stop offset="100%" stopColor="#0E223D" />
            </linearGradient>
            <radialGradient id="or-earth" cx="72%" cy="85%" r="58%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#0284C7" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#0F172A" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#020408" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#or-space)" />
          <rect width="1600" height="900" fill="url(#or-earth)" />
          {/* Starfield */}
          <g fill="#E2E8F0" opacity="0.7">
            <circle cx="190" cy="140" r="1.5" />
            <circle cx="340" cy="210" r="2" />
            <circle cx="510" cy="110" r="1.2" />
            <circle cx="880" cy="160" r="1.8" />
            <circle cx="1220" cy="130" r="1.4" />
            <circle cx="1390" cy="240" r="2.1" />
            <circle cx="280" cy="410" r="1.3" />
          </g>
          {/* Planetary Horizon Arc */}
          <circle cx="1150" cy="1180" r="680" fill="#050C18" stroke="#7DD3FC" strokeWidth="5" strokeOpacity="0.75" />
          {/* Orbital Station Ring */}
          <ellipse cx="640" cy="410" rx="340" ry="96" transform="rotate(-18 640 410)" fill="none" stroke="#94A3B8" strokeWidth="14" strokeOpacity="0.85" />
          <ellipse cx="640" cy="410" rx="340" ry="96" transform="rotate(-18 640 410)" fill="none" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.65" />
          <rect x="615" y="290" width="50" height="240" rx="8" transform="rotate(-18 640 410)" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
        </svg>
      );

    case 'noir-alley':
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="na-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#090A0F" />
              <stop offset="55%" stopColor="#161822" />
              <stop offset="100%" stopColor="#0B0C10" />
            </linearGradient>
            <radialGradient id="na-lamp" cx="48%" cy="36%" r="36%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#B45309" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#090A0F" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#na-bg)" />
          <rect width="1600" height="900" fill="url(#na-lamp)" />
          {/* Alley Perspective Buildings */}
          <polygon points="0,0 560,180 560,720 0,900" fill="#0D0F16" />
          <polygon points="1600,0 1040,180 1040,720 1600,900" fill="#0B0D14" />
          {/* Warm Illuminated Windows */}
          <rect x="260" y="290" width="70" height="95" fill="#F59E0B" opacity="0.25" />
          <rect x="1240" y="340" width="60" height="85" fill="#F59E0B" opacity="0.18" />
          {/* Vintage Streetlamp */}
          <rect x="762" y="250" width="8" height="460" fill="#050608" />
          <circle cx="766" cy="245" r="22" fill="#FCD34D" opacity="0.88" />
          {/* Wet Cobblestone Mist */}
          <rect x="560" y="700" width="480" height="200" fill="#07080D" />
          <ellipse cx="766" cy="760" rx="180" ry="22" fill="#F59E0B" opacity="0.15" />
        </svg>
      );

    case 'frozen-observatory':
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="fo-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#060D1A" />
              <stop offset="60%" stopColor="#132A4A" />
              <stop offset="100%" stopColor="#1E3A5F" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#fo-sky)" />
          {/* Mountain Ridges */}
          <polygon points="0,700 320,380 650,620 980,310 1320,560 1600,420 1600,900 0,900" fill="#0B182B" />
          <polygon points="0,780 420,520 800,660 1180,460 1600,720 1600,900 0,900" fill="#07101E" />
          {/* Brutalist Observatory Dome */}
          <rect x="860" y="340" width="240" height="170" fill="#0D1624" />
          <path d="M890 340 A90 90 0 0 1 1070 340 Z" fill="#162336" />
          <rect x="920" y="390" width="120" height="26" fill="#F59E0B" opacity="0.82" />
          <ellipse cx="980" cy="403" rx="170" ry="50" fill="#F59E0B" opacity="0.15" />
        </svg>
      );

    case 'ocean-abyss':
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="oa-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#021520" />
              <stop offset="55%" stopColor="#042536" />
              <stop offset="100%" stopColor="#010A10" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#oa-water)" />
          {/* Volumetric Floodlight Beams */}
          <polygon points="440,360 1120,580 980,790 420,395" fill="#22D3EE" opacity="0.16" />
          <polygon points="440,360 1220,460 1150,620 430,380" fill="#67E8F9" opacity="0.12" />
          {/* Sunken Temple Columns */}
          <g fill="#071A24" stroke="#0E7490" strokeWidth="1.5" strokeOpacity="0.4">
            <rect x="920" y="320" width="64" height="440" />
            <rect x="1050" y="260" width="72" height="500" />
            <rect x="1190" y="380" width="60" height="380" />
            <rect x="890" y="235" width="390" height="34" />
          </g>
          {/* Submersible Silhouette */}
          <ellipse cx="380" cy="365" rx="95" ry="44" fill="#0B2230" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="430" cy="365" r="14" fill="#67E8F9" opacity="0.85" />
          {/* Bioluminescent Particles */}
          <g fill="#67E8F9" opacity="0.6">
            <circle cx="720" cy="280" r="3" />
            <circle cx="840" cy="490" r="2.5" />
            <circle cx="1320" cy="340" r="3" />
            <circle cx="630" cy="610" r="2" />
          </g>
        </svg>
      );

    case 'andalus-arch':
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="aa-warm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1C1008" />
              <stop offset="50%" stopColor="#45230E" />
              <stop offset="100%" stopColor="#120B07" />
            </linearGradient>
            <radialGradient id="aa-sun" cx="50%" cy="42%" r="45%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#D97706" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#120B07" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#aa-warm)" />
          <rect width="1600" height="900" fill="url(#aa-sun)" />
          {/* Sunbeams */}
          <polygon points="740,220 960,900 580,900" fill="#FDE68A" opacity="0.14" />
          {/* Carved Horseshoe Arches */}
          <path d="M0 0 L1600 0 L1600 900 L1250 900 L1250 480 A450 420 0 1 0 350 480 L350 900 L0 900 Z" fill="#120A06" />
          <path d="M440 900 L440 500 A360 330 0 1 1 1160 500 L1160 900" fill="none" stroke="#F59E0B" strokeWidth="3" strokeOpacity="0.35" />
          {/* Courtyard Fountain Reflection */}
          <rect x="520" y="760" width="560" height="80" rx="8" fill="#1F120A" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.4" />
        </svg>
      );

    case 'neon-rain':
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="nr-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#090710" />
              <stop offset="60%" stopColor="#180D24" />
              <stop offset="100%" stopColor="#080A12" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#nr-bg)" />
          {/* Vertical Towers */}
          <g fill="#0E0E18">
            <rect x="140" y="120" width="140" height="780" />
            <rect x="330" y="60" width="180" height="840" />
            <rect x="640" y="190" width="120" height="710" />
            <rect x="920" y="90" width="210" height="810" />
            <rect x="1210" y="170" width="160" height="730" />
          </g>
          {/* Red & Slate Neon Strips */}
          <rect x="360" y="210" width="8" height="320" fill="#E50914" opacity="0.85" />
          <rect x="955" y="160" width="6" height="400" fill="#38BDF8" opacity="0.7" />
          <rect x="1245" y="260" width="10" height="240" fill="#E50914" opacity="0.65" />
          <ellipse cx="364" cy="380" rx="160" ry="180" fill="#E50914" opacity="0.14" />
        </svg>
      );

    case 'crimson-horizon':
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="ch-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#17080D" />
              <stop offset="50%" stopColor="#7C2D12" />
              <stop offset="85%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#ch-sky)" />
          <circle cx="800" cy="520" r="150" fill="#FDBA74" opacity="0.82" />
          <rect y="580" width="1600" height="320" fill="#0B1320" />
          <ellipse cx="800" cy="640" rx="220" ry="26" fill="#FB923C" opacity="0.35" />
          {/* Sailing Ship Silhouette */}
          <path d="M580 580 L670 580 L655 598 L595 598 Z" fill="#060911" />
          <polygon points="625,470 625,575 668,575" fill="#060911" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 1600 900" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="al-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#120F0A" />
              <stop offset="55%" stopColor="#261C12" />
              <stop offset="100%" stopColor="#0A0908" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#al-bg)" />
          <g fill="#16110B" stroke="#CA8A04" strokeWidth="1" strokeOpacity="0.25">
            <rect x="180" y="120" width="160" height="680" />
            <rect x="380" y="120" width="160" height="680" />
            <rect x="1060" y="120" width="160" height="680" />
            <rect x="1260" y="120" width="160" height="680" />
          </g>
          <ellipse cx="800" cy="430" rx="260" ry="280" fill="#EAB308" opacity="0.16" />
          <rect x="690" y="610" width="220" height="22" fill="#0B0907" />
        </svg>
      );
  }
}

export function MovieArtwork({
  theme,
  imageSrc,
  alt,
  className = '',
  priority = false,
}: MovieArtworkProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#14171D] ${className}`}>
      {imageSrc && !imgFailed ? (
        <img
          src={imageSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out"
        />
      ) : (
        <SceneIllustration theme={theme} />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
      />
    </div>
  );
}
