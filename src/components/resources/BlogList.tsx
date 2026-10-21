"use client";

import Link from "next/link";
import { useState } from "react";
import { Chips } from "@/components/blocks";
import { allTags, formatDate, posts, readingTime } from "@/data/blog";

export function BlogList() {
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? posts : posts.filter((p) => p.tags.includes(tag));
  return (
    <div>
      <Chips label="Filter articles by tag" options={allTags} value={tag} onChange={setTag} />
      <p role="status" className="mt-4 text-base text-ink-3">
        Showing {shown.length} of {posts.length} articles
      </p>
      <ul className="mt-4 grid gap-5 md:grid-cols-2">
        {shown.map((p) => (
          <li key={p.slug}>
            <article className="group relative flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-colors hover:border-brand/40">
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-brand-tint px-3 py-0.5 text-sm text-navy">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-2xl font-medium leading-snug text-ink">
                <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-brand">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-lg text-ink-2">{p.excerpt}</p>
              <p className="mt-4 text-base text-ink-3">
                {formatDate(p.date)} · {readingTime(p)} min read
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
