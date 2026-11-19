import { motion } from 'motion/react';

const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'استكشاف الفكرة',
    detail: 'نحلل أهداف المشروع واحتياجات المستخدمين لبناء تصور واضح قبل البدء.',
  },
  {
    number: '02',
    title: 'التصميم والتطوير',
    detail: 'نحول الفكرة إلى واجهات حديثة وشيفرة متقنة تركز على السرعة والبساطة.',
  },
  {
    number: '03',
    title: 'الإطلاق والمتابعة',
    detail: 'نطلق التجربة بأعلى جودة ونواصل التحسين لضمان استمرارية النجاح.',
  },
];

export function NovaAbout() {
  return (
    <section
      id="about"
      className="border-y border-white/[0.08] bg-white/[0.02] py-20 sm:py-28 px-5 sm:px-8"
    >
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-5"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            من نحن؟
          </h2>
          <p className="text-base sm:text-lg text-[#B4B6C9] leading-[1.9]">
            نحن NOVA، نؤمن بأن كل فكرة عظيمة تبدأ بخطوة. هدفنا تقديم تجربة مميزة
            تجمع بين البساطة والجمال والتكنولوجيا الحديثة لصناعة منتجات رقمية
            تترك أثراً حقيقياً.
          </p>
        </motion.div>

        <div className="lg:col-span-7 divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
          {WORKFLOW_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-6 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6"
            >
              <span className="font-mono text-sm font-semibold text-[#35C9FF] tabular-nums shrink-0">
                {step.number}
              </span>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#A1A1B5] leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
