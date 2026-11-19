import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { motion } from 'motion/react';

const PROJECT_TYPES = [
  'موقع تعريفي',
  'منصة ويب تفاعلية',
  'تصميم هوية وتجربة مستخدم',
  'تحسين الأداء والسرعة',
];

export function NovaContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setError('يرجى إدخال الاسم.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }
    if (trimmedMessage.length < 8) {
      setError('يرجى كتابة نبذة مختصرة عن مشروعك (8 أحرف على الأقل).');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-5"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            جاهز تبدأ؟
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1B5] leading-relaxed">
            خلينا نصنع حاجة مميزة مع بعض. شاركنا تفاصيل فكرتك وسنتواصل معك
            لتحويلها إلى منتج رقمي متكامل.
          </p>

          <div className="pt-2">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#35C9FF] hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>hello@example.com</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#13152A] to-[#0B0C18] p-6 sm:p-9"
        >
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#4ADE80]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                تم استلام رسالتك بنجاح
              </h3>
              <p className="mx-auto max-w-md text-sm text-[#B4B6C9]">
                شكراً لتواصلك يا {name}. سنراجع تفاصيل مشروعك ({projectType})
                ونرد عليك عبر {email} في أقرب وقت.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:border-[#35C9FF] transition-colors"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="nova-name"
                    className="block text-sm font-semibold text-[#E2E8F0]"
                  >
                    الاسم
                  </label>
                  <input
                    id="nova-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اكتب اسمك الكامل"
                    className="w-full rounded-xl border border-white/15 bg-[#080914] px-4 py-3 text-sm text-white placeholder-[#64748B] focus:border-[#35C9FF] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="nova-email"
                    className="block text-sm font-semibold text-[#E2E8F0]"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    id="nova-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-white/15 bg-[#080914] px-4 py-3 text-sm text-white placeholder-[#64748B] focus:border-[#35C9FF] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-sm font-semibold text-[#E2E8F0]">
                  نوع المشروع
                </span>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => {
                    const isActive = projectType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-[#7C3AED] text-white'
                            : 'border border-white/10 bg-[#080914] text-[#CBD5E1] hover:border-white/25'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="nova-message"
                  className="block text-sm font-semibold text-[#E2E8F0]"
                >
                  تفاصيل المشروع
                </label>
                <textarea
                  id="nova-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="أخبرنا عن فكرتك أو ما ترغب في بنائه..."
                  className="w-full rounded-xl border border-white/15 bg-[#080914] px-4 py-3 text-sm text-white placeholder-[#64748B] focus:border-[#35C9FF] focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-sm font-medium text-[#F87171]"
                >
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.14 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#8D4FFF] to-[#258DFF] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(135,79,255,0.35)] hover:shadow-[0_0_40px_rgba(56,213,255,0.45)] transition-shadow whitespace-nowrap"
              >
                <Send className="h-4 w-4" />
                <span>تواصل معنا</span>
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
