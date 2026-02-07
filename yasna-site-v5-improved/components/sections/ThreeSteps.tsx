"use client";
import { useSignupModal } from "@/components/forms/SignupModalContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function ThreeSteps() {
  const { openModal } = useSignupModal();
  const steps = [
    { num: "I", title: "Выберите", desc: "Найдите направление, которое откликается. Начать можно с любого — они связаны между собой.", icon: "🧭" },
    { num: "II", title: "Познакомьтесь", desc: "Подпишитесь на Telegram-канал, почитайте материалы, приходите на открытую встречу.", icon: "👀" },
    { num: "III", title: "Вступайте", desc: "Оставьте заявку — координатор добавит вас в рабочую группу в течение 2–3 дней.", icon: "🤝" },
  ];

  return (
    <section id="steps" className="relative z-10 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-2">Путь</div>
            <h2 className="font-serif text-3xl font-bold text-[#141C28]">Как начать</h2>
          </div>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <AnimateOnScroll key={i} delay={i * 120}>
              <div className="text-center p-7 rounded-2xl bg-white/60 border border-gold/[0.06] backdrop-blur-sm">
                <div className="text-[32px] mb-2">{step.icon}</div>
                <div className="font-serif text-3xl font-bold text-gold mb-2">{step.num}</div>
                <h3 className="text-[15px] font-bold text-[#141C28] mb-2">{step.title}</h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">{step.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll delay={400}>
          <div className="text-center mt-8">
            <button
              onClick={() => openModal("steps-cta")}
              className="px-8 py-3.5 rounded-xl text-[14px] font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #9B7B4F, #7A5F3A)", boxShadow: "0 4px 16px rgba(155,123,79,0.3)" }}
            >
              Оставить заявку
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
