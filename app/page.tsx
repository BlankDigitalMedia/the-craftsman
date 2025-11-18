"use client";

import { useEffect, useState } from "react";
import { chapters } from "@/lib/chapters";
import { parts } from "@/lib/parts";
import NavRail from "@/components/NavRail";
import ChapterSection from "@/components/ChapterSection";

export default function Home() {
  const [activeSlug, setActiveSlug] = useState<string | undefined>();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSlug(hash);
      }
    };

    const handleScroll = () => {
      const sections = chapters.map((ch) => {
        const element = document.getElementById(ch.slug);
        if (element) {
          const rect = element.getBoundingClientRect();
          return { slug: ch.slug, top: rect.top, bottom: rect.bottom };
        }
        return null;
      }).filter(Boolean) as { slug: string; top: number; bottom: number }[];

      const current = sections.find(
        (s) => s.top <= 200 && s.bottom >= 200
      );
      if (current) {
        setActiveSlug(current.slug);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentChapter = chapters.find((ch) => ch.slug === activeSlug);
  const currentPart = currentChapter?.partId
    ? parts.find((p) => p.id === currentChapter.partId)
    : undefined;

  return (
    <div className="min-h-screen">
      <NavRail
        chapters={chapters}
        parts={parts}
        activeSlug={activeSlug}
        currentChapter={currentChapter}
        currentPart={currentPart}
      />
      <main className="lg:pl-16 pt-12 lg:pt-0">
        {chapters.map((chapter) => (
          <ChapterSection key={chapter.id} chapter={chapter} parts={parts} />
        ))}
      </main>
    </div>
  );
}
