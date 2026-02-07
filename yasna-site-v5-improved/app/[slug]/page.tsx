import { directions } from "@/lib/data";
import DirectionPageClient from "@/components/direction-page/DirectionPageClient";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return directions.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const d = directions.find((dir) => dir.slug === params.slug);
  if (!d) return {};
  return {
    title: `${d.name} — Русская Ясна`,
    description: d.tagline,
    openGraph: {
      title: `${d.name} — Русская Ясна`,
      description: d.tagline,
      type: "website",
    },
  };
}

export default function DirectionPage({ params }: Props) {
  return <DirectionPageClient slug={params.slug} />;
}
