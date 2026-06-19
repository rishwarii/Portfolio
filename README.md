# Rishwari Ranjan Portfolio

A production-ready Next.js (App Router) + Tailwind CSS profile portfolio with a calm editorial aesthetic, subtle motion, structured case study content, and local MDX-powered blog index.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- `next/image`
- MDX content parsing via `gray-matter`

## Run Locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for Production
```bash
npm run build
npm run start
```

## Deploy
### Vercel (recommended)
1. Push this project to your Git provider.
2. Import the repository in Vercel.
3. Use default build settings:
   - Build command: `npm run build`
   - Output: `.next`
4. Deploy.

### Other Hosts
Use any Node.js host that supports Next.js standalone/server output:
1. Install dependencies.
2. Run `npm run build`.
3. Run `npm run start` on port provided by your platform.

## Content Editing
- Homepage sections are composed in `app/page.tsx`.
- Blog source files live in `content/blog/*.mdx`.
- Theme tokens live in `lib/theme.ts`.
- Main background image path is `public/images/backgrounds/profile-bg.jpg`.
- Project image placeholders live in `public/images/projects/*.jpg`.
- Interactive timeline component is `components/TimelineBubbles.tsx`.
- Case study, metrics, about, projects, and principles blocks are in `components/`.

## Company Logos (Local, No Hotlinking)
Logos for the Experience section are stored in `public/logos/` and referenced locally.

To fetch/update logos once:
```bash
npm run fetch:logos
```

The fetch order is:
1. Simple Icons SVG (if a slug exists)
2. logo.dev SVG (when `LOGO_DEV_TOKEN` is set)
3. Local placeholder SVG fallback (with console warning)

Optional token usage:
```bash
LOGO_DEV_TOKEN=your_token_here npm run fetch:logos
```

PowerShell:
```powershell
$env:LOGO_DEV_TOKEN="your_token_here"
npm run fetch:logos
```
