"use client";

import { artifactRegistry } from "@/lib/artifacts";

interface ArtifactHostProps {
  artifactId: string;
  alt?: string;
}

export default function ArtifactHost({ artifactId, alt }: ArtifactHostProps) {
  const Artifact = artifactRegistry[artifactId];

  if (!Artifact) {
    return (
      <div className="w-full aspect-square bg-background-subtle flex items-center justify-center text-foreground-muted text-sm p-4">
        Artifact not found: {artifactId}
      </div>
    );
  }

  return (
    <div
      className="w-full aspect-square bg-background-subtle flex items-center justify-center"
      role="img"
      aria-label={alt || `Artifact ${artifactId}`}
    >
      <div className="w-full h-full" aria-hidden="true">
        <Artifact width={400} height={400} />
      </div>
    </div>
  );
}

