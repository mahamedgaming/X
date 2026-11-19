import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipForward,
  Subtitles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Episode, Movie, PlayingSession } from '../types/movie';
import { MovieArtwork } from './MovieArtwork';

interface VideoPlayerProps {
  session: PlayingSession | null;
  onClose: () => void;
  onProgressUpdate: (
    movieId: string,
    seconds: number,
    durationSeconds: number,
    episodeId?: string
  ) => void;
  onSwitchEpisode: (movie: Movie, episode: Episode) => void;
}

type SubtitleMode = 'ar' | 'en' | 'off';

export function VideoPlayer({
  session,
  onClose,
  onProgressUpdate,
  onSwitchEpisode,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('ar');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<number | null>(null);

  const movie = session?.movie;
  const episode = session?.episode;
  const totalSeconds = episode
    ? episode.durationMinutes * 60
    : movie?.durationSeconds ?? 5400;

  // Initialize playback position when session changes
  useEffect(() => {
    if (!session) return;
    setCurrentTime(Math.min(session.startAtSeconds, totalSeconds - 10));
    setIsPlaying(true);
    setShowControls(true);
  }, [session?.movie.id, session?.episode?.id, session?.startAtSeconds, totalSeconds]);

  // Playback tick loop
  useEffect(() => {
    if (!session || !isPlaying) return;
    const interval = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = Math.min(totalSeconds, prev + speed);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [session, isPlaying, speed, totalSeconds]);

  // Sync progress back to parent periodically & on unmount/close
  useEffect(() => {
    if (!movie) return;
    onProgressUpdate(movie.id, currentTime, totalSeconds, episode?.id);
  }, [movie, currentTime, totalSeconds, episode?.id, onProgressUpdate]);

  // Auto-hide controls after inactivity while playing
  const bumpControls = () => {
    setShowControls(true);
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3200);
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!session) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          onClose();
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
        bumpControls();
      } else if (e.key === 'ArrowLeft') {
        setCurrentTime((t) => Math.min(totalSeconds, t + 10));
        bumpControls();
      } else if (e.key === 'ArrowRight') {
        setCurrentTime((t) => Math.max(0, t - 10));
        bumpControls();
      } else if (e.key.toLowerCase() === 'm') {
        setIsMuted((m) => !m);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  if (!session || !movie) return null;

  const formatClock = (secs: number) => {
    const rounded = Math.floor(secs);
    const hrs = Math.floor(rounded / 3600);
    const mins = Math.floor((rounded % 3600) / 60);
    const s = rounded % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return hrs > 0 ? `${hrs}:${pad(mins)}:${pad(s)}` : `${pad(mins)}:${pad(s)}`;
  };

  // Loop movie subtitle lines gently based on current playback position
  const activeSubtitle = (() => {
    if (subtitleMode === 'off' || movie.subtitles.length === 0) return null;
    const cycleDuration =
      movie.subtitles[movie.subtitles.length - 1]?.endSec || 24;
    const modTime = currentTime % Math.max(24, cycleDuration + 4);
    const cue = movie.subtitles.find(
      (c) => modTime >= c.startSec && modTime <= c.endSec
    );
    if (!cue) return null;
    return subtitleMode === 'ar' ? cue.ar : cue.en;
  })();

  // Find next episode if watching a series
  const nextEpisode = (() => {
    if (!episode || !movie.seasons) return null;
    const flatEpisodes = movie.seasons.flatMap((s) => s.episodes);
    const idx = flatEpisodes.findIndex((e) => e.id === episode.id);
    if (idx >= 0 && idx < flatEpisodes.length - 1) {
      return flatEpisodes[idx + 1];
    }
    return null;
  })();

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const progressPct = (currentTime / Math.max(1, totalSeconds)) * 100;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseMove={bumpControls}
      onClick={() => {
        setIsPlaying((p) => !p);
        bumpControls();
      }}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none overflow-hidden"
    >
      {/* Animated Theatrical Cinema Frame */}
      <div
        className={`absolute inset-0 transition-transform duration-[18000ms] ease-linear ${
          isPlaying ? 'scale-110' : 'scale-100'
        }`}
      >
        <MovieArtwork
          theme={episode?.theme ?? movie.artworkTheme}
          imageSrc={episode ? undefined : movie.imageSrc}
          alt={movie.title}
          className="h-full w-full"
          priority
        />
      </div>

      {/* Subtle Cinema Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.8)_100%)]"
      />

      {/* Top Bar Controls */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-20 flex items-center justify-between gap-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent px-4 sm:px-8 py-5 transition-opacity duration-200 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-md bg-black/50 border border-white/15 px-3.5 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة إلى التصفح</span>
        </button>

        <div className="text-center min-w-0">
          <h2 className="font-display text-base sm:text-lg font-semibold text-white truncate">
            {movie.title}
          </h2>
          {episode && (
            <p className="text-xs text-[#D4D4D8] truncate">
              الحلقة {episode.number}: {episode.title}
            </p>
          )}
        </div>

        <span className="text-xs font-mono text-[#D4D4D8] border border-white/20 rounded px-2 py-1 whitespace-nowrap shrink-0">
          {movie.quality}
        </span>
      </div>

      {/* Center Paused Indicator */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex items-center justify-center pointer-events-none"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/70 border border-white/25 text-white">
              <Play className="h-9 w-9 fill-white translate-x-[-2px]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtitles + Bottom Control Deck */}
      <div className="relative z-20 mt-auto">
        {/* Live Synchronized Subtitles */}
        <AnimatePresence mode="wait">
          {activeSubtitle && (
            <motion.div
              key={activeSubtitle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="mx-auto mb-6 max-w-2xl px-4 text-center pointer-events-none"
            >
              <span className="inline-block rounded bg-black/75 px-4 py-2 text-base sm:text-xl font-medium text-white leading-snug shadow-lg">
                {activeSubtitle}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-gradient-to-t from-black/95 via-black/75 to-transparent px-4 sm:px-8 pb-6 pt-10 space-y-4 transition-opacity duration-200 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Seekable Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#E5E5E5] tabular-nums w-14 text-left">
              {formatClock(currentTime)}
            </span>

            <div className="relative flex-1 flex items-center">
              <div className="h-1.5 w-full rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full bg-[#E50914]"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={totalSeconds}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                aria-label="شريط التقدم الزمني"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <span className="text-xs font-mono text-[#A1A1AA] tabular-nums w-14 text-right">
              {formatClock(totalSeconds)}
            </span>
          </div>

          {/* Primary Player Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0B0D10] hover:bg-[#E5E5E5] transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 fill-[#0B0D10]" />
                ) : (
                  <Play className="h-5 w-5 fill-[#0B0D10]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                aria-label="الرجوع 10 ثوان"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15 transition-colors"
              >
                <RotateCw className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentTime((t) => Math.min(totalSeconds, t + 10))
                }
                aria-label="التقديم 10 ثوان"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted((m) => !m)}
                  aria-label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5 text-[#E50914]" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setVolume(val);
                    if (val > 0 && isMuted) setIsMuted(false);
                  }}
                  aria-label="مستوى الصوت"
                  className="hidden sm:block w-20 accent-[#E50914] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  onProgressUpdate(
                    movie.id,
                    totalSeconds,
                    totalSeconds,
                    episode?.id
                  );
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#46D369]/40 bg-[#46D369]/15 px-3 py-1.5 text-xs font-medium text-[#46D369] hover:bg-[#46D369]/25 transition-colors whitespace-nowrap shrink-0"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>إنهاء وحفظ بالسجل</span>
              </button>

              {nextEpisode && (
                <button
                  type="button"
                  onClick={() => onSwitchEpisode(movie, nextEpisode)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-colors whitespace-nowrap shrink-0"
                >
                  <SkipForward className="h-4 w-4" />
                  <span>الحلقة التالية</span>
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  setSubtitleMode((prev) =>
                    prev === 'ar' ? 'en' : prev === 'en' ? 'off' : 'ar'
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-white hover:border-white/50 transition-colors whitespace-nowrap shrink-0"
              >
                <Subtitles className="h-4 w-4" />
                <span>
                  الترجمة:{' '}
                  {subtitleMode === 'ar'
                    ? 'العربية'
                    : subtitleMode === 'en'
                    ? 'English'
                    : 'إيقاف'}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1))
                }
                className="rounded-md border border-white/20 bg-black/50 px-2.5 py-1.5 text-xs font-mono text-white hover:border-white/50 transition-colors tabular-nums"
              >
                {speed}x
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'إنهاء ملء الشاشة' : 'ملء الشاشة'}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
