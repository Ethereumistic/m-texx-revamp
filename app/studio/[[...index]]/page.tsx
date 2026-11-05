/**
 * Sanity Studio, mounted at /studio. The Studio is a client-side app, so only the
 * /studio shell is exported; public/_redirects sends its deep links to that shell.
 * Its 1.4 MB of JS loads only on this route.
 */
import type { Metadata } from 'next'
import Studio from './Studio'

export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
}

export function generateStaticParams() {
  return [{ index: [] }]
}

export default function StudioPage() {
  return <Studio />
}
