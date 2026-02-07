"use client";

import { useState } from "react";
import Link from "next/link";
import { directions } from "@/lib/data";
import { useSignupModal } from "@/components/forms/SignupModalContext";
import SignupModal from "@/components/forms/SignupModal";

import {
  CONTENT_TYPE_COLORS as TYPE_COLORS,
  CONTENT_TYPE_EMOJI as TYPE_EMOJI,
  LINK_ICON_COLORS as IC_COLORS,
  LINK_ICON_EMOJI as IC_EMOJI,
} from "@/lib/constants";

function FaqBlock({ items, color }: { items: { q: string; a: string }[]; color: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const open = openIdx === i;
        return (
          <div key={i} className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{ background: open ? "#fff" : "rgba(255,255,255,0.55)", border: open ? `1px solid ${color}20` : "1px solid rgba(0,0,0,0.04)" }}>
            <button onClick={() => setOpenIdx(open ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left group">
              <span className="text-[15px] font-semibold text-[#1F2937]">{f.q}</span>
              <span className="text-lg shrink-0 ml-3 transition-transform duration-300"
                style={{ color, transform: open ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            <div className="overflow-hidden transition-all duration-400"
              style={{ maxHeight: open ? 300 : 0, opacity: open ? 1 : 0 }}>
              <p className="px-6 pb-5 text-[14.5px] text-[#4B5563] leading-[1.75]">{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionHeader({ title, subtitle, color }: { title: string; subtitle?: string; color: string }) {
  return (
    <div className="mb-7">
      {subtitle && <div className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color }}>{subtitle}</div>}
      <h2 className="text-[26px] md:text-[30px] font-bold font-serif text-[#141C28] leading-tight">{title}</h2>
    </div>
  );
}

export default function DirectionPageClient({ slug }: { slug: string }) {
  const d = directions.find((dir) => dir.slug === slug);
  const [tab, setTab] = useState<"about" | "articles" | "resources">("about");
  const { openModal } = useSignupModal();

  if (!d) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4]">
      <div className="text-center">
        <p className="text-xl font-semibold text-[#1F2937]">Направление не найдено</p>
        <Link href="/" className="mt-4 inline-block text-[#8B6914] underline">← На главную</Link>
      </div>
    </div>
  );

  const related = directions.filter((r) => d.relatedSlugs.includes(r.slug));

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1F2937]">
      <SignupModal />
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#FAF8F4]/92 backdrop-blur-xl border-b border-black/[0.05]">
        <div className="max-w-[900px] mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold font-serif text-[#6B5530] hover:text-[#8B6914] transition-colors">
            ← Русская Ясна
          </Link>
          <button
            onClick={() => openModal("direction-header-" + d.slug)}
            className="px-4 py-2 rounded-full text-[13px] font-semibold text-white transition-all hover:-translate-y-px"
            style={{ background: `linear-gradient(135deg,${d.color},${d.color}cc)` }}>
            Присоединиться
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg,${d.color}08,${d.color}03,#FAF8F4)` }}>
        <div className="absolute right-0 top-0 w-[350px] h-[350px] opacity-[0.04] pointer-events-none" style={{ transform: "translate(25%,-15%)" }}>
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="200" cy="200" r="160" fill="none" stroke={d.color} strokeWidth="0.6" />
            <circle cx="200" cy="200" r="100" fill="none" stroke={d.color} strokeWidth="0.3" strokeDasharray="4 10" />
          </svg>
        </div>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 pt-8 pb-10 relative">
          <nav className="flex items-center gap-2 text-[12.5px] text-[#9CA3AF] mb-7">
            <Link href="/" className="hover:text-[#6B5530] transition-colors">Главная</Link>
            <span className="text-[10px]">›</span>
            <span className="font-semibold" style={{ color: d.color }}>{d.name}</span>
          </nav>
          <div className="flex items-center gap-5 mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.logo} alt={d.name} className="w-20 h-20 rounded-[22px] object-cover bg-white shrink-0"
              style={{ border: `2px solid ${d.color}18`, boxShadow: `0 8px 30px ${d.color}10` }} />
            <div>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <h1 className="text-[32px] md:text-[42px] font-bold font-serif leading-[1.1] text-[#141C28]">{d.name}</h1>
                {d.subtitle && <span className="text-[17px] font-semibold" style={{ color: d.color }}>{d.subtitle}</span>}
              </div>
              <p className="mt-2 text-[17px] text-[#4B5563] leading-relaxed">{d.tagline}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {[d.category, d.format].map((t, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-[13px] font-medium bg-white/65 border border-black/[0.06] text-[#374151]">
                {["◆", "📍"][i]} {t}
              </span>
            ))}
          </div>
        </div>
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${d.color},${d.color}35,transparent)` }} />
      </section>

      {/* TABS */}
      <div className="max-w-[900px] mx-auto px-5 md:px-8 pt-5 flex gap-2 flex-wrap">
        {([
          { id: "about" as const, label: "О направлении", count: 0 },
          { id: "articles" as const, label: "Материалы", count: d.articles.length },
          { id: "resources" as const, label: "Ресурсы", count: d.links.length },
        ]).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-5 py-2.5 rounded-[14px] text-[14px] font-medium transition-all"
            style={{
              fontWeight: tab === t.id ? 700 : 500,
              color: tab === t.id ? "#fff" : d.color,
              background: tab === t.id ? d.color : "transparent",
              border: `1.5px solid ${tab === t.id ? d.color : d.color + "30"}`,
            }}>
            {t.label}
            {t.count > 0 && <span className="ml-1.5 text-[11px] opacity-70">({t.count})</span>}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8 md:py-12 space-y-12">

        {/* ═══ ABOUT TAB ═══ */}
        {tab === "about" && <>
          <section>
            <SectionHeader title="О направлении" color={d.color} />
            {d.about.map((p, i) => <p key={i} className="text-[15.5px] text-[#374151] leading-[1.8] mb-3">{p}</p>)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
              {[{ l: "Миссия", t: d.mission }, { l: "Уникальность", t: d.uniqueness }].map((c, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/80 border border-black/[0.04]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-1.5 h-7 rounded-full" style={{ background: d.color }} />
                    <p className="text-[14px] font-bold text-[#1F2937]">{c.l}</p>
                  </div>
                  <p className="text-[14.5px] text-[#4B5563] leading-[1.7]">{c.t}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Для кого" subtitle="Аудитория" color={d.color} />
            <div className="space-y-3">
              {d.forWhom.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/65 border border-black/[0.03]">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[13px] font-bold text-white"
                    style={{ background: `${d.color}dd` }}>{i + 1}</div>
                  <p className="text-[15px] text-[#374151] leading-[1.7] pt-1.5">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Чем занимаемся" subtitle="Практика" color={d.color} />
            <div className="space-y-2">
              {d.activities.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/65 border border-black/[0.03]">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: d.color }} />
                  <p className="text-[15px] text-[#374151] leading-[1.7]">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {d.stories.length > 0 && <section>
            <SectionHeader title="Результаты" subtitle="Истории" color={d.color} />
            <div className="space-y-5">
              {d.stories.map((s, i) => (
                <div key={i} className="rounded-2xl bg-white border border-black/[0.04] overflow-hidden"
                  style={{ boxShadow: `0 4px 24px ${d.color}06` }}>
                  <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${d.color},${d.color}33,transparent)` }} />
                  <div className="p-7">
                    <p className="text-[20px] italic text-[#374151] leading-relaxed font-serif mb-5">«{s.quote}»</p>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center text-[15px] font-bold text-white"
                        style={{ background: `linear-gradient(135deg,${d.color},${d.color}bb)` }}>{s.name[0]}</div>
                      <div>
                        <p className="text-[15px] font-semibold text-[#1F2937]">{s.name}</p>
                        <p className="text-[13px] text-[#6B7280]">{s.role}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
                      <div className="p-4 rounded-xl bg-[#FAF8F4]">
                        <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-2">До</span>
                        <span className="text-[14px] text-[#4B5563] leading-relaxed">{s.before}</span>
                      </div>
                      <div className="flex items-center"><span className="text-[20px]" style={{ color: d.color }}>→</span></div>
                      <div className="p-4 rounded-xl" style={{ background: `${d.color}05`, border: `1px solid ${d.color}15` }}>
                        <span className="text-[11px] font-bold uppercase tracking-wider block mb-2" style={{ color: d.color }}>После</span>
                        <span className="text-[14px] text-[#374151] font-medium leading-relaxed">{s.after}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>}

          <section>
            <SectionHeader title="Частые вопросы" color={d.color} />
            <FaqBlock items={d.faq} color={d.color} />
          </section>
        </>}

        {/* ═══ ARTICLES TAB ═══ */}
        {tab === "articles" && <section>
          <h2 className="text-[28px] font-bold font-serif text-[#141C28] mb-2">Материалы и публикации</h2>
          <p className="text-[14.5px] text-[#6B7280] mb-7">Статьи, видео и гайды направления</p>
          {d.articles.length > 0 ? (
            <div className="space-y-3">
              {d.articles.map((art, i) => {
                const tc = TYPE_COLORS[art.type] || d.color;
                return (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-black/[0.04] cursor-pointer transition-all hover:shadow-md hover:-translate-y-px">
                    <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0 text-[20px]"
                      style={{ background: `${tc}10`, border: `1px solid ${tc}20` }}>
                      {TYPE_EMOJI[art.type] || "📄"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold"
                          style={{ color: tc, background: `${tc}10` }}>{art.type}</span>
                        {art.duration && <span className="text-[12px] text-[#9CA3AF]">{art.duration}</span>}
                      </div>
                      <h3 className="text-[15.5px] font-semibold text-[#1F2937] leading-snug">{art.title}</h3>
                      <p className="text-[12.5px] text-[#9CA3AF] mt-1">{art.date}</p>
                    </div>
                    <span className="text-[18px] self-center opacity-40" style={{ color: d.color }}>→</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-[#9CA3AF]">Материалы скоро появятся</div>
          )}
        </section>}

        {/* ═══ RESOURCES TAB ═══ */}
        {tab === "resources" && <section>
          <h2 className="text-[28px] font-bold font-serif text-[#141C28] mb-2">Ресурсы направления</h2>
          <p className="text-[14.5px] text-[#6B7280] mb-7">Каналы и площадки «{d.name}»</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {d.links.map((lk, i) => {
              const ic = IC_COLORS[lk.icon] || "#8B6914";
              return (
                <a key={i} href={lk.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-black/[0.05] no-underline transition-all hover:shadow-md hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-[18px]"
                    style={{ background: `${ic}12` }}>
                    {IC_EMOJI[lk.icon]}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#1F2937]">{lk.label}</p>
                    <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                      {lk.url.replace("https://", "").split("/").slice(0, 2).join("/")}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>}

        {/* ═══ RELATED (always visible) ═══ */}
        {related.length > 0 && (
          <section>
            <h2 className="text-[28px] font-bold font-serif text-[#141C28] mb-5">Связанные направления</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link key={r.id} href={`/${r.slug}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/75 border border-black/[0.04] hover:shadow-md hover:-translate-y-0.5 transition-all no-underline group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.logo} alt={r.name} className="w-12 h-12 rounded-xl object-cover bg-white shrink-0" />
                  <div>
                    <p className="text-[15px] font-semibold text-[#1F2937] group-hover:text-[#8B6914] transition-colors">{r.name}</p>
                    <p className="text-[13px] text-[#6B7280] mt-0.5 leading-snug">{r.tagline.slice(0, 50)}…</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ═══ FINAL CTA ═══ */}
        <section className="rounded-3xl text-center overflow-hidden relative"
          style={{ background: "linear-gradient(135deg,#141C28,#1E3A5F)" }}>
          <div className="relative p-10 md:p-14">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.logo} alt="" className="w-16 h-16 rounded-2xl mx-auto mb-4 border-2 border-white/10" />
            <h3 className="text-[28px] font-bold text-white font-serif mb-3">Присоединяйтесь к «{d.name}»</h3>
            <p className="text-[15px] text-white/50 mb-7">Начните с подписки — это бесплатно</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => openModal("direction-bottom-" + d.slug)}
                className="px-8 py-4 rounded-2xl text-[14px] font-semibold text-[#141C28] bg-gradient-to-br from-[#C8A882] to-[#D4B896] hover:-translate-y-px transition-all no-underline">
                Оставить заявку
              </button>
              <a href={d.telegramUrl} target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl text-[14px] font-semibold text-white/55 border border-white/12 hover:text-white/75 transition-all no-underline">
                Написать в Telegram
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.05] mt-5">
        <div className="max-w-[900px] mx-auto px-5 md:px-8 py-5 flex justify-between items-center">
          <span className="text-[14px] font-bold font-serif text-[#6B5530]">
            Русская Ясна <span className="text-[11px] text-[#6B7280] font-normal font-sans">© 2026</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
