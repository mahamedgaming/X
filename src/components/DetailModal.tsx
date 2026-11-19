import { useEffect, useState } from 'react';
import { Check, CheckCircle2, Play, Plus, ThumbsUp, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Episode, Movie, WatchHistoryEntry } from '../types/movie';
import { formatFinishDate } from '../utils/formatDate';
import { MovieArtwork } from './MovieArtwork';

interface DetailModalProps {
  movie: Movie | null;
  allMovies: Movie[];
  isInMyList: boolean;
  isLiked: boolean;
  historyEntry?: WatchHistoryEntry;
  onClose: () => void;
  onPlay: (movie: Movie, episode?: Episode) => void;
  onToggleMyList: (movieId: string) => void;
  onToggleLike: (movieId: string) => void;
  onToggleWatched: (movieId: string, episodeId?: string) => void;
  onSelectMovie: (movie: Movie) => void;
}

export function DetailModal({
  movie,
  allMovies,
  isInMyList,
  isLiked,
  historyEntry,
  onClose,
  onPlay,
  onToggleMyList,
  onToggleLike,
  onToggleWatched,
  onSelectMovie,
}: DetailModalProps) {
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);

  useEffect(() => {
    setSelectedSeasonIdx(0);
  }, [movie?.id]);

  useEffect(() => {
    if (!movie) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [movie, onClose]);

  const currentSeason = movie?.seasons?.[selectedSeasonIdx];
  const similarMovies = movie
    ? allMovies
        .filter(
          (m) =>
            m.id !== movie.id &&
            m.genres.some((g) => movie.genres.includes(g))
        )
        .slice(0, 3)
    : [];

  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 lg:p-10 flex items-start justify-center"
          onClick={onClose}
        >
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-[#14171D] shadow-2xl my-4"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق نافذة التفاصيل"
          className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B0D10]/85 text-white border border-white/15 hover:bg-[#E50914] hover:border-[#E50914] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero Banner Header */}
        <div className="relative aspect-video w-full overflow-hidden">
          <MovieArtwork
            theme={movie.artworkTheme}
            imageSrc={movie.imageSrc}
            alt={movie.title}
            className="h-full w-full"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#14171D] via-[#14171D]/35 to-transparent"
          />

          <div className="absolute inset-x-6 sm:inset-x-10 bottom-6 space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-[#D4D4D8]">
                {movie.originalTitle}
              </p>
              <h2
                id="detail-modal-title"
                className="font-display text-3xl sm:text-4xl font-semibold text-white"
              >
                {movie.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  onPlay(movie, currentSeason?.episodes[0])
                }
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-2.5 text-sm sm:text-base font-semibold text-[#0B0D10] hover:bg-[#E5E5E5] transition-colors whitespace-nowrap shrink-0"
              >
                <Play className="h-4 w-4 fill-[#0B0D10]" />
                <span>
                  {movie.type === 'series' ? 'تشغيل الحلقة الأولى' : 'تشغيل الفيلم'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onToggleMyList(movie.id)}
                aria-label={isInMyList ? 'إزالة من قائمتي' : 'إضافة إلى قائمتي'}
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-black/50 px-4 py-2.5 text-sm font-medium text-white hover:border-white transition-colors whitespace-nowrap shrink-0"
              >
                {isInMyList ? (
                  <>
                    <Check className="h-4 w-4 text-[#46D369]" />
                    <span>في قائمتي</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>قائمتي</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleLike(movie.id)}
                aria-label="أعجبني هذا العمل"
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  isLiked
                    ? 'border-[#E50914] bg-[#E50914]/20 text-[#E50914]'
                    : 'border-white/25 bg-black/50 text-white hover:border-white'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  onToggleWatched(movie.id, currentSeason?.episodes[0]?.id)
                }
                aria-label={
                  historyEntry
                    ? 'إزالة من سجل المشاهدة'
                    : 'تحديد كمشاهد بالكامل'
                }
                className={`inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  historyEntry
                    ? 'border-[#46D369]/60 bg-[#46D369]/15 text-[#46D369] hover:bg-[#46D369]/25'
                    : 'border-white/25 bg-black/50 text-white hover:border-white'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {historyEntry ? 'تمت المشاهدة' : 'تحديد كمكتمل'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Metadata & Description */}
        <div className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5 text-sm text-[#A1A1AA]">
                <span className="font-semibold text-[#46D369] tabular-nums">
                  {movie.matchScore}% مطابقة
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{movie.year}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{movie.ageRating}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{movie.durationLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{movie.quality}</span>
                {historyEntry && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#46D369] tabular-nums">
                      {formatFinishDate(historyEntry.completedAt)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-base text-[#E5E5E5] leading-relaxed">
                {movie.synopsis}
              </p>
            </div>

            <div className="space-y-3 text-sm border-t md:border-t-0 md:border-r border-white/10 pt-4 md:pt-0 md:pr-6">
              <div>
                <span className="text-[#94A3B8]">طاقم التمثيل: </span>
                <span className="text-white">{movie.cast.join('، ')}</span>
              </div>
              <div>
                <span className="text-[#94A3B8]">الإخراج: </span>
                <span className="text-white">{movie.director}</span>
              </div>
              <div>
                <span className="text-[#94A3B8]">التصنيف: </span>
                <span className="text-white">{movie.genreLabel}</span>
              </div>
            </div>
          </div>

          {/* Series Episodes Section */}
          {movie.seasons && movie.seasons.length > 0 && currentSeason && (
            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-display text-lg font-semibold text-white">
                  الحلقات
                </h3>

                {movie.seasons.length > 1 && (
                  <div className="flex items-center gap-2">
                    {movie.seasons.map((season, idx) => (
                      <button
                        key={season.number}
                        type="button"
                        onClick={() => setSelectedSeasonIdx(idx)}
                        className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          idx === selectedSeasonIdx
                            ? 'bg-[#E50914] text-white'
                            : 'bg-[#20242C] text-[#D4D4D8] hover:bg-[#2A2F3A]'
                        }`}
                      >
                        الموسم {season.number}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
                {currentSeason.episodes.map((ep) => (
                  <button
                    key={ep.id}
                    type="button"
                    onClick={() => onPlay(movie, ep)}
                    className="group flex w-full items-center gap-4 py-4 px-2 text-right hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="w-6 text-center text-lg font-semibold text-[#737373] tabular-nums shrink-0">
                      {ep.number}
                    </span>

                    <div className="relative aspect-video w-32 sm:w-40 shrink-0 overflow-hidden rounded border border-white/10">
                      <MovieArtwork
                        theme={ep.theme}
                        alt={ep.title}
                        className="h-full w-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-6 w-6 fill-white text-white" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-semibold text-white truncate">
                          {ep.title}
                        </h4>
                        <span className="text-xs text-[#94A3B8] tabular-nums whitespace-nowrap shrink-0">
                          {ep.durationLabel}
                        </span>
                      </div>
                      <p className="text-sm text-[#A1A1AA] line-clamp-2">
                        {ep.synopsis}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* More Like This */}
          {similarMovies.length > 0 && (
            <div className="border-t border-white/10 pt-6 space-y-4">
              <h3 className="font-display text-lg font-semibold text-white">
                أعمال مشابهة قد تعجبك
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarMovies.map((sim) => (
                  <button
                    key={sim.id}
                    type="button"
                    onClick={() => onSelectMovie(sim)}
                    className="group text-right overflow-hidden rounded-md border border-white/10 bg-[#1B1F27] hover:border-white/30 transition-colors"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <MovieArtwork
                        theme={sim.artworkTheme}
                        imageSrc={sim.imageSrc}
                        alt={sim.title}
                        className="h-full w-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 space-y-1">
                      <div className="flex items-center justify-between gap-2 text-xs text-[#A1A1AA]">
                        <span className="tabular-nums">{sim.year}</span>
                        <span className="tabular-nums">{sim.durationLabel}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-white truncate">
                        {sim.title}
                      </h4>
                      <p className="text-xs text-[#A1A1AA] line-clamp-2">
                        {sim.synopsis}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
