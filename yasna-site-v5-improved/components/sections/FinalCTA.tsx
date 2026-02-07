"use client";
import { useSignupModal } from "@/components/forms/SignupModalContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function FinalCTA() {
  const { openModal } = useSignupModal();

  return (
    <section id="join" className="relative z-10 px-6 pb-20">
      <AnimateOnScroll>
        <div
          className="max-w-xl mx-auto text-center rounded-3xl p-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1A2332 0%, #2B4570 100%)",
            boxShadow: "0 20px 60px rgba(26,35,50,0.2)",
          }}
        >
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
            <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <circle cx="200" cy="100" r="80" fill="none" stroke="#C8A882" strokeWidth="0.5" />
              <circle cx="200" cy="100" r="50" fill="none" stroke="#C8A882" strokeWidth="0.3" />
              <line x1="200" y1="20" x2="200" y2="180" stroke="#C8A882" strokeWidth="0.3" />
              <line x1="120" y1="100" x2="280" y2="100" stroke="#C8A882" strokeWidth="0.3" />
            </svg>
          </div>
          <div className="relative">
            <div className="text-[11px] text-gold-light tracking-[0.2em] uppercase mb-3">Начните сегодня</div>
            <h2 className="font-serif text-[26px] font-bold text-white mb-3">
              Сделайте первый шаг<br />
              <span className="text-gold-light">Поможем найти ваше направление</span>
            </h2>
            <p className="text-[14px] text-white/50 mb-7 leading-relaxed">
              Оставьте заявку — координатор свяжется с вами<br />в течение 2–3 дней и подскажет, с чего начать
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => openModal("final-cta")}
                className="px-8 py-3.5 rounded-xl text-[14px] font-semibold text-[#141C28] transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #C8A882, #D4B896)",
                  boxShadow: "0 4px 16px rgba(200,168,130,0.25)",
                }}
              >
                Оставить заявку
              </button>
              <a
                href="https://t.me/russkaya_yasna"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl text-[14px] font-semibold text-white/70 border border-white/15 transition-all hover:scale-105 hover:border-white/25 active:scale-95 no-underline"
              >
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
