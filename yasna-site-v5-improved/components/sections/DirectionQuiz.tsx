"use client";
import { useState } from "react";
import { directions } from "@/lib/data";
import Link from "next/link";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

type Answer = { text: string; tags: string[] };
type Question = { question: string; answers: Answer[] };

const questions: Question[] = [
  {
    question: "Что вас больше всего привлекает?",
    answers: [
      { text: "Разгадывать скрытые смыслы в словах", tags: ["izvod", "litprosvet"] },
      { text: "Гулять по городу и видеть то, чего не замечал", tags: ["neglinka", "marshruty"] },
      { text: "Связь неба и земли — звёзды, архитектура", tags: ["astronevod", "neglinka"] },
      { text: "Праздники и традиции для семьи", tags: ["prazdniki", "teremok-tain"] },
    ],
  },
  {
    question: "Какой формат вам ближе?",
    answers: [
      { text: "Живые встречи и прогулки", tags: ["neglinka", "marshruty", "prazdniki"] },
      { text: "Онлайн-исследования в удобное время", tags: ["astronevod", "izvod", "litprosvet"] },
      { text: "Занятия вместе с детьми", tags: ["teremok-tain", "prazdniki"] },
      { text: "Практика здоровья и тела", tags: ["dzhiva"] },
    ],
  },
  {
    question: "Вы скорее…",
    answers: [
      { text: "Аналитик — люблю докопаться до сути", tags: ["izvod", "astronevod"] },
      { text: "Творец — хочу создавать и писать", tags: ["litprosvet"] },
      { text: "Практик — мне нужен конкретный результат", tags: ["dzhiva", "neglinka", "marshruty"] },
      { text: "Хранитель — важно передать детям и семье", tags: ["prazdniki", "teremok-tain"] },
    ],
  },
];

function scoreDirections(answers: number[]): typeof directions {
  const scores: Record<string, number> = {};
  answers.forEach((ansIdx, qIdx) => {
    if (ansIdx < 0) return;
    questions[qIdx].answers[ansIdx].tags.forEach((tag) => {
      scores[tag] = (scores[tag] || 0) + 1;
    });
  });
  return directions
    .map((d) => ({ ...d, score: scores[d.slug] || 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
}

export default function DirectionQuiz() {
  const [step, setStep] = useState(-1); // -1 = intro, 0-2 = questions, 3 = result
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1]);

  const pick = (answerIdx: number) => {
    const next = [...answers];
    next[step] = answerIdx;
    setAnswers(next);
    setTimeout(() => setStep(step + 1), 300);
  };

  const reset = () => {
    setStep(-1);
    setAnswers([-1, -1, -1]);
  };

  const results = step >= questions.length ? scoreDirections(answers) : [];

  return (
    <section className="relative z-10 px-6 py-10">
      <div className="max-w-lg mx-auto">
        <AnimateOnScroll>
          {/* Intro */}
          {step === -1 && (
            <div className="text-center p-8 rounded-[28px] bg-gradient-to-br from-gold/[0.04] to-gold/[0.01] border border-gold/[0.08]">
              <div className="text-[32px] mb-3">🧭</div>
              <h2 className="font-serif text-[24px] font-bold text-[#141C28] mb-2">
                Не знаете, с чего начать?
              </h2>
              <p className="text-[14px] text-[#6B7280] mb-5 leading-relaxed">
                3 вопроса — и мы подскажем направление, которое подходит именно вам
              </p>
              <button
                onClick={() => setStep(0)}
                className="px-7 py-3 rounded-xl text-[14px] font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #9B7B4F, #7A5F3A)",
                  boxShadow: "0 4px 16px rgba(155,123,79,0.3)",
                }}
              >
                Пройти тест →
              </button>
            </div>
          )}

          {/* Questions */}
          {step >= 0 && step < questions.length && (
            <div className="p-6 md:p-8 rounded-[28px] bg-white/80 border border-gold/[0.06] backdrop-blur-sm">
              {/* Progress */}
              <div className="flex gap-1.5 mb-5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-500"
                    style={{
                      background: i <= step ? "#9B7B4F" : "rgba(155,123,79,0.12)",
                    }}
                  />
                ))}
              </div>

              <div className="text-[12px] text-[#9CA3AF] mb-1">
                Вопрос {step + 1} из {questions.length}
              </div>
              <h3 className="font-serif text-[20px] font-bold text-[#141C28] mb-5">
                {questions[step].question}
              </h3>

              <div className="flex flex-col gap-2">
                {questions[step].answers.map((ans, i) => (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className="w-full text-left px-5 py-3.5 rounded-xl text-[14px] text-[#374151] transition-all duration-200 hover:bg-gold/[0.06] active:scale-[0.98]"
                    style={{
                      background: answers[step] === i ? "rgba(155,123,79,0.08)" : "rgba(255,255,255,0.8)",
                      border: answers[step] === i ? "1.5px solid rgba(155,123,79,0.2)" : "1.5px solid rgba(0,0,0,0.05)",
                      fontWeight: answers[step] === i ? 600 : 400,
                    }}
                  >
                    {ans.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {step >= questions.length && results.length > 0 && (
            <div className="p-6 md:p-8 rounded-[28px] bg-white/80 border border-gold/[0.06] backdrop-blur-sm">
              <div className="text-center mb-5">
                <div className="text-[28px] mb-2">✨</div>
                <h3 className="font-serif text-[22px] font-bold text-[#141C28] mb-1">
                  Вам подойдёт
                </h3>
                <p className="text-[13px] text-[#6B7280]">
                  На основе ваших ответов
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-5">
                {results.map((d, i) => (
                  <Link
                    key={d.id}
                    href={`/${d.slug}`}
                    className="flex items-center gap-4 p-4 rounded-2xl no-underline transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      background: i === 0 ? `${d.color}08` : "white",
                      border: `1.5px solid ${d.color}${i === 0 ? "20" : "10"}`,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.logo}
                      alt={d.name}
                      className="w-14 h-14 rounded-xl object-cover bg-white flex-shrink-0"
                      style={{ border: `2px solid ${d.color}15` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#141C28]">{d.name}</span>
                        {i === 0 && (
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-lg font-semibold"
                            style={{ background: `${d.color}15`, color: d.color }}
                          >
                            Лучший выбор
                          </span>
                        )}
                      </div>
                      <div className="text-[13px] text-[#6B7280] mt-0.5 leading-snug">{d.tagline}</div>
                    </div>
                    <span className="text-[16px] opacity-40" style={{ color: d.color }}>→</span>
                  </Link>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="flex-1 py-3 rounded-xl text-[13px] font-medium text-[#6B7280] border border-black/[0.06] hover:bg-black/[0.02] transition-colors"
                >
                  Пройти заново
                </button>
                <a
                  href="#directions"
                  className="flex-1 py-3 rounded-xl text-[13px] font-semibold text-center no-underline transition-colors"
                  style={{ background: "rgba(155,123,79,0.06)", color: "#7A5F3A" }}
                >
                  Все направления
                </a>
              </div>
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
