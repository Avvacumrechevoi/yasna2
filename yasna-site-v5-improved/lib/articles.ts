import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  type: string;
  date: string;
  duration: string;
  direction: string;
  cover?: string;
};

export type Article = ArticleMeta & { html: string };

function readSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function parse(slug: string): Article | null {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    title: data.title || slug,
    type: data.type || "Статья",
    date: data.date || "",
    duration: data.duration || "",
    direction: data.direction || "",
    cover: data.cover || "",
    html: marked.parse(content) as string,
  };
}

export function getAllArticleSlugs(): string[] {
  return readSlugs();
}

export function getArticle(slug: string): Article | null {
  return parse(slug);
}

export function getArticlesByDirection(direction: string): ArticleMeta[] {
  return readSlugs()
    .map(parse)
    .filter((a): a is Article => !!a && a.direction === direction)
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      type: a.type,
      date: a.date,
      duration: a.duration,
      direction: a.direction,
      cover: a.cover,
    }));
}
