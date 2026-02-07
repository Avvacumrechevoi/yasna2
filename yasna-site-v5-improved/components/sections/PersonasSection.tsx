"use client";
import { personas } from "@/lib/data";
import { useSignupModal } from "@/components/forms/SignupModalContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function PersonasSection() {
  const { openModal } = useSignupModal();

  return (
    <section id="personas" className="relative z-10 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-6">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">Для кого</div>
            <h2 className="font-serif text-[28px] font-bold text-[#141C28]">Вы здесь, если:</h2>
            <p className="text-sm text-[#6B7280] mt-1">Найдите себя среди наших участников</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {personas.map((p, i) => (
            <AnimateOnScroll key={i} delay={i * 80}>
              <div className="p-5 rounded-[20px] bg-white/60 border border-gold/[0.05] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md h-full">
                <div className="text-[28px] mb-2.5">{p.emoji}</div>
                <div className="text-[14px] font-semibold text-[#141C28] mb-1.5 leading-snug">{p.headline}</div>
                <div className="text-[12.5px] text-[#6B7280] leading-relaxed mb-2.5">{p.description}</div>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-lg bg-gold/[0.06] text-gold-dark font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll delay={500}>
          <div className="text-center mt-6">
            <button
              onClick={() => openModal("personas")}
              className="text-[14px] text-gold-dark font-semibold hover:text-gold-dark transition-colors"
            >
              Не нашли себя? Расскажем лично →
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
