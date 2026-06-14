import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Kapcsolat szekció',
  admin: {
    group: 'Tartalom',
    description: 'A konzultáció-kérő és elérhetőségi szekció tartalma.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tartalom',
          fields: [
            {
              name: 'headingPrefix',
              type: 'text',
              required: true,
              label: 'Cím eleje',
              defaultValue: 'LÉPJ BE A',
            },
            {
              name: 'headingHighlight',
              type: 'text',
              required: true,
              label: 'Cím kiemelt szava',
              defaultValue: 'STÚDIÓBA.',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Leírás',
              defaultValue:
                'Minden egy beszélgetéssel kezdődik. Írd le az ötletedet, és hamarosan felveszem veled a kapcsolatot egy személyes konzultáció egyeztetésére.',
            },
            {
              name: 'addressLabel',
              type: 'text',
              required: true,
              label: 'Cím blokk felirata',
              defaultValue: 'Cím',
            },
            {
              name: 'address',
              type: 'textarea',
              required: true,
              label: 'Cím',
              defaultValue: '6000 Kecskemét,\nKisfaludy utca 2. (Belváros)',
            },
            {
              name: 'contactLabel',
              type: 'text',
              required: true,
              label: 'Kapcsolat blokk felirata',
              defaultValue: 'Kapcsolat',
            },
            {
              name: 'formHeading',
              type: 'text',
              required: true,
              label: 'Űrlap címe',
              defaultValue: 'Konzultáció Kérése',
            },
            {
              name: 'formSubmitText',
              type: 'text',
              required: true,
              label: 'Beküldés gomb felirata',
              defaultValue: 'Küldés és Egyeztetés',
            },
            {
              name: 'formDisclaimer',
              type: 'text',
              label: 'Apró betűs megjegyzés az űrlap alatt',
              defaultValue:
                'Az adatok elküldése nem minősül foglalásnak. A megbeszéléshez felvesszük veled a kapcsolatot.',
            },
          ],
        },
        {
          label: 'Nyitvatartás & Térkép',
          fields: [
            {
              name: 'openingHours',
              type: 'array',
              label: 'Nyitvatartás',
              minRows: 1,
              fields: [
                {
                  name: 'day',
                  type: 'text',
                  required: true,
                  label: 'Nap',
                },
                {
                  name: 'hours',
                  type: 'text',
                  required: true,
                  label: 'Nyitvatartás',
                },
              ],
            },
            {
              name: 'mapEmbedUrl',
              type: 'text',
              label: 'Google Maps embed URL',
              admin: {
                description:
                  'A Google Maps "Embed a map" iframe src attribútumának értéke (https://www.google.com/maps/embed?...).',
              },
            },
          ],
        },
      ],
    },
  ],
}
