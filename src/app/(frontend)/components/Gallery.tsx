'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Gallery as GalleryItemType, Section, Setting } from '@/payload-types'
import { getMediaUrl } from '@/lib/media'
import { Reveal } from './Reveal'

export function Gallery({
  sections,
  settings,
  items,
}: {
  sections: Section
  settings: Setting
  items: GalleryItemType[]
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = () => setActiveIndex(null)
  const showPrev = () =>
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + items.length) % items.length,
    )
  const showNext = () =>
    setActiveIndex((current) => (current === null ? null : (current + 1) % items.length))

  const activeItem = activeIndex !== null ? items[activeIndex] : null

  return (
    <section id="galeria" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-7xl text-white tracking-tighter mb-4">
            {sections.galleryHeading}
          </h2>
          <div className="w-24 h-1 bg-tattoo-red mx-auto"></div>
        </Reveal>

        <div className="masonry-grid">
          {items.map((item, index) => (
            <Reveal key={item.id} className="masonry-item">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="relative group overflow-hidden bg-tattoo-black block w-full text-left cursor-zoom-in"
                aria-label={item.alt || sections.galleryHeading}
              >
                <img
                  src={getMediaUrl(item.image)}
                  alt={item.alt}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-spring"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="bg-tattoo-red text-white py-4 px-5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    <i className="ph ph-eye text-2xl"></i>
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <a
            href={settings.facebookUrl || '#'}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-tattoo-silver hover:text-white transition-colors border-b border-white/20 hover:border-tattoo-red pb-1 font-heading tracking-wide uppercase"
          >
            {sections.galleryCtaText} <i className="ph-fill ph-facebook-logo"></i>
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <motion.div
              className="relative max-w-5xl max-h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={getMediaUrl(activeItem.image)}
                alt={activeItem.alt}
                className="max-w-full max-h-[85vh] object-contain"
              />

              <button
                type="button"
                onClick={close}
                aria-label="Bezárás"
                className="absolute -top-4 -right-4 bg-tattoo-red text-white w-10 h-10 rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:text-tattoo-red transition-colors"
              >
                <i className="ph ph-x text-2xl"></i>
              </button>

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      showPrev()
                    }}
                    aria-label="Előző kép"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-tattoo-red transition-colors"
                  >
                    <i className="ph ph-caret-left text-2xl"></i>
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      showNext()
                    }}
                    aria-label="Következő kép"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-tattoo-red transition-colors"
                  >
                    <i className="ph ph-caret-right text-2xl"></i>
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
