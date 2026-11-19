import { useEffect, useState } from 'react';
import {
  Check,
  Clapperboard,
  Clock,
  Heart,
  Link2,
  Play,
  Star,
  User,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CinemaXMovie } from '../../data/cinemaXMovies';
import { PosterArt } from './PosterArt';

interface CinemaModalProps {
  movie: CinemaXMovie | null;
  videoUrl: string;
  isFavorite: boolean;
  accentLight: string;
  onToggleFavorite: (id: number) => void;
  onSaveVideoUrl: (id: number, url: string) => void;
  onWatchMovie: (movie: CinemaXMovie, url: string) => void;
  onClose: () => void;
}

export function CinemaModal({
  movie,
  videoUrl,
  isFavorite,
  accentLight,
  onToggleFavorite,
  onSaveVideoUrl,
  onWatchMovie,
  onClose,
}: CinemaModalProps) {
  const [urlInput, setUrlInput] = useState(videoUrl);
  const [showUrlEditor, setShowUrlEditor] = useState(false);

  useEffect(() => {
    setUrlInput(videoUrl);
    setShowUrlEditor(false);
  }, [movie?.id, videoUrl]);

  useEffect(() => {
    if (!movie) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [movie, onClose]);

  const effectiveUrl = urlInput.trim();

  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cinemax-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق نافذة الفيلم"
              className="glass-surface glass-interactive absolute top-3 left-3 z-20 flex h-9 w-9 items-center justify-center rounded-xl text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <PosterArt
                src={movie.image}
                alt={movie.title}
                theme={movie.posterTheme}
                className="h-full w-full"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#08080D]/90 via-transparent to-black/30"
              />
            </div>

            <div className="relative z-10 p-6 sm:p-7 space-y-5">
              <div className="space-y-1.5">
                <h2
                  id="cinemax-modal-title"
                  className="font-display text-2xl sm:text-3xl font-bold text-white"
                >
                  {movie.title}
                </h2>
                <div
                  className="flex flex-wrap items-center gap-2 text-xs sm:text-sm"
                  style={{ color: accentLight }}
                >
                  <span className="inline-flex items-center gap-1 font-semibold text-[#FFD76B] tabular-nums">
                    <Star className="h-3.5 w-3.5 fill-[#FFD76B]" />
                    {movie.rating}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{movie.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{movie.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="h-3.5 w-3.5" />
                    {movie.duration}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clapperboard className="h-3.5 w-3.5" />
                    الإخراج: {movie.director}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#E2E8F0] leading-relaxed">
                {movie.desc}
              </p>

              {/* Cast Section */}
              {movie.actors.length > 0 && (
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div
                    className="flex items-center gap-2 text-xs font-bold"
                    style={{ color: accentLight }}
                  >
                    <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>طاقم العمل</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span
                      className="glass-surface mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                      style={{ color: accentLight }}
                      aria-hidden="true"
                    >
                      <User className="h-3.5 w-3.5" />
                    </span>
                    <ul className="flex flex-wrap items-center gap-2.5">
                      {movie.actors.map((actor) => (
                        <li
                          key={actor}
                          className="glass-surface inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-medium tracking-wide text-[#F3E8FF]"
                        >
                          <UserRound
                            className="h-3.5 w-3.5 shrink-0"
                            style={{ color: accentLight }}
                            aria-hidden="true"
                          />
                          <span>{actor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  disabled={!effectiveUrl}
                  onClick={() => onWatchMovie(movie, effectiveUrl)}
                  className={`glass-active glass-interactive inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold text-white whitespace-nowrap shrink-0 ${
                    effectiveUrl
                      ? 'cursor-pointer'
                      : 'opacity-45 cursor-not-allowed'
                  }`}
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>مشاهدة الفيلم</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(movie.id)}
                  className={`glass-interactive inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 ${
                    isFavorite
                      ? 'glass-active text-white'
                      : 'glass-surface text-[#E2E8F0]'
                  }`}
                >
                  {isFavorite ? (
                    <>
                      <Check className="h-4 w-4 text-[#46D369]" />
                      <span>في المفضلة</span>
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4" />
                      <span>المفضلة</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowUrlEditor((v) => !v)}
                  className="glass-surface glass-interactive inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#CBD5E1] hover:text-white whitespace-nowrap shrink-0"
                >
                  <Link2 className="h-4 w-4" />
                  <span>
                    {effectiveUrl ? 'تعديل رابط الفيديو' : 'إضافة رابط فيديو'}
                  </span>
                </button>
              </div>

              {showUrlEditor && (
                <div className="glass-surface rounded-2xl p-4 space-y-3">
                  <label
                    htmlFor="legal-video-url"
                    className="block text-xs font-semibold text-[#CBD5E1]"
                  >
                    رابط فيديو قانوني مباشر (MP4 / WebM)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="legal-video-url"
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/movie.mp4"
                      dir="ltr"
                      className="glass-input flex-1 rounded-xl px-3 py-2 text-xs placeholder-[#64748B]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onSaveVideoUrl(movie.id, urlInput.trim());
                        setShowUrlEditor(false);
                      }}
                      className="glass-active glass-interactive rounded-xl border px-4 py-2 text-xs font-bold text-white whitespace-nowrap shrink-0"
                    >
                      حفظ الرابط
                    </button>
                  </div>
                </div>
              )}

              <p className="text-xs" style={{ color: accentLight }}>
                {effectiveUrl
                  ? 'المشاهدة متاحة — اضغط على "مشاهدة الفيلم" لبدء التشغيل.'
                  : 'أضف رابط فيديو قانوني لتشغيل الفيلم.'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
