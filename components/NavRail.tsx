"use client";

import { Chapter, Part } from "@/lib/types";
import { useState } from "react";

interface NavRailProps {
  chapters: Chapter[];
  parts: Part[];
  activeSlug?: string;
  currentChapter?: Chapter;
  currentPart?: Part;
}

export default function NavRail({
  chapters,
  parts,
  activeSlug,
  currentChapter,
  currentPart,
}: NavRailProps) {
  const [showTOC, setShowTOC] = useState(false);

  const handleClick = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${slug}`);
      setShowTOC(false);
    }
  };

  const introduction = chapters.find((chapter) => chapter.slug === "introduction");
  const conclusion = chapters.find((chapter) => chapter.slug === "conclusion");
  const chaptersByPart = new Map<number, Chapter[]>();

  chapters.forEach((chapter) => {
    if (chapter.partId) {
      if (!chaptersByPart.has(chapter.partId)) {
        chaptersByPart.set(chapter.partId, []);
      }
      chaptersByPart.get(chapter.partId)!.push(chapter);
    }
  });

  // Get next 5 chapters after current chapter
  const getUpcomingChapters = () => {
    if (!currentChapter) return [];
    const currentIndex = chapters.findIndex((ch) => ch.id === currentChapter.id);
    if (currentIndex === -1) return [];
    
    const upcoming = chapters.slice(currentIndex + 1, currentIndex + 6);
    // Filter out introduction/conclusion from upcoming chapters
    return upcoming.filter((ch) => ch.slug !== "introduction" && ch.slug !== "conclusion");
  };

  const upcomingChapters = getUpcomingChapters();

  return (
    <>
      {/* Thin Navigation Rail */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-16 flex-col items-center py-8 z-10">
        <div className="flex flex-col items-center gap-4">
          {/* Book Title - Vertical */}
          <div className="writing-vertical-rl text-xs font-sans font-semibold text-foreground/60 uppercase tracking-wider">
            THE CRAFTSMAN&apos;S WAY
          </div>

          {/* Current Part/Section Label - Vertical */}
          {currentPart && (
            <div className="writing-vertical-rl text-[10px] font-sans text-foreground/40 uppercase tracking-wider mt-2">
              {currentPart.label}
            </div>
          )}
          {!currentPart && currentChapter && currentChapter.slug === "introduction" && (
            <div className="writing-vertical-rl text-[10px] font-sans text-foreground/40 uppercase tracking-wider mt-2">
              Introduction
            </div>
          )}
          {!currentPart && currentChapter && currentChapter.slug === "conclusion" && (
            <div className="writing-vertical-rl text-[10px] font-sans text-foreground/40 uppercase tracking-wider mt-2">
              Conclusion
            </div>
          )}

          {/* Chapter Number - Vertical (hide for introduction/conclusion to avoid duplication) */}
          {currentChapter && currentChapter.slug !== "introduction" && currentChapter.slug !== "conclusion" && (
            <div className="writing-vertical-rl text-[10px] font-mono text-foreground/30 mt-2">
              {currentChapter.label}
            </div>
          )}

          {/* Upcoming Chapters - Vertical */}
          {upcomingChapters.length > 0 && (
            <div className="flex flex-col items-center gap-2 mt-4">
              {upcomingChapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => handleClick(chapter.slug)}
                  className="writing-vertical-rl text-[10px] font-mono text-foreground/20 hover:text-foreground/40 transition-colors"
                  aria-label={`Go to ${chapter.title}`}
                >
                  {chapter.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Full TOC Overlay */}
      {showTOC && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto"
          onClick={() => setShowTOC(false)}
        >
          <div className="max-w-2xl mx-auto py-24 px-8">
            <div className="mb-16">
              <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
                THE CRAFTSMAN&apos;S WAY
              </h1>
              <p className="text-sm font-sans text-foreground-muted">
                Survival Principles for Mastery When the System Is Rigged for Quitters
              </p>
            </div>
            <nav className="space-y-8">
              {introduction && (
                <div>
                  <button
                    onClick={() => handleClick(introduction.slug)}
                    className={`text-left text-base font-serif transition-colors hover:text-foreground ${
                      activeSlug === introduction.slug
                        ? "font-semibold text-foreground"
                        : "text-foreground-muted"
                    }`}
                  >
                    {introduction.label}
                  </button>
                </div>
              )}
              {parts.map((part) => {
                const partChapters = chaptersByPart.get(part.id) || [];
                if (partChapters.length === 0) return null;

                return (
                  <div key={part.id} className="space-y-3">
                    <div className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                      {part.label}: {part.title}
                    </div>
                    <ul className="space-y-2 pl-4">
                      {partChapters.map((chapter) => (
                        <li key={chapter.id}>
                          <button
                            onClick={() => handleClick(chapter.slug)}
                            className={`text-left text-base font-serif transition-colors hover:text-foreground ${
                              activeSlug === chapter.slug
                                ? "font-semibold text-foreground"
                                : "text-foreground-muted"
                            }`}
                          >
                            <span className="text-xs font-mono mr-2">{chapter.label}</span>
                            {chapter.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              {conclusion && (
                <div>
                  <button
                    onClick={() => handleClick(conclusion.slug)}
                    className={`text-left text-base font-serif transition-colors hover:text-foreground ${
                      activeSlug === conclusion.slug
                        ? "font-semibold text-foreground"
                        : "text-foreground-muted"
                    }`}
                  >
                    {conclusion.label}
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-foreground/10 z-20">
        <div className="flex flex-col px-4 py-2 gap-1.5">
          <div className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider truncate">
            THE CRAFTSMAN&apos;S WAY
          </div>
          {currentChapter && (
            <div className="text-xs font-serif text-foreground-muted truncate">
              {currentChapter.label} {currentChapter.title}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

