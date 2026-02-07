"use client";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const examples = [
  {
    word: "Утро",
    connection: "Утроба",
    insight: "Утро — рождение нового дня. Мы исследуем связь с «утробой» — местом, откуда появляется жизнь. Случайность или закономерность?",
  },
  {
    word: "Гранит",
    connection: "Грань · Зерно · Знание",
    insight: "«Грызть гранит науки» — привычная фраза. Но почему гранит? Мы ищем связь: грань, зерно, знание — и находим неожиданные пересечения.",
  },
  {
    word: "Восток",
    connection: "Восторг",
    insight: "Восток — откуда восходит солнце. Восторг — подъём чувств. Один корень для физического и эмоционального подъёма. Что ещё скрывает язык?",
  },
];

export default function AboutYasna() {
  return (
    <section id="about" className="relative z-10 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-8">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">
              О чём это
            </div>
            <h2 className="font-serif text-[28px] md:text-[34px] font-bold text-[#141C28] mb-3">
              Что такое Русская Ясна
            </h2>
            <p className="text-[15px] text-[#4B5563] leading-relaxed max-w-xl mx-auto">
              Ясна — способ описания природы, открытый древними славянами. 
              Любое явление можно «разложить по полочкам» — построить его Ясну. 
              Ясная Звезда имеет 12 лучей — 12 граней, через которые явление становится ясным.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Concrete examples */}
        <AnimateOnScroll delay={100}>
          <div className="mb-8">
            <p className="text-center text-[12px] text-[#9CA3AF] font-semibold tracking-wider uppercase mb-4">
              Исследуем связи, которые подсказывает язык
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-5 rounded-[20px] bg-white/70 border border-gold/[0.06] backdrop-blur-sm"
                >
                  <div className="font-serif text-[28px] font-bold text-gold/70 mb-1">
                    {ex.word}
                  </div>
                  <div className="text-[11px] text-gold-dark font-semibold tracking-wide mb-3">
                    → {ex.connection}
                  </div>
                  <p className="text-[13px] text-[#4B5563] leading-relaxed">
                    {ex.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Structure: 3 crosses */}
        <AnimateOnScroll delay={200}>
          <div className="p-6 md:p-8 rounded-[24px] bg-white/50 border border-gold/[0.05]">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* SVG diagram */}
              <div className="w-[180px] h-[180px] flex-shrink-0">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="85" fill="none" stroke="#C8A882" strokeWidth="0.7" opacity="0.2" />
                  {/* 12 rays */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x2 = 100 + 75 * Math.cos(angle);
                    const y2 = 100 + 75 * Math.sin(angle);
                    const crossIdx = i % 3;
                    const colors = ["#9B7B4F", "#1B8A7A", "#2B4570"];
                    return (
                      <line
                        key={i}
                        x1="100" y1="100" x2={x2} y2={y2}
                        stroke={colors[crossIdx]}
                        strokeWidth={1.2}
                        opacity={0.35}
                      />
                    );
                  })}
                  {/* 12 dots at ray ends */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const cx = 100 + 75 * Math.cos(angle);
                    const cy = 100 + 75 * Math.sin(angle);
                    const crossIdx = i % 3;
                    const colors = ["#9B7B4F", "#1B8A7A", "#2B4570"];
                    return (
                      <circle key={i} cx={cx} cy={cy} r="5" fill={colors[crossIdx]} opacity={0.5} />
                    );
                  })}
                  {/* Number labels */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const tx = 100 + 62 * Math.cos(angle);
                    const ty = 100 + 62 * Math.sin(angle);
                    return (
                      <text key={i} x={tx} y={ty} textAnchor="middle" dominantBaseline="central"
                        fontSize="8" fill="#6B7280" fontFamily="Inter,sans-serif" opacity={0.5}>
                        {i}
                      </text>
                    );
                  })}
                  <text x="100" y="97" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="700" fill="#9B7B4F" opacity="0.6">Ясна</text>
                  <text x="100" y="112" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="7" fill="#9CA3AF" letterSpacing="1.5">12 ЛУЧЕЙ</text>
                </svg>
              </div>

              {/* Description */}
              <div className="flex-1 space-y-3">
                <p className="text-[14px] text-[#374151] leading-relaxed">
                  В основе Ясны — структура из 12 элементов, объединённых в три креста. 
                  Эту структуру можно увидеть в устройстве суток, в русском языке, 
                  в архитектуре городов, в календарных праздниках.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Надежда", color: "#9B7B4F", nums: "0·3·6·9" },
                    { name: "Любовь", color: "#1B8A7A", nums: "1·4·7·10" },
                    { name: "Вера", color: "#2B4570", nums: "2·5·8·11" },
                  ].map((c) => (
                    <span
                      key={c.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium"
                      style={{ background: `${c.color}08`, color: c.color, border: `1px solid ${c.color}15` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                      {c.name} ({c.nums})
                    </span>
                  ))}
                </div>
                <p className="text-[12px] text-[#9CA3AF]">
                  Три креста вместе — «Звезда Ясна» или «София» — отражают единство 
                  Веры, Надежды и Любви.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
