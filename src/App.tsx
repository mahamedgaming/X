import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Heart,
  Loader2,
  Search,
  Star,
} from 'lucide-react';
import { motion, MotionConfig } from 'motion/react';
import {
  CINEMA_X_CATEGORIES,
  CINEMA_X_MOVIES,
  CinemaCategory,
  CinemaXMovie,
  HERO_BACKDROP_URL,
} from './data/cinemaXMovies';
import { BottomNav, PurpleNavTarget } from './components/cinemax/BottomNav';
import { PosterArt } from './components/cinemax/PosterArt';
import { CinemaModal } from './components/cinemax/CinemaModal';
import { VideoPlayerModal } from './components/cinemax/VideoPlayerModal';
import {
  CinemaSettings,
  DEFAULT_PURPLE_SETTINGS,
  SettingsModal,
  THEME_TOKENS,
} from './components/cinemax/SettingsModal';
import { MovieGridSkeleton } from './components/cinemax/MovieGridSkeleton';

type SortOption = 'default' | 'rating' | 'year' | 'az';

export default function App() {
  const [activeNav, setActiveNav] = useState<PurpleNavTarget>('home');
  const [category, setCategory] = useState<CinemaCategory>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<CinemaXMovie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<{
    movie: CinemaXMovie;
    url: string;
  } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const hasMountedRef = useRef(false);

  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const raw = window.localStorage.getItem('cinemax_purple_favorites');
      return raw ? (JSON.parse(raw) as number[]) : [1, 4];
    } catch {
      return [1, 4];
    }
  });

  const [settings, setSettings] = useState<CinemaSettings>(() => {
    try {
      const raw = window.localStorage.getItem('cinemax_purple_settings');
      if (!raw) return DEFAULT_PURPLE_SETTINGS;
      const parsed = JSON.parse(raw) as Partial<CinemaSettings>;
      const validTheme =
        parsed.theme && parsed.theme in THEME_TOKENS
          ? parsed.theme
          : DEFAULT_PURPLE_SETTINGS.theme;
      return {
        ...DEFAULT_PURPLE_SETTINGS,
        ...parsed,
        theme: validTheme,
      };
    } catch {
      return DEFAULT_PURPLE_SETTINGS;
    }
  });

  const [videoUrls, setVideoUrls] = useState<Record<number, string>>(() => {
    try {
      const raw = window.localStorage.getItem('cinemax_purple_videos');
      return raw ? (JSON.parse(raw) as Record<number, string>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'cinemax_purple_favorites',
        JSON.stringify(favoriteIds)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [favoriteIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'cinemax_purple_settings',
        JSON.stringify(settings)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [settings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'cinemax_purple_videos',
        JSON.stringify(videoUrls)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [videoUrls]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsInitialLoading(false);
    }, 480);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    setIsFiltering(true);
    const timer = window.setTimeout(() => {
      setIsFiltering(false);
    }, 260);
    return () => window.clearTimeout(timer);
  }, [category, searchQuery, sortBy, favoritesOnly]);

  const isLoading = isInitialLoading || isFiltering;
  const tokens = THEME_TOKENS[settings.theme];

  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearFavorites = () => {
    setFavoriteIds([]);
    if (favoritesOnly) {
      setFavoritesOnly(false);
      setActiveNav('movies');
    }
  };

  const resetSettings = () => {
    setSettings(DEFAULT_PURPLE_SETTINGS);
  };

  const handleSaveVideoUrl = (id: number, url: string) => {
    setVideoUrls((prev) => {
      const next = { ...prev };
      if (url) {
        next[id] = url;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const handleWatchMovie = (movie: CinemaXMovie, url: string) => {
    if (!url) return;
    handleSaveVideoUrl(movie.id, url);
    setSelectedMovie(null);
    setPlayingMovie({ movie, url });
  };

  const handleSelectNav = (tab: PurpleNavTarget) => {
    setActiveNav(tab);
    if (tab === 'settings') {
      setSettingsOpen(true);
      return;
    }
    if (tab === 'home') {
      setFavoritesOnly(false);
      setCategory('الكل');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (tab === 'favorites') {
      setFavoritesOnly(true);
      setCategory('الكل');
      setSearchQuery('');
      document.getElementById('movies')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setFavoritesOnly(false);
    document.getElementById('movies')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredMovies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = CINEMA_X_MOVIES.filter((m) => {
      if (favoritesOnly && !favoriteIds.includes(m.id)) return false;
      if (category !== 'الكل' && m.category !== category) return false;
      if (
        q &&
        !m.title.toLowerCase().includes(q) &&
        !m.category.toLowerCase().includes(q) &&
        !m.director.toLowerCase().includes(q) &&
        !m.actors.some((actor) => actor.toLowerCase().includes(q))
      ) {
        return false;
      }
      return true;
    });

    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.ratingNum - a.ratingNum);
    }
    if (sortBy === 'year') {
      return [...list].sort((a, b) => b.year - a.year);
    }
    if (sortBy === 'az') {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [category, searchQuery, sortBy, favoritesOnly, favoriteIds]);

  const gridColsClass =
    settings.cardSize === 'small'
      ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
      : settings.cardSize === 'large'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5';

  return (
    <MotionConfig reducedMotion={settings.animationsEnabled ? 'user' : 'always'}>
      <div
        data-theme={settings.theme}
        data-glass={settings.glassEnabled ? 'on' : 'off'}
        className="liquid-canvas min-h-screen text-white flex flex-col pb-24"
      >
        <main className="flex-1">
          {/* Hero Section */}
          <section
            id="home"
            className="relative min-h-[540px] sm:min-h-[590px] py-20 flex items-center overflow-hidden"
          >
            <div className="absolute inset-0">
              <PosterArt
                src={HERO_BACKDROP_URL}
                alt="Dune Cinema Backdrop"
                theme="hero-dune"
                className="h-full w-full"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-l from-[#08080D] via-[#08080D]/80 to-[#08080D]/35"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#08080D] via-transparent to-[#08080D]/40"
              />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card max-w-xl p-6 sm:p-8 space-y-4"
              >
                <p
                  className="text-xs sm:text-sm font-bold tracking-wider uppercase"
                  style={{ color: tokens.light }}
                >
                  CINEMA X · PURPLE EDITION
                </p>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.3] text-white">
                  عالم السينما{' '}
                  <span
                    className="block bg-clip-text text-transparent"
                    style={{ backgroundImage: tokens.gradient }}
                  >
                    بطابع بنفسجي
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
                  اكتشف أفلامك المفضلة واستمتع بتجربة سينمائية عصرية بتصميم
                  زجاجي متكامل.
                </p>

                <div className="pt-2">
                  <motion.a
                    href="#movies"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectNav('movies');
                    }}
                    className="glass-active glass-interactive inline-flex items-center gap-2 rounded-[14px] border px-7 py-3.5 text-sm sm:text-base font-bold text-white whitespace-nowrap"
                  >
                    <span>اكتشف الأفلام</span>
                    <ArrowLeft className="h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Movies Catalog Section */}
          <section
            id="movies"
            aria-busy={isLoading}
            className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 py-10 sm:py-14"
          >
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {favoritesOnly ? (
                    <span style={{ color: tokens.light }}>مفضلتي</span>
                  ) : (
                    <span style={{ color: tokens.light }}>الأفلام</span>
                  )}
                </h2>
                {isLoading ? (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    style={{ color: tokens.light }}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="text-sm text-[#94A3B8] tabular-nums">
                    ({filteredMovies.length})
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:flex-none">
                  {isFiltering && searchQuery.trim().length > 0 ? (
                    <Loader2
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin z-10"
                      style={{ color: tokens.light }}
                    />
                  ) : (
                    <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9D8FB5] z-10" />
                  )}
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن فيلم..."
                    aria-label="ابحث عن فيلم"
                    className="glass-input w-full sm:w-64 rounded-xl pr-10 pl-4 py-2.5 text-sm placeholder-[#B4A7CC]"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label="ترتيب الأفلام"
                  className="glass-input rounded-xl px-3.5 py-2.5 text-sm text-white"
                >
                  <option className="bg-[#12121a] text-white" value="default">
                    ترتيب عادي
                  </option>
                  <option className="bg-[#12121a] text-white" value="rating">
                    الأعلى تقييماً
                  </option>
                  <option className="bg-[#12121a] text-white" value="year">
                    الأحدث
                  </option>
                  <option className="bg-[#12121a] text-white" value="az">
                    الاسم (A-Z)
                  </option>
                </select>
              </div>
            </div>

            {/* Category Filters */}
            <div
              role="tablist"
              aria-label="تصنيفات الأفلام"
              className="mb-8 flex flex-wrap items-center gap-2.5"
            >
              {CINEMA_X_CATEGORIES.map((cat) => {
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setCategory(cat);
                      setFavoritesOnly(false);
                      setActiveNav('movies');
                    }}
                    className={`glass-interactive relative rounded-full px-5 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive
                        ? 'glass-active text-white'
                        : 'glass-surface text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="purple-filter-active"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 32,
                        }}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: `${tokens.primary}22`,
                          boxShadow: `0 0 18px ${tokens.glow}`,
                        }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Movies Grid */}
            {isLoading ? (
              <MovieGridSkeleton
                cardSize={settings.cardSize}
                showRatings={settings.showRatings}
                accentColor={tokens.light}
                count={isInitialLoading ? 8 : 4}
                statusText={
                  isInitialLoading
                    ? 'جاري جلب بيانات الأفلام...'
                    : 'جاري تصفية وتحديث القائمة...'
                }
              />
            ) : filteredMovies.length > 0 ? (
              <div className={`grid ${gridColsClass}`}>
                {filteredMovies.map((movie, idx) => {
                  const isFav = favoriteIds.includes(movie.id);
                  return (
                    <motion.article
                      key={movie.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: Math.min(idx * 0.04, 0.24),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onClick={() => setSelectedMovie(movie)}
                      className="glass-card glass-interactive group cursor-pointer"
                    >
                      <div className="relative aspect-[2/3] w-full overflow-hidden">
                        <PosterArt
                          src={movie.image}
                          alt={movie.title}
                          theme={movie.posterTheme}
                          className="h-full w-full group-hover:scale-105 transition-transform duration-300"
                        />

                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#08080D]/90 via-transparent to-black/30"
                        />

                        {settings.showRatings && (
                          <span className="glass-surface absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-[#FFD76B] tabular-nums">
                            <Star className="h-3 w-3 fill-[#FFD76B]" />
                            {movie.rating}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(movie.id);
                          }}
                          aria-label={
                            isFav
                              ? `إزالة ${movie.title} من المفضلة`
                              : `إضافة ${movie.title} إلى المفضلة`
                          }
                          className={`glass-interactive absolute top-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-full border ${
                            isFav ? 'glass-active' : 'glass-surface'
                          }`}
                          style={
                            isFav
                              ? {
                                  borderColor: tokens.light,
                                  color: '#FFFFFF',
                                }
                              : undefined
                          }
                        >
                          {isFav ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Heart className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <div className="p-3.5 space-y-1">
                        <h3 className="font-display text-sm sm:text-base font-bold text-white truncate">
                          {movie.title}
                        </h3>
                        <p className="text-xs text-[#B4A7CC] tabular-nums">
                          {movie.category} · {movie.year}
                        </p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card py-16 px-6 text-center space-y-4">
                <h3 className="font-display text-xl font-bold text-white">
                  {favoritesOnly
                    ? 'قائمة المفضلة فارغة حالياً'
                    : 'لا توجد أفلام مطابقة هنا'}
                </h3>
                <p className="mx-auto max-w-md text-sm text-[#B4A7CC]">
                  {favoritesOnly
                    ? 'اضغط على أيقونة القلب في أي فيلم لإضافته إلى مفضلتك.'
                    : 'جرّب تغيير كلمة البحث أو اختيار تصنيف آخر.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCategory('الكل');
                    setSearchQuery('');
                    setFavoritesOnly(false);
                    setActiveNav('movies');
                  }}
                  className="glass-active glass-interactive inline-flex items-center rounded-xl border px-5 py-2.5 text-sm font-bold text-white"
                >
                  عرض جميع الأفلام
                </button>
              </div>
            )}
          </section>
        </main>

        <footer className="py-8 px-5 text-center text-xs text-[#9D8FB5]">
          © 2026 CINEMA X · PURPLE EDITION
        </footer>

        <BottomNav
          activeTab={settingsOpen ? 'settings' : activeNav}
          favoritesCount={favoriteIds.length}
          accentColor={tokens.primary}
          accentLight={tokens.light}
          onSelectTab={handleSelectNav}
        />

        <CinemaModal
          movie={selectedMovie}
          videoUrl={
            selectedMovie
              ? (videoUrls[selectedMovie.id] ?? selectedMovie.video ?? '')
              : ''
          }
          isFavorite={
            selectedMovie ? favoriteIds.includes(selectedMovie.id) : false
          }
          accentLight={tokens.light}
          onToggleFavorite={toggleFavorite}
          onSaveVideoUrl={handleSaveVideoUrl}
          onWatchMovie={handleWatchMovie}
          onClose={() => setSelectedMovie(null)}
        />

        <VideoPlayerModal
          movie={playingMovie?.movie ?? null}
          videoUrl={playingMovie?.url ?? ''}
          accentLight={tokens.light}
          onClose={() => setPlayingMovie(null)}
        />

        <SettingsModal
          isOpen={settingsOpen}
          settings={settings}
          favoritesCount={favoriteIds.length}
          onChangeSettings={setSettings}
          onClearFavorites={clearFavorites}
          onResetSettings={resetSettings}
          onClose={() => {
            setSettingsOpen(false);
            setActiveNav(favoritesOnly ? 'favorites' : 'movies');
          }}
        />
      </div>
    </MotionConfig>
  );
}
