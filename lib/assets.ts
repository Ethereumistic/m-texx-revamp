/**
 * Images and the hero video live in the m-texx-assets repo and are served by
 * jsDelivr, so none of them are hosted on Cloudflare. Code refers to them by a
 * logical `/img/...` path, and assetUrl() resolves it.
 *
 * Pinned to a commit: those URLs are immutable and cached for a year. To publish new
 * images, push them to m-texx-assets and update ASSETS_COMMIT (see
 * docs/cloudflare-deployment.md). Keep that repo under jsDelivr's 50 MB package limit.
 */
const ASSETS_COMMIT = "bebf38881c067cfd742672d7e3dfe59a0b928447"
const ASSETS_BASE = `https://cdn.jsdelivr.net/gh/Ethereumistic/m-texx-assets@${ASSETS_COMMIT}/optimized`

export const assetUrl = (path: string) => `${ASSETS_BASE}${path.replace(/^\/img/, "")}`
