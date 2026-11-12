# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## A Little World For You ♡

- Version: 1.0
- Status: Development baseline
- Product type: Personal romantic surprise website
- Primary device: Mobile, with desktop support
- Development environment: Antigravity
- Language: Indonesian
- Primary character: 3D animated Nailong-style character (use only authorized assets)

---

## 1. Product Overview

A Little World For You is a small interactive romantic experience created as a digital gift for the user's partner. The visitor explores a sequence of cozy scenes guided by a cute yellow 3D dinosaur character. The experience combines a playful miniature-world aesthetic, personal memories, a love letter, cheerful instrumental music, and a final surprise.

This is not a conventional business landing page. It should feel personal, charming, intimate, and thoughtfully art-directed.

## 2. Product Goals

1. Make the recipient smile and feel appreciated.
2. Make the 3D character feel present, responsive, and expressive.
3. Tell a short story through a sequence of scenes.
4. Present real personal photos and a personal letter elegantly.
5. Work smoothly on common mobile phones and desktop browsers.
6. Keep the project maintainable and easy to personalize.

## 3. Non-Goals

- No user accounts or authentication.
- No payment, e-commerce, or analytics dashboard.
- No public social feed or comments.
- No backend/database requirement for the initial release.
- No claim that a static image is a fully animated 3D character.
- No copying proprietary character model files without permission.

## 4. Target Audience

One intended recipient: the user's romantic partner.

The experience should be understandable without instructions. Interaction hints should be short, friendly, and optional.

## 5. Experience Principles

- Warm over flashy.
- Personal over generic.
- Playful over childish.
- Crafted over template-like.
- Smooth over excessively animated.
- Mobile-first and accessible.

## 6. Visual Design System

### 6.1 Color palette
- Vanilla Cream: `#FFF6E7` — primary background.
- Butter Yellow: `#F7D879` — character accents and highlights.
- Blush Pink: `#F2AFC0` — romantic accent.
- Sage Green: `#A8B99B` — garden/environment accent.
- Cocoa Brown: `#80624E` — text and primary controls.
- Ink: `#493B32` — primary text.
- Paper: `#FFFAF2` — cards and letter surface.

Do not introduce unrelated saturated colors without a documented reason.

### 6.2 Typography
- Display: Playfair Display or a similar editorial serif.
- Body: DM Sans or a readable neutral sans-serif.
- Handwritten accents: Caveat, used sparingly.
- Avoid using more than three font families.

### 6.3 Visual language
- Soft 3D materials, warm diffuse lighting, rounded organic shapes.
- Miniature diorama environments.
- Paper, sticker, polaroid, and scrapbook-inspired details.
- Subtle grain/texture may be used only if it does not hurt performance.
- Avoid excessive glassmorphism, generic purple-pink gradients, neon, and repeated identical cards.

## 7. Story and Information Architecture

### Scene 1 — Welcome
Purpose: Introduce the experience.
- Nailong starts in an idle/sleeping or resting pose.
- On entry, play a wake-up/greeting animation.
- Headline: "A Little World For You."
- CTA: "Let's start ♡".
- Show a short hint that the character can be clicked.
- The visitor must initiate the experience; do not force audio autoplay.

### Scene 2 — Our Little Story
Purpose: Transition into the shared story.
- A small garden/world scene.
- Nailong walks or guides the visitor.
- Scroll or next-step interaction advances the narrative.
- Provide a short personal introduction.

### Scene 3 — Our Memories
Purpose: Display personal photos.
- Three or more memory cards initially.
- Each card has a photo, short caption, and optional date.
- Clicking a card opens a larger view/modal.
- Empty photo assets must be visibly marked as placeholders during development, not presented as real memories.

### Scene 4 — A Letter For You
Purpose: Deliver a personal message.
- Show an envelope or letter interaction.
- Opening animation reveals the letter.
- Letter text must be editable in a single data/config file.
- Provide a natural reading layout with comfortable line length.

