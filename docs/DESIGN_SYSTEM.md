# Design System — A Little World For You

## Art direction
Cute romantic miniature-world experience. The result should feel like a small handcrafted world, not a generic AI-generated landing page.

## Tokens
```css
:root {
  --vanilla: #FFF6E7;
  --butter: #F7D879;
  --blush: #F2AFC0;
  --sage: #A8B99B;
  --cocoa: #80624E;
  --ink: #493B32;
  --paper: #FFFAF2;
}
```

## Typography
- Display: Playfair Display
- Body: DM Sans
- Handwritten accent: Caveat

## Layout
- Mobile-first.
- Use generous spacing and a clear visual hierarchy.
- Avoid identical card grids in every section.
- Keep the 3D character as the visual anchor.
- Use editorial composition and imperfect scrapbook details sparingly.

## Motion
- GSAP for choreographed scene and scroll motion.
- Motion for UI micro-interactions.
- Character animation must come from actual rigged model clips.
- Keep cursor-follow motion subtle.
- Honor reduced-motion settings.

## Anti-patterns
- Generic purple/pink gradient backgrounds.
- Excessive glassmorphism.
- Too many floating hearts and sparkles.
- Random 3D icons unrelated to the story.
- Repetitive rounded cards for every content type.
- Static character images presented as interactive 3D.