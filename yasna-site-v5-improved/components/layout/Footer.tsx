"use client";
import { directions } from "@/lib/data";
import Link from "next/link";
import { useSignupModal } from "@/components/forms/SignupModalContext";

const socials = [
  { label: "Telegram", href: "https://t.me/russkaya_yasna", emoji: "✈️" },
  { label: "ВКонтакте", href: "https://vk.com/russkaya_yasna", emoji: "💬" },
  { label: "Дзен", href: "https://dzen.ru/russkaya_yasna", emoji: "📰" },
  { label: "YouTube", href: "https://youtube.com/@russkaya_yasna", emoji: "▶️" },
];

export default function Footer() {
  const { openModal } = useSignupModal();

  return (
    <footer className="relative z-10 border-t border-gold/[0.08]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div>
            <div className="font-serif text-lg font-bold text-gold-dark">Русская Ясна</div>
            <div className="text-xs text-[#6B7280] mt-1 mb-4">
              Открытое сообщество исследователей русского языка, истории и культуры. 8 направлений, 900+ участников, от этимологии слов до астрономии Кремля.
            </div>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gold/[0.06] flex items-center justify-center text-[14px] hover:bg-gold/[0.12] transition-colors no-underline"
                  aria-label={s.label}
                >
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Directions */}
          <div>
            <div className="text-[13px] font-semibold text-[#374151] mb-3">Направления</div>
            <div className="flex flex-col gap-1.5">
              {directions.map((d) => (
                <Link
                  key={d.id}
                  href={`/${d.slug}`}
                  className="text-[13px] text-[#6B7280] hover:text-gold transition-colors no-underline"
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Participation */}
          <div>
            <div className="text-[13px] font-semibold text-[#374151] mb-3">Участие</div>
            <div className="flex flex-col gap-1.5">
              {[
                ["#about", "О проекте"],
                ["#directions", "Направления"],
                ["#faq", "Частые вопросы"],
              ].map(([href, label]) => (
                <a key={label} href={href} className="text-[13px] text-[#6B7280] hover:text-gold transition-colors no-underline">
                  {label}
                </a>
              ))}
              <button
                onClick={() => openModal("footer")}
                className="text-[13px] text-gold font-semibold text-left hover:text-gold-dark transition-colors"
              >
                Оставить заявку →
              </button>
            </div>
          </div>

          {/* Col 4: CTA card */}
          <div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-gold/[0.06] to-gold/[0.02] border border-gold/[0.08]">
              <div className="text-[14px] font-semibold text-[#374151] mb-2">Есть вопросы?</div>
              <div className="text-[13px] text-[#6B7280] mb-3">Напишите нам — поможем с выбором направления</div>
              <a
                href="https://t.me/russkaya_yasna"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#229ED9]/10 text-[#229ED9] text-[13px] font-semibold hover:bg-[#229ED9]/15 transition-colors no-underline"
              >
                ✈️ Написать в Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="h-px bg-gold/[0.06] mb-5" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-[#6B7280]/60">
            © 2026 Русская Ясна. Все права защищены.
          </div>
          <div className="text-xs text-[#6B7280]/40">
            Сделано с ❤️ для сохранения культуры
          </div>
        </div>
      </div>
    </footer>
  );
}