### Scene 5 — Final Surprise
Purpose: Finish with a memorable interaction.
- Nailong presents a gift/heart/flower.
- Reveal a final personal message.
- Optional final button may show a playful hug response.
- Do not use an alert dialog for the final production experience; create an in-page interaction.

## 8. Character Requirements

### 8.1 Model
The character must be a real 3D model in GLB/GLTF format.
The model should have:
- A rig/skeleton suitable for animation.
- Separate animation clips or a compatible animation state setup.
- Reasonable polygon count for mobile.
- Optimized textures and materials.
- A usage license that permits the intended deployment.

The project currently expects `public/models/nailong.glb`. The model is not included in this starter package.

### 8.2 Required animation states
- Idle: breathing, subtle body movement.
- Blink: natural eye blink.
- Walk: locomotion cycle.
- Run: faster locomotion.
- Wave: greeting.
- Jump: happy reaction.
- Dance: celebratory reaction.
- Sit: resting.
- Hug: embrace or gift-holding pose.

If the provided GLB uses different clip names, map the actual names in a central animation configuration. Never assume a clip exists without checking the asset.

### 8.3 Interaction
- Pointer movement subtly influences head/body look direction.
- Clicking/tapping Nailong triggers a happy reaction.
- Hovering an interactive object may trigger a curious look.
- Scene progression can trigger context-specific animation.
- Character should not rotate wildly or track the cursor in a nauseating way.
- Touch devices must have equivalent tap interactions.

### 8.4 Fallback
If the GLB is missing or fails:
- Show a deliberate loading/fallback state.
- Explain to the developer which asset is missing in the console/README.
- Do not silently replace it with a static image and call the feature complete.
- The rest of the page should remain navigable during development.

## 9. Motion and Animation Requirements

### GSAP
Use GSAP + ScrollTrigger for:
- Scene entrances and exits.
- Scroll-linked story progression.
- Camera choreography.
- Coordinated multi-element sequences.
- Character transition triggers.

### Motion for React
Use Motion for:
- Button hover/tap feedback.
- Small card interactions.
- UI entrance/exit.
- Toasts and micro-interactions.

### Performance and accessibility
- Respect `prefers-reduced-motion`.
- Avoid running multiple heavy timelines unnecessarily.
- Kill/revert ScrollTriggers on component unmount.
- Use transform/opacity where possible.
- Provide a reduced-motion experience that preserves content and navigation.

## 10. Audio Requirements

- Cheerful, cute instrumental background track.
- Background music starts only after an explicit user gesture.
- Provide visible play/pause control.
- Remember that some mobile browsers block autoplay.
- Optional sound effects: pop, footsteps, jump, gift reveal.
- Keep audio volume comfortable and default music volume modest.
- Audio files are supplied by the project owner or use properly licensed audio.

Expected path:
- `public/audio/background.mp3`
- `public/audio/footsteps.mp3` (optional)
- `public/audio/pop.mp3` (optional)

## 11. Technical Architecture

### Required stack
- Next.js App Router
- React + TypeScript
- Tailwind CSS (or current project styling approach)
- Three.js
- React Three Fiber
- Drei
- GSAP + ScrollTrigger
- Motion for React
- Howler.js

### Folder responsibilities
- `src/app`: routes, layout, global styling.
- `src/components/3d`: character, world, camera, lighting.
- `src/components/scenes`: story scenes.
- `src/components/ui`: navigation, music control, buttons, hints.
- `src/hooks`: reusable interaction/audio hooks.
- `src/data`: editable story content and memories.
- `src/lib`: shared animation/audio utilities.
- `public/models`: 3D models.
- `public/audio`: music and sound effects.
- `public/images`: personal photos and textures.

### State management
For the initial version, local React state is sufficient. Do not add a global state library unless the implementation genuinely needs it.

### Content configuration
Personal text, dates, captions, and image paths should be editable without changing scene/animation implementation. Keep content in `src/data`.

