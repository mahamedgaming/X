import { Check, Info, Play, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Movie } from '../types/movie';
import { MovieArtwork } from './MovieArtwork';

interface HeroBillboardProps {
  featuredMovies: Movie[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onPlay: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
  isInMyList: (movieId: string) => boolean;
  onToggleMyList: (movieId: string) => void;
}

export function HeroBillboard({
  featuredMovies,
  activeIndex,
  onSelectIndex,
  onPlay,
  onOpenDetails,
  isInMyList,
  onToggleMyList,
}: HeroBillboardProps) {
  const movie = featuredMovies[activeIndex] ?? featuredMovies[0];
  if (!movie) return null;

  const inList = isInMyList(movie.id);

  return (
    <section
      aria-label="العرض الرئيسي المميز"
      className="relative min-h-[76vh] lg:min-h-[84vh] w-full overflow-hidden flex items-end"
    >
      {/* Full-bleed Animated Cinema Frame */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <MovieArtwork
              theme={movie.artworkTheme}
              imageSrc={movie.imageSrc}
              alt={movie.title}
              className="h-full w-full"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Measured Scrims for High-Contrast Arabic Typography */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/55 to-black/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-l from-[#0B0D10]/90 via-[#0B0D10]/45 to-transparent"
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pb-16 pt-28 sm:pb-24">
        <div className="max-w-2xl space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2.5 text-sm text-[#D4D4D8]">
                {movie.isOriginal && (
                  <>
                    <span className="font-semibold text-[#E50914]">
                      إنتاج سينما فليكس الأصلي
                    </span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                <span className="tabular-nums">{movie.year}</span>
                <span aria-hidden="true">·</span>
                <span>{movie.genreLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{movie.durationLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{movie.quality}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{movie.ageRating}</span>
              </div>

              {/* Primary Display Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.15]">
                {movie.title}
              </h1>

              {/* Synopsis */}
              <p className="max-w-xl text-base sm:text-lg text-[#E5E5E5] leading-relaxed">
                {movie.synopsis}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.14 }}
              onClick={() => onPlay(movie)}
              className="inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-3 text-base font-semibold text-[#0B0D10] hover:bg-[#E5E5E5] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D10]"
            >
              <Play className="h-5 w-5 fill-[#0B0D10]" />
              <span>تشغيل الآن</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.14 }}
              onClick={() => onOpenDetails(movie)}
              className="inline-flex items-center gap-2.5 rounded-md bg-white/15 backdrop-blur-md border border-white/15 px-6 py-3 text-base font-semibold text-white hover:bg-white/25 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Info className="h-5 w-5" />
              <span>تفاصيل العمل</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.14 }}
              onClick={() => onToggleMyList(movie.id)}
              aria-label={inList ? 'إزالة من قائمتي' : 'إضافة إلى قائمتي'}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/40 px-4 py-3 text-sm font-medium text-white hover:border-white/50 hover:bg-black/60 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {inList ? (
                  <motion.span
                    key="in-list"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.14 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check className="h-5 w-5 text-[#46D369]" />
                    <span>في قائمتي</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="add-list"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.14 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>قائمتي</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Spotlight Carousel Switcher */}
          {featuredMovies.length > 1 && (
            <div className="flex items-center gap-3 pt-4">
              {featuredMovies.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  aria-label={`عرض العمل المميز: ${item.title}`}
                  className="relative h-1.5 w-8 rounded-sm bg-white/25 overflow-hidden hover:bg-white/45 transition-colors"
                >
                  {idx === activeIndex && (
                    <motion.span
                      layoutId="hero-active-bar"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 bg-[#E50914]"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
