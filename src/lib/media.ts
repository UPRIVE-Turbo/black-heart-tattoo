import type { Media } from '@/payload-types'

type MediaLike = Media | string | number | null | undefined

export function getMediaUrl(media: MediaLike): string {
  if (!media || typeof media === 'number' || typeof media === 'string') {
    return ''
  }

  return media.url || ''
}
