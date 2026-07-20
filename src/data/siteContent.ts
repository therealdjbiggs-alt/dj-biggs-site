import type {
  BookingStep,
  FeatureItem,
  GalleryMediaItem,
  NavItem,
  ServiceItem,
  Testimonial,
} from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'why', label: 'Why DJ Biggs', href: '#why' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
]

export const EVENT_TYPES = [
  'Weddings',
  'Birthdays',
  'Corporate Events',
  'Private Celebrations',
  'School Events',
  'Community Events',
  'Nightlife',
  'Anniversaries',
  'Graduations',
  'Special Occasions',
] as const

export const SERVICE_LINE =
  'Weddings • Birthdays • Corporate Events • Private Parties • Nightlife'

/** Curated DJ + crowd media — videos lead, dupes removed. */
export const GALLERY_MEDIA: GalleryMediaItem[] = [
  {
    id: 'g1',
    type: 'video',
    source: '/media/videos/dj-poolside-booth.mp4',
    poster: '/media/posters/B96E837E-DAD4-44E9-9A1E-D51878565A25.jpg',
    alt: 'DJ Biggs behind the booth at a poolside event',
    eventType: 'Private Party',
    orientation: 'landscape',
  },
  {
    id: 'g2',
    type: 'video',
    source: '/media/videos/dj-stage-mic.mp4',
    poster: '/media/posters/IMG_7530.jpg',
    alt: 'DJ Biggs on stage with mic in hand',
    eventType: 'Nightlife',
    orientation: 'landscape',
  },
  {
    id: 'g3',
    type: 'video',
    source: '/media/videos/crowd-dance-01.mp4',
    poster: '/media/posters/IMG_1178.jpg',
    alt: 'Crowd dancing at a live DJ set',
    eventType: 'Private Celebration',
    orientation: 'portrait',
  },
  {
    id: 'g4',
    type: 'image',
    source: '/media/photos/about-hero-dj.jpg',
    poster: '/media/photos/about-hero-dj.jpg',
    alt: 'DJ Biggs performing with controllers lit up',
    eventType: 'Nightlife',
    orientation: 'portrait',
  },
  {
    id: 'g5',
    type: 'video',
    source: '/media/videos/dj-crowd-selfie.mp4',
    poster: '/media/posters/IMG_7089.jpg',
    alt: 'DJ Biggs with the crowd behind the booth',
    eventType: 'Birthday',
    orientation: 'portrait',
  },
  {
    id: 'g6',
    type: 'video',
    source: '/media/videos/crowd-dance-04.mp4',
    poster: '/media/posters/IMG_1185.jpg',
    alt: 'Guests dancing and celebrating on the floor',
    eventType: 'Private Party',
    orientation: 'landscape',
  },
  {
    id: 'g7',
    type: 'video',
    source: '/media/videos/dj-booth-02.mov',
    poster: '/media/photos/setup-booth.jpg',
    alt: 'Live booth view into the room',
    eventType: 'Nightlife',
    orientation: 'landscape',
  },
  {
    id: 'g8',
    type: 'image',
    source: '/media/photos/about-action-dj.jpg',
    poster: '/media/photos/about-action-dj.jpg',
    alt: 'DJ Biggs mid-set action shot',
    eventType: 'Special Occasion',
    orientation: 'portrait',
  },
  {
    id: 'g9',
    type: 'video',
    source: '/media/videos/crowd-celebration.mov',
    poster: '/media/photos/crowd-01.jpg',
    alt: 'Celebration energy on the dance floor',
    eventType: 'Wedding',
    orientation: 'landscape',
  },
  {
    id: 'g10',
    type: 'video',
    source: '/media/videos/energy-short.mp4',
    poster: '/media/photos/nightlife-controller.jpg',
    alt: 'High-energy party moment',
    eventType: 'Private Party',
    orientation: 'square',
  },
  {
    id: 'g11',
    type: 'video',
    source: '/media/videos/crowd-slomo.mp4',
    poster: '/media/posters/IMG_0394.jpg',
    alt: 'Slow-motion crowd dancing',
    eventType: 'Nightlife',
    orientation: 'landscape',
  },
  {
    id: 'g12',
    type: 'image',
    source: '/media/photos/setup-booth.jpg',
    poster: '/media/photos/setup-booth.jpg',
    alt: 'Full professional DJ booth setup',
    eventType: 'Corporate',
    orientation: 'landscape',
  },
]

export const SERVICES: ServiceItem[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    description:
      'Music and event flow designed around your ceremony, reception, special dances, announcements, and celebration.',
    icon: 'heart',
    image: '/media/photos/event-02.jpg',
  },
  {
    id: 'private',
    title: 'Private Parties',
    description:
      'Birthdays, anniversaries, graduations, family events, and personal celebrations tailored to your crowd.',
    icon: 'party',
    image: '/media/photos/crowd-01.jpg',
  },
  {
    id: 'corporate',
    title: 'Corporate and Community Events',
    description:
      'Professional entertainment for company functions, school events, nonprofit gatherings, and community celebrations.',
    icon: 'briefcase',
    image: '/media/photos/community-dj.jpg',
  },
  {
    id: 'nightlife',
    title: 'Nightlife',
    description:
      'High-energy music programming for lounges, clubs, bars, and late-night events.',
    icon: 'moon',
    image: '/media/photos/booth-02.jpg',
  },
]

