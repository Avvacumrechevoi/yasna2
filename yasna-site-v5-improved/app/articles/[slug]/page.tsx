import { getAllArticleSlugs, getArticle } from "@/lib/articles";
import { directions } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: `${a.title} — Русская Ясна`,
    description: a.title,
    openGraph: { title: a.title, type: "article" },
  };
}

export default function ArticlePage({ params }: Props) {
  const a = getArticle(params.slug);
  if (!a) notFound();
  const dir = directions.find((d) => d.slug === a.direction);
  const color = dir?.color || "#9B7B4F";

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1F2937]">
      <header className="sticky top-0 z-50 bg-[#FAF8F4]/92 backdrop-blur-xl border-b border-black/[0.05]">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold font-serif text-[#6B5530] hover:text-[#8B6914] transition-colors">
            ← Русская Ясна
          </Link>
          {dir && (
            <Link href={`/${dir.slug}`} className="px-4 py-2 rounded-full text-[13px] font-semibold text-white transition-all hover:-translate-y-px"
              style={{ background: `linear-gradient(135deg,${color},${color}cc)` }}>
              {dir.name}
            </Link>
          )}
        </div>
      </header>

      <article className="max-w-[720px] mx-auto px-5 md:px-8 py-9 md:py-12">
        <nav className="flex items-center gap-2 text-[12.5px] text-[#6B7280] mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#6B5530] transition-colors">Главная</Link>
          {dir && (<>
            <span className="text-[10px]">›</span>
            <Link href={`/${dir.slug}`} className="hover:text-[#6B5530] transition-colors">{dir.name}</Link>
          </>)}
          <span className="text-[10px]">›</span>
          <span className="font-semibold" style={{ color }}>{a.type}</span>
        </nav>

        <div className="flex items-center gap-2 mb-3 text-[12.5px] text-[#6B7280]">
          <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold" style={{ color, background: `${color}12` }}>{a.type}</span>
          {a.date && <span>{a.date}</span>}
          {a.duration && <span>· {a.duration}</span>}
        </div>

        <h1 className="font-serif text-[30px] md:text-[40px] font-bold leading-[1.15] text-[#141C28] mb-6">{a.title}</h1>

        {a.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.cover} alt={a.title} className="w-full aspect-[16/9] object-cover rounded-2xl border border-black/[0.04] mb-8" />
        )}

        <div className="article-body" dangerouslySetInnerHTML={{ __html: a.html }} />

        {dir && (
          <div className="mt-12 p-7 rounded-3xl text-center" style={{ background: `linear-gradient(135deg,${color}0e,${color}05)` }}>
            <p className="text-[15px] text-[#374151] mb-4">Материал направления «{dir.name}»</p>
            <Link href={`/${dir.slug}`} className="inline-block px-7 py-3.5 rounded-2xl text-[14px] font-semibold text-white no-underline transition-all hover:-translate-y-px"
              style={{ background: `linear-gradient(135deg,${color},${color}cc)` }}>
              Все материалы направления →
            </Link>
          </div>
        )}
      </article>

      <footer className="border-t border-black/[0.05] mt-5">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 py-5">
          <span className="text-[14px] font-bold font-serif text-[#6B5530]">
            Русская Ясна <span className="text-[11px] text-[#6B7280] font-normal font-sans">© 2026</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
