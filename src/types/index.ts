export type NavItem = {
  id: string
  label: string
  href: string
}

export type MediaType = 'image' | 'video'

export type MediaOrientation = 'portrait' | 'landscape' | 'square'

export type GalleryMediaItem = {
  id: string
  type: MediaType
  source: string
  poster: string
  alt: string
  eventType: string
  orientation: MediaOrientation
}

export type ServiceItem = {
  id: string
  title: string
  description: string
  icon: 'heart' | 'party' | 'briefcase' | 'moon'
  image: string
}

export type FeatureItem = {
  id: string
  title: string
  description: string
  icon:
    | 'speaker'
    | 'crowd'
    | 'mic'
    | 'lightbulb'
    | 'message'
    | 'list'
}

export type BookingStep = {
  id: string
  step: number
  title: string
  description: string
}

export type Testimonial = {
  id: string
  clientName: string
  eventType: string
  eventDate: string
  reviewText: string
  image?: string
  rating: number
}

/** @deprecated Prefer Testimonial */
export type TestimonialPlaceholder = Testimonial

