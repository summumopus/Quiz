import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getOfferDetailById } from '../shared/data/offers'

export default function ComparePage() {
  const [params] = useSearchParams()
  const ids = (params.get('ids') || '').split(',').filter(Boolean)
  const offers = useMemo(() => ids.map(getOfferDetailById).filter(Boolean), [ids])

  if (!offers.length) {
    return <div className="container-responsive py-10">Add offers to compare from the results or detail page.</div>
  }

  return (
    <div className="container-responsive py-8 overflow-x-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-[900px]">
        {offers.slice(0, 3).map((o) => (
          <div key={o!.id} className="card bg-white shadow p-4">
            <div className="font-semibold">{o!.hospital}</div>
            <div className="text-sm text-gray-600">{o!.city}, {o!.country}</div>
            <div className="mt-2 text-brand-700 font-bold">${o!.price.total.toLocaleString()}</div>
            <ul className="mt-2 text-sm space-y-1">
              <li>🏆 Accreditations: {o!.accreditations.map(a => a.name).join(', ')}</li>
              <li>⭐ Rating: {o!.rating}</li>
              <li>📅 Next available: {o!.nextAvailable}</li>
              <li>🗣 Languages: {o!.languages.join(', ')}</li>
              <li>🧑‍⚕️ Surgeon: Dr. {o!.surgeon.name}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}