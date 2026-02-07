"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSignupModal } from "./SignupModalContext";
import { directions } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

/*
 * ═══ EMAILJS НАСТРОЙКА ═══
 * 
 * 1. Зарегистрируйтесь на https://www.emailjs.com (бесплатно до 200 писем/мес)
 * 2. Email Services → Add New Service → выберите Gmail/Yandex/Outlook → подключите вашу почту
 *    → скопируйте Service ID (например "service_abc123")
 * 3. Email Templates → Create New Template → настройте шаблон (см. ниже)
 *    → скопируйте Template ID (например "template_xyz789")
 * 4. Account → General → скопируйте Public Key (например "user_ABCDEF123456")
 * 5. Вставьте значения ниже:
 */

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY   = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || "";

async function sendEmail(data: Record<string, string>): Promise<boolean> {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    // Fallback: send to server API if EmailJS is not configured
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: data,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default function SignupModal() {
  const { isOpen, closeModal, source } = useSignupModal();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDirs, setSelectedDirs] = useState<string[]>([]);
  const [referral, setReferral] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));
  const nameError = touched.name && !name.trim() ? "Укажите ваше имя" : "";
  const contactError = touched.contact && !contact.trim() ? "Укажите способ связи" : "";

  // Focus trap: cycle Tab inside modal
  const handleTabTrap = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      handleTabTrap(e);
    };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    // Focus the modal on open
    setTimeout(() => modalRef.current?.querySelector<HTMLElement>("input, button")?.focus(), 100);
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal, handleTabTrap]);

  useEffect(() => {
    if (isOpen) {
      setFormState("idle");
      setErrorMsg("");
    }
  }, [isOpen]);

  const toggleDir = (id: string) => {
    setSelectedDirs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, contact: true });
    if (!name.trim() || !contact.trim()) return;

    setFormState("loading");
    setErrorMsg("");

    const dirNames = selectedDirs
      .map((id) => directions.find((d) => d.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const sent = await sendEmail({
      from_name: name.trim(),
      contact: contact.trim(),
      message: message.trim() || "—",
      directions: dirNames || "Не выбраны",
      referral: referral || "—",
      source: source || "—",
    });

    if (sent) {
      setFormState("success");
      setTimeout(() => {
        closeModal();
        setName(""); setContact(""); setMessage("");
        setSelectedDirs([]); setReferral(""); setTouched({});
        setFormState("idle");
      }, 5000);
    } else {
      setFormState("error");
      setErrorMsg("Не удалось отправить заявку. Попробуйте позже или напишите в Telegram.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={closeModal}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-[#FAF8F4] rounded-3xl shadow-2xl animate-expandCard"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Форма заявки"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center bg-black/[0.04] hover:bg-black/[0.08] text-[#6B7280] text-lg z-10 transition-colors"
          aria-label="Закрыть"
        >
          ✕
        </button>

        {formState === "success" ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-5">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M12 20L18 26L28 14" stroke="#18804A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-serif text-[26px] font-bold text-[#141C28] mb-3">
              Заявка отправлена!
            </h3>
            <p className="text-[15px] text-[#4B5563] leading-relaxed mb-6">
              Мы свяжемся с вами в течение 2–3 дней через указанный контакт.
            </p>
            <div className="text-[14px] text-[#6B7280] mb-6">
              Пока ждёте, подпишитесь на наш канал:
            </div>
            <a
              href="https://t.me/russkaya_yasna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#229ED9]/10 text-[#229ED9] font-semibold text-[14px] hover:bg-[#229ED9]/15 transition-colors no-underline"
            >
              ✈️ Telegram — Русская Ясна
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7 md:p-9">
            <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-[#141C28] mb-1 pr-8">
              Оставьте заявку
            </h3>
            <p className="text-[14px] text-[#6B7280] mb-6">
              Мы расскажем о направлениях и поможем выбрать
            </p>

            {errorMsg && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-[14px] text-red-700">
                {errorMsg}
              </div>
            )}

            {/* Name */}
            <label className="block mb-4">
              <span className="text-[13px] font-semibold text-[#374151] mb-1.5 block">
                Имя <span className="text-red-400">*</span>
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => markTouched("name")}
                placeholder="Как к вам обращаться?"
                required
                minLength={2}
                className="w-full px-4 py-3 rounded-xl border bg-white text-[15px] text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all"
                style={{ borderColor: nameError ? "#EF4444" : "rgba(0,0,0,0.08)" }}
                disabled={formState === "loading"}
              />
              {nameError && (
                <span className="text-[11px] text-red-500 mt-1 block">{nameError}</span>
              )}
            </label>

            {/* Contact */}
            <label className="block mb-4">
              <span className="text-[13px] font-semibold text-[#374151] mb-1.5 block">
                Контакт <span className="text-red-400">*</span>
              </span>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                onBlur={() => markTouched("contact")}
                placeholder="Telegram, WhatsApp или Email"
                required
                className="w-full px-4 py-3 rounded-xl border bg-white text-[15px] text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all"
                style={{ borderColor: contactError ? "#EF4444" : "rgba(0,0,0,0.08)" }}
                disabled={formState === "loading"}
              />
              {contactError ? (
                <span className="text-[11px] text-red-500 mt-1 block">{contactError}</span>
              ) : (
                <span className="text-[11px] text-[#9CA3AF] mt-1 block">
                  Выберите удобный способ связи
                </span>
              )}
            </label>

            {/* Directions */}
            <fieldset className="mb-4">
              <legend className="text-[13px] font-semibold text-[#374151] mb-2">
                Интересующие направления
              </legend>
              <div className="grid grid-cols-2 gap-1.5">
                {directions.map((d) => {
                  const on = selectedDirs.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => toggleDir(d.id)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all text-[13px]"
                      style={{
                        background: on ? `${d.color}10` : "white",
                        border: `1.5px solid ${on ? d.color + "30" : "rgba(0,0,0,0.06)"}`,
                        color: on ? d.color : "#4B5563",
                        fontWeight: on ? 600 : 400,
                      }}
                      disabled={formState === "loading"}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.logo} alt="" className="w-6 h-6 rounded-lg object-cover flex-shrink-0" />
                      {d.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Message */}
            <label className="block mb-4">
              <span className="text-[13px] font-semibold text-[#374151] mb-1.5 block">
                Что привело к Ясне?{" "}
                <span className="font-normal text-[#9CA3AF]">(необязательно)</span>
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Расскажите в свободной форме..."
                maxLength={500}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-white text-[15px] text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all resize-none"
                disabled={formState === "loading"}
              />
              <span className="text-[11px] text-[#9CA3AF] text-right block">
                {message.length}/500
              </span>
            </label>

            {/* Referral */}
            <label className="block mb-5">
              <span className="text-[13px] font-semibold text-[#374151] mb-1.5 block">
                Как узнали о нас?
              </span>
              <select
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-white text-[15px] text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all"
                disabled={formState === "loading"}
              >
                <option value="">Выберите вариант</option>
                <option value="От друзей / знакомых">От друзей / знакомых</option>
                <option value="Из социальных сетей">Из социальных сетей</option>
                <option value="Из поиска (Google, Яндекс)">Из поиска (Google, Яндекс)</option>
                <option value="Случайно наткнулся">Случайно наткнулся</option>
                <option value="Другое">Другое</option>
              </select>
            </label>

            {/* Trust */}
            <div className="mb-5 space-y-1.5 text-[12.5px] text-[#6B7280]">
              <p>✓ Мы ответим в течение 2–3 дней</p>
              <p>✓ Вы получите ссылки на материалы</p>
              <p>✓ Никакого спама — только по вашему запросу</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!name.trim() || !contact.trim() || formState === "loading"}
              className="w-full py-4 rounded-2xl text-[15px] font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #9B7B4F, #7A5F3A)",
                boxShadow: "0 4px 20px rgba(155,123,79,0.25)",
              }}
            >
              {formState === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" fill="none" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                  Отправляем...
                </span>
              ) : formState === "error" ? (
                "Попробовать снова"
              ) : (
                "Отправить заявку"
              )}
            </button>

            <p className="text-center text-[11px] text-[#9CA3AF] mt-3">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <a
                href="https://t.me/russkaya_yasna"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gold transition-colors"
              >
                политикой конфиденциальности
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
