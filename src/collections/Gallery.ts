import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Galéria kép',
    plural: 'Galéria',
  },
  admin: {
    group: 'Tartalom',
    useAsTitle: 'alt',
    defaultColumns: ['image', 'alt'],
    description: 'A portfólió/galéria szekció képei.',
  },
  access: {
    read: () => true,
  },
  orderable: true,
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Kép',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alternatív szöveg',
      admin: {
        description: 'Rövid leírás a képről (SEO és akadálymentesség miatt).',
      },
    },
  ],
}
