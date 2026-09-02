# Padaria Rainha da Massa — website

Marketing site for a bakery and confectionery in downtown Petrópolis, RJ,
open since 2004. One long landing page, plus a QR-code menu for the tables
and a small password-protected editor for that menu.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and Motion.
Deployed on Vercel.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

The site runs at http://localhost:3000. `localhost` always serves the full
site, regardless of the `SITE_LIVE` switch described below.

## Environment variables

| Variable | What it does |
| --- | --- |
| `ADMIN_PASSWORD` | Password for `/admin`. |
| `ADMIN_SECRET` | Signs the admin session cookie. Generate with `openssl rand -hex 32`. |
| `SITE_LIVE` | `true` puts the site live at the apex domain. Anything else keeps the "under construction" page. See below. |
| `SITE_HOST` | Apex hostname. Defaults to `padariarainhadamassa.com.br`. |
| `PREVIEW_HOST` | Approval subdomain. Defaults to `aprovacao.padariarainhadamassa.com.br`. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token. Without it the menu is written to a local file instead — see *Where the menu lives*. |

**Careful with `vercel env pull`**: it overwrites `.env.local` with whatever
is in Vercel's *development* environment. Back the file up first.

## Hostname routing

`src/proxy.ts` routes by hostname, and `SITE_LIVE` is the switch. Flipping
the site live is an environment change plus a redeploy — not a code change,
so rolling back takes the same few seconds.

| | `SITE_LIVE` unset or `false` | `SITE_LIVE=true` |
| --- | --- | --- |
| apex | "under construction", `noindex` | the site |
| `aprovacao.` | the site, `noindex, nofollow` | **301 to the apex**, `/admin` included |
| `www.` | 301 to the apex | 301 to the apex |
| `robots.txt` | `Disallow: /` | crawlable, except `/api/` |

The preview 301 runs **before** every other rule. If it ran later, `/admin`
would stay reachable on the old address after going live.

`localhost` and `*.vercel.app` always serve the full site so previews and
local work are not blocked — but they carry `noindex`, so a deploy URL never
competes with the real domain in search.

## Staying out of Google

Two pages are deliberately excluded, both through `noindex` rather than
`robots.txt`:

- `/cardapio` — the table menu carries prices, and the client asked for
  prices to stay off search.
- `/admin` — the editor.

`robots.txt` **allows** both to be crawled, on purpose. A page blocked in
`robots.txt` is a page whose `noindex` Google never reads — and one that can
still surface as a bare URL if anyone links to it. Letting the crawler in to
read "do not index me" is what actually removes it. Both also send
`X-Robots-Tag` from the proxy.

`/api/` keeps its `Disallow`: those are JSON endpoints with nothing linking
to them, and blocking saves crawl budget.

## Where the menu lives

`src/lib/cardapio-digital.ts` decides on its own:

- **With `BLOB_READ_WRITE_TOKEN`** (production): reads and writes a Vercel
  Blob at `cardapio/cardapio.json`.
- **Without it** (development): reads and writes `src/data/cardapio.json`,
  the versioned file, so `/admin` works on a local machine.

The versioned JSON is always the seed: until the blob exists, it is what the
site serves, and the first save from `/admin` creates the blob. So a deploy
ships with the right menu before anyone opens the editor.

## Content rule — read this before writing copy

`docs/fatos-confirmados.md` is the ruler: **anything not in that file does
not go on the site as a statement of fact.**

The file exists because a claim was once published with a source that was
invented. Product lists, opening hours, what the bakery does and does not
sell — all of it traces back to something the client confirmed, a document
she sent, or a verifiable public source, and the file records which.

`docs/` is working material and is not published.

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint
```

## Deploying

Production deploys go out through the Vercel CLI, not a Git integration:

```bash
npm run build       # catch failures locally first
vercel --prod
```

Pushing to `main` does **not** deploy. Keep the two in step by hand, or
connect the repository to Vercel.
