"use client";

import { useEffect, useRef } from "react";
import { ArtifactProps, ArtifactMetadata } from "./types";

type ArtifactComponent = React.FC<ArtifactProps> & {
  metadata: ArtifactMetadata;
};

function createArtifactComponent(
  Component: React.FC<ArtifactProps>,
  metadata: ArtifactMetadata
): ArtifactComponent {
  (Component as ArtifactComponent).metadata = metadata;
  return Component as ArtifactComponent;
}

// Introduction artifact - emerging grid/waveform
const IntroductionArtifact: React.FC<ArtifactProps> = ({
  width = 550,
  height = 550,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      const gridSize = 40;
      const waveAmplitude = 15;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const offsetX = Math.sin((y / height) * Math.PI * 2 + time) * waveAmplitude;
          const offsetY = Math.cos((x / width) * Math.PI * 2 + time) * waveAmplitude;

          ctx.beginPath();
          ctx.moveTo(x + offsetX, y + offsetY);
          ctx.lineTo(x + gridSize + offsetX, y + offsetY);
          ctx.stroke();
        }
      }

      time += 0.01;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const IntroductionArtifactWithMetadata = createArtifactComponent(IntroductionArtifact, {
  id: "introduction",
  themes: "beginnings, signal through noise, emergence",
  visualization: "A soft, slowly emerging grid or waveform representing the signal cutting through 21st century noise.",
});

