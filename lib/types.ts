export interface Part {
  id: number;
  slug: string;
  label: string;
  title: string;
}

export interface Chapter {
  id: number;
  slug: string;
  label: string;
  title: string;
  summary: string;
  verses: string[];
  themes: string;
  visualizationDescription: string;
  artifactId: string;
  defaultPrompt?: string;
  promptSuggestions?: string[];
  partId?: number;
  narrative?: string;
}

export interface ArtifactMetadata {
  id: string;
  themes: string;
  visualization: string;
  promptSuggestion?: string;
}

export interface ArtifactProps {
  width?: number;
  height?: number;
  seed?: number;
}

