"use client";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const items = [
  {
    num: "01",
    title: "Исследование",
    desc: "Не лекции, а совместный разбор. Берём слово или объект, прослеживаем его до первоисточника, проверяем гипотезу — вместе.",
    example: "«Утро → утроба → рождение»: один разбор — и вы начинаете видеть язык иначе",
    color: "#9B7B4F",
  },
  {
    num: "02",
    title: "Связи",
    desc: "Находим общую структуру в разных явлениях: в языке, в архитектуре, в календаре. Ясна позволяет «разложить по полочкам» любое явление.",
    example: "Как устройство суток связано с архитектурой Кремля? Разбираем по 12 граням",
    color: "#2B4570",
  },
  {
    num: "03",
    title: "Практика",
    desc: "Выходим в город, читаем фасады, сверяем карты, ведём собственные заметки. Пишем тексты, проводим праздники, наблюдаем небо.",
    example: "Натурные уроки, читательские клубы, бальные вечера, этимологические мастерские",
    color: "#1B8A7A",
  },
];

export default function MethodSection() {
  return (
    <section id="method" className="relative z-10 px-6 py-14">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">
              Метод
            </div>
            <h2 className="font-serif text-[28px] md:text-[34px] font-bold text-[#141C28]">
              Как мы работаем
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Vertical timeline layout */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute left-[39px] top-6 bottom-6 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(155,123,79,0.15) 15%, rgba(155,123,79,0.15) 85%, transparent)",
            }}
          />

          <div className="flex flex-col gap-5">
            {items.map((s, i) => (
              <AnimateOnScroll key={i} delay={i * 120}>
                <div className="group relative flex gap-5 md:gap-7 items-start">
                  {/* Number badge */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="w-[78px] h-[78px] rounded-2xl flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${s.color}12, ${s.color}06)`,
                        border: `1.5px solid ${s.color}18`,
                      }}
                    >
                      <span
                        className="font-serif text-[24px] font-bold leading-none"
                        style={{ color: s.color }}
                      >
                        {s.num}
                      </span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 min-w-0 pb-1">
                    <div
                      className="rounded-2xl p-5 md:p-6 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(155,123,79,0.06)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2.5">
                        <h3
                          className="text-[17px] font-bold"
                          style={{ color: s.color }}
                        >
                          {s.title}
                        </h3>
                        <div
                          className="hidden sm:block h-px flex-1"
                          style={{
                            background: `linear-gradient(90deg, ${s.color}15, transparent)`,
                          }}
                        />
                      </div>
                      <p className="text-[14px] text-[#374151] leading-[1.7] mb-3">
                        {s.desc}
                      </p>
                      <div
                        className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl"
                        style={{
                          background: `${s.color}06`,
                          border: `1px solid ${s.color}0a`,
                        }}
                      >
                        <span
                          className="text-[12px] mt-px flex-shrink-0"
                          style={{ color: s.color }}
                        >
                          ✦
                        </span>
                        <p
                          className="text-[12.5px] leading-relaxed italic"
                          style={{ color: `${s.color}cc` }}
                        >
                          {s.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
