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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0,
      }
    );

    chapters.forEach((ch) => {
      const element = document.getElementById(ch.slug);
      if (element) observer.observe(element);
    });

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
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
