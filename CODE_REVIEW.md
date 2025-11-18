# Code Review: ARIA & Scalability

## Overview

This review focuses on the accessibility (ARIA, semantic HTML) and scalability (responsiveness, device support) of the current codebase. The application uses Next.js with Tailwind CSS.

## Accessibility (ARIA & Semantics)

### 1. Semantic Structure & Headings
- **Missing Main Heading (`h1`)**: The main view (`NavRail` sidebar + `ChapterSection` content) lacks a visible `<h1>` element when the TOC is closed. The "Book Title" in the sidebar is a `div`.
  - **Recommendation**: Change the book title in `NavRail.tsx` (lines 64-66) to an `<h1>` or ensure a visually hidden `<h1>` exists for the main document structure.
- **Landmarks**:
  - `NavRail.tsx` uses `<aside>` and `<nav>` (in TOC). This is good.
  - `ChapterSection.tsx` uses `<section>`. This is good.
  - `page.tsx` uses `<main>`. This is good.

### 2. Interactive Elements
- **Clickable Divs**: In `NavRail.tsx`, the TOC overlay backdrop uses a `div` with an `onClick` handler (lines 112-115).
  - **Issue**: This is inaccessible to keyboard users and screen readers.
  - **Recommendation**: Use a `<button>` or add `role="button"`, `tabIndex={0}`, and `onKeyDown` handlers. Alternatively, use a native `<dialog>` element.
- **Current State Indication**:
  - In `NavRail.tsx` (TOC overlay) and `ChapterIndex.tsx`, the active chapter is visually indicated (bold text) but not programmatically.
  - **Recommendation**: Add `aria-current="true"` or `aria-current="step"` to the active button.

### 3. Contrast & Readability
- **Low Contrast Text**: The sidebar uses `text-foreground/60`, `/40`, and `/30`.
  - **Issue**: These opacity values might result in contrast ratios below WCAG AA standards, especially for small text.
  - **Recommendation**: Verify contrast ratios. Ensure text is at least 4.5:1 for normal text and 3:1 for large text.
- **Vertical Text**: The `writing-vertical-rl` mode in `NavRail.tsx` is stylistically interesting but can be difficult for some users to read. Ensure it is tested with screen readers.

### 4. Line Numbers
- **Screen Reader Noise**: `LineNumbers.tsx` generates a list of numbers for visual decoration.
  - **Issue**: Screen readers may announce these numbers, creating significant noise.
  - **Recommendation**: Add `aria-hidden="true"` to the container `div` in `LineNumbers.tsx`.

### 5. Images & Artifacts
- **Missing Alt Text**: `ArtifactHost` renders visual content.
  - **Recommendation**: Ensure the rendered artifacts (SVGs/Canvases) have appropriate `aria-label` or `title` attributes if they convey meaning. If purely decorative, ensure they are hidden from assistive technology.

## Scalability & Responsiveness

### 1. Viewport Height Constraints
- **`h-screen` & `overflow-hidden`**: `ChapterSection.tsx` uses `h-screen` and `overflow-hidden` (line 30).
  - **Risk**: This assumes the content will always fit within the viewport. On small screens, landscape mobile devices, or when users increase font size (browser zoom or OS settings), content **will be cut off**.
  - **Recommendation**: Avoid `h-screen` for content containers. Use `min-h-screen` instead. Remove `overflow-hidden` from the main text container to allow natural scrolling.

### 2. Typography Units
- **Pixels for Font Size**: `globals.css` sets `font-size: 18px` on the body.
  - **Issue**: Pixels do not scale if the user changes their default browser font size.
  - **Recommendation**: Use `rem` units. For example, set `font-size: 1.125rem` (assuming 16px base).

### 3. Responsive Breakpoints
- **Mobile Navigation**: The mobile header (`lg:hidden` in `NavRail.tsx`) is a simple `div`.
  - **Recommendation**: It should be a `<header>` containing a `<nav>`.
- **Layout Shift**: The main content uses `lg:pl-16`. Ensure that the `NavRail` width matches this exactly to prevent layout shifts or overlaps.

### 4. Performance
- **Scroll Event Listener**: `page.tsx` adds a `scroll` event listener to `window`.
  - **Issue**: This fires on every frame during scrolling, which can impact performance on low-end devices.
  - **Recommendation**: Debounce or throttle the `handleScroll` function, or use `IntersectionObserver` for more efficient scroll tracking.

## Summary of Action Items

1.  **Fix `onClick` on `div`** in `NavRail.tsx`.
2.  **Add `aria-hidden="true"`** to `LineNumbers.tsx`.
3.  **Replace `h-screen` / `overflow-hidden`** in `ChapterSection.tsx` with a more flexible layout (`min-h-screen`).
4.  **Convert `px` to `rem`** in `globals.css`.
5.  **Add `aria-current`** to active navigation links.
6.  **Optimize Scroll Listener** in `page.tsx` (use `IntersectionObserver`).
