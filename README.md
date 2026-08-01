# A Journey of Our Friendship 💛

A premium, cinematic Friendship Day surprise site — built as a scroll-driven "journey"
rather than a typical webpage. Aurora backgrounds, a constellation timeline, a locked
secret letter, flip cards, a memory map, and a confetti finale.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL. That's it — the whole site runs from one content file.

## The only file you need to edit

Everything personal — names, dates, timeline entries, photos, quotes, fun facts, the
secret nickname, the letter — lives in:

```
src/data/content.ts
```

No component code needs to change to update the content. Just edit the values there.

### Adding your own photos

Drop images into:

- `public/images/timeline/01.jpg` … `05.jpg` — used in the Timeline section
- `public/images/gallery/01.jpg` … `08.jpg` — used in the Memory Gallery

Then reference them from `src/data/content.ts` (the paths are already wired up to match
these filenames — just replace the files). If a path is missing or wrong, that image slot
quietly hides instead of showing a broken image icon.

### Adding background music

Drop an mp3 at `public/audio/theme.mp3`, or point `music.src` in `content.ts` at a
different path. Music is muted by default; the visitor's choice is remembered.

### The secret message

Set `secretMessage.correctNickname` to whatever nickname only your friend would know,
and `secretMessage.letter` to an array of paragraphs — each one animates in as its own
line when the gift box is unlocked.

### The Easter egg

Typing the word set in `easterEgg.triggerWord` anywhere on the page (no need to click
into a field first) reveals a hidden bonus message.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`, no separate config file needed —
  design tokens live in `src/index.css` under `@theme`)
- Framer Motion for animation
- canvas-confetti for the finale celebration
- lucide-react for icons
- vite-plugin-pwa for installability (works offline once visited, add-to-home-screen)

## Design system

- **Colors**: a deep navy void (`#0a0b14`) with an aurora palette — violet, rose, gold,
  and teal — that shifts hue as the visitor scrolls through four "chapters" of the
  journey (dawn → day → dusk → night). This is the site's signature visual idea: the
  background itself tells you how far along the story you are.
- **Type**: Fraunces (a display serif with real character) for headings, Manrope for
  body copy, JetBrains Mono for dates, labels, and counters.
- **Motion**: scroll-reveals throughout, a glowing "constellation" thread connecting
  timeline memories, and a confetti burst timed to the finale coming into view.
- Respects `prefers-reduced-motion` and keeps keyboard focus visible throughout.

## Available scripts

```bash
npm run dev       # start local dev server
npm run build     # type-check + production build to /dist
npm run preview   # preview the production build locally
npm run lint      # run oxlint
```

## Deploying

`npm run build` outputs a static site to `/dist` — deploy it anywhere that serves static
files (Vercel, Netlify, GitHub Pages, Cloudflare Pages, a plain S3 bucket, etc.). No
server-side code is required.

## Project structure

```
src/
  data/
    content.ts       <- edit this for all content
    types.ts         <- the shape of content.ts, for reference
  hooks/
    useFriendshipCounter.ts
    useLocalStorage.ts
  components/
    AuroraBackground.tsx   Signature scroll-linked background
    FloatingElements.tsx   Ambient stars / hearts / sparkles
    CursorGlow.tsx
    ScrollProgressBar.tsx
    LoadingScreen.tsx
    MusicToggle.tsx
    ThemeToggle.tsx
    Hero.tsx
    SectionHeading.tsx
    Timeline.tsx           Constellation-style vertical timeline
    Gallery.tsx            Pinterest-style photo gallery + modal
    Counter.tsx            Live years/months/days counter
    FunFacts.tsx           Animated count-up stat cards
    SecretMessage.tsx      Locked gift box -> letter reveal
    ReasonsGrid.tsx         20 flip cards
    MemoryMap.tsx          Illustrated map with pins
    QuoteCarousel.tsx
    Finale.tsx             Confetti + thank-you
    ShareButton.tsx
    EasterEgg.tsx
  App.tsx
  main.tsx
  index.css           <- design tokens + global styles
```
