"use client";

import { Chapter, Part } from "@/lib/types";

interface ChapterIndexProps {
  chapters: Chapter[];
  parts: Part[];
  activeSlug?: string;
}

export default function ChapterIndex({ chapters, parts, activeSlug }: ChapterIndexProps) {
  const handleClick = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${slug}`);
    }
  };

  // Group chapters by part
  const chaptersByPart = new Map<number, Chapter[]>();

  chapters.forEach((chapter) => {
    if (chapter.partId) {
      if (!chaptersByPart.has(chapter.partId)) {
        chaptersByPart.set(chapter.partId, []);
      }
      chaptersByPart.get(chapter.partId)!.push(chapter);
    }
  });

  const introduction = chapters.find((chapter) => chapter.slug === "introduction");
  const conclusion = chapters.find((chapter) => chapter.slug === "conclusion");

  return (
    <nav className="sticky top-0 h-screen overflow-y-auto py-16 px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-lg font-bold text-foreground mb-2 leading-tight">
          THE CRAFTSMAN&apos;S WAY
        </h1>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Survival Principles for Mastery When the System Is Rigged for Quitters
        </p>
      </div>
      <ul className="flex flex-col gap-4">
        {introduction && (
          <li>
            <button
              onClick={() => handleClick(introduction.slug)}
              className={`text-left text-sm transition-colors hover:text-foreground ${
                activeSlug === introduction.slug
                  ? "font-bold text-foreground"
                  : "text-foreground-muted"
              }`}
            >
              {introduction.label}
            </button>
          </li>
        )}
        {parts.map((part) => {
          const partChapters = chaptersByPart.get(part.id) || [];
          if (partChapters.length === 0) return null;

          return (
            <li key={part.id} className="flex flex-col gap-2">
              <div className="text-xs font-bold text-foreground uppercase tracking-wider">
                {part.label}: {part.title}
              </div>
              <ul className="flex flex-col gap-2 pl-3">
                {partChapters.map((chapter) => (
                  <li key={chapter.id}>
                    <button
                      onClick={() => handleClick(chapter.slug)}
                      className={`text-left text-sm transition-colors hover:text-foreground ${
                        activeSlug === chapter.slug
                          ? "font-bold text-foreground"
                          : "text-foreground-muted"
                      }`}
                    >
                      {chapter.label}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
        {conclusion && (
          <li>
            <button
              onClick={() => handleClick(conclusion.slug)}
              className={`text-left text-sm transition-colors hover:text-foreground ${
                activeSlug === conclusion.slug
                  ? "font-bold text-foreground"
                  : "text-foreground-muted"
              }`}
            >
              {conclusion.label}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

