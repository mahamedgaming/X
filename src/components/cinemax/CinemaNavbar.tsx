import { useState } from 'react';
import { Menu, Settings, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type CinemaProNavTarget = 'home' | 'movies' | 'favorites';

interface CinemaNavbarProps {
  activeSection: CinemaProNavTarget;
  onNavigate: (target: CinemaProNavTarget) => void;
  onOpenSettings: () => void;
  favoritesCount: number;
  accentColor: string;
}

const LINKS: { id: CinemaProNavTarget; label: string }[] = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'movies', label: 'اكتشف الأفلام' },
  { id: 'favorites', label: 'قائمتي' },
];

export function CinemaNavbar({
  activeSection,
  onNavigate,
  onOpenSettings,
  favoritesCount,
  accentColor,
}: CinemaNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: CinemaProNavTarget) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-3 inset-x-0 z-40 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.06] px-5 sm:px-7 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav('home');
          }}
          className="font-display text-xl sm:text-2xl font-black tracking-wide whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          style={{ color: accentColor }}
        >
          CINEMA X PRO
        </a>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7"
        >
          {LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.id);
                }}
                className={`relative py-1 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm ${
                  isActive ? 'text-white' : 'text-[#D4D4D8] hover:text-white'
                }`}
              >
                {link.label}
                {link.id === 'favorites' && favoritesCount > 0 && (
                  <span className="mr-1.5 text-xs text-[#94A3B8] tabular-nums">
                    ({favoritesCount})
                  </span>
                )}
                {isActive && (
                  <motion.span
                    layoutId="cinemax-pro-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Settings Action + Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenSettings();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-white/[0.12] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">الإعدادات</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="قائمة الجوال"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden mx-auto mt-2 max-w-[1360px] rounded-xl border border-white/15 bg-[#151722]/95 p-4 backdrop-blur-xl space-y-1.5"
          >
            {LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.id);
                  }}
                  className={`block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-[#CBD5E1] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.id === 'favorites' && favoritesCount > 0 && (
                    <span className="mr-1.5 text-xs text-[#94A3B8] tabular-nums">
                      ({favoritesCount})
                    </span>
                  )}
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
