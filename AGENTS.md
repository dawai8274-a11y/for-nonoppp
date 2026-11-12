# Project Rules for Antigravity

You are developing "A Little World For You", a personal romantic surprise website.

## Mandatory first step
1. Read `PRD.md` completely.
2. Read `docs/DESIGN_SYSTEM.md`.
3. Inspect the existing code before changing it.
4. If UI UX Pro Max skill is installed, invoke/read it before making visual design decisions. Do not claim the skill was used if it is unavailable.

## Product identity
- The experience is a cute, intimate, playful 3D story, not a generic romantic landing page.
- Nailong is the main character and must be a real animated 3D model, not a static image pretending to be interactive.
- Keep the visual language warm, tactile, handmade, and editorial.
- Do not add generic AI-looking gradients, excessive glassmorphism, random neon colors, or decorative clutter.

## Technical rules
- Keep Next.js App Router + TypeScript.
- Use React Three Fiber / Three.js for 3D.
- Use GSAP + ScrollTrigger for cinematic scene choreography and scroll-linked transitions.
- Use Motion for small UI interactions.
- Use Howler.js for audio.
- Keep 3D components isolated under `src/components/3d`.
- Keep scene sections isolated under `src/components/scenes`.
- Do not put all logic into one giant page component.
- Avoid unnecessary dependencies.
- Respect `prefers-reduced-motion`.
- Make mobile performance a first-class requirement.
- Audio must never autoplay before a user gesture.
- Never fabricate an asset, license, animation clip, or completed feature.

## Asset integrity
- A GLB model is valid only if it loads and its skeleton/animation clips are verified.
- Do not silently substitute a static PNG/JPG if the 3D model is missing.
- If an asset is missing, implement a clear graceful fallback and document the missing asset.
- Use only assets the project owner has rights to use.

## Working protocol
For each task:
1. State the intended change briefly.
2. Inspect relevant files.
3. Implement the smallest coherent change.
4. Run TypeScript/build checks where possible.
5. Fix errors caused by the change.
6. Report what changed, what was tested, and what remains blocked.

## Acceptance
Do not mark a feature complete merely because a button exists. Verify the actual interaction and its result.