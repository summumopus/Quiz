export type Accreditation = { name: string; link: string }
export type Review = { id: string; name: string; rating: number; date: string; comment: string; photo: string }
export type Surgeon = { name: string; photo: string; education: string; specialization: string; experienceYears: number; procedureCount: number; languages: string[] }
export type PriceBreakdown = { total: number; surgery: number; hospitalStay: number; hospitalNights: number; accommodation: number; accommodationNights: number; transfers: number; preopTests: number; followUp: number; mealsPerDay: number }

export type OfferDetail = {
  id: string
  procedure: string
  procedureLabel: string
  hospital: string
  country: string
  city: string
  rating: number
  languages: string[]
  nextAvailable: string
  accreditations: Accreditation[]
  founded: number
  yearsOfOperation: number
  surgeriesPerYear: number
  successRate: number
  surgeon: Surgeon
  reviews: Review[]
  price: PriceBreakdown
  logistics: {
    visaAssistance: string
    airportPickup: string
    accommodation: string
    recoverySupport: string
    translation: string
  }
}

const LIPSUM = 'Excellent care, clear communication, and smooth recovery. Highly recommended.'

function makeReviews(n: number): Review[] {
  return Array.from({ length: n }).map((_, i) => ({
    id: `r${i}`,
    name: ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Sophia'][i % 6],
    rating: 4 + (i % 2),
    date: '2025-0' + ((i % 6) + 1) + '-1' + (i % 9),
    comment: LIPSUM,
    photo: `https://i.pravatar.cc/100?img=${(i % 70) + 1}`,
  }))
}

function buildOffer(id: string, data: Partial<OfferDetail>): OfferDetail {
  const base: OfferDetail = {
    id,
    procedure: 'dental_implants',
    procedureLabel: 'Dental Implants (single/multiple/All-on-4)',
    hospital: 'International Medical Center',
    country: 'Turkey',
    city: 'Istanbul',
    rating: 4.6,
    languages: ['English', 'Local'],
    nextAvailable: 'in 2 weeks',
    accreditations: [
      { name: 'JCI', link: 'https://www.jointcommissioninternational.org/' },
      { name: 'ISO 9001', link: 'https://www.iso.org/iso-9001-quality-management.html' },
    ],
    founded: 2005,
    yearsOfOperation: 19,
    surgeriesPerYear: 2500,
    successRate: 97,
    surgeon: {
      name: 'A. Demir',
      photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=256&q=80',
      education: 'Istanbul Univ. School of Medicine',
      specialization: 'Implantology',
      experienceYears: 15,
      procedureCount: 1800,
      languages: ['English', 'Turkish']
    },
    reviews: makeReviews(6),
    price: {
      total: 3200,
      surgery: 2400,
      hospitalStay: 300,
      hospitalNights: 2,
      accommodation: 300,
      accommodationNights: 5,
      transfers: 80,
      preopTests: 70,
      followUp: 50,
      mealsPerDay: 25,
    },
    logistics: {
      visaAssistance: 'Invitation letter and documentation support provided',
      airportPickup: 'Included',
      accommodation: 'Partner 4-5★ hotels with discounted rates',
      recoverySupport: 'On-call nursing and physiotherapy available',
      translation: '24/7 interpreter services',
    },
  }
  return { ...base, ...data }
}

const OFFERS: OfferDetail[] = []

// seed multi-country, multi-procedure offers (~60 entries)
const countries = [
  ['Turkey', 'Istanbul'],
  ['Mexico', 'Tijuana'],
  ['Thailand', 'Bangkok'],
  ['India', 'Delhi'],
  ['Poland', 'Warsaw'],
  ['Colombia', 'Medellín'],
  ['Czech Republic', 'Prague'],
  ['Hungary', 'Budapest'],
  ['Malaysia', 'Kuala Lumpur'],
  ['Vietnam', 'Ho Chi Minh City'],
]

const proceduresSeed = [
  ['dental_implants', 'Dental Implants (single/multiple/All-on-4)'],
  ['hip_replacement', 'Hip Replacement Surgery'],
  ['knee_replacement', 'Knee Replacement Surgery'],
  ['heart_bypass', 'Heart Bypass Surgery'],
  ['cosmetic_surgery', 'Cosmetic Surgery (breast augmentation/tummy tuck/BBL)'],
  ['cataract_surgery', 'Cataract Surgery'],
  ['ivf_treatment', 'IVF Treatment'],
  ['weight_loss_surgery', 'Weight Loss Surgery (gastric sleeve/bypass)'],
] as const

let idx = 0
for (const [country, city] of countries) {
  for (const [proc, label] of proceduresSeed) {
    idx += 1
    const id = `${proc}-${country.toLowerCase().replace(/\s/g,'_')}-${idx}`
    const rating = Math.round((4.2 + (idx % 6) * 0.1) * 10) / 10
    const total = 2000 + (idx % 7) * 500
    OFFERS.push(buildOffer(id, {
      procedure: proc,
      procedureLabel: label,
      hospital: `${city} Medical Center ${1 + (idx % 3)}`,
      country,
      city,
      rating,
      price: { ...buildOffer('base', {}).price, total },
    }))
  }
}

export function getOfferDetailById(id: string) {
  return OFFERS.find(o => o.id === id)
}

export function listOffers() {
  return OFFERS
}