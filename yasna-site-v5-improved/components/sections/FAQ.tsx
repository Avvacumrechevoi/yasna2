"use client";
import { useState } from "react";
import { faqItems } from "@/lib/data";
import { useSignupModal } from "@/components/forms/SignupModalContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

function FaqItem({ q, a, id }: { q: string; a: string; id: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <div
      className="rounded-[18px] mb-2 transition-all duration-300 overflow-hidden"
      style={{
        background: open ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
        border: open ? "1px solid rgba(155,123,79,0.1)" : "1px solid rgba(0,0,0,0.03)",
      }}
    >
      <button
        id={buttonId}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-transparent border-none cursor-pointer font-inherit"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="text-[15px] font-semibold text-[#1A2332]">{q}</span>
        <span
          className="text-[18px] text-gold ml-3 flex-shrink-0 font-light transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="transition-all duration-400 overflow-hidden"
        style={{ maxHeight: open ? 300 : 0, opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-4">
          <p className="text-[14px] text-[#4B5563] leading-relaxed m-0">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { openModal } = useSignupModal();
  return (
    <section id="faq" className="relative z-10 px-6 py-10" aria-label="Частые вопросы">
      <div className="max-w-xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-6">
            <div className="text-[11px] text-gold-dark font-semibold tracking-[0.2em] uppercase mb-1">Вопросы</div>
            <h2 className="font-serif text-[28px] font-bold text-[#141C28]">Частые вопросы</h2>
          </div>
        </AnimateOnScroll>
        {faqItems.map((f, i) => (
          <FaqItem key={i} q={f.question} a={f.answer} id={i} />
        ))}
        <div className="text-center mt-5">
          <button
            onClick={() => openModal("faq")}
            className="text-[13px] text-gold-dark font-semibold hover:text-gold-dark transition-colors"
          >
            Не нашли ответ? Напишите нам →
          </button>
        </div>
      </div>
    </section>
  );
}
