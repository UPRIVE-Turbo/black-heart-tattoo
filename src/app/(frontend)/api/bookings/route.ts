import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'

export async function POST(request: Request) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const formData = await request.formData()

  const name = formData.get('name')
  const phone = formData.get('phone')
  const idea = formData.get('idea')
  const bodypart = formData.get('bodypart')
  const size = formData.get('size')
  const referenceImage = formData.get('referenceImage')

  if (typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Hiányzó név.' }, { status: 400 })
  }
  if (typeof phone !== 'string' || !phone.trim()) {
    return NextResponse.json({ error: 'Hiányzó telefonszám.' }, { status: 400 })
  }
  if (typeof idea !== 'string' || !idea.trim()) {
    return NextResponse.json({ error: 'Hiányzó leírás.' }, { status: 400 })
  }

  let referenceImageId: number | undefined

  if (referenceImage instanceof File && referenceImage.size > 0) {
    const arrayBuffer = await referenceImage.arrayBuffer()
    const media = await payload.create({
      collection: 'media',
      data: { alt: `Referenciakép - ${name}` },
      file: {
        data: Buffer.from(arrayBuffer),
        mimetype: referenceImage.type,
        name: referenceImage.name,
        size: referenceImage.size,
      },
    })
    referenceImageId = media.id
  }

  await payload.create({
    collection: 'bookings',
    data: {
      name,
      phone,
      idea,
      bodypart: typeof bodypart === 'string' ? bodypart : undefined,
      size: typeof size === 'string' ? size : undefined,
      referenceImage: referenceImageId,
    },
  })

  return NextResponse.json({ success: true })
}
