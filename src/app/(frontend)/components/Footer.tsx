import type { Setting } from '@/payload-types'

export function Footer({ settings }: { settings: Setting }) {
  return (
    <footer className="bg-tattoo-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <i className="ph-fill ph-drop text-tattoo-red text-4xl"></i>
            <span className="font-heading font-bold text-3xl tracking-wider text-white">
              {settings.logoText}
            </span>
          </div>

          <div className="flex gap-6">
            {settings.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-tattoo-silver hover:text-white hover:border-tattoo-red hover:bg-tattoo-red transition-all duration-300"
              >
                <i className="ph-fill ph-facebook-logo text-xl"></i>
                <span className="sr-only">Facebook</span>
              </a>
            )}
            {settings.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-tattoo-silver hover:text-white hover:border-tattoo-red hover:bg-tattoo-red transition-all duration-300"
              >
                <i className="ph-fill ph-instagram-logo text-xl"></i>
                <span className="sr-only">Instagram</span>
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-zinc-600">
          <p>{settings.footerCopyright}</p>
          <div className="flex gap-4">
            {settings.ownerName && (
              <span className="uppercase tracking-widest">{settings.ownerName}</span>
            )}
            {settings.establishedLabel && (
              <>
                <span className="text-white/20">|</span>
                <span className="uppercase tracking-widest">{settings.establishedLabel}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
