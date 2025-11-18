"use client";

import { useEffect, useState } from "react";

interface LineNumbersProps {
  elementId: string;
}

export default function LineNumbers({ elementId }: LineNumbersProps) {
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const updateLineCount = () => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const styles = window.getComputedStyle(element);
      const fontSize = parseFloat(styles.fontSize) || 18;
      const lineHeight = parseFloat(styles.lineHeight) || fontSize * 1.8;
      const height = element.offsetHeight;
      const lines = Math.ceil(height / lineHeight);
      setLineCount(Math.max(1, lines));
    };

    // Initial calculation
    const timeoutId = setTimeout(updateLineCount, 100);
    
    window.addEventListener("resize", updateLineCount);
    const observer = new MutationObserver(() => {
      setTimeout(updateLineCount, 50);
    });
    
    const element = document.getElementById(elementId);
    if (element) {
      observer.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['class', 'style'],
      });
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateLineCount);
      observer.disconnect();
    };
  }, [elementId]);

  return (
    <div className="hidden lg:block absolute left-0 top-0 h-full w-12 text-right pr-2 font-mono text-xs text-foreground/20 select-none pointer-events-none">
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={i} className="leading-[1.8]">
          {(i + 1).toString().padStart(2, "0")}
        </div>
      ))}
    </div>
  );
}

