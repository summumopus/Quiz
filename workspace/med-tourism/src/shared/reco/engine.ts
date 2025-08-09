import { procedures } from '../data/constants'

export type BudgetOption = { id: string; label: string; min?: number; max?: number }
export type PriorityOption = { id: string; label: string }

export const budgetRanges: BudgetOption[] = [
  { id: 'under_2000', label: 'Under $2,000', max: 2000 },
  { id: '2k_5k', label: '$2,000 - $5,000', min: 2000, max: 5000 },
  { id: '5k_15k', label: '$5,000 - $15,000', min: 5000, max: 15000 },
  { id: '15k_30k', label: '$15,000 - $30,000', min: 15000, max: 30000 },
  { id: '30k_50k', label: '$30,000 - $50,000', min: 30000, max: 50000 },
  { id: '50k_plus', label: '$50,000+', min: 50000 },
]

export const priorities: PriorityOption[] = [
  { id: 'lowest_cost', label: 'Lowest Cost' },
  { id: 'shortest_wait', label: 'Shortest Wait Time (under 2 weeks)' },
  { id: 'highest_accreditation', label: 'Highest Accreditation (JCI certified)' },
  { id: 'english_doctors', label: 'English-Speaking Doctors' },
  { id: 'closest_home', label: 'Closest to Home' },
]

type Reco = {
  id: string
  country: string
  city: string
  flag: string
  hospital: string
  priceMin: number
  priceMax: number
  rating: number
  reviews: number
  why: string
  availableWeeks: number
}

// Realistic pricing snippets per the brief
const pricing: Record<string, { country: string; city: string; flag: string; price: [number, number]; why: string }[]> = {
  dental_implants: [
    { country: 'Turkey', city: 'Istanbul', flag: 'tr', price: [450, 800], why: '80% cheaper than UK/US' },
    { country: 'Mexico', city: 'Tijuana', flag: 'mx', price: [900, 1400], why: 'Closest to US with quality care' },
    { country: 'Thailand', city: 'Bangkok', flag: 'th', price: [700, 1200], why: 'JCI hospitals + English staff' },
  ],
  hip_replacement: [
    { country: 'India', city: 'Delhi', flag: 'in', price: [4000, 7000], why: 'Best value JCI hospitals' },
    { country: 'Thailand', city: 'Bangkok', flag: 'th', price: [8000, 12000], why: 'Premium care + medical visa' },
    { country: 'Poland', city: 'Warsaw', flag: 'pl', price: [6000, 9000], why: 'EU standards, short travel' },
  ],
  heart_bypass: [
    { country: 'India', city: 'Chennai', flag: 'in', price: [5000, 8000], why: 'World-class cardiac centers' },
    { country: 'Turkey', city: 'Ankara', flag: 'tr', price: [12000, 18000], why: 'European standards + accessibility' },
    { country: 'Thailand', city: 'Bangkok', flag: 'th', price: [15000, 25000], why: 'Premium private hospitals' },
  ],
  cosmetic_surgery: [
    { country: 'Turkey', city: 'Istanbul', flag: 'tr', price: [2500, 3500], why: 'All-inclusive packages' },
    { country: 'Colombia', city: 'Medellín', flag: 'co', price: [3000, 4500], why: 'Cosmetic surgery capital' },
    { country: 'Mexico', city: 'Cancún', flag: 'mx', price: [2800, 4000], why: 'Luxury clinics + recovery hotels' },
  ],
  ivf_treatment: [
    { country: 'India', city: 'Mumbai', flag: 'in', price: [2800, 4200], why: 'High success rates' },
    { country: 'Czech Republic', city: 'Prague', flag: 'cz', price: [3500, 5500], why: 'EU donor programs' },
    { country: 'Mexico', city: 'Mexico City', flag: 'mx', price: [4000, 6000], why: 'Advanced fertility clinics' },
  ],
}

export function computeTopRecommendations(q: string, country: string, budget: BudgetOption, priority: PriorityOption): Reco[] {
  const proc = q || procedures[0].value
  const rows = pricing[proc] || []
  let filtered = rows
  if (country && country !== 'All Countries') {
    filtered = filtered.filter(r => r.country === country)
  }
  if (budget) {
    filtered = filtered.filter(r => {
      const [min, max] = r.price
      if (budget.min != null && max < budget.min) return false
      if (budget.max != null && min > budget.max) return false
      return true
    })
  }
  // simple priority bias
  if (priority.id === 'lowest_cost') {
    filtered = [...filtered].sort((a, b) => a.price[0] - b.price[0])
  } else if (priority.id === 'shortest_wait') {
    // handled later by availableWeeks
  }

  // synthesize 3 cards with sample details
  const cards: Reco[] = filtered.slice(0, 3).map((r, idx) => ({
    id: `${proc}-${r.country.toLowerCase()}`,
    country: r.country,
    city: r.city,
    flag: r.flag,
    hospital: `${r.city} Medical Center`,
    priceMin: r.price[0],
    priceMax: r.price[1],
    rating: 4.3 + idx * 0.2,
    reviews: 120 + idx * 80,
    why: r.why,
    availableWeeks: priority.id === 'shortest_wait' ? 1 + idx : 3 + idx,
  }))

  return cards
}