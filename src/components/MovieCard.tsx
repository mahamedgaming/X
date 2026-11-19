import { Check, Info, Play, Plus, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Movie } from '../types/movie';
import { MovieArtwork } from './MovieArtwork';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
  isInMyList: boolean;
  onToggleMyList: (movieId: string) => void;
  progressRatio?: number;
  remainingLabel?: string;
  completionDateLabel?: string;
  onRemoveFromHistory?: (movieId: string) => void;
  rankNumber?: number;
  variant?: 'carousel' | 'grid';
  index?: number;
}

export function MovieCard({
  movie,
  onPlay,
  onOpenDetails,
  isInMyList,
  onToggleMyList,
  progressRatio,
  remainingLabel,
  completionDateLabel,
  onRemoveFromHistory,
  rankNumber,
  variant = 'carousel',
  index = 0,
}: MovieCardProps) {
  const widthClass =
    variant === 'grid'
      ? 'w-full'
      : rankNumber
      ? 'w-[220px] sm:w-[250px] shrink-0'
      : 'w-[260px] sm:w-[290px] lg:w-[310px] shrink-0';

  return (
    <motion.article
      initial={variant === 'grid' ? { opacity: 0, y: 14 } : false}
      animate={variant === 'grid' ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.25,
        delay: variant === 'grid' ? Math.min(index * 0.035, 0.28) : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`group relative flex items-stretch ${
        rankNumber ? 'gap-0' : 'flex-col'
      } ${widthClass}`}
    >
      {/* Top 10 Sculpted Rank Numeral (RTL placed before card) */}
      {rankNumber !== undefined && (
        <div
          aria-hidden="true"
          className="flex items-end justify-center w-14 sm:w-16 shrink-0 select-none pb-1"
        >
          <svg
            viewBox="0 0 110 140"
            className="h-28 sm:h-32 w-full overflow-visible"
          >
            <text
              x="55"
              y="122"
              textAnchor="middle"
              fill="#0B0D10"
              stroke="#52525B"
              strokeWidth="4"
              className="font-display font-semibold transition-colors duration-200 group-hover:stroke-[#E50914]"
              style={{ fontSize: rankNumber >= 10 ? '102px' : '124px' }}
            >
              {rankNumber}
            </text>
          </svg>
        </div>
      )}

      {/* Main Card Container */}
      <div className="relative flex-1 overflow-hidden rounded-md border border-white/[0.08] bg-[#161920] transition-colors duration-200 group-hover:border-white/30 group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.55)]">
        {/* Clickable Thumbnail */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onOpenDetails(movie)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenDetails(movie);
            }
          }}
          aria-label={`عرض تفاصيل ${movie.title}`}
          className="relative aspect-video w-full cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
        >
          <MovieArtwork
            theme={movie.artworkTheme}
            imageSrc={movie.imageSrc}
            alt={movie.title}
            className="h-full w-full group-hover:scale-105 transition-transform duration-300 ease-out"
          />

          {/* Scrim + Bottom Title Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/20 to-transparent" />

          {/* Top Left Original Marker (unboxed crisp text) */}
          {movie.isOriginal && (
            <span className="absolute top-2.5 right-3 text-[11px] font-semibold tracking-wide text-[#E50914] drop-shadow">
              سينما فليكس
            </span>
          )}

          {/* Card Title Inside Frame */}
          <div className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2">
            <h3 className="font-display text-sm sm:text-base font-semibold text-white truncate">
              {movie.title}
            </h3>
            {completionDateLabel ? (
              <span className="text-[11px] font-medium text-[#46D369] tabular-nums whitespace-nowrap shrink-0">
                {completionDateLabel}
              </span>
            ) : (
              remainingLabel && (
                <span className="text-[11px] text-[#D4D4D8] tabular-nums whitespace-nowrap shrink-0">
                  {remainingLabel}
                </span>
              )
            )}
          </div>

          {/* Watch Progress Track */}
          {progressRatio !== undefined && progressRatio > 0 && !completionDateLabel && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
              <div
                className="h-full bg-[#E50914] transition-all duration-200"
                style={{ width: `${Math.min(100, Math.max(4, progressRatio * 100))}%` }}
              />
            </div>
          )}
        </div>

        {/* Action & Unboxed Metadata Strip */}
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <div className="min-w-0 flex-1">
            {completionDateLabel ? (
              <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA] truncate">
                <span className="font-medium text-[#46D369]">تمت المشاهدة</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">
                  {movie.type === 'series' ? 'مسلسل' : movie.type === 'documentary' ? 'وثائقي' : 'فيلم'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{movie.durationLabel}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA] truncate">
                <span className="font-semibold text-[#46D369] tabular-nums">
                  {movie.matchScore}% مطابقة
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{movie.ageRating}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{movie.genreLabel}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.12 }}
              onClick={(e) => {
                e.stopPropagation();
                onPlay(movie);
              }}
              aria-label={
                completionDateLabel
                  ? `إعادة مشاهدة ${movie.title}`
                  : `تشغيل ${movie.title}`
              }
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0B0D10] hover:bg-[#E5E5E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
            >
              <Play className="h-4 w-4 fill-[#0B0D10]" />
            </motion.button>

            {onRemoveFromHistory ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.12 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromHistory(movie.id);
                }}
                aria-label={`إزالة ${movie.title} من سجل المشاهدة`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-[#1E222A] text-[#D4D4D8] hover:border-[#E50914] hover:text-[#E50914] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.12 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMyList(movie.id);
                }}
                aria-label={
                  isInMyList
                    ? `إزالة ${movie.title} من قائمتي`
                    : `إضافة ${movie.title} إلى قائمتي`
                }
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-[#1E222A] text-white hover:border-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isInMyList ? (
                    <motion.span
                      key="checked"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.12 }}
                    >
                      <Check className="h-4 w-4 text-[#46D369]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="plus"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.12 }}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            <motion.button
              type="button"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.12 }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(movie);
              }}
              aria-label={`معلومات عن ${movie.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-[#1E222A] text-white hover:border-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
            >
              <Info className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
