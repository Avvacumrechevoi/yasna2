"use client";
import { upcomingEvents } from "@/lib/data";
import { useSignupModal } from "@/components/forms/SignupModalContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function EventsSection() {
  const { openModal } = useSignupModal();

  // Filter out past events
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const futureEvents = upcomingEvents.filter((ev) => {
    if (!ev.dateISO) return true;
    return new Date(ev.dateISO) >= now;
  });

  const eventsToShow = futureEvents.length > 0 ? futureEvents : upcomingEvents;
  const hasFutureEvents = futureEvents.length > 0;

  return (
    <section id="events" className="relative z-10 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-6">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">Ближайшие встречи</div>
            <h2 className="font-serif text-[28px] font-bold text-[#141C28]">Расписание</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              {hasFutureEvents ? "Приходите на открытые встречи" : "Следите за расписанием в Telegram"}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="flex flex-col gap-2.5">
          {eventsToShow.map((ev, i) => (
            <AnimateOnScroll key={i} delay={i * 60}>
              <div className="flex items-center gap-3.5 px-4 py-3 rounded-[18px] bg-white/70 border border-black/[0.03] transition-all hover:shadow-md group">
                {/* Image thumbnail */}
                {ev.image && (
                  <div className="w-[56px] h-[42px] rounded-lg overflow-hidden flex-shrink-0 border border-black/[0.04]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ev.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}

                {/* Date column */}
                <div className="w-10 text-center flex-shrink-0">
                  <div className="text-[14px] font-bold leading-tight" style={{ color: ev.directionColor }}>
                    {ev.date.split(" ")[0]}
                  </div>
                  <div className="text-[10px] text-[#6B7280]">{ev.date.split(" ")[1]}</div>
                </div>

                <div className="w-px h-9 bg-gold/[0.08] flex-shrink-0" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-[#141C28] mb-0.5 leading-snug">{ev.title}</div>
                  <div className="text-[11px] text-[#6B7280]">{ev.direction} · {ev.location}</div>
                </div>

                {/* Tags */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className="text-[9.5px] px-2 py-0.5 rounded-lg font-semibold"
                    style={{ background: `${ev.directionColor}0C`, color: ev.directionColor }}
                  >
                    {ev.tag}
                  </span>
                  {ev.spots && <span className="text-[9.5px] text-red-600 font-medium">{ev.spots}</span>}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="text-center mt-5">
          <button
            onClick={() => openModal("events")}
            className="text-[13px] text-gold-dark font-semibold hover:text-gold-dark transition-colors"
          >
            Записаться на встречу →
          </button>
        </div>
      </div>
    </section>
  );
}
