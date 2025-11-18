"use client";

import { artifactRegistry } from "@/lib/artifacts";

interface ArtifactHostProps {
  artifactId: string;
}

export default function ArtifactHost({ artifactId }: ArtifactHostProps) {
  const Artifact = artifactRegistry[artifactId];

  if (!Artifact) {
    return (
      <div className="w-full aspect-square bg-background flex items-center justify-center text-foreground-muted text-sm p-4">
        Artifact not found: {artifactId}
      </div>
    );
  }

  return (
    <div className="w-full aspect-square bg-background flex items-center justify-center">
      <div className="w-full h-full">
        <Artifact width={400} height={400} />
      </div>
    </div>
  );
}

