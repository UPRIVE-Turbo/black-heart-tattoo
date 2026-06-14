'use client'

import { useState, type FormEvent } from 'react'
import type { Contact } from '@/payload-types'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm({ contact }: { contact: Contact }) {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('sent')
      form.reset()
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-tattoo-black border border-white/10 p-6 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="mb-8 border-b border-white/5 pb-4">
        <h3 className="font-heading text-2xl text-white tracking-wider">{contact.formHeading}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="relative">
          <label
            htmlFor="name"
            className="block text-xs font-bold text-tattoo-silver uppercase tracking-widest mb-2"
          >
            Teljes Név
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-tattoo-red focus:ring-1 focus:ring-tattoo-red transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] placeholder:text-zinc-600"
            placeholder="Pl. Kovács Péter"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="phone"
            className="block text-xs font-bold text-tattoo-silver uppercase tracking-widest mb-2"
          >
            Telefonszám
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-tattoo-red focus:ring-1 focus:ring-tattoo-red transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] placeholder:text-zinc-600"
            placeholder="+36 30 123 4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="relative">
          <label
            htmlFor="bodypart"
            className="block text-xs font-bold text-tattoo-silver uppercase tracking-widest mb-2"
          >
            Testtáj
          </label>
          <input
            type="text"
            id="bodypart"
            name="bodypart"
            className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-tattoo-red focus:ring-1 focus:ring-tattoo-red transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] placeholder:text-zinc-600"
            placeholder="Pl. Alkar kinti rész"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="size"
            className="block text-xs font-bold text-tattoo-silver uppercase tracking-widest mb-2"
          >
            Tervezett Méret (cm)
          </label>
          <input
            type="text"
            id="size"
            name="size"
            className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-tattoo-red focus:ring-1 focus:ring-tattoo-red transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] placeholder:text-zinc-600"
            placeholder="Pl. kb 15x10 cm"
          />
        </div>
      </div>

      <div className="mb-6 relative">
        <label
          htmlFor="idea"
          className="block text-xs font-bold text-tattoo-silver uppercase tracking-widest mb-2"
        >
          Tetoválás ötletének leírása
        </label>
        <textarea
          id="idea"
          name="idea"
          rows={4}
          required
          className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-tattoo-red focus:ring-1 focus:ring-tattoo-red transition-all resize-none shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] placeholder:text-zinc-600"
          placeholder="Fogalmazd meg röviden, mit szeretnél, milyen stílusban, mik a fő elemek..."
        ></textarea>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-bold text-tattoo-silver uppercase tracking-widest mb-2">
          Referencia kép (Opcionális)
        </label>
        <label
          htmlFor="referenceImage"
          className="w-full border-2 border-dashed border-zinc-800 rounded-sm p-6 flex flex-col items-center justify-center text-center hover:border-tattoo-red hover:bg-white/[0.02] transition-colors cursor-pointer group block"
        >
          <i className="ph ph-upload-simple text-3xl text-zinc-600 group-hover:text-tattoo-red mb-2 transition-colors"></i>
          <span className="text-sm text-zinc-500 font-light">
            Kattints ide a feltöltéshez, vagy húzd ide a fájlt.
          </span>
          <input
            type="file"
            id="referenceImage"
            name="referenceImage"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full font-heading px-8 py-4 text-xl tracking-wider transition-colors flex items-center justify-center gap-3 active:scale-[0.98] duration-200 ${
          status === 'sent'
            ? 'bg-emerald-600'
            : status === 'sending'
              ? 'bg-zinc-800 pointer-events-none text-white'
              : 'bg-tattoo-red text-white hover:bg-red-700'
        }`}
      >
        {status === 'sending' && (
          <>
            <i className="ph ph-spinner-gap animate-spin"></i> Küldés folyamatban...
          </>
        )}
        {status === 'sent' && (
          <>
            <i className="ph ph-check-circle"></i> Üzenet Elküldve
          </>
        )}
        {status === 'error' && (
          <>
            <i className="ph ph-warning-circle"></i> Hiba történt, próbáld újra
          </>
        )}
        {status === 'idle' && (
          <>
            {contact.formSubmitText} <i className="ph ph-paper-plane-tilt"></i>
          </>
        )}
      </button>
      {contact.formDisclaimer && (
        <p className="text-xs text-zinc-600 text-center mt-4 font-light">
          {contact.formDisclaimer}
        </p>
      )}
    </form>
  )
}
