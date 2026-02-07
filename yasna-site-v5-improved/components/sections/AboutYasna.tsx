"use client";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const examples = [
  {
    word: "Утро",
    arrow: "Утроба",
    text: "Утро — рождение дня. Утроба — место, откуда появляется жизнь. Совпадение? Мы проверяем.",
  },
  {
    word: "Восток",
    arrow: "Восторг",
    text: "Восток — восход солнца. Восторг — подъём чувств. Один корень — для подъёма физического и эмоционального.",
  },
  {
    word: "Кремль",
    arrow: "Созвездия",
    text: "Расположение башен Кремля повторяет карту неба. Случайность или замысел? Разбираем вместе.",
  },
];

const whatWeDo = [
  {
    icon: "🔤",
    text: "Разбираем слова — откуда они, что значили раньше и как это меняет понимание",
  },
  {
    icon: "🏛️",
    text: "Гуляем по Москве и Петербургу — читаем то, что зашифровано в зданиях и улицах",
  },
  {
    icon: "📖",
    text: "Перечитываем классику — Пушкин, Гоголь уже не те, когда видишь второй слой",
  },
  {
    icon: "🎄",
    text: "Празднуем осмысленно — Масленица, Купала, Коляда с пониманием настоящего смысла",
  },
];

export default function AboutYasna() {
  return (
    <section id="about" className="relative z-10 px-6 py-14">
      <div className="max-w-3xl mx-auto">
        {/* Hook */}
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">
              О проекте
            </div>
            <h2 className="font-serif text-[28px] md:text-[34px] font-bold text-[#141C28] mb-4">
              В привычных вещах скрыты
              <br />
              <span className="text-gold">неочевидные смыслы</span>
            </h2>
            <p className="text-[15.5px] text-[#4B5563] leading-relaxed max-w-lg mx-auto">
              Русский язык, архитектура городов, народные праздники — в них
              зашифрованы связи, которые мы перестали замечать. Мы их
              исследуем — вместе.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Word examples — the hook that makes it tangible */}
        <AnimateOnScroll delay={100}>
          <div className="mb-10">
            <p className="text-center text-[13px] text-[#6B7280] font-medium mb-5">
              Вот как это работает — на примере слов:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(155,123,79,0.08)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-serif text-[26px] font-bold text-[#141C28]">
                      {ex.word}
                    </span>
                    <span className="text-gold text-[16px]">→</span>
                    <span className="font-serif text-[20px] font-bold text-gold">
                      {ex.arrow}
                    </span>
                  </div>
                  <p className="text-[13.5px] text-[#4B5563] leading-relaxed">
                    {ex.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* What we actually do */}
        <AnimateOnScroll delay={200}>
          <div
            className="p-6 md:p-8 rounded-[24px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,35,50,0.97), rgba(43,69,112,0.97))",
            }}
          >
            <h3 className="font-serif text-[22px] md:text-[24px] font-bold text-white mb-2">
              Чем мы занимаемся
            </h3>
            <p className="text-[14px] text-white/50 mb-6">
              900+ участников, 8 направлений, 10 лет работы
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whatWeDo.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-[20px] flex-shrink-0 mt-0.5">
                    {item.icon}
                  </span>
                  <p className="text-[13.5px] text-white/80 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[13px] text-white/35 mt-5 text-center">
              Это не лекции. Мы не слушаем — мы вместе ищем, проверяем
              первоисточники и делимся находками.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
