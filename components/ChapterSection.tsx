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

  const isIntroduction = chapter.slug === "introduction";

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
      className="min-h-[100svh] flex flex-col px-6 md:px-12 lg:px-24 py-8 sm:py-10 lg:py-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex-1 flex flex-col py-4 md:py-6 lg:py-8">
        <div
          className={`flex-1 flex flex-col ${
            isIntroduction ? "justify-start" : "justify-center"
          }`}
        >
          {/* Two-zone spread layout: text-left, art-right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 lg:items-center">
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
                  <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-serif font-semibold mb-1.5 md:mb-3 lg:mb-4 leading-snug md:leading-tight">
                    {chapter.title}
                  </h2>
                </div>

                {/* Story content with spacing */}
                <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4">
                  {chapter.narrative && (
                    <p className="text-[12px] sm:text-[13px] md:text-base lg:text-lg font-serif leading-normal md:leading-relaxed text-foreground-muted max-w-2xl">
                      {chapter.narrative}
                    </p>
                  )}
                  {chapter.verses.map((verse, index) => (
                    <p
                      key={index}
                      className="text-[12px] sm:text-[13px] md:text-base lg:text-lg font-serif leading-normal md:leading-relaxed max-w-2xl"
                    >
                      {verse}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right zone: Artwork */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end order-1 lg:order-2">
              <div className="w-[min(70vw,40svh)] sm:w-full max-w-md">
                <ArtifactHost
                  artifactId={chapter.artifactId}
                  alt={chapter.visualizationDescription || `Illustration for ${chapter.title}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chapter footer with navigation */}
        <div className="mt-8 md:mt-10 pt-3 md:pt-4 border-t border-foreground/10 flex-shrink-0">
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

