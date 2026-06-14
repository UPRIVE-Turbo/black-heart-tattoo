import type { GlobalConfig } from 'payload'

export const Sections: GlobalConfig = {
  slug: 'sections',
  label: 'Szekció fejcímek',
  admin: {
    group: 'Tartalom',
    description: 'A szolgáltatások és galéria szekciók fejcímei és bevezető szövegei.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Szolgáltatások',
          fields: [
            {
              name: 'servicesHeadingLine1',
              type: 'text',
              required: true,
              label: 'Cím 1. sor',
              defaultValue: 'Kreatív',
            },
            {
              name: 'servicesHeadingLine2',
              type: 'text',
              required: true,
              label: 'Cím 2. sor',
              defaultValue: 'Arzenál',
            },
            {
              name: 'servicesIntro',
              type: 'textarea',
              required: true,
              label: 'Bevezető szöveg',
              defaultValue:
                'Nem sablonokból dolgozunk. Minden munka egyedi vízió alapján készül, ami rád van szabva.',
            },
          ],
        },
        {
          label: 'Galéria',
          fields: [
            {
              name: 'galleryHeading',
              type: 'text',
              required: true,
              label: 'Cím',
              defaultValue: 'PORTFÓLIÓ',
            },
            {
              name: 'galleryCtaText',
              type: 'text',
              required: true,
              label: 'Facebook link felirata',
              defaultValue: 'Több munka Facebookon',
            },
          ],
        },
      ],
    },
  ],
}
