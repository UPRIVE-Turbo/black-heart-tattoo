import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Gallery } from './components/Gallery'
import { About } from './components/About'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [settings, hero, sections, about, contact, servicesRes, galleryRes] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.findGlobal({ slug: 'hero' }),
    payload.findGlobal({ slug: 'sections' }),
    payload.findGlobal({ slug: 'about' }),
    payload.findGlobal({ slug: 'contact' }),
    payload.find({ collection: 'services', limit: 100 }),
    payload.find({ collection: 'gallery', limit: 100 }),
  ])

  return (
    <>
      <Header settings={settings} />
      <Hero hero={hero} />
      <Services sections={sections} services={servicesRes.docs} />
      <Gallery sections={sections} settings={settings} items={galleryRes.docs} />
      <About about={about} />
      <ContactSection contact={contact} settings={settings} />
      <Footer settings={settings} />
    </>
  )
}
 
export const dynamic = 'force-dynamic'