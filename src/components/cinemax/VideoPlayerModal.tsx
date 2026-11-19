import { useEffect } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CinemaXMovie } from '../../data/cinemaXMovies';

interface VideoPlayerModalProps {
  movie: CinemaXMovie | null;
  videoUrl: string;
  accentLight: string;
  onClose: () => void;
}

export function VideoPlayerModal({
  movie,
  videoUrl,
  accentLight,
  onClose,
}: VideoPlayerModalProps) {
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

  return (
    <AnimatePresence>
      {movie && videoUrl && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="player-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق مشغل الفيديو"
              className="glass-surface glass-interactive absolute top-3 left-3 z-20 flex h-9 w-9 items-center justify-center rounded-xl text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[68vh] bg-black block"
            />

            <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-white/10">
              <h2
                id="player-modal-title"
                className="font-display text-base sm:text-lg font-bold text-white"
              >
                {movie.title}
              </h2>
              <span
                className="text-xs tabular-nums"
                style={{ color: accentLight }}
              >
                {movie.category} · {movie.year}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
