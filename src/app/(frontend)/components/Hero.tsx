'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Hero as HeroType } from '@/payload-types'
import { getMediaUrl } from '@/lib/media'
import { Reveal } from './Reveal'

export function Hero({ hero }: { hero: HeroType }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 300])

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] pt-32 pb-20 flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 hero-mask">
        <motion.img
          src={getMediaUrl(hero.backgroundImage)}
          alt={hero.headingLine1 + ' ' + hero.headingLine2}
          className="w-full h-full object-cover object-center opacity-40 scale-105"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tattoo-black via-tattoo-black/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 flex flex-col justify-center">
          <Reveal className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-tattoo-red block"></span>
            <span className="font-body text-tattoo-red uppercase tracking-[0.2em] font-semibold text-sm">
              {hero.badgeText}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-6">
              {hero.headingLine1}
              <br />
              <span className="text-stroke">{hero.headingLine2}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-tattoo-silver font-light max-w-xl mb-12">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-4">
            <a
              href={hero.ctaPrimaryLink}
              className="group bg-tattoo-red text-white font-heading px-8 py-4 text-xl tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center gap-3 active:scale-95 duration-200 shadow-[0_0_30px_rgba(192,57,43,0.2)] hover:shadow-[0_0_40px_rgba(192,57,43,0.4)]"
            >
              {hero.ctaPrimaryText}{' '}
              <i className="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </a>
            <a
              href={hero.ctaSecondaryLink}
              className="font-heading px-8 py-4 text-xl tracking-wider text-white border border-white/20 hover:border-white hover:bg-white/5 transition-all flex items-center justify-center active:scale-95 duration-200"
            >
              {hero.ctaSecondaryText}
            </a>
          </Reveal>
        </div>

        {hero.sideText && (
          <Reveal
            delay={0.4}
            className="hidden lg:flex lg:col-span-4 justify-end items-end h-full mix-blend-difference"
          >
            <p className="font-heading text-9xl text-white/5 transform -rotate-90 origin-bottom-right translate-y-32 whitespace-nowrap">
              {hero.sideText}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
