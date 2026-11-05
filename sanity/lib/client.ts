// Imported from @sanity/client rather than next-sanity: the next-sanity barrel
// pulls ~46 KB of client components into the browser bundle of any page that
// touches this module, even though queries only ever run at build time.
import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})
