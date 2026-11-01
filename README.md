# Rajanigandha International website

Built with **Next.js** (App Router), React, TypeScript, Tailwind CSS and SASS.
The site is exported as static HTML (`output: "export"`) and hosted on Netlify.

## Commands

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm install`   | Install dependencies                          |
| `npm run dev`   | Start the dev server on http://localhost:3000 |
| `npm run build` | Build the static site into `/out`             |
| `npm run prod`  | Serve the built `/out` folder locally         |
| `npm run lint`  | Lint the source                               |

## Where things live

- `src/app/` – routes (`page.tsx` per URL) and the root layout
- `src/views/` – the page content for each route
- `src/components/` – header, footer, product cards, gallery, animations
- `src/data/catalog.ts` – reads products from `/content` at build time
- `content/` – product JSON, edited through the admin panel at `/admin`
- `netlify/functions/track.mts` – server-side analytics endpoint

## Environment variables

See `.env.example`. Browser-side values use the `NEXT_PUBLIC_` prefix;
put local values in `.env.local`.
