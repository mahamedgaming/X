import { useState } from 'react';
import { motion } from 'motion/react';

interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metricValue: string;
  metricContext: string;
  highlights: string[];
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'speed',
    index: '01',
    title: 'السرعة والأداء الفائق',
    subtitle: 'استجابة فورية على جميع الشاشات',
    description:
      'أداء سريع وتجربة سلسة على جميع الأجهزة بفضل بنية برمجية خفيفة، وتحميل ذكي للموارد دون أي تأخير.',
    metricValue: '< 120ms',
    metricContext: 'زمن استجابة التفاعلات الأساسية في المتصفح',
    highlights: [
      'تحسين مسار العرض الحرج وتقليل حجم الحزم البرمجية',
      'حركات متسارعة عبر وحدة الرسوميات بدون تقطيع',
      'توافق كامل مع الهواتف والأجهزة اللوحية وسطح المكتب',
    ],
  },
  {
    id: 'design',
    index: '02',
    title: 'التصميم والهوية العصرية',
    subtitle: 'تفاصيل بصرية متوازنة وواضحة',
    description:
      'تصميم عصري وألوان جذابة وتفاصيل احترافية تعكس قوة علامتك التجارية وتمنح الزائر وضوحاً بصرياً مريحاً.',
    metricValue: '60 · 30 · 10',
    metricContext: 'توازن لوني مدروس لسهولة القراءة والتركيز',
    highlights: [
      'تسلسل هرمي واضح للعناوين والخطوط العربية',
      'تباين لوني يحقق معايير القراءة المريحة',
      'تجربة مستخدم مدروسة تحوّل الزوار إلى عملاء',
    ],
  },
  {
    id: 'quality',
    index: '03',
    title: 'الجودة والهندسة الدقيقة',
    subtitle: 'بنية قابلة للتوسع والاعتماد',
    description:
      'نهتم بأدق التفاصيل لنقدم أفضل تجربة من خلال كتابة شيفرة نظيفة، اختبارات استقرار، وإتاحة شاملة للجميع.',
    metricValue: '99.9%',
    metricContext: 'جاهزية وثبات تشغيلي في بيئات الإنتاج',
    highlights: [
      'كود منظم وقابل للتطوير المستقبلي بسهولة',
      'التزام بمعايير الوصول ولوحة المفاتيح',
      'حماية عالية وأفضل ممارسات الويب الحديثة',
    ],
  },
];

export function NovaServices() {
  const [selectedId, setSelectedId] = useState<string>('speed');
  const active =
    CAPABILITIES.find((item) => item.id === selectedId) ?? CAPABILITIES[0];

  return (
    <section
      id="services"
      className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-14 space-y-3"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
          ماذا نقدم؟
        </h2>
        <p className="text-base text-[#A1A1B5]">
          نقدم لك تجربة رقمية بمستوى مختلف تجمع بين الأداء، الجمال، والاعتمادية.
        </p>
      </motion.div>

      {/* Asymmetric Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Right Column (RTL): Interactive Numbered Capability List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {CAPABILITIES.map((cap, idx) => {
            const isSelected = cap.id === selectedId;
            return (
              <motion.button
                key={cap.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ x: -4 }}
                onClick={() => setSelectedId(cap.id)}
                className={`text-right rounded-2xl border p-6 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35C9FF] ${
                  isSelected
                    ? 'border-[#9B5CFF]/70 bg-gradient-to-br from-[#17182E] to-[#101122]'
                    : 'border-white/[0.08] bg-[#0E101E] hover:border-white/20'
                }`}
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    {cap.index}. {cap.title}
                  </h3>
                  <span
                    className={`text-xs font-mono tabular-nums ${
                      isSelected ? 'text-[#35C9FF]' : 'text-[#737793]'
                    }`}
                  >
                    {cap.metricValue}
                  </span>
                </div>
                <p className="text-sm text-[#A1A1B5] leading-relaxed">
                  {cap.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Left Column (RTL): Featured Interactive Detail Surface */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#13152A] to-[#0B0C18] p-7 sm:p-10 flex flex-col justify-between gap-8"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-xs font-semibold text-[#35C9FF] mb-1">
                  {active.subtitle}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {active.index}. {active.title}
                </h3>
              </div>
              <div className="text-left">
                <span className="block font-mono text-2xl font-bold text-white tabular-nums">
                  {active.metricValue}
                </span>
                <span className="block text-xs text-[#94A3B8]">
                  {active.metricContext}
                </span>
              </div>
            </div>

            <p className="text-base text-[#CBD5E1] leading-relaxed">
              {active.description}
            </p>

            <ul className="space-y-3 pt-2">
              {active.highlights.map((line, i) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-sm sm:text-base text-[#E2E8F0]"
                >
                  <span className="font-mono text-xs text-[#9B5CFF] pt-1 tabular-nums">
                    0{i + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Geometric Visual Accent Frame */}
          <div className="relative h-28 w-full overflow-hidden rounded-xl border border-white/[0.07] bg-[#080914] flex items-center justify-between px-6">
            <div className="space-y-1">
              <span className="block text-xs text-[#94A3B8]">معيار التنفيذ</span>
              <span className="block font-display text-sm font-semibold text-white">
                من الفكرة الأولى حتى الإطلاق الكامل
              </span>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 180 64"
              className="h-12 w-36 shrink-0"
            >
              <path
                d="M8 48 Q45 12 88 34 T172 16"
                fill="none"
                stroke="#35C9FF"
                strokeWidth="2.5"
              />
              <circle cx="88" cy="34" r="4.5" fill="#9B5CFF" />
              <circle cx="172" cy="16" r="4.5" fill="#35C9FF" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
