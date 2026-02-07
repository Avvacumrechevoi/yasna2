"use client";
import { useState } from "react";
import { testimonials } from "@/lib/data";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="relative z-10 px-6 py-10" aria-label="Отзывы участников">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-6">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">Истории</div>
            <h2 className="font-serif text-[28px] font-bold text-[#141C28]">Участники о нас</h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {visible.map((t, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="p-5 rounded-[22px] bg-white/70 border border-gold/[0.05] backdrop-blur-sm flex flex-col h-full">
                {/* Avatar + Name header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${t.directionColor}, ${t.directionColor}bb)`,
                    }}
                    aria-hidden="true"
                  >
                    {t.name[0]}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[13px] font-semibold text-[#141C28]">{t.name}</span>
                    <span className="text-[11px] text-[#6B7280]">, {t.profession}</span>
                    <div className="text-[10px] text-gold-dark mt-0.5">✦ {t.achievement}</div>
                  </div>
                </div>

                <p className="font-serif text-[15px] italic text-[#1F2937] leading-relaxed mb-4 flex-1">
                  «{t.quote}»
                </p>

                <div className="flex gap-1.5 mb-2">
                  <div className="flex-1 p-2.5 rounded-lg bg-red-50/50">
                    <div className="text-[8px] text-red-500 font-bold uppercase tracking-wider mb-0.5">Было</div>
                    <div className="text-[11px] text-[#4B5563] leading-snug">{t.before}</div>
                  </div>
                  <div className="flex-1 p-2.5 rounded-lg bg-green-50/50">
                    <div className="text-[8px] text-green-600 font-bold uppercase tracking-wider mb-0.5">Стало</div>
                    <div className="text-[11px] text-[#4B5563] leading-snug">{t.after}</div>
                  </div>
                </div>

                <span
                  className="self-start text-[9px] px-2 py-0.5 rounded-lg font-semibold"
                  style={{ background: `${t.directionColor}0C`, color: t.directionColor }}
                >
                  {t.direction}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {testimonials.length > 3 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[13px] text-gold-dark font-semibold hover:text-gold-dark transition-colors"
            >
              {showAll ? "Скрыть" : `Ещё ${testimonials.length - 3} отзыва →`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
