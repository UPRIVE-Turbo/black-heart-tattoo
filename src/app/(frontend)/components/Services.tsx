import type { Section, Service } from '@/payload-types'
import { Reveal } from './Reveal'

export function Services({
  sections,
  services,
}: {
  sections: Section
  services: Service[]
}) {
  return (
    <section id="szolgaltatasok" className="py-24 bg-tattoo-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="font-heading text-4xl md:text-6xl text-white leading-none tracking-tight">
              {sections.servicesHeadingLine1}
              <br />
              {sections.servicesHeadingLine2}
            </h2>
          </div>
          <p className="text-tattoo-silver font-light max-w-sm mt-6 md:mt-0">
            {sections.servicesIntro}
          </p>
        </Reveal>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {services.map((service) => (
            <Reveal key={service.id}>
              <article className="group py-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:bg-white/[0.02] transition-colors px-3">
                <div className="w-16 h-16 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-tattoo-red group-hover:bg-tattoo-red group-hover:text-white transition-colors duration-500">
                  <i className={`ph ${service.icon} text-3xl`}></i>
                </div>
                <div className="md:w-1/3">
                  <h3 className="font-heading text-3xl text-white tracking-wide group-hover:text-tattoo-red transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-tattoo-silver font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
