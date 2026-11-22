import process from 'node:process'

/**
 * Resolves a post image to a full URL. Absolute URLs pass through; relative paths
 * (with or without a leading slash) are joined onto IMAGES_BASE_URL, the S3 bucket.
 * Read at build time, when pages are prerendered.
 */
export function imageUrl(src: string | undefined | null): string | undefined {
  if (!src)
    return undefined
  const value = src.trim()
  if (/^(?:https?:)?\/\//.test(value))
    return value
  const base = process.env.IMAGES_BASE_URL?.trim()
  const path = value.replace(/^\/+/, '')
  if (!base)
    return `/${path}`
  return `${base.replace(/\/+$/, '')}/${path}`
}
