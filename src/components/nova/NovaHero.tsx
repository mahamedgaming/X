import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { NovaSection } from './NovaNavbar';

interface NovaHeroProps {
  onNavigate: (section: NovaSection) => void;
}

export function NovaHero({ onNavigate }: NovaHeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 px-5 sm:px-8"
    >
      {/* Atmospheric Ambient Radial Glow */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [0.92, 1.15, 0.92],
          opacity: [0.22, 0.38, 0.22],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] rounded-full bg-[#7C3AED] blur-[170px]"
      />

      {/* Subtle Orbital Grid Geometry */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 700"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="nova-grid-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#35C9FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#080914" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx="600"
          cy="350"
          r="240"
          fill="none"
          stroke="url(#nova-grid-fade)"
          strokeWidth="1"
        />
        <circle
          cx="600"
          cy="350"
          r="380"
          fill="none"
          stroke="url(#nova-grid-fade)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />
      </svg>

      {/* Hero Foreground Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm font-semibold tracking-wide text-[#35C9FF]"
        >
          استوديو التجارب الرقمية والأنظمة المستقبلية
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.2] text-white"
        >
          اصنع مستقبلك{' '}
          <span className="block mt-1 bg-gradient-to-l from-[#A56AFF] to-[#38D5FF] bg-clip-text text-transparent">
            بطريقة مختلفة
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-xl text-base sm:text-lg text-[#B4B6C9] leading-relaxed"
        >
          مرحباً بك في NOVA، حيث الإبداع والتكنولوجيا يجتمعان لصناعة تجربة رقمية
          لا تُنسى، سريعة الاستجابة ومصممة بدقة لأعمالك.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 pt-3"
        >
          <motion.a
            href="#services"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('services');
            }}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-[#8D4FFF] to-[#258DFF] px-8 py-3.5 text-base font-bold text-white shadow-[0_0_32px_rgba(135,79,255,0.4)] hover:shadow-[0_0_44px_rgba(56,213,255,0.5)] transition-shadow whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35C9FF]"
          >
            <span>اكتشف المزيد</span>
            <ArrowLeft className="h-4 w-4" />
          </motion.a>

          <motion.a
            href="#about"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-white hover:border-[#35C9FF]/60 hover:bg-white/[0.08] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            تعرّف علينا
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
