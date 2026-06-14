import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Kezdő szekció (Hero)',
  admin: {
    group: 'Tartalom',
    description: 'A nyitó (hero) szekció tartalma.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      required: true,
      label: 'Kiemelt felirat (badge)',
      defaultValue: 'Kecskemét, Kisfaludy Utca 2.',
    },
    {
      name: 'headingLine1',
      type: 'text',
      required: true,
      label: 'Cím 1. sor',
      defaultValue: 'BLACK HEART',
    },
    {
      name: 'headingLine2',
      type: 'text',
      required: true,
      label: 'Cím 2. sor (kontúros)',
      defaultValue: 'TATTOO',
      admin: {
        description: 'Ez a sor üres, körvonalas (outline) stílusban jelenik meg.',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      label: 'Alcím / szlogen',
      defaultValue:
        'Egyedi tetoválások, kézzel tervezve. Sötét, merész vizualitás és kompromisszummentes minőség a város szívében.',
    },
    {
      name: 'ctaPrimaryText',
      type: 'text',
      required: true,
      label: 'Elsődleges gomb felirata',
      defaultValue: 'Konzultáció kérése',
    },
    {
      name: 'ctaPrimaryLink',
      type: 'text',
      required: true,
      label: 'Elsődleges gomb link',
      defaultValue: '#kapcsolat',
    },
    {
      name: 'ctaSecondaryText',
      type: 'text',
      required: true,
      label: 'Másodlagos gomb felirata',
      defaultValue: 'Portfólió',
    },
    {
      name: 'ctaSecondaryLink',
      type: 'text',
      required: true,
      label: 'Másodlagos gomb link',
      defaultValue: '#galeria',
    },
    {
      name: 'sideText',
      type: 'text',
      label: 'Háttér dísz-felirat',
      defaultValue: 'EST 2019',
      admin: {
        description: 'Nagy, áttetsző háttérfelirat a hero jobb oldalán (csak asztali nézetben).',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Háttérkép',
    },
  ],
}
