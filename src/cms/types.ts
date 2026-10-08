export type RoomItem = {
  name: string
  image: string
  blurb: string
  features: string[]
}

export type AmenityItem = {
  title: string
  note: string
}

export type GalleryItem = {
  src: string
  caption: string
  portrait?: boolean
}

export type SocialLinks = {
  instagram: string
  facebook: string
  twitter: string
  youtube: string
  whatsapp: string
  linkedin: string
}

export type EmbedPlatform = 'youtube' | 'instagram' | 'facebook' | 'twitter'

export type EmbedItem = {
  id: string
  platform: EmbedPlatform
  url: string
  title: string
}

export type FeedAccount = {
  id: string
  platform: EmbedPlatform
  handle: string
  label: string
}

export type EmbedsConfig = {
  enabled: boolean
  eyebrow: string
  title: string
  intro: string
  items: EmbedItem[]
  accounts: FeedAccount[]
}

export type ThemeConfig = {
  navy: string
  navyDeep: string
  gold: string
  goldLight: string
  cream: string
  creamSoft: string
  ink: string
  headerStyle: 'transparent' | 'solid' | 'glass'
  footerStyle: 'dark' | 'navy' | 'minimal'
  fontDisplay: string
  fontBody: string
}

export type ButtonConfig = {
  style: 'steel' | 'gold' | 'outline' | 'soft'
  animation: 'shine' | 'lift' | 'pulse' | 'none'
  radius: 'sharp' | 'soft' | 'pill'
}

export type SectionVisibility = {
  hero: boolean
  about: boolean
  rooms: boolean
  dining: boolean
  amenities: boolean
  banquet: boolean
  gallery: boolean
  socialEmbeds: boolean
  contact: boolean
}

export type ContentConfig = {
  hotelName: string
  town: string
  tagline: string
  address: string
  reception: string
  receptionRaw: string
  restaurantPhone: string
  website: string
  mapEmbed: string
  rating: string
  ratingSource: string
  reviewCount: string
  heroWelcome: string
  heroTitle: string
  heroSubtitle: string
  heroCtaPrimary: string
  heroCtaSecondary: string
  aboutEyebrow: string
  aboutTitle: string
  aboutP1: string
  aboutP2: string
  roomsEyebrow: string
  roomsTitle: string
  roomsIntro: string
  diningEyebrow: string
  diningTitle: string
  diningBody: string
  amenitiesEyebrow: string
  amenitiesTitle: string
  banquetEyebrow: string
  banquetTitle: string
  banquetBody: string
  banquetCta: string
  galleryEyebrow: string
  galleryTitle: string
  contactEyebrow: string
  contactTitle: string
  contactFormTitle: string
  contactFormIntro: string
}

export type ImagesConfig = {
  heroSlides: string[]
  aboutLobby: string
  aboutCuisine: string
  restaurant: string
  banquet: string
  rooms: string[]
  gallery: GalleryItem[]
}

export type CmsData = {
  content: ContentConfig
  rooms: RoomItem[]
  amenities: AmenityItem[]
  images: ImagesConfig
  social: SocialLinks
  embeds: EmbedsConfig
  theme: ThemeConfig
  buttons: ButtonConfig
  sections: SectionVisibility
}

export type AuthState = {
  email: string
  passwordHash: string
}