## 12. Responsive Requirements

### Mobile
- Primary target.
- Touch interaction must work.
- Character canvas should fit without excessive vertical space.
- Keep typography readable and CTAs reachable.
- Provide a simplified 3D quality mode if device performance is weak.
- Avoid hover-only functionality.

### Desktop
- Use larger environment composition and generous whitespace.
- Pointer tracking may be enabled but must remain subtle.
- Preserve the same story and content.

## 13. Performance Requirements

Initial targets (to be validated on real devices):
- First content visible quickly on a typical mobile connection.
- Avoid blocking the entire page while the 3D model loads.
- Lazy-load 3D assets and non-critical scenes.
- Use compressed textures and optimized GLB.
- Limit pixel ratio on mobile.
- Avoid expensive real-time shadows on low-end devices.
- Provide static/reduced-motion fallback only as a graceful alternative, not as the primary character experience.
- Avoid unnecessary re-renders in the 3D canvas.

## 14. Accessibility and Usability

- Semantic HTML and meaningful button labels.
- Keyboard focus must be visible.
- Images need descriptive alt text where meaningful.
- Color contrast should remain readable.
- Music controls must be accessible.
- Do not rely on color alone to communicate actions.
- Respect reduced-motion preference.
- Main story must remain readable if WebGL is unavailable.

## 15. Privacy and Content

- Use only photos the project owner is allowed to publish to the intended recipient.
- Avoid embedding personal information that should not be public.
- If deployed publicly, use an unguessable/private URL if the content is intimate.
- Do not add tracking scripts by default.

## 16. Acceptance Criteria

A release candidate is accepted only when:

1. `npm install` completes.
2. `npm run build` completes without TypeScript/build errors.
3. The site works on mobile and desktop viewport sizes.
4. The GLB loads and displays the intended character.
5. The character has verified idle, wave, walk, and at least one happy reaction clip.
6. Pointer/tap interactions work.
7. Scene transitions and scroll triggers work without duplicate triggers.
8. Music starts only after user interaction and can be paused.
9. Memory cards show real project photos and open correctly.
10. The letter displays the owner's final text.
11. The final surprise works without browser alert dialogs.
12. Reduced-motion and missing-WebGL fallbacks are usable.
13. No placeholder assets are mistaken for finished content.

## 17. Development Phases

### Phase 0 — Audit and design system
- Read this PRD and `AGENTS.md`.
- Invoke UI UX Pro Max skill if installed.
- Define visual tokens, components, spacing, typography, and responsive rules.
- Confirm missing assets and licenses.

### Phase 1 — Foundation
- Set up Next.js structure.
- Implement navigation, global styling, responsive layout.
- Confirm build and TypeScript checks.

### Phase 2 — Character integration
- Add optimized GLB.
- Inspect animation clip names.
- Implement animation state controller.
- Implement pointer/tap reactions.

### Phase 3 — Story scenes
- Build welcome, garden, memories, letter, final gift.
- Add GSAP transitions and ScrollTrigger.
- Add reduced-motion behavior.

### Phase 4 — Audio and polish
- Add music controls and sound effects.
- Refine interactions, timing, and responsive layout.

### Phase 5 — QA and deployment
- Test on mobile and desktop.
- Test low-performance mode.
- Verify all assets and links.
- Run production build.
- Document deployment steps.

## 18. Antigravity Working Rules

For every implementation task:
1. Read the relevant requirements in this PRD.
2. Preserve the established visual direction.
3. Do not replace requested 3D interactions with static decorations.
4. Do not add unrequested backend services.
5. Keep components modular.
6. Explain any deviation before implementing it.
7. Run checks and report actual results.
8. Mark incomplete features as incomplete, especially if model/audio assets are missing.

## 19. Definition of Done

The project is done when the intended recipient can open the link on a phone, start the experience, meet and interact with the animated character, explore personal memories, read the letter, hear the instrumental track, and reach the final surprise without broken interactions or major performance problems.