import { Film, Heart, Home, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export type PurpleNavTarget = 'home' | 'movies' | 'favorites' | 'settings';

interface BottomNavProps {
  activeTab: PurpleNavTarget;
  favoritesCount: number;
  accentColor: string;
  accentLight: string;
  onSelectTab: (tab: PurpleNavTarget) => void;
}

const NAV_ITEMS: { id: PurpleNavTarget; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'movies', label: 'الأفلام', icon: Film },
  { id: 'favorites', label: 'مفضلتي', icon: Heart },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

export function BottomNav({
  activeTab,
  favoritesCount,
  accentColor,
  accentLight,
  onSelectTab,
}: BottomNavProps) {
  return (
    <nav
      aria-label="التنقل السفلي"
      className="glass-dock glass-sheen bottom-3 left-1/2 -translate-x-1/2 z-40 flex h-[40px] w-[195px] items-center justify-around rounded-[50px] px-[7px]"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            aria-label={item.label}
            title={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex h-7 w-9 items-center justify-center rounded-full transition-all duration-[250ms] active:scale-[0.82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              isActive ? 'text-white' : 'text-white/90 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="purple-bottom-nav-active"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                aria-hidden="true"
                className="absolute inset-0 rounded-full border"
                style={{
                  backgroundColor: `${accentColor}26`,
                  borderColor: `${accentColor}66`,
                }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center drop-shadow-[0_1px_5px_rgba(255,255,255,0.2)]">
              <Icon
                className="h-[15px] w-[15px]"
                style={isActive ? { color: accentLight } : undefined}
              />
              {item.id === 'favorites' && favoritesCount > 0 && (
                <span
                  className="absolute -top-1.5 -left-1.5 text-[9px] font-bold leading-none tabular-nums"
                  style={{ color: accentLight }}
                >
                  {favoritesCount}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
