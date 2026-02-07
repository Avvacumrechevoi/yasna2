"use client";

import { useState, useEffect } from "react";
import { directions, type Direction } from "@/lib/data";
import Link from "next/link";

import { LINK_ICON_COLORS as IC_COLORS, LINK_ICON_EMOJI as IC_EMOJI } from "@/lib/constants";

export default function DirectionsShowcase() {
  const [selected, setSelected] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);

  const active = directions.find((d) => d.id === selected);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => setRotation((r) => (r + 0.08) % 360), 50);
    return () => clearInterval(iv);
  }, [paused]);

  const pick = (id: string) => {
    setSelected(selected === id ? null : id);
    setPaused(true);
    setTimeout(() => setPaused(false), 12000);
  };

  return (
    <>
      <section
        id="directions"
        className="relative z-10 px-6 pb-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { if (!selected) setPaused(false); }}
      >
        <div className="hidden md:block max-w-[480px] mx-auto">
          <OrbitWithLogos selected={selected} onSelect={pick} rotation={rotation} />
        </div>
      </section>

      {active && (
        <section className="relative z-10 px-6 py-3">
          <DetailCard direction={active} onClose={() => setSelected(null)} />
        </section>
      )}

      <section className="relative z-10 px-6 pb-12">
        {/* Mobile: horizontal swipe logos */}
        <div className="md:hidden mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
            {directions.map((d) => {
              const on = selected === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => pick(d.id)}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 w-[72px] py-2 rounded-2xl transition-all duration-200"
                  style={{
                    background: on ? `${d.color}10` : "transparent",
                    border: on ? `1.5px solid ${d.color}25` : "1.5px solid transparent",
                  }}
                  aria-label={`Направление ${d.name}`}
                  aria-pressed={on}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.logo}
                    alt={d.name}
                    className="w-11 h-11 rounded-xl object-cover bg-white"
                    style={{
                      border: on ? `2px solid ${d.color}35` : "2px solid rgba(0,0,0,0.04)",
                      transform: on ? "scale(1.08)" : "scale(1)",
                      transition: "all 0.2s",
                    }}
                  />
                  <span
                    className="text-[10px] font-medium text-center leading-tight"
                    style={{ color: on ? d.color : "#6B7280" }}
                  >
                    {d.name.length > 9 ? d.name.slice(0, 8) + "…" : d.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-center text-sm text-[#6B7280] mb-4">
          {active ? "Другие направления" : "Нажмите на узел орбиты или выберите из списка"}
        </p>
        <DirectionsGrid selected={selected} onSelect={pick} />
        <MobileDirections selected={selected} onSelect={pick} />
      </section>
    </>
  );
}

/* ═══ ORBIT with HTML image overlays ═══ */
function OrbitWithLogos({ selected, onSelect, rotation }: {
  selected: string | null; onSelect: (id: string) => void; rotation: number;
}) {
  const S = 480, C = S / 2, R = 168, LR = 218, NR = 24;
  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: S }}>
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full block" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="25%">
            <stop offset="0%" stopColor="#D4B896" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
          </radialGradient>
          <filter id="gN"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="gL"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <circle cx={C} cy={C} r={R + 52} fill="none" stroke="#C8A882" strokeWidth="0.35" opacity="0.12" />
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * 10 * Math.PI) / 180;
          const i1 = R + 47, o1 = R + 57, major = i % 9 === 0, mid = i % 3 === 0;
          return <line key={i} x1={C + i1 * Math.cos(a)} y1={C + i1 * Math.sin(a)} x2={C + o1 * Math.cos(a)} y2={C + o1 * Math.sin(a)} stroke="#C8A882" strokeWidth={major ? 0.7 : 0.35} opacity={major ? 0.22 : mid ? 0.12 : 0.06} />;
        })}
        <circle cx={C} cy={C} r={R} fill="none" stroke="#9B7B4F" strokeWidth="1" opacity="0.1" />
        <circle cx={C} cy={C} r={R} fill="none" stroke="#C8A882" strokeWidth="0.4" opacity="0.06" strokeDasharray="3 9"
          style={{ transform: `rotate(${-rotation * 0.4}deg)`, transformOrigin: `${C}px ${C}px` }} />
        <circle cx={C} cy={C} r="92" fill="none" stroke="#C8A882" strokeWidth="0.3" strokeDasharray="5 10" opacity="0.08" />
        <circle cx={C} cy={C} r="60" fill="url(#coreGlow)" />
        <line x1={C} y1="12" x2={C} y2={S - 12} stroke="#C8A882" strokeWidth="0.2" opacity="0.05" />
        <line x1="12" y1={C} x2={S - 12} y2={C} stroke="#C8A882" strokeWidth="0.2" opacity="0.05" />
        {directions.map((d) => {
          const ang = ((d.angle + rotation) * Math.PI) / 180;
          const x = C + R * Math.cos(ang), y = C + R * Math.sin(ang);
          const on = selected === d.id;
          return <line key={"c" + d.id} x1={C} y1={C} x2={x} y2={y} stroke={on ? d.color : "#C8A882"} strokeWidth={on ? 1.2 : 0.2} opacity={on ? 0.35 : 0.05} style={{ transition: "all 0.6s" }} />;
        })}
        <text x={C} y={C - 12} textAnchor="middle" fill="#7A5F3A" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="28" fontWeight="700" filter="url(#gN)">Ясна</text>
        <line x1={C - 22} y1={C + 3} x2={C + 22} y2={C + 3} stroke="#C8A882" strokeWidth="0.5" opacity="0.3" />
        <text x={C} y={C + 17} textAnchor="middle" fill="#B89E72" fontFamily="Inter,sans-serif" fontSize="7.5" letterSpacing="2.5" opacity="0.5">8 ПУТЕЙ</text>
        {directions.map((d) => {
          const ang = ((d.angle + rotation) * Math.PI) / 180;
          const x = C + R * Math.cos(ang), y = C + R * Math.sin(ang);
          const lx = C + LR * Math.cos(ang), ly = C + LR * Math.sin(ang);
          const on = selected === d.id;
          return (
            <g key={d.id} style={{ cursor: "pointer" }} onClick={() => onSelect(d.id)} role="button" aria-label={`Направление ${d.name}`} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(d.id); } }}>
              {on && <><circle cx={x} cy={y} r={36} fill="none" stroke={d.color} strokeWidth="1.5" opacity="0.1" filter="url(#gL)" /><circle cx={x} cy={y} r={30} fill="none" stroke={d.color} strokeWidth="0.6" opacity="0.12" /></>}
              <circle cx={x} cy={y} r={NR} fill="#FFFFFF" stroke={on ? d.color : "#D4C4A8"} strokeWidth={on ? 2.5 : 1.2}
                style={{ transition: "stroke 0.4s,stroke-width 0.4s", filter: on ? `drop-shadow(0 3px 12px ${d.color}40)` : "drop-shadow(0 1px 3px rgba(0,0,0,0.06))" }} />
              {on && <circle cx={x} cy={y} r={21} fill={d.color} opacity="0.08" />}
              <text x={lx} y={ly - 1} textAnchor="middle" dominantBaseline="central" fill={on ? d.color : "#4A5568"} fontFamily="Inter,sans-serif" fontSize={on ? "11" : "10"} fontWeight={on ? "700" : "500"} opacity={on ? 1 : 0.5} style={{ transition: "all 0.4s", pointerEvents: "none" }}>{d.name}</text>
              {on && <text x={lx} y={ly + 11} textAnchor="middle" fill="#8B9DB7" fontFamily="Inter,sans-serif" fontSize="8" style={{ pointerEvents: "none" }}>{d.category} · {d.participants}</text>}
            </g>
          );
        })}
      </svg>
      {/* HTML logo overlays */}
      {directions.map((d) => {
        const ang = ((d.angle + rotation) * Math.PI) / 180;
        const x = C + R * Math.cos(ang), y = C + R * Math.sin(ang);
        const sz = (NR - 4) * 2;
        return (
          <div key={"logo-" + d.id} className="absolute overflow-hidden rounded-full pointer-events-none"
            style={{ left: `${(x - sz / 2) / S * 100}%`, top: `${(y - sz / 2) / S * 100}%`, width: `${sz / S * 100}%`, paddingBottom: `${sz / S * 100}%` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.logo} alt={d.name} className="absolute inset-0 w-full h-full object-cover rounded-full" />
          </div>
        );
      })}
    </div>
  );
}

