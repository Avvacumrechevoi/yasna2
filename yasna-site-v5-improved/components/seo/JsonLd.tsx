import { faqItems } from "@/lib/data";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Русская Ясна",
    url: "https://russkaya-yasna.ru",
    logo: "https://russkaya-yasna.ru/favicon.svg",
    description:
      "Сообщество исследователей русской культуры. 8 направлений: история, литература, астрономия, праздники, язык, здоровье, маршруты, обучение детей.",
    sameAs: [
      "https://t.me/russkaya_yasna",
      "https://vk.com/russkaya_yasna",
      "https://dzen.ru/russkaya_yasna",
      "https://youtube.com/@russkaya_yasna",
    ],
    foundingDate: "2014",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
