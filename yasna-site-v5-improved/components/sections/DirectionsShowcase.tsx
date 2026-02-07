"use client";

import { useState } from "react";
import { directions, type Direction } from "@/lib/data";
import Link from "next/link";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import {
  LINK_ICON_COLORS as IC_COLORS,
  LINK_ICON_EMOJI as IC_EMOJI,
} from "@/lib/constants";

export default function DirectionsShowcase() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = directions.find((d) => d.id === selected);

  const pick = (id: string) => {
    setSelected(selected === id ? null : id);
  };

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
          {directions.map((d, i) => {
            const isActive = selected === d.id;
            return (
              <AnimateOnScroll key={d.id} delay={i * 60}>
                <div>
                  <button
                    onClick={() => pick(d.id)}
                    className="w-full group text-left rounded-2xl transition-all duration-300"
                    style={{
                      background: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                      border: `1.5px solid ${isActive ? d.color + "25" : "rgba(0,0,0,0.04)"}`,
                      boxShadow: isActive
                        ? `0 8px 32px ${d.color}12, 0 2px 8px rgba(0,0,0,0.04)`
                        : "0 1px 4px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div className="p-4 md:p-5 flex items-center gap-4">
                      {/* Logo */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={d.logo}
                        alt={d.name}
                        className="w-14 h-14 rounded-2xl object-cover bg-white flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                        style={{
                          border: `2px solid ${isActive ? d.color + "30" : "rgba(0,0,0,0.06)"}`,
                        }}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="text-[17px] font-bold leading-tight truncate"
                            style={{
                              color: isActive ? d.color : "#141C28",
                            }}
                          >
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
                            {d.participants} участников · {d.format}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isActive
                            ? `${d.color}10`
                            : "rgba(0,0,0,0.02)",
                          transform: isActive ? "rotate(90deg)" : "none",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M5 3L9 7L5 11"
                            stroke={isActive ? d.color : "#9CA3AF"}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded detail inline */}
                  {isActive && (
                    <div
                      className="mt-1.5 rounded-2xl overflow-hidden animate-expandCard"
                      style={{
                        background: `linear-gradient(135deg, ${d.color}06, ${d.color}02)`,
                        border: `1px solid ${d.color}15`,
                      }}
                    >
                      <div
                        className="h-[2px]"
                        style={{
                          background: `linear-gradient(90deg, ${d.color}, ${d.color}44, transparent)`,
                        }}
                      />
                      <div className="p-5">
                        <p className="text-[14px] text-[#374151] leading-relaxed mb-4">
                          {d.description}
                        </p>

                        {/* Links */}
                        {d.links.length > 0 && (
                          <div className="flex gap-2 flex-wrap mb-4">
                            {d.links.slice(0, 3).map((lk, li) => (
                              <a
                                key={li}
                                href={lk.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11.5px] font-semibold no-underline transition-opacity hover:opacity-80"
                                style={{
                                  color: IC_COLORS[lk.icon] || d.color,
                                  background: `${IC_COLORS[lk.icon] || d.color}08`,
                                  border: `1px solid ${IC_COLORS[lk.icon] || d.color}12`,
                                }}
                              >
                                {IC_EMOJI[lk.icon]} {lk.label}
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2.5">
                          <Link
                            href={`/${d.slug}`}
                            className="flex-1 py-3 rounded-xl text-[13px] font-semibold text-white text-center transition-all hover:-translate-y-px no-underline"
                            style={{
                              background: `linear-gradient(135deg, ${d.color}, ${d.color}cc)`,
                              boxShadow: `0 4px 16px ${d.color}22`,
                            }}
                          >
                            Подробнее о направлении →
                          </Link>
                          <a
                            href={d.telegramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 rounded-xl text-[13px] font-semibold text-[#4B5563] border border-black/[0.06] hover:border-black/[0.12] transition-all no-underline flex items-center"
                            style={{ background: "rgba(255,255,255,0.8)" }}
                          >
                            Telegram
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