// Wabi-Sabi artifact - imperfect form with cracks
const WabiSabiArtifact: React.FC<ArtifactProps> = ({
  width = 550,
  height = 550,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = 150;
      const crackVariation = Math.sin(time * 0.5) * 20;

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;

      // Main circle with imperfections
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius + crackVariation, 0, Math.PI * 2);
      ctx.stroke();

      // Cracks/imperfections
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.2;
        const startX = centerX + Math.cos(angle) * (baseRadius * 0.7);
        const startY = centerY + Math.sin(angle) * (baseRadius * 0.7);
        const endX = centerX + Math.cos(angle) * (baseRadius * 1.3);
        const endY = centerY + Math.sin(angle) * (baseRadius * 1.3);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const WabiSabiArtifactWithMetadata = createArtifactComponent(WabiSabiArtifact, {
  id: "wabi-sabi",
  themes: "imperfection, transience, acceptance of flaws",
  visualization: "Imperfect form that cracks or erodes over time and is subtly re-emphasized, turning flaws into features.",
});

// Shokunin artifact - refining workpieces
const ShokuninArtifact: React.FC<ArtifactProps> = ({
  width = 550,
  height = 550,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const rows = 5;
      const cols = 5;
      const spacing = 80;
      const startX = (width - (cols - 1) * spacing) / 2;
      const startY = (height - (rows - 1) * spacing) / 2;

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = startX + col * spacing;
          const y = startY + row * spacing;
          const refinement = Math.sin(time + row * 0.5 + col * 0.3) * 0.5 + 0.5;
          const size = 20 + refinement * 15;
          const sides = 6 + Math.floor(refinement * 4);

          ctx.beginPath();
          for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const px = x + Math.cos(angle) * size;
            const py = y + Math.sin(angle) * size;
            if (i === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      time += 0.015;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const ShokuninArtifactWithMetadata = createArtifactComponent(ShokuninArtifact, {
  id: "shokunin",
  themes: "craftsmanship, dedication, continuous improvement",
  visualization: "Rows of simple workpieces that grow more refined with each iteration.",
});

// Conclusion artifact - integrative pattern
const ConclusionArtifact: React.FC<ArtifactProps> = ({
  width = 550,
  height = 550,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.4;

      // Multiple overlapping patterns suggesting integration
      for (let layer = 0; layer < 3; layer++) {
        const radius = 80 + layer * 40;
        const rotation = time * (0.1 + layer * 0.05);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        // Grid pattern
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.moveTo(i * radius * 0.5, -radius);
          ctx.lineTo(i * radius * 0.5, radius);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-radius, i * radius * 0.5);
          ctx.lineTo(radius, i * radius * 0.5);
          ctx.stroke();
        }

        // Circular elements
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      time += 0.01;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const ConclusionArtifactWithMetadata = createArtifactComponent(ConclusionArtifact, {
  id: "conclusion",
  themes: "integration, reflection, continuation",
  visualization: "Integrative pattern that hints at all previous motifs, quietly unified.",
});

// Do artifact - path emerging from uncertainty
const DoArtifact: React.FC<ArtifactProps> = ({
  width = 400,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.4;

      const centerY = height / 2;
      const pathLength = width * 0.8;
      const startX = width * 0.1;

      ctx.beginPath();
      for (let x = 0; x < pathLength; x++) {
        const progress = x / pathLength;
        const y = centerY + Math.sin(progress * Math.PI * 4 + time) * (20 * (1 - progress));
        if (x === 0) {
          ctx.moveTo(startX + x, y);
        } else {
          ctx.lineTo(startX + x, y);
        }
      }
      ctx.stroke();

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const DoArtifactWithMetadata = createArtifactComponent(DoArtifact, {
  id: "do",
  themes: "commitment, path, certainty, passion",
  visualization: "A path emerging from uncertainty, commitment taking form before clarity arrives.",
});

// Kaizen artifact - incremental progress
const KaizenArtifact: React.FC<ArtifactProps> = ({
  width = 400,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;

      const steps = 12;
      const stepWidth = width / steps;
      const baseHeight = height * 0.3;

      for (let i = 0; i < steps; i++) {
        const x = i * stepWidth;
        const progress = i / steps;
        const heightVariation = Math.sin(time + i * 0.5) * 10;
        const stepHeight = baseHeight + progress * (height * 0.4) + heightVariation;

        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x, height - stepHeight);
        ctx.lineTo(x + stepWidth * 0.8, height - stepHeight);
        ctx.lineTo(x + stepWidth * 0.8, height);
        ctx.stroke();
      }

      time += 0.015;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const KaizenArtifactWithMetadata = createArtifactComponent(KaizenArtifact, {
  id: "kaizen",
  themes: "continuous improvement, method, competence, meaning",
  visualization: "Incremental progress visualized as small, consistent steps building upward.",
});

// Ma artifact - negative space and pauses
const MaArtifact: React.FC<ArtifactProps> = ({
  width = 400,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      const centerX = width / 2;
      const centerY = height / 2;
      const circles = 5;

      for (let i = 0; i < circles; i++) {
        const radius = 30 + i * 40;
        const pulse = Math.sin(time * 0.5 + i * 0.3) * 0.2 + 1;
        const currentRadius = radius * pulse;

        ctx.beginPath();
        ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      time += 0.01;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const MaArtifactWithMetadata = createArtifactComponent(MaArtifact, {
  id: "ma",
  themes: "rest, emptiness, burnout prevention, strategic pause",
  visualization: "Negative space and pauses visualized as essential structural elements.",
});

// Ganbaru artifact - steady continuity
const GanbaruArtifact: React.FC<ArtifactProps> = ({
  width = 400,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5;

      const lines = 8;
      const lineSpacing = height / (lines + 1);

      for (let i = 0; i < lines; i++) {
        const y = lineSpacing * (i + 1);
        const waveOffset = Math.sin(time + i * 0.5) * 15;
        const resistance = Math.sin(time * 0.3 + i * 0.2) * 5;

        ctx.beginPath();
        ctx.moveTo(0, y + waveOffset);
        for (let x = 0; x < width; x += 5) {
          const progress = x / width;
          const wave = Math.sin(progress * Math.PI * 4 + time + i * 0.3) * (10 - progress * 5);
          ctx.lineTo(x, y + waveOffset + wave + resistance * progress);
        }
        ctx.stroke();
      }

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const GanbaruArtifactWithMetadata = createArtifactComponent(GanbaruArtifact, {
  id: "ganbaru",
  themes: "persistence, continuation, showing up, minimum viable presence",
  visualization: "Steady, unbroken continuity despite obstacles and resistance.",
});

// Fudoshin artifact - calm center point
const FudoshinArtifact: React.FC<ArtifactProps> = ({
  width = 400,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Chaotic noise around
      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.2;

      for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 2 + time;
        const distance = 80 + Math.sin(time * 2 + i) * 30;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const noiseX = x + Math.sin(time * 3 + i) * 20;
        const noiseY = y + Math.cos(time * 3 + i) * 20;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(noiseX, noiseY);
        ctx.stroke();
      }

      // Calm center point
      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.stroke();

      time += 0.01;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const FudoshinArtifactWithMetadata = createArtifactComponent(FudoshinArtifact, {
  id: "fudoshin",
  themes: "clarity, focus, noise, centeredness",
  visualization: "A calm center point surrounded by chaotic noise that doesn't affect the core.",
});

// Shibumi artifact - refined simplicity
const ShibumiArtifact: React.FC<ArtifactProps> = ({
  width = 400,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.4;

      // Complex pattern that simplifies
      const layers = 4;
      for (let layer = 0; layer < layers; layer++) {
        const radius = 40 + layer * 35;
        const complexity = Math.max(1, layers - layer);
        const sides = 3 + complexity * 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(time * 0.02 * (layer + 1));

        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2;
          const px = Math.cos(angle) * radius;
          const py = Math.sin(angle) * radius;
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      }

      time += 0.01;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const ShibumiArtifactWithMetadata = createArtifactComponent(ShibumiArtifact, {
  id: "shibumi",
  themes: "simplicity, refinement, subtraction, essence",
  visualization: "Complexity gradually refined away to reveal essential form.",
});

// Mushin artifact - fluid transformation
const MushinArtifact: React.FC<ArtifactProps> = ({
  width = 400,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5;

      const centerX = width / 2;
      const centerY = height / 2;
      const points = 8;

      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2 + time * 0.3;
        const baseRadius = 80;
        const variation = Math.sin(time * 2 + i * 0.5) * 30;
        const radius = baseRadius + variation;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();

      // Inner core that stays stable
      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.stroke();

      time += 0.015;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const MushinArtifactWithMetadata = createArtifactComponent(MushinArtifact, {
  id: "mushin",
  themes: "adaptation, non-attachment, evolution, principles",
  visualization: "Fluid transformation maintaining core structure while adapting to new forms.",
});

// Registry
export const artifactRegistry: Record<string, ArtifactComponent> = {
  introduction: IntroductionArtifactWithMetadata,
  do: DoArtifactWithMetadata,
  "wabi-sabi": WabiSabiArtifactWithMetadata,
  kaizen: KaizenArtifactWithMetadata,
  shokunin: ShokuninArtifactWithMetadata,
  ma: MaArtifactWithMetadata,
  ganbaru: GanbaruArtifactWithMetadata,
  fudoshin: FudoshinArtifactWithMetadata,
  shibumi: ShibumiArtifactWithMetadata,
  mushin: MushinArtifactWithMetadata,
  conclusion: ConclusionArtifactWithMetadata,
};

