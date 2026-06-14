import { config as loadEnv } from 'dotenv'
import { getPayload } from 'payload'

loadEnv()

const { default: config } = await import('../payload.config.js')

const RESET_IMAGES = process.argv.includes('--reset-images')

async function downloadImage(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'BlackHeartTattoo-Seed/1.0 (https://example.com)' },
  })
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`)
  const arrayBuffer = await res.arrayBuffer()
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  return { data: Buffer.from(arrayBuffer), mimetype: contentType }
}

async function run() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  payload.logger.info('Seed indítása...')

  // --- Admin user ---
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@blackhearttattoo.hu',
        password: 'BlackHeart2026!',
      },
    })
    payload.logger.info('Admin felhasználó létrehozva: admin@blackhearttattoo.hu / BlackHeart2026!')
  }

  // --- Image source definitions (Unsplash / Pexels valódi fotók) ---
  const mediaSources: Record<string, { url: string; alt: string; name: string }> = {
    heroBg: {
      url: 'https://images.unsplash.com/photo-1542728928-1413d1894ed1?w=1600&q=80',
      alt: 'Tetoválóművész munka közben a stúdióban',
      name: 'hero-bg.jpg',
    },
    aboutImg: {
      url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&q=80',
      alt: 'Pintér Judit tetoválás közben',
      name: 'about.jpg',
    },
    g1: {
      url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&q=80',
      alt: 'Részletes fekete-fehér tetoválás karon',
      name: 'gallery-1.jpg',
    },
    g2: {
      url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=1200&q=80',
      alt: 'Sötét hangulatú dotwork tetoválás',
      name: 'gallery-2.jpg',
    },
    g3: {
      url: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=1200&q=80',
      alt: 'Egyedi grafikus mintájú tetoválás',
      name: 'gallery-3.jpg',
    },
    g4: {
      url: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=1200&q=80',
      alt: 'Realisztikus fekete tetoválás karon',
      name: 'gallery-4.jpg',
    },
    g5: {
      url: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=1200&q=80',
      alt: 'Nagyméretű háttetoválás',
      name: 'gallery-5.jpg',
    },
    g6: {
      url: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=1200&q=80',
      alt: 'Vékony vonalú (fineline) tetoválás',
      name: 'gallery-6.jpg',
    },
    g7: {
      url: 'https://images.pexels.com/photos/1230157/pexels-photo-1230157.jpeg?w=1200',
      alt: 'Tetoválás készítése közelről',
      name: 'gallery-7.jpg',
    },
    g8: {
      url: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?w=1200',
      alt: 'Tetoválógép munka közben',
      name: 'gallery-8.jpg',
    },
    g9: {
      url: 'https://images.pexels.com/photos/4123654/pexels-photo-4123654.jpeg?w=1200',
      alt: 'Tetoválóstúdió hangulata',
      name: 'gallery-9.jpg',
    },
  }

  const imageIdsToDelete = new Set<number>()

  if (RESET_IMAGES) {
    payload.logger.info('--reset-images: régi képek lecserélése...')

    const existingGallery = await payload.find({ collection: 'gallery', limit: 100 })
    const hero = await payload.findGlobal({ slug: 'hero' })
    const about = await payload.findGlobal({ slug: 'about' })
    const settings = await payload.findGlobal({ slug: 'settings' })

    for (const value of [hero.backgroundImage, about.image, settings.ogImage]) {
      if (value && typeof value === 'object' && 'id' in value) {
        imageIdsToDelete.add(value.id)
      } else if (typeof value === 'number') {
        imageIdsToDelete.add(value)
      }
    }
    for (const doc of existingGallery.docs) {
      const img = doc.image
      if (img && typeof img === 'object' && 'id' in img) {
        imageIdsToDelete.add(img.id)
      } else if (typeof img === 'number') {
        imageIdsToDelete.add(img)
      }
    }

    for (const doc of existingGallery.docs) {
      await payload.delete({ collection: 'gallery', id: doc.id })
    }
  }

  // --- Media uploads ---
  const mediaIds: Record<string, number> = {}

  for (const [key, source] of Object.entries(mediaSources)) {
    if (!RESET_IMAGES) {
      const existing = await payload.find({
        collection: 'media',
        where: { alt: { equals: source.alt } },
        limit: 1,
      })

      if (existing.totalDocs > 0) {
        mediaIds[key] = existing.docs[0].id as number
        continue
      }
    }

    const file = await downloadImage(source.url)
    const doc = await payload.create({
      collection: 'media',
      data: { alt: source.alt },
      file: {
        data: file.data,
        mimetype: file.mimetype,
        name: source.name,
        size: file.data.length,
      },
    })
    mediaIds[key] = doc.id as number
    payload.logger.info(`Feltöltve: ${source.name}`)
  }

  // --- Settings ---
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      logoText: 'BLACK HEART',
      navLinks: [
        { label: 'Szolgáltatások', url: '#szolgaltatasok' },
        { label: 'Galéria', url: '#galeria' },
        { label: 'Rólunk', url: '#rolunk' },
        { label: 'Kapcsolat', url: '#kapcsolat' },
      ],
      footerCopyright: '© 2026 Black Heart Tattoo Kecskemét. Minden jog fenntartva.',
      ownerName: 'Pintér Judit',
      establishedLabel: 'Est. 2019',
      phone: '+36 30 123 4567',
      phoneLink: '+36301234567',
      facebookUrl: 'https://www.facebook.com/blackheartkecskemet',
      instagramUrl: '',
      metaTitle: 'Black Heart Tattoo | Egyedi tetoválás Kecskeméten',
      metaDescription:
        'Egyedi tetoválás, tervezés, konzultáció és fedés Kecskemét belvárosában. Black Heart Tattoo - Pintér Judit, 2019 óta.',
      ogImage: mediaIds.g1,
    },
  })

  // --- Hero ---
  await payload.updateGlobal({
    slug: 'hero',
    data: {
      badgeText: 'Kecskemét, Kisfaludy Utca 2.',
      headingLine1: 'BLACK HEART',
      headingLine2: 'TATTOO',
      subtitle:
        'Egyedi tetoválások, kézzel tervezve. Sötét, merész vizualitás és kompromisszummentes minőség a város szívében.',
      ctaPrimaryText: 'Konzultáció kérése',
      ctaPrimaryLink: '#kapcsolat',
      ctaSecondaryText: 'Portfólió',
      ctaSecondaryLink: '#galeria',
      sideText: 'EST 2019',
      backgroundImage: mediaIds.heroBg,
    },
  })

  // --- Sections ---
  await payload.updateGlobal({
    slug: 'sections',
    data: {
      servicesHeadingLine1: 'Kreatív',
      servicesHeadingLine2: 'Arzenál',
      servicesIntro:
        'Nem sablonokból dolgozunk. Minden munka egyedi vízió alapján készül, ami rád van szabva.',
      galleryHeading: 'PORTFÓLIÓ',
      galleryCtaText: 'Több munka Facebookon',
    },
  })

  // --- About ---
  await payload.updateGlobal({
    slug: 'about',
    data: {
      headingPrefix: 'A TINTA MÖGÖTT:',
      headingHighlight: 'JUDIT',
      paragraphs: [
        {
          text: 'A Black Heart Tattoo nem egy futószalag-szalon. 2019-ben nyitottam meg a stúdiót Kecskemét szívében azzal a céllal, hogy teret adjak a sötétebb, textúráltabb, kontrasztosabb tetoválóművészetnek.',
        },
        {
          text: 'Nálam nincs katalógus, amiből választhatsz. Hiszem, hogy a testfestés egy olyan rituálé, ahol a művész és a viselője közösen hoz létre valami maradandót. Fő profilom a fekete-fehér, magas kontrasztú munkák, a dark és trash stílusjegyek keverése, valamint az egyedi ötletek anatómiai térbe való adaptálása.',
        },
        {
          text: 'Ha egy sablonos mintára vágysz, amit már ezren hordanak, rossz helyen jársz. Ha egy olyan darabot akarsz magadon hordozni, aminek lelke és karaktere van – várlak a Kisfaludy utcában.',
        },
      ],
      image: mediaIds.aboutImg,
      badgeTitle: 'EST. 2019',
      badgeSubtitle: 'Kecskemét',
      stats: [
        { value: '5+ Év', label: 'Tapasztalat' },
        { value: 'Custom', label: 'Design Only' },
      ],
    },
  })

  // --- Contact ---
  await payload.updateGlobal({
    slug: 'contact',
    data: {
      headingPrefix: 'LÉPJ BE A',
      headingHighlight: 'STÚDIÓBA.',
      description:
        'Minden egy beszélgetéssel kezdődik. Írd le az ötletedet, és hamarosan felveszem veled a kapcsolatot egy személyes konzultáció egyeztetésére.',
      addressLabel: 'Cím',
      address: '6000 Kecskemét,\nKisfaludy utca 2. (Belváros)',
      contactLabel: 'Kapcsolat',
      formHeading: 'Konzultáció Kérése',
      formSubmitText: 'Küldés és Egyeztetés',
      formDisclaimer:
        'Az adatok elküldése nem minősül foglalásnak. A megbeszéléshez felvesszük veled a kapcsolatot.',
      openingHours: [
        { day: 'Hétfő', hours: 'Zárva' },
        { day: 'Kedd - Péntek', hours: '10:00 - 18:00' },
        { day: 'Szombat', hours: '10:00 - 14:00' },
        { day: 'Vasárnap', hours: 'Zárva' },
      ],
      mapEmbedUrl:
        'https://www.google.com/maps?q=Black+Heart+Tattoo,+Kisfaludy+utca+2,+6000+Kecskem%C3%A9t&output=embed',
    },
  })

  // --- Services ---
  const existingServices = await payload.find({ collection: 'services', limit: 1 })
  if (existingServices.totalDocs === 0) {
    const services = [
      {
        title: 'Egyedi Tetoválás',
        description:
          'A te ötleted, a mi stílusunkban. Mélyfekete vonalak, dotwork, trash polka vagy dark neotraditional - a bőrre visszük, amit elképzeltél.',
        icon: 'ph-needle',
      },
      {
        title: 'Tervezés',
        description:
          'Minden tetoválás egyedi grafikai tervezéssel indul. Közösen dolgozzuk ki a kompozíciót, hogy tökéletesen illeszkedjen a test anatómiájához.',
        icon: 'ph-pen-nib',
      },
      {
        title: 'Fedés & Javítás',
        description:
          'Megbántad? Kifakult? Szakértelemmel takarjuk el a régi, nem kívánt mintákat új, sötét tónusú és dinamikus kompozíciókkal (Cover-up).',
        icon: 'ph-eraser',
      },
      {
        title: 'Konzultáció',
        description:
          'A kivarrás előtti legfontosabb lépés. Ingyenes személyes megbeszélés, ahol átbeszéljük az ötletet, a méretet és az elhelyezést.',
        icon: 'ph-chat-circle-dots',
      },
    ] as const

    for (const service of services) {
      await payload.create({ collection: 'services', data: service })
    }
    payload.logger.info('Szolgáltatások létrehozva.')
  }

  // --- Gallery ---
  const existingGallery = await payload.find({ collection: 'gallery', limit: 1 })
  if (existingGallery.totalDocs === 0) {
    const galleryKeys = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9']
    for (const key of galleryKeys) {
      const source = mediaSources[key]
      await payload.create({
        collection: 'gallery',
        data: {
          image: mediaIds[key],
          alt: source.alt,
        },
      })
    }
    payload.logger.info('Galéria létrehozva.')
  }

  // --- Régi képek törlése (csak miután már semmi nem hivatkozik rájuk) ---
  if (RESET_IMAGES && imageIdsToDelete.size > 0) {
    for (const id of imageIdsToDelete) {
      await payload.delete({ collection: 'media', id })
    }
    payload.logger.info(`${imageIdsToDelete.size} régi kép törölve.`)
  }

  payload.logger.info('Seed kész!')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
