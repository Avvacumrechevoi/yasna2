"use client";
import { useState, useEffect, useRef } from "react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const photos = [
  { src: "/images/event-walk.svg", alt: "Натурный урок" },
  { src: "/images/event-books.svg", alt: "Читательский клуб" },
  { src: "/images/event-online.svg", alt: "Онлайн-встреча" },
  { src: "/images/event-holiday.svg", alt: "Праздник" },
  { src: "/images/event-kids.svg", alt: "Занятие для детей" },
  { src: "/images/event-research.svg", alt: "Исследование" },
];

const stats = [
  { target: 900, suffix: "+", label: "участников" },
  { target: 10, suffix: "+", label: "лет работы" },
  { target: 8, suffix: "", label: "направлений" },
  { target: 50, suffix: "+", label: "встреч в год" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="font-serif text-[26px] md:text-[32px] font-bold text-gold">
      {count}{suffix}
    </div>
  );
}

export default function SocialProofBar() {
  return (
    <section className="relative z-10 px-6 py-8" aria-label="Статистика сообщества">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <div className="flex justify-center gap-6 md:gap-10 mb-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <CountUp target={s.target} suffix={s.suffix} />
                <div className="text-[11px] text-[#6B7280]">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {photos.map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[140px] h-[95px] md:w-[160px] md:h-[110px] rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(155,123,79,0.06)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-[#9CA3AF] mt-2">
            С наших встреч и мероприятий
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
