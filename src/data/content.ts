import type { SiteContent } from './types'

/**
 * ============================================================
 *  EDIT EVERYTHING HERE. This is the only file you need to touch.
 *  Nothing in /src/components should need to change for content updates.
 * ============================================================
 */
export const content: SiteContent = {
  friendName: 'Vandana',
  yourName: 'You',

  // Format: 'YYYY-MM-DD'. The counter on the site is calculated from this automatically.
  friendshipStartDate: '2025-09-01',

  heroTitle: 'Happy Friendship Day',
  heroSubtitle: "This isn't just a website.\nIt's a small journey through our friendship.",

  music: {
    src: '/audio/theme.mp3',
    title: 'Our Song',
  },

  timeline: [
    {
      id: 't1',
      date: 'August 2019',
      title: 'The Day We Met',
      description:
        'A random conversation that somehow never really ended. Neither of us knew it would turn into this.',
      image: '/images/anime/01.svg',
    },
    {
      id: 't2',
      date: 'March 2020',
      title: 'The Long Calls',
      description:
        'The world went quiet, but our calls only got longer. Some nights we talked until sunrise about nothing and everything.',
      image: '/images/anime/02.svg',
    },
    {
      id: 't3',
      date: 'November 2021',
      title: 'The First Trip',
      description:
        'Terrible directions, a car that almost didn\u2019t make it, and the best three days we\u2019d had in years.',
      image: '/images/anime/03.svg',
    },
    {
      id: 't4',
      date: 'June 2023',
      title: 'The Hard Year',
      description:
        'You showed up when it mattered most, without needing to be asked. That\u2019s the year I understood what this friendship actually was.',
      image: '/images/anime/04.svg',
    },
    {
      id: 't5',
      date: 'Today',
      title: 'Still Going',
      description:
        'Same inside jokes, same ridiculous voice notes, same person I call first. Here\u2019s to everything still ahead of us.',
      image: '/images/anime/05.svg',
    },
  ],

  gallery: [
    { id: 'g9', src: '/images/gallery/09.jpg', caption: 'Walking back from the visit, still in uniform', aspect: 'tall' },
    { id: 'g10', src: '/images/gallery/10.jpg', caption: 'Clipboard in hand, mid-hackathon hustle', aspect: 'square' },
    { id: 'g11', src: '/images/gallery/11.jpg', caption: 'The anime era of this friendship', aspect: 'wide' },
    { id: 'g12', src: '/images/gallery/12.jpg', caption: 'The watch you can\u2019t stop checking on time for us', aspect: 'square' },
  ],

  funFacts: [
    { id: 'f1', label: 'Times we laughed until it hurt', value: 42, icon: 'laugh' },
    { id: 'f2', label: 'Blurry, chaotic selfies', value: 10, icon: 'camera' },
    { id: 'f3', label: 'Trips taken together', value: 3, icon: 'plane' },
    { id: 'f4', label: 'Inside jokes nobody else gets', value: 47, icon: 'joke' },
    { id: 'f5', label: 'Hours on the phone, easily', value: 1260, suffix: '+', icon: 'call' },
    { id: 'f6', label: 'Ice creams shared together', value: 2, icon: 'icecream' },
  ],

  secretMessage: {
    correctNickname: 'sunshine', // case-insensitive match
    hint: 'What nickname do I call you?',
    letter: [
      'Hey, it\u2019s me.',
      'I built this whole thing because a text message felt too small for what I actually wanted to say.',
      'Thank you for every call answered at odd hours, every plan you showed up for, every version of me you\u2019ve stuck around for.',
      'I don\u2019t say this enough, so I\u2019m saying it here: I\u2019m grateful for you. Genuinely, quietly, all the time.',
      'Here\u2019s to more years of this. Happy Friendship Day.',
    ],
  },

  reasons: Array.from({ length: 20 }, (_, i) => ({
    id: `r${i + 1}`,
    number: i + 1,
    text: [
      'You remember things I forgot I told you.',
      'You never make me repeat myself when I\u2019m upset.',
      'You\u2019ve driven way too far for way too little reason, for me.',
      'Your terrible advice is somehow always right.',
      'You laugh at my jokes even the third time.',
      'You noticed when I went quiet and didn\u2019t let it slide.',
      'You keep every promise you make, even small ones.',
      'You make ordinary days feel like an event.',
      'You never once made me feel too much.',
      'You call things out instead of staying silent.',
      'You\u2019ve seen me at my worst and stayed anyway.',
      'You celebrate my wins like they\u2019re yours.',
      'You send the memes exactly when I need them.',
      'You\u2019re the first person I want to tell things to.',
      'You make hard days lighter without even trying.',
      'You never keep score.',
      'You show up. Every single time.',
      'You make me laugh until I can\u2019t breathe.',
      'You\u2019ve become home, in a way.',
      'You\u2019re just... you. And that\u2019s the whole reason.',
    ][i] ?? 'A reason worth remembering.',
  })),

  mapMarkers: [
    { id: 'm1', place: 'Community Visit', note: 'Field visit, still in our whites', x: 22, y: 34 },
    { id: 'm2', place: 'The Labs', note: 'Where half our best conversations happened', x: 48, y: 58 },
    { id: 'm3', place: 'IT Campus', note: 'Just another day that turned into a memory', x: 68, y: 26 },
    { id: 'm4', place: 'Hackathon', note: 'Clipboards, deadlines, and somehow still laughing', x: 78, y: 70 },
  ],

  quotes: [
    { id: 'q1', text: 'A friend is someone who knows the song in your heart and can sing it back to you.', attribution: 'Unknown' },
    { id: 'q2', text: 'Friendship is born at that moment when one person says to another, "What! You too?"', attribution: 'C.S. Lewis' },
    { id: 'q3', text: 'Good friends are like stars \u2014 you don\u2019t always see them, but you know they\u2019re there.', attribution: 'Unknown' },
    { id: 'q4', text: 'A single rose can be my garden, a single friend, my world.', attribution: 'Leo Buscaglia' },
  ],

  finaleMessage: 'Thank you for being part of my life.',

  easterEgg: {
    triggerWord: 'confetti',
    message: 'You found it. There\u2019s always something extra hiding for people who pay attention \u2014 just like you.',
  },
}
