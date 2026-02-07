"use client";
import { personas } from "@/lib/data";
import { useSignupModal } from "@/components/forms/SignupModalContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function PersonasSection() {
  const { openModal } = useSignupModal();

  return (
    <section id="personas" className="relative z-10 px-6 py-14">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-9">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">
              Участники
            </div>
            <h2 className="font-serif text-[28px] md:text-[34px] font-bold text-[#141C28]">
              Кому подойдёт Ясна
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {personas.map((p, i) => (
            <AnimateOnScroll key={i} delay={i * 70}>
              <div
                className="group relative flex gap-4 p-5 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 h-full overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Color accent bar */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-300 group-hover:top-2 group-hover:bottom-2"
                  style={{ background: p.color }}
                />

                {/* Content */}
                <div className="pl-2.5 flex-1 min-w-0">
                  <h3
                    className="text-[15px] font-bold mb-1.5 leading-snug"
                    style={{ color: p.color }}
                  >
                    {p.headline}
                  </h3>
                  <p className="text-[13px] text-[#4B5563] leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10.5px] px-2.5 py-1 rounded-lg font-medium"
                        style={{
                          background: `${p.color}08`,
                          color: p.color,
                          border: `1px solid ${p.color}12`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={450}>
          <div className="text-center mt-8">
            <button
              onClick={() => openModal("personas")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                color: "#7A5F3A",
                background: "rgba(155,123,79,0.06)",
                border: "1px solid rgba(155,123,79,0.12)",
              }}
            >
              Не нашли себя? Расскажем лично
              <span className="text-gold">→</span>
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
