import { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { UserProfile } from '../types/movie';

interface ProfileGateModalProps {
  isOpen: boolean;
  profiles: UserProfile[];
  activeProfileId: string;
  onSelectProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

export function ProfileGateModal({
  isOpen,
  profiles,
  activeProfileId,
  onSelectProfile,
  onClose,
}: ProfileGateModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-lg border border-white/15 bg-[#14171D] p-6 sm:p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق نافذة الملفات الشخصية"
              className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full text-[#B3B3B3] hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h2
              id="profile-modal-title"
              className="font-display text-2xl font-semibold text-white mb-2"
            >
              من يشاهد الآن؟
            </h2>
            <p className="text-sm text-[#A1A1AA] mb-8">
              اختر ملفاً شخصياً لحفظ قائمة المشاهدة ومتابعة التقدم بشكل مستقل
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {profiles.map((profile, idx) => {
                const isActive = profile.id === activeProfileId;
                return (
                  <motion.button
                    key={profile.id}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.2 }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      onSelectProfile(profile);
                      onClose();
                    }}
                    className="group flex flex-col items-center gap-3 focus-visible:outline-none"
                  >
                    <div
                      className={`relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-md text-2xl sm:text-3xl font-semibold text-white transition-all duration-150 ${
                        isActive
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-[#14171D]'
                          : 'opacity-85 group-hover:opacity-100'
                      }`}
                      style={{ backgroundColor: profile.color }}
                    >
                      {profile.initials}
                      {isActive && (
                        <span className="absolute -bottom-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0B0D10]">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-sm font-medium text-white">
                        {profile.name}
                      </span>
                      {profile.isKids && (
                        <span className="block text-[11px] text-[#46D369]">
                          محتوى عائلي
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
