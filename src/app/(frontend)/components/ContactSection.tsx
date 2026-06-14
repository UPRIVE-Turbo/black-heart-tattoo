import type { Contact, Setting } from '@/payload-types'
import { Reveal } from './Reveal'
import { ContactForm } from './ContactForm'

export function ContactSection({ contact, settings }: { contact: Contact; settings: Setting }) {
  return (
    <section id="kapcsolat" className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <Reveal>
            <h2 className="font-heading text-5xl md:text-7xl text-white tracking-tighter mb-6">
              {contact.headingPrefix} <span className="text-tattoo-red">{contact.headingHighlight}</span>
            </h2>
            <p className="text-tattoo-silver mb-12 text-lg">{contact.description}</p>

            <div className="space-y-8 mt-auto">
              <div className="group flex items-start gap-4">
                <i className="ph ph-map-pin text-3xl text-tattoo-red mt-1"></i>
                <div>
                  <h4 className="font-heading text-xl text-white tracking-wide">
                    {contact.addressLabel}
                  </h4>
                  <p className="text-tattoo-silver font-light whitespace-pre-line">
                    {contact.address}
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <i className="ph ph-envelope-simple text-3xl text-tattoo-red mt-1"></i>
                <div>
                  <h4 className="font-heading text-xl text-white tracking-wide">
                    {contact.contactLabel}
                  </h4>
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-tattoo-silver font-light hover:text-white transition-colors block"
                    >
                      {settings.facebookUrl.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  )}
                  <a
                    href={`tel:${settings.phoneLink}`}
                    className="text-tattoo-silver font-light hover:text-white transition-colors block"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>

              {contact.openingHours?.length ? (
                <div className="group flex items-start gap-4">
                  <i className="ph ph-clock text-3xl text-tattoo-red mt-1"></i>
                  <div>
                    <h4 className="font-heading text-xl text-white tracking-wide">Nyitvatartás</h4>
                    <dl className="text-tattoo-silver font-light">
                      {contact.openingHours.map((row, i) => (
                        <div key={row.id ?? i} className="flex justify-between gap-4 max-w-xs">
                          <dt>{row.day}</dt>
                          <dd>{row.hours}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              ) : null}

              {contact.mapEmbedUrl && (
                <div className="w-full h-64 border border-white/10 overflow-hidden">
                  <iframe
                    src={contact.mapEmbedUrl}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Térkép"
                  ></iframe>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <ContactForm contact={contact} />
        </Reveal>
      </div>
    </section>
  )
}
