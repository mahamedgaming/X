import { useEffect, useState } from 'react';
import { RotateCcw, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type CinemaThemeMode = 'purple' | 'blue' | 'pink' | 'green';
export type CardSizeMode = 'normal' | 'large' | 'small';

export interface CinemaSettings {
  theme: CinemaThemeMode;
  cardSize: CardSizeMode;
  showRatings: boolean;
  animationsEnabled: boolean;
  glassEnabled: boolean;
}

export const DEFAULT_PURPLE_SETTINGS: CinemaSettings = {
  theme: 'purple',
  cardSize: 'normal',
  showRatings: true,
  animationsEnabled: true,
  glassEnabled: true,
};

export const THEME_TOKENS: Record<
  CinemaThemeMode,
  {
    primary: string;
    light: string;
    gradient: string;
    glow: string;
  }
> = {
  purple: {
    primary: '#a855f7',
    light: '#d8b4fe',
    gradient: 'linear-gradient(90deg, #d8b4fe, #a855f7, #c084fc)',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  blue: {
    primary: '#388bff',
    light: '#93c5fd',
    gradient: 'linear-gradient(90deg, #93c5fd, #388bff, #60a5fa)',
    glow: 'rgba(56, 139, 255, 0.3)',
  },
  pink: {
    primary: '#ed65c8',
    light: '#f9a8d4',
    gradient: 'linear-gradient(90deg, #f9a8d4, #ed65c8, #f472b6)',
    glow: 'rgba(237, 101, 200, 0.3)',
  },
  green: {
    primary: '#31c48d',
    light: '#6ee7b7',
    gradient: 'linear-gradient(90deg, #6ee7b7, #31c48d, #34d399)',
    glow: 'rgba(49, 196, 141, 0.3)',
  },
};

interface SettingsModalProps {
  isOpen: boolean;
  settings: CinemaSettings;
  favoritesCount: number;
  onChangeSettings: (next: CinemaSettings) => void;
  onClearFavorites: () => void;
  onResetSettings: () => void;
  onClose: () => void;
}

export function SettingsModal({
  isOpen,
  settings,
  favoritesCount,
  onChangeSettings,
  onClearFavorites,
  onResetSettings,
  onClose,
}: SettingsModalProps) {
  const [confirmClear, setConfirmClear] = useState(false);
  const tokens = THEME_TOKENS[settings.theme];

  useEffect(() => {
    if (!isOpen) {
      setConfirmClear(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-sheet-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card w-full max-w-3xl max-h-[85vh] overflow-y-auto !rounded-b-none !rounded-t-[28px] px-6 sm:px-9 pt-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <div
              aria-hidden="true"
              className="mx-auto mb-5 h-1.5 w-12 rounded-full opacity-60"
              style={{ backgroundColor: tokens.light }}
            />

            <div className="mb-6 flex items-center justify-between gap-4">
              <h2
                id="settings-sheet-title"
                className="font-display text-xl sm:text-2xl font-bold text-white"
              >
                إعدادات CINEMA X
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق الإعدادات"
                className="glass-surface glass-interactive flex h-9 w-9 items-center justify-center rounded-xl text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Group 1: Appearance */}
              <div className="glass-surface rounded-[22px] p-4 sm:p-5">
                <h3
                  className="text-xs font-bold mb-3"
                  style={{ color: tokens.light }}
                >
                  المظهر والتصميم
                </h3>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center justify-between gap-4 py-3">
                    <label
                      htmlFor="setting-theme"
                      className="text-sm font-medium text-[#E2E8F0]"
                    >
                      لون الموقع
                    </label>
                    <select
                      id="setting-theme"
                      value={settings.theme}
                      onChange={(e) =>
                        onChangeSettings({
                          ...settings,
                          theme: e.target.value as CinemaThemeMode,
                        })
                      }
                      className="glass-input rounded-xl px-3 py-2 text-sm text-white"
                    >
                      <option className="bg-[#12121a] text-white" value="purple">
                        بنفسجي
                      </option>
                      <option className="bg-[#12121a] text-white" value="blue">
                        أزرق
                      </option>
                      <option className="bg-[#12121a] text-white" value="pink">
                        وردي
                      </option>
                      <option className="bg-[#12121a] text-white" value="green">
                        أخضر
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-3">
                    <label
                      htmlFor="setting-card-size"
                      className="text-sm font-medium text-[#E2E8F0]"
                    >
                      حجم بطاقات الأفلام
                    </label>
                    <select
                      id="setting-card-size"
                      value={settings.cardSize}
                      onChange={(e) =>
                        onChangeSettings({
                          ...settings,
                          cardSize: e.target.value as CardSizeMode,
                        })
                      }
                      className="glass-input rounded-xl px-3 py-2 text-sm text-white"
                    >
                      <option className="bg-[#12121a] text-white" value="normal">
                        متوسط
                      </option>
                      <option className="bg-[#12121a] text-white" value="large">
                        كبير
                      </option>
                      <option className="bg-[#12121a] text-white" value="small">
                        صغير
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Group 2: UX */}
              <div className="glass-surface rounded-[22px] p-4 sm:p-5">
                <h3
                  className="text-xs font-bold mb-3"
                  style={{ color: tokens.light }}
                >
                  تجربة الاستخدام
                </h3>
                <div className="divide-y divide-white/10">
                  <div className="flex items-center justify-between gap-4 py-3">
                    <label
                      htmlFor="setting-ratings"
                      className="text-sm font-medium text-[#E2E8F0]"
                    >
                      إظهار تقييمات الأفلام
                    </label>
                    <input
                      id="setting-ratings"
                      type="checkbox"
                      checked={settings.showRatings}
                      onChange={(e) =>
                        onChangeSettings({
                          ...settings,
                          showRatings: e.target.checked,
                        })
                      }
                      style={{ accentColor: tokens.primary }}
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 py-3">
                    <label
                      htmlFor="setting-animations"
                      className="text-sm font-medium text-[#E2E8F0]"
                    >
                      تأثيرات الحركة
                    </label>
                    <input
                      id="setting-animations"
                      type="checkbox"
                      checked={settings.animationsEnabled}
                      onChange={(e) =>
                        onChangeSettings({
                          ...settings,
                          animationsEnabled: e.target.checked,
                        })
                      }
                      style={{ accentColor: tokens.primary }}
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 py-3">
                    <label
                      htmlFor="setting-glass"
                      className="text-sm font-medium text-[#E2E8F0]"
                    >
                      تفعيل التأثير الزجاجي
                    </label>
                    <input
                      id="setting-glass"
                      type="checkbox"
                      checked={settings.glassEnabled}
                      onChange={(e) =>
                        onChangeSettings({
                          ...settings,
                          glassEnabled: e.target.checked,
                        })
                      }
                      style={{ accentColor: tokens.primary }}
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Group 3: Site Management */}
              <div className="glass-surface rounded-[22px] p-4 sm:p-5">
                <h3
                  className="text-xs font-bold mb-3"
                  style={{ color: tokens.light }}
                >
                  إدارة الموقع
                </h3>
                <div className="flex items-center justify-between gap-4 py-1">
                  <span className="text-sm font-medium text-[#E2E8F0]">
                    مسح قائمة المفضلة ({favoritesCount})
                  </span>
                  {confirmClear ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClearFavorites();
                          setConfirmClear(false);
                        }}
                        className="glass-active rounded-xl border px-3.5 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                      >
                        تأكيد المسح
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmClear(false)}
                        className="glass-surface rounded-xl px-3 py-2 text-xs font-semibold text-[#CBD5E1] hover:text-white"
                      >
                        إلغاء
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={favoritesCount === 0}
                      onClick={() => setConfirmClear(true)}
                      className={`glass-surface glass-interactive inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white ${
                        favoritesCount === 0
                          ? 'opacity-40 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>مسح</span>
                    </button>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onResetSettings}
                className="glass-active glass-interactive w-full inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold text-white"
              >
                <RotateCcw className="h-4 w-4" />
                <span>إعادة الإعدادات الافتراضية</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
