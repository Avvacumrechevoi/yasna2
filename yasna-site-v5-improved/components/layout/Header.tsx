"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    ["#about", "О проекте"],
    ["#directions", "Направления"],
    ["#events", "Расписание"],
    ["#faq", "Вопросы"],
  ];

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/90 backdrop-blur-xl border-b border-gold/[0.06]" : "bg-bg/70 backdrop-blur-md"}`}>
        <div className="max-w-[960px] mx-auto px-5 md:px-6 py-3 flex items-center justify-between">
          <a href="/" className="no-underline">
            <div className="font-serif text-[21px] font-bold text-gold-dark">Русская Ясна</div>
            <div className="text-[9px] text-gold/40 tracking-wider uppercase">исследования русской культуры</div>
          </a>
          <div className="hidden md:flex items-center gap-5">
            {navItems.map(([href, label]) => (
              <a key={label} href={href} className="text-[13px] text-[#4B5563] font-medium hover:text-gold transition-colors">{label}</a>
            ))}
            <a href="#join" className="px-5 py-2 rounded-full text-[13px] font-semibold text-white bg-gradient-to-br from-gold to-gold-dark shadow-sm shadow-gold/20 hover:shadow-gold/30 transition-shadow">Вступить</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gold/[0.06] transition-colors" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}>
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className="block h-[2px] w-full bg-[#4B5563] rounded transition-all duration-300 origin-center" style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span className="block h-[2px] w-full bg-[#4B5563] rounded transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-[2px] w-full bg-[#4B5563] rounded transition-all duration-300 origin-center" style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </div>
          </button>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-[60px] left-0 right-0 bg-[#FAF8F4] border-b border-gold/[0.08] shadow-xl transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}>
          <nav className="max-w-[960px] mx-auto px-6 py-6 flex flex-col gap-1">
            {navItems.map(([href, label]) => (
              <a key={label} href={href} onClick={handleNavClick} className="text-[16px] text-[#1F2937] font-medium py-3 px-4 rounded-xl hover:bg-gold/[0.06] transition-colors no-underline">{label}</a>
            ))}
            <div className="h-px bg-gold/[0.08] my-2" />
            <a href="#join" onClick={handleNavClick} className="text-center py-3.5 px-6 rounded-xl text-[15px] font-semibold text-white bg-gradient-to-br from-gold to-gold-dark no-underline mt-1">Оставить заявку</a>
          </nav>
        </div>
      </div>
    </>
  );
}
