"use client";
import { useSignupModal } from "@/components/forms/SignupModalContext";

export default function Hero() {
  const { openModal } = useSignupModal();

  return (
    <section className="relative z-10 px-6 pt-9 pb-2 text-center">
      <div className="max-w-xl mx-auto animate-slideUp">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/[0.04] border border-gold/[0.07] mb-4">
          {/* Mini avatars */}
          <div className="flex -space-x-1.5" aria-hidden="true">
            {["М", "Е", "И"].map((initial, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white border-2 border-[#FAF8F4]"
                style={{
                  background: ["#1B8A7A", "#9A7518", "#3B5EC9"][i],
                }}
              >
                {initial}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-gold-dark tracking-wider uppercase font-semibold">
            900+ участников · 10+ лет
          </span>
        </div>

        <h1 className="font-serif text-[clamp(26px,5vw,44px)] font-bold leading-[1.15] mb-3 text-[#141C28]">
          Откройте скрытые смыслы<br />
          русских слов, городов{" "}<br className="hidden sm:block" />
          <span className="text-gold italic">и праздников</span>
        </h1>

        <p className="text-[15.5px] text-[#4B5563] leading-relaxed mb-5">
          8 направлений для тех, кто хочет понимать русскую культуру глубже.{" "}<br className="hidden sm:block" />
          Присоединяйтесь к сообществу Русская Ясна.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-5">
          <button
            onClick={() => openModal("hero-cta")}
            className="px-7 py-3 rounded-xl text-[14px] font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #9B7B4F, #7A5F3A)",
              boxShadow: "0 4px 16px rgba(155,123,79,0.3)",
            }}
          >
            Оставить заявку
          </button>
          <a
            href="#directions"
            className="px-7 py-3 rounded-xl text-[14px] font-semibold text-[#4B5563] border border-gold/15 hover:border-gold/30 transition-all no-underline"
          >
            Выбрать направление
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {["Бесплатно вступить", "От 1 ч/нед", "Можно просто посмотреть"].map((t, i) => (
            <span
              key={i}
              className="text-[11.5px] text-[#6B7280] px-3.5 py-1 rounded-xl border border-gold/[0.06] bg-white/50"
            >
              {["✦", "⏱", "👀"][i]} {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
