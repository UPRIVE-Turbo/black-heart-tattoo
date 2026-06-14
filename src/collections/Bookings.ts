import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Megkeresés',
    plural: 'Megkeresések',
  },
  admin: {
    group: 'Megkeresések',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'bodypart', 'status', 'createdAt'],
    description: 'A konzultáció-kérő űrlapon beküldött megkeresések.',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Teljes név',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefonszám',
    },
    {
      name: 'bodypart',
      type: 'text',
      label: 'Testtáj',
    },
    {
      name: 'size',
      type: 'text',
      label: 'Tervezett méret',
    },
    {
      name: 'idea',
      type: 'textarea',
      required: true,
      label: 'Tetoválás ötlet leírása',
    },
    {
      name: 'referenceImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Referenciakép',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Állapot',
      defaultValue: 'uj',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Új', value: 'uj' },
        { label: 'Felvettük a kapcsolatot', value: 'felvettuk' },
        { label: 'Lezárva', value: 'lezarva' },
      ],
    },
  ],
  defaultSort: '-createdAt',
}
