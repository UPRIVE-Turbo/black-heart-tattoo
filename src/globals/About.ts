import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Rólunk szekció',
  admin: {
    group: 'Tartalom',
    description: 'A "Rólunk" (Judit bemutatása) szekció tartalma.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headingPrefix',
      type: 'text',
      required: true,
      label: 'Cím eleje',
      defaultValue: 'A TINTA MÖGÖTT:',
    },
    {
      name: 'headingHighlight',
      type: 'text',
      required: true,
      label: 'Cím kiemelt szava',
      defaultValue: 'JUDIT',
    },
    {
      name: 'paragraphs',
      type: 'array',
      required: true,
      label: 'Bemutatkozó szövegek',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Bekezdés',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Kép',
    },
    {
      name: 'badgeTitle',
      type: 'text',
      required: true,
      label: 'Kép feliratának címe',
      defaultValue: 'EST. 2019',
    },
    {
      name: 'badgeSubtitle',
      type: 'text',
      required: true,
      label: 'Kép feliratának alcíme',
      defaultValue: 'Kecskemét',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statisztika blokkok',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Érték',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Felirat',
        },
      ],
    },
  ],
}
