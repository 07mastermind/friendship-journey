export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  image?: string
}

export interface GalleryPhoto {
  id: string
  src: string
  caption: string
  /** Optional aspect hint for the masonry layout: 'square' | 'tall' | 'wide' */
  aspect?: 'square' | 'tall' | 'wide'
}

export interface FunFact {
  id: string
  label: string
  value: number
  suffix?: string
  icon: 'laugh' | 'camera' | 'plane' | 'joke' | 'call' | 'coffee' | 'icecream'
}

export interface ReasonCard {
  id: string
  number: number
  text: string
}

export interface MapMarker {
  id: string
  place: string
  note: string
  /** Position as percentage across the illustrated map, 0-100 */
  x: number
  y: number
}

export interface Quote {
  id: string
  text: string
  attribution?: string
}

export interface SiteContent {
  friendName: string
  yourName: string
  friendshipStartDate: string // ISO date, e.g. '2019-08-04'
  heroTitle: string
  heroSubtitle: string
  music: {
    src: string
    title: string
  }
  timeline: TimelineEvent[]
  gallery: GalleryPhoto[]
  funFacts: FunFact[]
  secretMessage: {
    correctNickname: string
    hint: string
    letter: string[]
  }
  reasons: ReasonCard[]
  mapMarkers: MapMarker[]
  quotes: Quote[]
  finaleMessage: string
  easterEgg: {
    triggerWord: string
    message: string
  }
}
