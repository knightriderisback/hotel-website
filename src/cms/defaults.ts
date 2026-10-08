import type { CmsData, AuthState } from './types'

export const DEFAULT_CMS: CmsData = {
  content: {
    hotelName: 'Hotel Steel City',
    town: 'Dalli Rajhara',
    tagline: 'Warm hospitality in the heart of the steel town',
    address:
      'Ward No. 3, New Market Main Road, near Gupta Chowk, Dalli Rajhara, Dist. Balod, Chhattisgarh 491228',
    reception: '+91 94241 54001',
    receptionRaw: '919424154001',
    restaurantPhone: '+91 94241 54002',
    website: 'hotelsteelcity.com',
    mapEmbed:
      'https://www.google.com/maps?q=Hotel+Steel+City,+New+Market+Main+Road,+Dalli+Rajhara,+Chhattisgarh+491228&output=embed',
    rating: '4.0',
    ratingSource: 'Justdial',
    reviewCount: '305+',
    heroWelcome: 'Welcome to',
    heroTitle: 'Hotel Steel City',
    heroSubtitle:
      'Warm hospitality in the heart of the steel town — elegant rooms, pure vegetarian dining and celebrations, moments from New Market Main Road.',
    heroCtaPrimary: 'Book Your Stay',
    heroCtaSecondary: 'Explore Rooms',
    aboutEyebrow: 'The Hotel',
    aboutTitle: 'A quiet standard of comfort, in the town that built steel',
    aboutP1:
      "Set on New Market Main Road, a short walk from Gupta Chowk, Hotel Steel City is Dalli Rajhara's address for travellers who notice the details — the weight of good linen, the warmth of a lamp left on, a hot meal at whatever hour the train arrives.",
    aboutP2:
      'Whether you are here on business at the mines, celebrating a wedding, or passing through the Balod district, our team keeps hospitality simple and sincere: spotless rooms, honest pure vegetarian food, and service that answers on the first ring.',
    roomsEyebrow: 'Stay With Us',
    roomsTitle: 'Rooms & suites, kept simple and immaculate',
    roomsIntro:
      'Every room carries air conditioning, high-speed Wi-Fi, an ultra-modern washroom and our 24×7 room service. Call us directly for the best available rates.',
    diningEyebrow: 'Dining',
    diningTitle: 'City Lights — pure vegetarian, done properly',
    diningBody:
      'Our in-house restaurant serves the kind of vegetarian food the region is proud of — slow-cooked dals, paneer done a dozen ways, breads off the tawa and thalis that arrive generous and hot.',
    amenitiesEyebrow: 'At Your Service',
    amenitiesTitle: 'Everything taken care of',
    banquetEyebrow: 'Weddings & Events',
    banquetTitle: 'Celebrate it here',
    banquetBody:
      'From weddings and receptions to birthdays and corporate gatherings, our banquet hall dresses up beautifully — with pure vegetarian catering from City Lights and a team that handles the details.',
    banquetCta: 'Plan Your Event',
    galleryEyebrow: 'Gallery',
    galleryTitle: 'A look inside',
    contactEyebrow: 'Find Us',
    contactTitle: 'In the heart of Dalli Rajhara',
    contactFormTitle: 'Request a booking',
    contactFormIntro:
      'Send us your details — the request opens directly in WhatsApp to our reception, and we confirm within minutes.',
  },
  rooms: [
    { name: 'Deluxe Room', image: 'https://steelcity.kimi.page/images/room-deluxe.jpg', blurb: 'A calm, considered space with a plush king bed, crisp linens and warm bedside light.', features: ['King Bed', 'Air Conditioning', 'High-Speed Wi-Fi', 'LED TV', 'Ultra-Modern Washroom'] },
    { name: 'Executive Suite', image: 'https://steelcity.kimi.page/images/room-executive.jpg', blurb: 'A spacious suite with a private seating corner, work desk and evening views over the town.', features: ['Separate Lounge', 'Work Desk', 'Air Conditioning', 'Room Service', 'Premium Amenities'] },
    { name: 'Family Room', image: 'https://steelcity.kimi.page/images/room-family.jpg', blurb: 'Two comfortable queen beds so the whole family stays together.', features: ['Two Queen Beds', 'Sleeps Four', 'Air Conditioning', 'High-Speed Wi-Fi', 'Family Friendly'] },
  ],
  amenities: [
    { title: '24×7 Room Service', note: 'Round-the-clock assistance, a call away' },
    { title: 'High-Speed Wi-Fi', note: 'Complimentary throughout the property' },
    { title: 'Pure Veg Restaurant', note: 'City Lights — dine in or order to your room' },
    { title: 'Ultra-Modern Washrooms', note: 'Rain showers and premium fittings' },
    { title: 'Banquet & Celebrations', note: 'Weddings, receptions and gatherings' },
    { title: 'Prime Location', note: 'New Market Main Road, near Gupta Chowk' },
  ],
  images: {
    heroSlides: ['https://steelcity.kimi.page/images/hero-exterior.jpg', 'https://steelcity.kimi.page/images/hero-lobby.jpg'],
    aboutLobby: 'https://steelcity.kimi.page/images/hero-lobby.jpg',
    aboutCuisine: 'https://steelcity.kimi.page/images/cuisine.jpg',
    restaurant: 'https://steelcity.kimi.page/images/restaurant.jpg',
    banquet: 'https://steelcity.kimi.page/images/banquet.jpg',
    rooms: ['https://steelcity.kimi.page/images/room-deluxe.jpg', 'https://steelcity.kimi.page/images/room-executive.jpg', 'https://steelcity.kimi.page/images/room-family.jpg'],
    gallery: [
      { src: 'https://steelcity.kimi.page/images/hero-exterior.jpg', caption: 'The hotel at dusk' },
      { src: 'https://steelcity.kimi.page/images/room-executive.jpg', caption: 'Executive Suite' },
      { src: 'https://steelcity.kimi.page/images/cuisine.jpg', caption: 'Pure veg thali', portrait: true },
      { src: 'https://steelcity.kimi.page/images/restaurant.jpg', caption: 'City Lights restaurant' },
      { src: 'https://steelcity.kimi.page/images/room-deluxe.jpg', caption: 'Deluxe Room' },
      { src: 'https://steelcity.kimi.page/images/banquet.jpg', caption: 'Banquets & celebrations' },
      { src: 'https://steelcity.kimi.page/images/hero-lobby.jpg', caption: 'The lobby' },
      { src: 'https://steelcity.kimi.page/images/room-family.jpg', caption: 'Family Room' },
    ],
  },
  social: {
    instagram: 'https://www.instagram.com/hotelsteelcity',
    facebook: '',
    twitter: '',
    youtube: '',
    whatsapp: 'https://wa.me/919424154001',
    linkedin: '',
  },
  embeds: {
    enabled: true,
    eyebrow: 'Social Feed',
    title: 'Follow Our Journey',
    intro: 'Connected accounts stay live — new posts appear here automatically.',
    items: [],
    accounts: [],
  },
  theme: {
    navy: '#101f31',
    navyDeep: '#0b1624',
    gold: '#af915f',
    goldLight: '#d8bc85',
    cream: '#f6f1e7',
    creamSoft: '#efe8d9',
    ink: '#1d2733',
    headerStyle: 'transparent',
    footerStyle: 'dark',
    fontDisplay: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'Jost', system-ui, sans-serif",
  },
  buttons: { style: 'steel', animation: 'shine', radius: 'sharp' },
  sections: {
    hero: true,
    about: true,
    rooms: true,
    dining: true,
    amenities: true,
    banquet: true,
    gallery: true,
    socialEmbeds: true,
    contact: true,
  },
}

export const DEFAULT_AUTH: AuthState = {
  email: 'knight.rider.is.back@gmail.com',
  passwordHash: '',
}

export const CMS_STORAGE_KEY = 'hsc_cms_v1'
export const AUTH_STORAGE_KEY = 'hsc_auth_v1'
export const SESSION_KEY = 'hsc_session'
