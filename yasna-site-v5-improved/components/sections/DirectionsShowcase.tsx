"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { directions, type Direction } from "@/lib/data";
import Link from "next/link";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import {
  LINK_ICON_COLORS as IC_COLORS,
  LINK_ICON_EMOJI as IC_EMOJI,
} from "@/lib/constants";

export default function DirectionsShowcase() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = selected ? directions.find((d) => d.id === selected) : null;

  return (
    <section id="directions" className="relative z-10 px-6 py-14">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">
              Направления
            </div>
            <h2 className="font-serif text-[28px] md:text-[34px] font-bold text-[#141C28] mb-2">
              8 путей исследования
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-md mx-auto">
              От этимологии слов до астрономии Кремля. Выберите то, что
              откликается — направления связаны между собой
            </p>
          </div>
        </AnimateOnScroll>

        {/* Direction cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {directions.map((d, i) => (
            <AnimateOnScroll key={d.id} delay={i * 60}>
              <button
                onClick={() => setSelected(d.id)}
                className="w-full group text-left rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1.5px solid rgba(0,0,0,0.04)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="p-4 md:p-5 flex items-center gap-4">
                  {/* Logo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.logo}
                    alt={d.name}
                    className="w-14 h-14 rounded-2xl object-cover bg-white flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ border: "2px solid rgba(0,0,0,0.06)" }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[17px] font-bold leading-tight truncate text-[#141C28] group-hover:text-gold-dark transition-colors">
                        {d.name}
                      </h3>
                      {d.subtitle && (
                        <span
                          className="text-[11px] font-medium hidden sm:inline"
                          style={{ color: `${d.color}99` }}
                        >
                          {d.subtitle}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-[#6B7280] leading-snug line-clamp-2">
                      {d.tagline}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-lg"
                        style={{
                          background: `${d.color}0a`,
                          color: d.color,
                        }}
                      >
                        {d.category}
                      </span>
                      <span className="text-[11px] text-[#9CA3AF]">
                        {d.participants} · {d.format}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Popup */}
      {active && (
        <DirectionPopup
          direction={active}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

/* ═══ POPUP ═══ */
function DirectionPopup({
  direction: d,
  onClose,
}: {
  direction: Direction;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Focus trap
  const handleTab = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [handleTab]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-[540px] max-h-[85vh] overflow-y-auto rounded-3xl bg-[#FAF8F4] shadow-2xl animate-expandCard"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Направление ${d.name}`}
      >
        {/* Color bar */}
        <div
          className="h-[3px] rounded-t-3xl"
          style={{
            background: `linear-gradient(90deg, ${d.color}, ${d.color}55, transparent)`,
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center bg-black/[0.04] hover:bg-black/[0.08] text-[#6B7280] text-lg z-10 transition-colors"
          aria-label="Закрыть"
        >
          ✕
        </button>

        <div className="p-7 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-5 pr-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.logo}
              alt={d.name}
              className="w-16 h-16 rounded-2xl object-cover bg-white flex-shrink-0"
              style={{
                border: `2px solid ${d.color}20`,
                boxShadow: `0 4px 16px ${d.color}12`,
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-serif text-[28px] font-bold text-[#141C28] leading-tight">
                  {d.name}
                </h3>
                {d.subtitle && (
                  <span
                    className="text-[14px] font-medium"
                    style={{ color: d.color }}
                  >
                    {d.subtitle}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg"
                  style={{ background: `${d.color}0c`, color: d.color }}
                >
                  {d.category}
                </span>
                <span className="text-[12.5px] text-[#6B7280]">
                  {d.participants} участников · {d.format}
                </span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p
            className="text-[16px] font-medium leading-relaxed mb-4"
            style={{ color: d.color }}
          >
            {d.tagline}
          </p>

          {/* Description */}
          <p className="text-[15px] text-[#374151] leading-[1.7] mb-5">
            {d.description}
          </p>

          {/* Links */}
          {d.links.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-5">
              {d.links.map((lk, li) => (
                <a
                  key={li}
                  href={lk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold no-underline transition-all hover:scale-105"
                  style={{
                    color: IC_COLORS[lk.icon] || d.color,
                    background: `${IC_COLORS[lk.icon] || d.color}08`,
                    border: `1px solid ${IC_COLORS[lk.icon] || d.color}15`,
                  }}
                >
                  {IC_EMOJI[lk.icon]} {lk.label}
                </a>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href={`/${d.slug}`}
              className="flex-1 py-3.5 rounded-2xl text-[14px] font-semibold text-white text-center transition-all hover:-translate-y-px no-underline"
              style={{
                background: `linear-gradient(135deg, ${d.color}, ${d.color}cc)`,
                boxShadow: `0 4px 20px ${d.color}22`,
              }}
            >
              Подробнее →
            </Link>
            <a
              href={d.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-2xl text-[14px] font-semibold text-[#4B5563] border border-black/[0.06] hover:border-black/[0.12] transition-all no-underline flex items-center"
              style={{ background: "rgba(255,255,255,0.8)" }}
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
