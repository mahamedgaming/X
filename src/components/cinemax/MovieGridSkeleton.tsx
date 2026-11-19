import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CardSizeMode } from './SettingsModal';

interface MovieGridSkeletonProps {
  cardSize: CardSizeMode;
  showRatings: boolean;
  accentColor: string;
  count?: number;
  statusText?: string;
}

export function MovieGridSkeleton({
  cardSize,
  showRatings,
  accentColor,
  count = 8,
  statusText = 'جاري تحميل الأفلام...',
}: MovieGridSkeletonProps) {
  const gridColsClass =
    cardSize === 'small'
      ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
      : cardSize === 'large'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="space-y-5"
    >
      <div className="flex items-center gap-2.5 text-sm text-[#CBD5E1]">
        <Loader2
          className="h-4 w-4 animate-spin shrink-0"
          style={{ color: accentColor }}
          aria-hidden="true"
        />
        <span>{statusText}</span>
      </div>

      <div className={`grid ${gridColsClass}`}>
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            aria-hidden="true"
            className="glass-card"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-white/[0.03]">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: 'linear',
                  delay: Math.min(idx * 0.08, 0.4),
                }}
                className="absolute inset-0 bg-gradient-to-l from-transparent via-white/[0.07] to-transparent"
              />

              {showRatings && (
                <div className="absolute top-2.5 right-2.5 h-6 w-12 rounded-lg bg-white/[0.08]" />
              )}
              <div className="absolute top-2.5 left-2.5 h-9 w-9 rounded-full bg-white/[0.08]" />
            </div>

            <div className="p-3.5 space-y-2">
              <div className="relative h-4 w-3/4 overflow-hidden rounded bg-white/[0.08]">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: '-100%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.4,
                    ease: 'linear',
                    delay: Math.min(idx * 0.08, 0.4),
                  }}
                  className="absolute inset-0 bg-gradient-to-l from-transparent via-white/[0.09] to-transparent"
                />
              </div>
              <div className="relative h-3 w-1/2 overflow-hidden rounded bg-white/[0.05]">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: '-100%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.4,
                    ease: 'linear',
                    delay: Math.min(idx * 0.08, 0.4),
                  }}
                  className="absolute inset-0 bg-gradient-to-l from-transparent via-white/[0.09] to-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
