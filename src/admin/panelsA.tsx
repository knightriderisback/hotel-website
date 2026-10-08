import { useCms } from '@/cms/store'
import { Field, ImageField } from './fields'

const contentKeys = [
  ['hotelName','Hotel name'],['town','Town'],['tagline','Tagline'],['address','Address'],
  ['reception','Reception'],['receptionRaw','WhatsApp digits'],['restaurantPhone','Restaurant phone'],
  ['website','Website'],['mapEmbed','Map embed URL'],['rating','Rating'],['ratingSource','Rating source'],
  ['reviewCount','Reviews'],['heroWelcome','Hero eyebrow'],['heroTitle','Hero title'],['heroSubtitle','Hero subtitle'],
  ['heroCtaPrimary','Hero CTA 1'],['heroCtaSecondary','Hero CTA 2'],['aboutEyebrow','About eyebrow'],
  ['aboutTitle','About title'],['aboutP1','About p1'],['aboutP2','About p2'],['roomsEyebrow','Rooms eyebrow'],
  ['roomsTitle','Rooms title'],['roomsIntro','Rooms intro'],['diningEyebrow','Dining eyebrow'],
  ['diningTitle','Dining title'],['diningBody','Dining body'],['amenitiesEyebrow','Amenities eyebrow'],
  ['amenitiesTitle','Amenities title'],['banquetEyebrow','Banquet eyebrow'],['banquetTitle','Banquet title'],
  ['banquetBody','Banquet body'],['banquetCta','Banquet CTA'],['galleryEyebrow','Gallery eyebrow'],
  ['galleryTitle','Gallery title'],['contactEyebrow','Contact eyebrow'],['contactTitle','Contact title'],
  ['contactFormTitle','Form title'],['contactFormIntro','Form intro'],
] as const

export function ContentPanel() {
  const cms = useCms()
  const { data } = cms
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">Text Content</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {contentKeys.map(([key, label]) => (
          <Field key={key} label={label} value={data.content[key]} multiline={/Body|P1|P2|Subtitle|Intro|address/.test(key)}
            onChange={(v) => cms.updateContent({ [key]: v })} />
        ))}
      </div>
    </section>
  )
}

export function RoomsPanel() {
  const cms = useCms()
  const { data } = cms
  return (
    <section className="space-y-4">
      <div className="flex justify-between"><h2 className="text-2xl font-semibold">Rooms</h2>
        <button type="button" className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white" onClick={() => cms.setRooms([...data.rooms, { name: 'New Room', image: '', blurb: '', features: ['Feature'] }])}>+ Add</button>
      </div>
      {data.rooms.map((room, i) => (
        <div key={i} className="space-y-2 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex justify-between"><p className="font-medium">Room {i + 1}</p>
            <button type="button" className="text-sm text-red-600" onClick={() => cms.setRooms(data.rooms.filter((_, j) => j !== i))}>Remove</button></div>
          <Field label="Name" value={room.name} onChange={(v) => { const n = [...data.rooms]; n[i] = { ...room, name: v }; cms.setRooms(n) }} />
          <ImageField label="Image" value={room.image} onChange={(v) => { const n = [...data.rooms]; n[i] = { ...room, image: v }; cms.setRooms(n) }} />
          <Field label="Description" multiline value={room.blurb} onChange={(v) => { const n = [...data.rooms]; n[i] = { ...room, blurb: v }; cms.setRooms(n) }} />
          <Field label="Features (comma)" value={room.features.join(', ')} onChange={(v) => { const n = [...data.rooms]; n[i] = { ...room, features: v.split(',').map(s => s.trim()).filter(Boolean) }; cms.setRooms(n) }} />
        </div>
      ))}
    </section>
  )
}

export function ImagesPanel() {
  const cms = useCms()
  const { data } = cms
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Images</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <ImageField label="Hero 1" value={data.images.heroSlides[0] || ''} onChange={(v) => { const s = [...data.images.heroSlides]; s[0] = v; cms.updateImages({ heroSlides: s }) }} />
        <ImageField label="Hero 2" value={data.images.heroSlides[1] || ''} onChange={(v) => { const s = [...data.images.heroSlides]; s[1] = v; cms.updateImages({ heroSlides: s }) }} />
        <ImageField label="About lobby" value={data.images.aboutLobby} onChange={(v) => cms.updateImages({ aboutLobby: v })} />
        <ImageField label="About cuisine" value={data.images.aboutCuisine} onChange={(v) => cms.updateImages({ aboutCuisine: v })} />
        <ImageField label="Restaurant" value={data.images.restaurant} onChange={(v) => cms.updateImages({ restaurant: v })} />
        <ImageField label="Banquet" value={data.images.banquet} onChange={(v) => cms.updateImages({ banquet: v })} />
      </div>
      <h3 className="text-lg font-medium">Gallery</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {data.images.gallery.map((g, i) => (
          <div key={i} className="space-y-2 rounded-xl bg-white p-3 shadow-sm">
            <ImageField label={`Gallery ${i + 1}`} value={g.src} onChange={(v) => { const gal = [...data.images.gallery]; gal[i] = { ...g, src: v }; cms.updateImages({ gallery: gal }) }} />
            <Field label="Caption" value={g.caption} onChange={(v) => { const gal = [...data.images.gallery]; gal[i] = { ...g, caption: v }; cms.updateImages({ gallery: gal }) }} />
            <button type="button" className="text-sm text-red-600" onClick={() => cms.updateImages({ gallery: data.images.gallery.filter((_, j) => j !== i) })}>Remove</button>
          </div>
        ))}
      </div>
      <button type="button" className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white" onClick={() => cms.updateImages({ gallery: [...data.images.gallery, { src: '', caption: 'New' }] })}>+ Gallery image</button>
    </section>
  )
}
