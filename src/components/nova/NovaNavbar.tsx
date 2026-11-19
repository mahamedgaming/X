import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type NovaSection = 'home' | 'services' | 'about' | 'contact';

interface NovaNavbarProps {
  activeSection: NovaSection;
  onNavigate: (section: NovaSection) => void;
}

const LINKS: { id: NovaSection; label: string }[] = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'services', label: 'خدماتنا' },
  { id: 'about', label: 'من نحن' },
  { id: 'contact', label: 'تواصل معنا' },
];

export function NovaNavbar({ activeSection, onNavigate }: NovaNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (id: NovaSection) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.08] bg-[#080914]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 sm:h-[72px] max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="font-display text-2xl font-bold tracking-tight bg-gradient-to-l from-[#9B5CFF] to-[#35C9FF] bg-clip-text text-transparent whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35C9FF] rounded-sm"
        >
          NOVA.
        </a>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-8"
        >
          {LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`relative py-1.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35C9FF] rounded-sm ${
                  isActive
                    ? 'text-white'
                    : 'text-[#A1A1B5] hover:text-[#35C9FF]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nova-nav-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-l from-[#9B5CFF] to-[#35C9FF]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.14 }}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('contact');
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-to-l from-[#8D4FFF] to-[#258DFF] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(135,79,255,0.35)] hover:shadow-[0_0_32px_rgba(53,201,255,0.45)] transition-shadow whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35C9FF]"
          >
            ابدأ مشروعك
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#121324] text-white hover:border-white/25 transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="قائمة الجوال"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-white/[0.08] bg-[#101222]/98 backdrop-blur-xl px-5 py-5 space-y-2"
          >
            {LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  className={`block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#1D1F38] text-[#35C9FF]'
                      : 'text-[#CBD5E1] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
