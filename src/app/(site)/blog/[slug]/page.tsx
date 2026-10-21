import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSection, Prose } from "@/components/PageHero";
import { SubscribeForm } from "@/components/resources/SubscribeForm";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { formatDate, getPost, posts, readingTime } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: `${post?.title ?? "Article"} — InvoNexa`, description: post?.excerpt };
}

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.p);

  return (
    <>
      <header className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <Link href="/blog" className="text-base text-brand underline focus-visible:outline-2 focus-visible:outline-brand">
            ← All articles
          </Link>
          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-brand-tint px-3 py-0.5 text-sm text-navy">{t}</span>
              ))}
              <span className="rounded-full bg-attention-soft px-2.5 py-0.5 text-sm text-attention">Sample content</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-ink-3">
              {post.author} · {formatDate(post.date)} · {readingTime(post)} min read
            </p>
          </Reveal>
        </Container>
      </header>

      <PageSection>
        <article>
          <Prose>
            {post.body.map((b, i) =>
              b.t === "h2" ? (
                <h2 key={i}>{b.text}</h2>
              ) : b.t === "ul" ? (
                <ul key={i} className="space-y-2">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.text}</p>
              ),
            )}
          </Prose>
        </article>
      </PageSection>

      <PageSection className="bg-fill/50">
        <h2 className="text-3xl font-medium tracking-tight">Keep reading</h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <article className="relative h-full rounded-xl border border-line bg-white p-6 hover:border-brand/40">
                <h3 className="text-xl font-medium leading-snug">
                  <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-brand">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 text-base text-ink-2">{p.excerpt}</p>
                <p className="mt-3 text-sm text-ink-3">{readingTime(p)} min read</p>
              </article>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection>
        <div className="mx-auto max-w-xl">
          <SubscribeForm topic="blog" title="Enjoyed this? Get the next one." text="New articles straight to your inbox." />
        </div>
      </PageSection>
    </>
  );
}

/** Params are read inside Suspense so the static shell can prerender instantly (Cache Components). */
export default function BlogPostPage(props: Parameters<typeof BlogPost>[0]) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <BlogPost {...props} />
    </Suspense>
  );
}
