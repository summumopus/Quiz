import { useMemo, useState } from 'react'
import { listOffers } from '../shared/data/offers'
import type { OfferDetail } from '../shared/data/offers'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export default function OffersListPage() {
  const all = listOffers()
  const [price, setPrice] = useState<[number, number]>([1000, 30000])
  const [accreditation, setAccreditation] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])

  const filtered = useMemo(() => {
    return all.filter(o => {
      if (o.price.total < price[0] || o.price.total > price[1]) return false
      if (accreditation.length && !accreditation.some(a => o.accreditations.map(x => x.name).includes(a))) return false
      if (languages.length && !languages.some(l => o.languages.includes(l))) return false
      // hospitalType and includes mocked
      return true
    })
  }, [all, price, accreditation, languages])

  return (
    <div className="container-responsive py-8 grid lg:grid-cols-[280px_1fr] gap-6">
      <aside className="space-y-6">
        <div className="card bg-white shadow p-4">
          <div className="font-semibold mb-2">Price range</div>
          <div className="px-2">
            <Slider range min={500} max={50000} step={100} value={price} allowCross={false} onChange={(val: any) => setPrice(val)} />
          </div>
          <div className="text-sm text-gray-600">${price[0].toLocaleString()} - ${price[1].toLocaleString()}</div>
        </div>
        <div className="card bg-white shadow p-4">
          <div className="font-semibold mb-2">Accreditation</div>
          {['JCI', 'ISO 9001', 'Local Ministry'].map(a => (
            <label key={a} className="label cursor-pointer">
              <span className="label-text">{a}</span>
              <input type="checkbox" className="checkbox" checked={accreditation.includes(a)} onChange={(e) => setAccreditation(prev => e.target.checked ? [...prev, a] : prev.filter(x => x !== a))} />
            </label>
          ))}
        </div>
        <div className="card bg-white shadow p-4">
          <div className="font-semibold mb-2">Hospital type</div>
          {['Private', 'Public', 'Specialty Clinic'].map(a => (
            <label key={a} className="label cursor-pointer opacity-60">
              <span className="label-text">{a}</span>
              <input type="checkbox" className="checkbox" disabled />
            </label>
          ))}
        </div>
        <div className="card bg-white shadow p-4">
          <div className="font-semibold mb-2">Languages</div>
          {['English', 'Spanish', 'German', 'French'].map(a => (
            <label key={a} className="label cursor-pointer">
              <span className="label-text">{a}</span>
              <input type="checkbox" className="checkbox" checked={languages.includes(a)} onChange={(e) => setLanguages(prev => e.target.checked ? [...prev, a] : prev.filter(x => x !== a))} />
            </label>
          ))}
        </div>
        <div className="card bg-white shadow p-4">
          <div className="font-semibold mb-2">Package includes</div>
          {['Hotel', 'Transfers', 'Follow-up'].map(a => (
            <label key={a} className="label cursor-pointer opacity-60">
              <span className="label-text">{a}</span>
              <input type="checkbox" className="checkbox" disabled />
            </label>
          ))}
        </div>
      </aside>

      <section className="space-y-4">
        {filtered.slice(0, 30).map((o) => (
          <OfferCard key={o.id} offer={o} />
        ))}
      </section>
    </div>
  )
}

function OfferCard({ offer }: { offer: OfferDetail }) {
  return (
    <div className="card bg-white shadow hover:shadow-lg transition rounded-xl">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">🏥 {offer.hospital}</div>
          <div className="text-brand-700 font-bold">Starting from ${offer.price.total.toLocaleString()}</div>
        </div>
        <div className="text-sm text-gray-600">📍 {offer.city} • 15min from airport</div>
        <div className="mt-2 text-sm">
          🏆 JCI Accredited ✅ ISO 9001 
        </div>
        <div className="text-sm">⭐ {offer.rating} ({offer.reviews.length} reviews)</div>
        <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
          <li>English-speaking surgeons</li>
          <li>Airport pickup included</li>
          <li>5-star recovery hotel</li>
          <li>1-year warranty</li>
        </ul>
        <div className="mt-2 text-sm">📅 Next available: {offer.nextAvailable}</div>
      </div>
    </div>
  )
}