import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Általános beállítások',
  admin: {
    group: 'Beállítások',
    description: 'Fejléc, lábláb, elérhetőségek és SEO alapadatok.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Fejléc / Lábláb',
          fields: [
            {
              name: 'logoText',
              type: 'text',
              required: true,
              label: 'Logó szöveg',
              defaultValue: 'BLACK HEART',
            },
            {
              name: 'navLinks',
              type: 'array',
              label: 'Navigációs linkek',
              admin: {
                description: 'A fejléc menüpontjai (belső horgony linkek, pl. #galeria).',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Felirat',
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'Link (horgony)',
                },
              ],
            },
            {
              name: 'footerCopyright',
              type: 'text',
              required: true,
              label: 'Lábláb copyright szöveg',
              defaultValue: '© 2026 Black Heart Tattoo Kecskemét. Minden jog fenntartva.',
            },
            {
              name: 'ownerName',
              type: 'text',
              label: 'Tulajdonos neve',
              defaultValue: 'Pintér Judit',
            },
            {
              name: 'establishedLabel',
              type: 'text',
              label: 'Alapítás felirat',
              defaultValue: 'Est. 2019',
            },
          ],
        },
        {
          label: 'Elérhetőségek',
          fields: [
            {
              name: 'phone',
              type: 'text',
              required: true,
              label: 'Telefonszám (megjelenített)',
              defaultValue: '+36 30 123 4567',
              admin: {
                description: 'A fejléc gombján és a kapcsolat szekcióban jelenik meg.',
              },
            },
            {
              name: 'phoneLink',
              type: 'text',
              required: true,
              label: 'Telefonszám (tel: link)',
              defaultValue: '+36301234567',
              admin: {
                description: 'Csak számjegyek és + jel, kötőjel nélkül, a tel: linkhez.',
              },
            },
            {
              name: 'facebookUrl',
              type: 'text',
              label: 'Facebook link',
              defaultValue: 'https://www.facebook.com/blackheartkecskemet',
            },
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Instagram link',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta title',
              defaultValue: 'Black Heart Tattoo | Egyedi tetoválás Kecskeméten',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta description',
              defaultValue:
                'Egyedi tetoválás, tervezés, konzultáció és fedés Kecskemét belvárosában. Black Heart Tattoo - Pintér Judit, 2019 óta.',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Megosztási kép (Open Graph)',
            },
          ],
        },
      ],
    },
  ],
}
