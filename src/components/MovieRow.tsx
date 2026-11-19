import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie, WatchHistoryMap, WatchProgressMap } from '../types/movie';
import { formatFinishDate } from '../utils/formatDate';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
  myListIds: string[];
  onToggleMyList: (movieId: string) => void;
  watchProgress?: WatchProgressMap;
  watchHistory?: WatchHistoryMap;
  onViewAll?: () => void;
  viewAllLabel?: string;
  ranked?: boolean;
}

export function MovieRow({
  title,
  movies,
  onPlay,
  onOpenDetails,
  myListIds,
  onToggleMyList,
  watchProgress,
  watchHistory,
  onViewAll,
  viewAllLabel = 'عرض الكل',
  ranked = false,
}: MovieRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (movies.length === 0) return null;

  const scrollRow = (direction: 'prev' | 'next') => {
    const el = scrollerRef.current;
    if (!el) return;
    const distance = Math.max(320, el.clientWidth * 0.78);
    // In RTL, scrolling visually left is negative scrollLeft
    const delta = direction === 'next' ? -distance : distance;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const formatRemaining = (secondsLeft: number) => {
    const mins = Math.max(1, Math.round(secondsLeft / 60));
    return `متبقي ${mins} د`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-4 sm:py-5"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-lg sm:text-xl font-semibold text-white">
              {title}
            </h2>
            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                className="text-xs font-medium text-[#A1A1AA] hover:text-[#E50914] transition-colors whitespace-nowrap"
              >
                {viewAllLabel}
              </button>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollRow('prev')}
              aria-label={`التمرير لليمين في ${title}`}
              className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-[#161920] text-[#D4D4D8] hover:border-white/30 hover:text-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRow('next')}
              aria-label={`التمرير لليسار في ${title}`}
              className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-[#161920] text-[#D4D4D8] hover:border-white/30 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
        >
          {movies.map((movie, idx) => {
            const prog = watchProgress?.[movie.id];
            const ratio = prog
              ? prog.seconds / Math.max(1, prog.durationSeconds)
              : undefined;
            const remaining = prog
              ? formatRemaining(prog.durationSeconds - prog.seconds)
              : undefined;
            const historyEntry = watchHistory?.[movie.id];
            const completionLabel = historyEntry
              ? formatFinishDate(historyEntry.completedAt)
              : undefined;

            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlay={onPlay}
                onOpenDetails={onOpenDetails}
                isInMyList={myListIds.includes(movie.id)}
                onToggleMyList={onToggleMyList}
                progressRatio={ratio}
                remainingLabel={remaining}
                completionDateLabel={completionLabel}
                rankNumber={ranked ? idx + 1 : undefined}
              />
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
