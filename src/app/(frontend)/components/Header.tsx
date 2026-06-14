'use client'

import { useEffect, useState } from 'react'
import type { Setting } from '@/payload-types'

export function Header({ settings }: { settings: Setting }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
  }, [menuOpen])

  const navLinks = settings.navLinks || []

  return (
    <>
    <header
      className={`fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${
        scrolled ? 'py-2 bg-tattoo-black/95' : 'py-4 bg-tattoo-black/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="group flex items-center gap-2 z-50">
          <i className="ph-fill ph-drop text-tattoo-red text-2xl group-hover:scale-110 transition-transform duration-300"></i>
          <span className="font-heading font-bold text-xl md:text-2xl tracking-wider text-white">
            {settings.logoText}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-tattoo-silver uppercase tracking-widest">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              className="nav-link hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <a
            href={`tel:${settings.phoneLink}`}
            className="relative overflow-hidden group border border-white/10 bg-white/5 px-6 py-2.5 rounded hover:bg-tattoo-red hover:border-tattoo-red transition-all duration-300 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2 font-heading tracking-wide text-white">
              <i className="ph ph-phone"></i> {settings.phone}
            </span>
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-tattoo-light z-50 p-2"
          aria-label="Menü"
        >
          <i className={`ph text-3xl ${menuOpen ? 'ph-x' : 'ph-list'}`}></i>
        </button>
      </div>
    </header>

      <div
        className={`fixed inset-0 bg-tattoo-black z-40 flex flex-col justify-center items-center gap-8 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 font-heading text-4xl text-tattoo-silver tracking-widest">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              onClick={() => setMenuOpen(false)}
              className="hover:text-white hover:pl-4 transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${settings.phoneLink}`}
            onClick={() => setMenuOpen(false)}
            className="text-tattoo-red hover:pl-4 transition-all"
          >
            {settings.phone}
          </a>
        </nav>
      </div>
    </>
  )
}
