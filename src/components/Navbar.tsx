import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NavSection, UserProfile } from '../types/movie';

interface NavbarProps {
  activeNav: NavSection;
  onSelectNav: (nav: NavSection) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeProfile: UserProfile;
  onOpenProfileModal: () => void;
  myListCount: number;
  watchHistoryCount: number;
}

const NAV_ITEMS: { key: NavSection; label: string }[] = [
  { key: 'home', label: 'الرئيسية' },
  { key: 'series', label: 'المسلسلات' },
  { key: 'movies', label: 'الأفلام' },
  { key: 'trending', label: 'الأكثر مشاهدة' },
  { key: 'mylist', label: 'قائمتي' },
  { key: 'history', label: 'سجل المشاهدة' },
];

export function Navbar({
  activeNav,
  onSelectNav,
  searchQuery,
  onSearchChange,
  activeProfile,
  onOpenProfileModal,
  myListCount,
  watchHistoryCount,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0B0D10]/95 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-gradient-to-b from-[#0B0D10]/95 via-[#0B0D10]/60 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        {/* Zone 1: Single-element Brand Wordmark */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          onClick={() => {
            onSearchChange('');
            onSelectNav('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl font-semibold tracking-tight text-[#E50914] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] rounded-sm"
        >
          سينما فليكس
        </motion.button>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-4 lg:gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.key && !searchQuery;
            const badgeCount =
              item.key === 'mylist'
                ? myListCount
                : item.key === 'history'
                ? watchHistoryCount
                : 0;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onSelectNav(item.key);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] rounded-sm ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#B3B3B3] hover:text-white'
                }`}
              >
                {item.label}
                {badgeCount > 0 && (
                  <span className="mr-1.5 text-xs text-[#94A3B8] tabular-nums">
                    ({badgeCount})
                  </span>
                )}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#E50914]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search & Profile Actions */}
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait" initial={false}>
            {searchOpen || searchQuery ? (
              <motion.div
                key="search-input"
                initial={{ opacity: 0, x: -10, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 rounded-md border border-white/20 bg-[#14171D]/95 px-3 py-1.5"
              >
                <Search className="h-4 w-4 text-[#B3B3B3] shrink-0" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="ابحث عن فيلم أو مسلسل..."
                  aria-label="البحث في الأفلام والمسلسلات"
                  className="w-36 sm:w-52 bg-transparent text-sm text-white placeholder-[#737373] focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="إغلاق البحث"
                  onClick={() => {
                    onSearchChange('');
                    setSearchOpen(false);
                  }}
                  className="text-[#B3B3B3] hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="search-trigger"
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.14 }}
                onClick={() => setSearchOpen(true)}
                aria-label="فتح البحث"
                className="flex h-10 w-10 items-center justify-center rounded-md text-[#E5E5E5] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
              >
                <Search className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenProfileModal}
            aria-label={`تبديل الملف الشخصي: ${activeProfile.name}`}
            className="flex items-center gap-2 rounded-md py-1.5 px-2 text-sm text-white hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded text-xs font-semibold text-white"
              style={{ backgroundColor: activeProfile.color }}
            >
              {activeProfile.initials}
            </span>
            <span className="hidden sm:inline font-medium">
              {activeProfile.name}
            </span>
            <ChevronDown className="h-4 w-4 text-[#B3B3B3]" />
          </motion.button>
        </div>
      </div>

      {/* Compact Mobile Navigation Strip */}
      <nav
        aria-label="التنقل على الجوال"
        className="flex md:hidden items-center gap-4 overflow-x-auto no-scrollbar px-4 pb-2.5 text-xs"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.key && !searchQuery;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectNav(item.key)}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
                isActive ? 'text-white font-semibold border-b-2 border-[#E50914]' : 'text-[#B3B3B3]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