export const FEATURES: FeatureItem[] = [
  {
    id: 'sound',
    title: 'Professional Sound',
    description:
      'Clear, powerful audio tuned so every guest hears the moment without distortion.',
    icon: 'speaker',
  },
  {
    id: 'crowd',
    title: 'Crowd Reading',
    description:
      'Music choices shift with the room so energy stays natural, not forced.',
    icon: 'crowd',
  },
  {
    id: 'mc',
    title: 'MC Support',
    description:
      'Smooth announcements, introductions, and transitions that keep the night on track.',
    icon: 'mic',
  },
  {
    id: 'lighting',
    title: 'Event Lighting',
    description:
      'Lighting options that elevate the space and match the mood of your celebration.',
    icon: 'lightbulb',
  },
  {
    id: 'comms',
    title: 'Reliable Communication',
    description:
      'Clear planning conversations before the event so details stay organized.',
    icon: 'message',
  },
  {
    id: 'planning',
    title: 'Personalized Music Planning',
    description:
      'Must-plays, do-not-plays, and special moments planned around your vision.',
    icon: 'list',
  },
]

export const BOOKING_STEPS: BookingStep[] = [
  {
    id: 'share',
    step: 1,
    title: 'Share Your Event Details',
    description:
      'Tell me the date, location, event type, and the experience you are planning.',
  },
  {
    id: 'confirm',
    step: 2,
    title: 'Confirm Availability and Options',
    description:
      'We will review your event needs, available services, and the best setup for your celebration.',
  },
  {
    id: 'secure',
    step: 3,
    title: 'Secure Your Date',
    description:
      'Approve the final details and complete the required booking steps to reserve your event.',
  },
]

/**
 * Draft testimonials for site presence.
 * Swap in real client quotes (with permission) before treating as published reviews.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-wedding',
    clientName: 'Marissa & Jordan',
    eventType: 'Wedding',
    eventDate: 'June 2025',
    reviewText:
      'DJ Biggs kept our whole reception seamless — ceremony music, introductions, and a packed dance floor until the end. Guests still text us about how fun the night was.',
    rating: 5,
  },
  {
    id: 't-birthday',
    clientName: 'Tasha R.',
    eventType: 'Birthday',
    eventDate: 'April 2025',
    reviewText:
      'My 30th felt like a real party, not awkward playlist energy. He read the room perfectly and switched vibes the second people started moving.',
    rating: 5,
  },
  {
    id: 't-corporate',
    clientName: 'Elena M.',
    eventType: 'Corporate Event',
    eventDate: 'March 2025',
    reviewText:
      'Professional from setup to teardown. Our company mixer actually had people dancing — rare for us. Clear communication beforehand made planning easy.',
    rating: 5,
  },
  {
    id: 't-private',
    clientName: 'Chris & Ana',
    eventType: 'Private Celebration',
    eventDate: 'February 2025',
    reviewText:
      'We hosted a backyard celebration and he made it feel like a boutique venue. Sound was clean, transitions were smooth, and he never missed a cue.',
    rating: 5,
  },
  {
    id: 't-school',
    clientName: 'Coach Daniels',
    eventType: 'School Event',
    eventDate: 'May 2025',
    reviewText:
      'Homecoming was a hit. Age-appropriate music, great energy, and he handled the crowd like a pro. Admin and students both asked when we could book him again.',
    rating: 5,
  },
  {
    id: 't-community',
    clientName: 'Lena Whitaker',
    eventType: 'Community Event',
    eventDate: 'October 2024',
    reviewText:
      'Biggs brought life to our charity walk celebration. Upbeat, welcoming, and respectful of the cause — exactly the tone we needed outdoors.',
    rating: 5,
  },
  {
    id: 't-nightlife',
    clientName: 'Marcus J.',
    eventType: 'Nightlife',
    eventDate: 'January 2025',
    reviewText:
      'Club energy without the chaos. The floor stayed full, the mixes were clean, and he knew exactly when to push and when to ride the moment.',
    rating: 5,
  },
  {
    id: 't-anniversary',
    clientName: 'Denise & Carl',
    eventType: 'Anniversary',
    eventDate: 'November 2024',
    reviewText:
      'Our 25th anniversary felt personal and classy. He mixed our era with songs the kids loved — everyone danced, and the night felt truly ours.',
    rating: 5,
  },
  {
    id: 't-grad',
    clientName: 'Ashley N.',
    eventType: 'Graduation',
    eventDate: 'May 2025',
    reviewText:
      'Grad party was unforgettable. He kept teens and parents happy (not easy), and the playlist hits were spot on from start to finish.',
    rating: 5,
  },
  {
    id: 't-special',
    clientName: 'Ricky S.',
    eventType: 'Special Occasion',
    eventDate: 'December 2024',
    reviewText:
      'Booked him for a surprise celebration and he nailed every detail — arrival music, the big reveal, and hours of dancing after. Stress-free for us.',
    rating: 5,
  },
]

/** @deprecated Use TESTIMONIALS */
export const TESTIMONIAL_PLACEHOLDERS = TESTIMONIALS

export const BRAND = {
  name: 'DJ Biggs',
  /** Transparent PNG — white ink + neon red accents for dark UI (?v= busts cache) */
  logoSrc: '/media/brand/dj-biggs-logo.png?v=5',
  tagline: 'South Florida energy. Professional event flow.',
  email: 'therealdjbiggs@gmail.com',
  areaPlaceholder: 'Service area: South Florida (details coming soon)',
} as const

/** Royalty-free website BG tracks. See public/media/audio/LICENSE.txt */
export const BG_TRACKS = [
  {
    id: 'trap',
    label: 'Trap House',
    shortLabel: 'Trap',
    src: '/media/audio/trap-house-fusion.mp3',
    credit: 'Need for speed — Mixkit',
  },
  {
    id: 'afrobeats',
    label: 'Afrobeats',
    shortLabel: 'Afro',
    src: '/media/audio/afrobeats-upbeat.mp3',
    credit: 'Afro House — Vibehorn / Pixabay (~129 BPM)',
  },
] as const

export type BgTrackId = (typeof BG_TRACKS)[number]['id']
