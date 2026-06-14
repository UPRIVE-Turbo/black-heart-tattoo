import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Szolgáltatás',
    plural: 'Szolgáltatások',
  },
  admin: {
    group: 'Tartalom',
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon'],
    description: 'A "Kreatív Arzenál" szekció kártyái.',
  },
  access: {
    read: () => true,
  },
  orderable: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Cím',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Leírás',
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: 'Ikon',
      defaultValue: 'ph-needle',
      admin: {
        description: 'A kártya elején megjelenő ikon (Phosphor Icons).',
      },
      options: [
        { label: 'Tetoválógép (needle)', value: 'ph-needle' },
        { label: 'Toll (pen-nib)', value: 'ph-pen-nib' },
        { label: 'Radír (eraser)', value: 'ph-eraser' },
        { label: 'Beszélgetés (chat-circle-dots)', value: 'ph-chat-circle-dots' },
        { label: 'Csepp (drop)', value: 'ph-drop' },
        { label: 'Csillag (sparkle)', value: 'ph-sparkle' },
        { label: 'Pajzs (shield-check)', value: 'ph-shield-check' },
        { label: 'Szív (heart)', value: 'ph-heart' },
      ],
    },
  ],
}
