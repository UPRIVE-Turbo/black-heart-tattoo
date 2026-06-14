import type { About as AboutType } from '@/payload-types'
import { getMediaUrl } from '@/lib/media'
import { Reveal } from './Reveal'

export function About({ about }: { about: AboutType }) {
  return (
    <section
      id="rolunk"
      className="py-0 flex flex-col lg:flex-row bg-tattoo-black border-y border-white/5"
    >
      <div className="lg:w-1/2 min-h-[50vh] lg:min-h-screen relative overflow-hidden group">
        <img
          src={getMediaUrl(about.image)}
          alt={about.headingHighlight}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-tattoo-red mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity duration-700"></div>
        <Reveal className="absolute bottom-8 right-8 bg-tattoo-black/90 backdrop-blur-md p-6 border-l-2 border-tattoo-red shadow-2xl">
          <p className="font-heading text-3xl text-white">{about.badgeTitle}</p>
          <p className="text-xs text-tattoo-silver font-bold tracking-widest uppercase">
            {about.badgeSubtitle}
          </p>
        </Reveal>
      </div>

      <div className="lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center relative">
        <div className="absolute top-10 right-10 opacity-5 pointer-events-none select-none">
          <i className="ph-fill ph-drop text-9xl"></i>
        </div>

        <Reveal>
          <h2 className="font-heading text-4xl md:text-6xl text-white tracking-tighter mb-8">
            {about.headingPrefix} <br />
            <span className="text-tattoo-red">{about.headingHighlight}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="space-y-6 text-tattoo-silver font-light leading-relaxed">
          {about.paragraphs?.map((p, i) => (
            <p key={p.id ?? i} className={i === 0 ? 'text-lg' : undefined}>
              {p.text}
            </p>
          ))}
        </Reveal>

        {about.stats?.length ? (
          <Reveal
            delay={0.2}
            className="grid grid-cols-2 gap-8 mt-12 border-t border-white/5 pt-12"
          >
            <>
              {about.stats.map((stat, i) => (
                <div key={stat.id ?? i}>
                  <h4 className="font-heading text-4xl text-white">{stat.value}</h4>
                  <p className="text-sm text-tattoo-red font-bold uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
