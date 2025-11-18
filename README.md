# The Craftsman's Way

A minimalist digital book exploring Japanese philosophy and craftsmanship, inspired by the contemplative aesthetic of `thewayofcode.com`.

## Design System

### Typography

- **Serif (Body)**: Crimson Pro - Used for all body text and chapter titles, providing a literary, premium reading experience
- **Sans-serif (UI)**: Inter - Used for navigation, labels, and UI elements
- **Monospace (Code-like)**: Courier Prime - Used for chapter numbers, line numbers, and subtle code references

**Type Scale:**
- Body text: 18px base, 1.8 line-height
- Chapter titles: 2xl (mobile) → 5xl (desktop)
- Summary/italic: base → lg
- UI labels: xs (12px)

### Color Palette

- **Background**: `#F0EEE6` - Warm, off-white parchment tone
- **Foreground**: `#222222` - Dark gray for primary text
- **Foreground Muted**: `#666666` - Medium gray for secondary text and subtle elements

### Layout Principles

- **Single-page spread feel**: Each chapter feels like a composed page with generous margins
- **Two-zone structure**: Artwork on left (5 columns), text content on right (7 columns) on desktop
- **Thin navigation rail**: 64px wide vertical rail on desktop showing book title, current part/chapter, and TOC trigger
- **Line numbers**: Decorative line numbers in left margin (desktop only) for code-editor aesthetic
- **Generous spacing**: 24-32px vertical padding, 6-8px spacing between paragraphs

### Responsive Breakpoints

- **Mobile**: Stacked layout, artwork above text, mobile nav bar at top
- **Tablet (md)**: Improved spacing and typography scale
- **Desktop (lg)**: Full two-zone spread with navigation rail and line numbers

### Components

- **NavRail**: Thin vertical navigation with TOC overlay
- **ChapterSection**: Main chapter template with artwork, text, and navigation
- **ArtifactHost**: Container for generative chapter artwork
- **LineNumbers**: Decorative line number component (desktop only)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app router pages and layout
- `components/` - React components (NavRail, ChapterSection, ArtifactHost, LineNumbers)
- `lib/` - Data models and utilities (chapters, parts, types, artifacts)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
