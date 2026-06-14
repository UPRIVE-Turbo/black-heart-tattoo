import React from 'react'
import type { Metadata } from 'next'
import { Oswald, Outfit } from 'next/font/google'
import Script from 'next/script'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { getMediaUrl } from '@/lib/media'
import './styles.css'

const oswald = Oswald({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const settings = await payload.findGlobal({ slug: 'settings' })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: settings.metaTitle || 'Black Heart Tattoo | Kecskemét',
    description: settings.metaDescription || '',
    openGraph: {
      title: settings.metaTitle || 'Black Heart Tattoo | Kecskemét',
      description: settings.metaDescription || '',
      images: settings.ogImage ? [getMediaUrl(settings.ogImage)] : [],
      locale: 'hu_HU',
      type: 'website',
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="hu" className={`scroll-smooth ${oswald.variable} ${outfit.variable}`}>
      <body className="font-body antialiased selection:bg-tattoo-red selection:text-white relative bg-tattoo-black text-tattoo-light">
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="beforeInteractive" />
        <div className="noise-overlay" />
        <main>{children}</main>
      </body>
    </html>
  )
}
