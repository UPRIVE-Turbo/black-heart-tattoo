# Black Heart Tattoo — Weboldal Specifikáció

**Típus:** Egyoldalas magyar nyelvű landing page
**Iparág:** Tetoválószalon | **Város:** Kecskemét
**Web státusz:** Csak Facebook (nincs weboldal)
**Elérhetőség:** FB: facebook.com/blackheartkecskemet | Cím: Kisfaludy utca 2, 6000 Kecskemét | Tulajdonos: Pintér Judit

---

Készíts egy magyar nyelvű, egyoldalas landing page-et egy tetoválószalonnak:
 
 AZ ÜZLET ADATAI:
 - Név: Black Heart Tattoo
 - Cím: Kisfaludy utca 2, 6000 Kecskemét (belváros)
 - Facebook: facebook.com/blackheartkecskemet
 - Tulajdonos: Pintér Judit | Alapítva: 2019
 - Szolgáltatások: Egyedi tetoválás, tervezés, konzultáció
 
 DESIGN:
 - Stílus: Sötét, merész, művészi, urban
 - Színek: Mélyfekete (#141414) fejlécekhez/háttérhez, vörös (#C0392B) kiemelésekhez, világosszürke (#E0E0E0) szöveghez, ezüst (#9A9A9A) másodlagos elemekhez
 - Betűtípus: Erős, karakteres (pl. Bebas Neue címekhez, Inter szöveghez)
 
 FELÉPÍTÉS (egyetlen görgethető oldal):
 1. Hero szekció: "Black Heart Tattoo — Kecskemét", szlogen ("Egyedi tetoválás, kézzel tervezve"), CTA: "Konzultáció kérése"
 2. Szolgáltatások: Egyedi tetoválás, tervezés, konzultáció, fedés/javítás — rövid leírás
 3. Portfólió/Galéria: 8-10 kép placeholder (kiemelt szerep — ez a legfontosabb szekció)
 4. Rólunk: Judit és a szalon bemutatkozása, stílus, tapasztalat (2019 óta)
 5. Időpontfoglalás/Konzultáció űrlap: Név, telefon, tetoválás ötlet leírása, méret, testtáj, referenciakép feltöltés lehetősége
 6. Elérhetőség: Cím, nyitvatartás, Google Maps
 7. Lábléc: Facebook, Instagram, cím, © 2026
 
 HANGNEM: Menő, művészi, közvetlen, hiteles. Tegező.
 
 TECHNIKAI: Mobilbarát, reszponzív. Nagy felbontású, nagyítható galéria.

---

## Technikai követelmények
- **Stack:** Next.js 14+ (App Router) + Payload CMS 3.x (Postgres / @payloadcms/db-postgres) + Tailwind CSS
- **Nyelv:** Magyar (HU)
- **Hosting:** Vercel-kompatibilis
- **Responsive:** Mobile-first
- **SEO:** Meta tagek, Open Graph, magyar title/description
- **Térkép:** Google Maps embed (Kecskemét)

## Payload CMS — teljes szerkeszthetőség
- A weboldal MINDEN tartalma (szöveg, kép, link, adat) legyen szerkeszthető az admin panelről — semmi hardcode a komponensekben.
- A collection-ök és globálok számát és nevét TE döntöd el a konkrét design és tartalom alapján — illeszd a valós oldalhoz.
- Strukturált admin: magyar label-ek, `admin.group` csoportok, `useAsTitle`, `defaultColumns`, mező-leírások.
- Az űrlap egy beküldés-collection-be mentsen (név, telefon, email, üzenet, + ami a designon van).
