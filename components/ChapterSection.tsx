"use client";

import { Chapter, Part } from "@/lib/types";
import ArtifactHost from "./ArtifactHost";
import { chapters } from "@/lib/chapters";

interface ChapterSectionProps {
  chapter: Chapter;
  parts: Part[];
}

export default function ChapterSection({ chapter, parts }: ChapterSectionProps) {
  const part = chapter.partId ? parts.find((p) => p.id === chapter.partId) : null;
  
  const currentIndex = chapters.findIndex((ch) => ch.id === chapter.id);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const handleNavClick = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${slug}`);
    }
  };

  return (
    <section
      id={chapter.slug}
      className="h-screen flex flex-col px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex-1 flex flex-col py-4 md:py-6 lg:py-8 min-h-0 overflow-hidden">
        {/* Two-zone spread layout: text-left, art-right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 flex-1 min-h-0 lg:items-center overflow-hidden">
          {/* Left zone: Text content */}
          <div className="lg:col-span-7 relative order-2 lg:order-1 flex flex-col lg:justify-center min-h-0 overflow-hidden">
            <div id={`content-${chapter.slug}`} className="w-full flex flex-col overflow-hidden">
              {/* Compact heading stack */}
              <div className="mb-3 md:mb-4 flex-shrink-0">
                {part && (
                  <div className="text-[10px] md:text-xs font-sans text-foreground-muted uppercase tracking-wider mb-1.5 md:mb-2">
                    {part.label}: {part.title}
                  </div>
                )}
                <div className="text-[10px] md:text-xs font-mono text-foreground-muted mb-2 md:mb-3">
                  {chapter.label}
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-semibold mb-2 md:mb-3 lg:mb-4 leading-tight">
                  {chapter.title}
                </h2>
                {chapter.summary && (
                  <p className="text-xs md:text-sm lg:text-base font-serif italic text-foreground-muted leading-relaxed max-w-2xl">
                    {chapter.summary}
                  </p>
                )}
              </div>

              {/* Story content with spacing */}
              <div className="space-y-2 md:space-y-3 lg:space-y-4">
                {chapter.narrative && (
                  <p className="text-sm md:text-base lg:text-lg font-serif leading-relaxed text-foreground-muted max-w-2xl">
                    {chapter.narrative}
                  </p>
                )}
                {chapter.verses.map((verse, index) => (
                  <p
                    key={index}
                    className="text-sm md:text-base lg:text-lg font-serif leading-relaxed max-w-2xl"
                  >
                    {verse}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right zone: Artwork */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end order-1 lg:order-2">
            <div className="w-full max-w-md">
              <ArtifactHost artifactId={chapter.artifactId} />
            </div>
          </div>
        </div>

        {/* Chapter footer with navigation */}
        <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-foreground/10 flex-shrink-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-xs font-sans text-foreground-muted uppercase tracking-wider">
              THE CRAFTSMAN&apos;S WAY
            </div>
            <div className="flex items-center gap-6 text-sm font-serif">
              {prevChapter && (
                <button
                  onClick={() => handleNavClick(prevChapter.slug)}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  ← {prevChapter.label}
                </button>
              )}
              {nextChapter && (
                <button
                  onClick={() => handleNavClick(nextChapter.slug)}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  {nextChapter.label} →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

