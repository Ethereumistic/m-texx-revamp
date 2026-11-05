# Deploying to Cloudflare Workers

The site is a full static export (`output: 'export'`) deployed as Workers Static Assets
with no Worker script. Static asset requests are free and unlimited, so traffic doesn't
use any Worker quota. `wrangler.jsonc` deliberately has no `main`.

Cloudflare hosts only the pages, JS, CSS, and the icons and OG image in `public/`. Site
images and the hero video come from the `m-texx-assets` repo through jsDelivr, blog images
from Sanity's CDN, and presentation videos and PDFs from jsDelivr.

## First deploy

In the Cloudflare dashboard: **Workers & Pages → Create → Import a repository**.

| Setting | Value |
| --- | --- |
| Build command | `pnpm build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

Set these as **build** variables. They are read at build time and end up in the output:

- `NEXT_PUBLIC_URL` = `https://m-texx.com`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Check the site on its `*.workers.dev` URL, then attach `m-texx.com` under
**Settings → Domains & Routes**. The domain's DNS must be on Cloudflare.

`/studio` only works from origins allowed in [Sanity Manage](https://www.sanity.io/manage) →
**API → CORS origins**, with credentials enabled. Add the `*.workers.dev` URL if you want to
use Studio there before the domain moves.

## Deploying by hand

Next.js reads `.env.local`, whose `NEXT_PUBLIC_URL` points at localhost, so override it or
the sitemap and canonical links will point there too. In PowerShell:

```powershell
$env:NEXT_PUBLIC_URL = "https://m-texx.com"; pnpm build; if ($?) { npx wrangler deploy }
```

## Publishing content

Pages are generated at build time, so **content published in Sanity appears only after a
rebuild**. Automate this:

1. In the Worker's **Settings → Builds → Deploy Hooks**, create a hook on the production branch.
2. In [Sanity Manage](https://www.sanity.io/manage) → **API → Webhooks**, add a webhook that
   POSTs to the hook URL, with the filter
   `_type in ["post", "category", "author", "cityLocations", "partners"]`.
   Turn off drafts, and enable *Update* along with *Create* and *Delete*.

A build takes about 2 minutes. The Workers free plan includes 3,000 build minutes a month.

## Adding images

Files under `/img` are generated ahead of time and stored in the `m-texx-assets` repo:

1. Add `<repo>/<path>` to `scripts/image-sources.json`.
2. Run `pnpm images --out <path to m-texx-assets>/optimized`. This needs ImageMagick
   (`magick`) on your PATH.
3. Commit and push `m-texx-assets`, then set `ASSETS_COMMIT` in `lib/assets.ts` to that commit.
4. Use `/img/<repo>/<path>.webp` as the `next/image` src.

`pnpm build` fails if the code references an `/img` path that isn't in `image-sources.json`.
Keep `m-texx-assets` under jsDelivr's 50 MB package limit.

Partner logos come from Sanity. A new one works straight away from its original URL, and
gets optimized once it's added to `image-sources.json`.

## What a static export rules out

These fail the build instead of quietly adding Worker costs: API routes, middleware,
`cookies()`, `headers()`, `searchParams` in server components, and ISR. Anything that
needs them requires a real Worker, and requests to it then count against the quota.

## Video

Workers static assets ignore `Range` requests, and Safari needs them to play video, so
don't serve video from `public/`. All video on the site plays from jsDelivr.
