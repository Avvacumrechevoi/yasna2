"use client";
import { useState, useEffect } from "react";
import { useSignupModal } from "@/components/forms/SignupModalContext";

export default function StickyMobileCTA() {
  const { openModal, isOpen } = useSignupModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~1.5 screens (800px)
      setVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide when modal is open or not scrolled enough
  if (!visible || isOpen) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(250,248,244,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(155,123,79,0.06)",
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-[#141C28]">Готовы начать?</div>
            <div className="text-[11px] text-[#6B7280]">Бесплатно · ответим за 2-3 дня</div>
          </div>
          <button
            onClick={() => openModal("sticky-mobile")}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #9B7B4F, #7A5F3A)",
              boxShadow: "0 2px 8px rgba(155,123,79,0.3)",
            }}
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
}
