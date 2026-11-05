/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pre-render every route to plain files in `out/`. Cloudflare serves those as
  // static assets, which are free and never invoke a Worker. Anything that needs
  // a request-time server (API routes, middleware, ISR, cookies()) will fail the
  // build rather than silently start costing Worker invocations.
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    // scripts/optimize-images.mjs generates one file per width listed here, so
    // keep the two in sync (WIDTHS in that script).
    deviceSizes: [640, 1080, 1920],
    imageSizes: [128, 256, 384],
  },
};

export default nextConfig;