function DetailCard({ direction: d, onClose }: { direction: Direction; onClose: () => void }) {
  return (
    <div className="max-w-xl mx-auto animate-expandCard">
      <div className="rounded-3xl overflow-hidden bg-white" style={{ boxShadow: `0 12px 48px ${d.color}10, 0 2px 8px rgba(0,0,0,0.04)`, border: `1px solid ${d.color}12` }}>
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${d.color}, ${d.color}55, transparent)` }} />
        <div className="p-7">
          <div className="flex items-center gap-3.5 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.logo} alt={d.name} className="w-14 h-14 rounded-2xl object-cover bg-white" style={{ border: `1.5px solid ${d.color}15` }} />
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <h3 className="font-serif text-[26px] font-bold text-[#141C28] leading-tight">{d.name}</h3>
                {d.subtitle && <span className="text-[13px] font-medium" style={{ color: d.color }}>{d.subtitle}</span>}
              </div>
              <span className="text-[12.5px] text-[#5A6577] font-medium">{d.category} · {d.format}</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/[0.03] hover:bg-black/[0.06] text-[#6B7280] text-sm">✕</button>
          </div>
          <p className="text-[15px] text-[#374151] leading-relaxed mb-4">{d.description}</p>
          {d.links.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {d.links.slice(0, 3).map((lk, i) => (
                <a key={i} href={lk.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-semibold no-underline transition-opacity hover:opacity-80"
                  style={{ color: IC_COLORS[lk.icon] || d.color, background: `${IC_COLORS[lk.icon] || d.color}08`, border: `1px solid ${IC_COLORS[lk.icon] || d.color}15` }}>
                  {IC_EMOJI[lk.icon]} {lk.label}
                </a>
              ))}
            </div>
          )}
          <div className="flex gap-2.5">
            <Link href={`/${d.slug}`} className="flex-1 py-3.5 rounded-2xl text-[14px] font-semibold text-white text-center transition-transform hover:-translate-y-px no-underline" style={{ background: `linear-gradient(135deg, ${d.color}, ${d.color}cc)`, boxShadow: `0 4px 20px ${d.color}22` }}>Подробнее →</Link>
            <a href={d.telegramUrl} target="_blank" rel="noopener" className="px-5 py-3.5 rounded-2xl text-[14px] font-semibold text-[#4B5563] bg-[#F3EDE2] border border-[#9B7B4F]/10 hover:border-[#9B7B4F]/20 transition-all no-underline flex items-center">Telegram</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionsGrid({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="hidden md:grid grid-cols-4 gap-2.5 max-w-2xl mx-auto">
      {directions.map((d) => {
        const on = selected === d.id;
        return (
          <button key={d.id} onClick={() => onSelect(d.id)} className="flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-sm" style={{ background: on ? "#fff" : "rgba(255,255,255,0.45)", border: `1.5px solid ${on ? d.color + "28" : "transparent"}`, boxShadow: on ? `0 4px 20px ${d.color}10` : "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.logo} alt={d.name} className="w-12 h-12 rounded-xl object-cover bg-white" style={{ border: on ? `2px solid ${d.color}25` : "2px solid transparent" }} />
            <div className="text-[12.5px] font-semibold text-center leading-tight" style={{ color: on ? d.color : "#1F2937" }}>{d.name}</div>
            <div className="text-[10px] text-[#6B7280]">{d.category}</div>
          </button>
        );
      })}
    </div>
  );
}

function MobileDirections({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="md:hidden flex flex-col gap-2.5">
      <div className="text-center mb-3">
        <h2 className="font-serif text-2xl font-bold text-[#141C28]">Выберите направление</h2>
      </div>
      {directions.map((d) => {
        const isOpen = selected === d.id;
        return (
          <div key={d.id}>
            <button onClick={() => onSelect(d.id)} className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all" style={{ background: isOpen ? `${d.color}08` : "white", border: `1px solid ${isOpen ? d.color + "20" : "rgba(0,0,0,0.04)"}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.logo} alt={d.name} className="w-11 h-11 rounded-xl object-cover bg-white flex-shrink-0" style={{ border: `1.5px solid ${d.color}15` }} />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-[#141C28]">{d.name}</div>
                <div className="text-[12px] text-[#6B7280] truncate">{d.tagline}</div>
              </div>
            </button>
            {isOpen && (
              <div className="mt-2 p-5 rounded-2xl animate-slideUp" style={{ background: `${d.color}05`, border: `1px solid ${d.color}15` }}>
                <p className="text-[14px] text-[#4B5563] leading-relaxed mb-4">{d.description}</p>
                {d.links.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-4">
                    {d.links.slice(0, 3).map((lk, i) => (
                      <a key={i} href={lk.url} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-lg no-underline"
                        style={{ color: IC_COLORS[lk.icon], background: `${IC_COLORS[lk.icon]}10` }}>
                        {IC_EMOJI[lk.icon]} {lk.label}
                      </a>
                    ))}
                  </div>
                )}
                <Link href={`/${d.slug}`} className="block w-full py-3 rounded-xl text-[13px] font-semibold text-white text-center no-underline" style={{ background: d.color }}>Подробнее →</Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
