"use client";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const items = [
  {
    icon: "🔎",
    title: "Исследование",
    desc: "Не лекции, а совместный разбор. Берём слово или объект, прослеживаем его до первоисточника, проверяем гипотезу — вместе.",
    example: "«Утро → утроба → рождение»: один разбор — и вы начинаете видеть язык иначе",
  },
  {
    icon: "🔗",
    title: "Связи",
    desc: "Находим общую структуру в разных явлениях: в языке, в архитектуре, в календаре. Ясна позволяет «разложить по полочкам» любое явление.",
    example: "Как устройство суток связано с архитектурой Кремля? Разбираем по 12 граням",
  },
  {
    icon: "📐",
    title: "Практика",
    desc: "Выходим в город, читаем фасады, сверяем карты, ведём собственные заметки. Пишем тексты, проводим праздники, наблюдаем небо.",
    example: "Натурные уроки, читательские клубы, бальные вечера, этимологические мастерские",
  },
];

export default function MethodSection() {
  return (
    <section id="method" className="relative z-10 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-7">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">Метод</div>
            <h2 className="font-serif text-[28px] font-bold text-[#141C28]">Как мы работаем</h2>
          </div>
        </AnimateOnScroll>
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((s, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="flex-1 min-w-[220px] max-w-[260px] p-6 rounded-[22px] bg-white/55 border border-gold/[0.05] backdrop-blur-sm">
                <div className="text-[32px] mb-2">{s.icon}</div>
                <div className="text-[15px] font-semibold mb-1.5">{s.title}</div>
                <div className="text-[13px] text-[#4B5563] leading-relaxed mb-3">{s.desc}</div>
                <div className="text-[11.5px] text-gold/80 leading-relaxed border-t border-gold/[0.08] pt-2.5 italic">
                  {s.example}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
