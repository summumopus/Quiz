import { useParams } from 'react-router-dom'
import { getOfferDetailById } from '../shared/data/offers'
import { useFavorites } from '../shared/store/favorites'

export default function OfferDetailPage() {
  const { offerId } = useParams()
  const offer = getOfferDetailById(offerId!)

  if (!offer) return <div className="container-responsive py-10">Offer not found.</div>

  return (
    <div className="container-responsive py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="card bg-white shadow p-6">
          <h1 className="text-2xl font-bold">{offer.hospital} — {offer.procedureLabel}</h1>
          <p className="text-gray-600">{offer.city}, {offer.country}</p>
        </div>

        <div className="card bg-white shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Hospital Information</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {offer.accreditations.map(a => (
              <a key={a.name} href={a.link} target="_blank" className="badge badge-outline">{a.name}</a>
            ))}
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Founded:</span> {offer.founded} ({offer.yearsOfOperation} years)</div>
            <div><span className="font-medium">Surgeries/year:</span> {offer.surgeriesPerYear.toLocaleString()}</div>
            <div><span className="font-medium">Success rate:</span> {offer.successRate}%</div>
            <div><span className="font-medium">Languages:</span> {offer.languages.join(', ')}</div>
          </div>
        </div>

        <div className="card bg-white shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Lead Surgeon</h2>
          <div className="flex gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={offer.surgeon.photo} />
              </div>
            </div>
            <div>
              <div className="font-semibold">Dr. {offer.surgeon.name}, MD</div>
              <div className="text-sm text-gray-600">{offer.surgeon.education} • {offer.surgeon.specialization}</div>
              <div className="text-sm">{offer.surgeon.experienceYears} years experience</div>
              <div className="text-sm">{offer.surgeon.procedureCount}+ {offer.procedureLabel.toLowerCase()} surgeries performed</div>
              <div className="text-sm">Fluent: {offer.surgeon.languages.join(', ')}</div>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Patient Reviews</h2>
          <div className="grid gap-4">
            {offer.reviews.map(r => (
              <div key={r.id} className="border rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={r.photo} />
                    </div>
                  </div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-sm">⭐ {r.rating}</div>
                  <div className="text-xs text-gray-500 ml-auto">{r.date}</div>
                </div>
                <p className="mt-2 text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card bg-white shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Logistics Support</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Visa assistance: {offer.logistics.visaAssistance}</li>
            <li>Airport pickup: {offer.logistics.airportPickup}</li>
            <li>Accommodation: {offer.logistics.accommodation}</li>
            <li>Recovery support: {offer.logistics.recoverySupport}</li>
            <li>Translation: {offer.logistics.translation}</li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card bg-white shadow p-6">
          <h2 className="text-xl font-semibold">Price Breakdown</h2>
          <div className="mt-4 text-sm">
            <div className="text-2xl font-bold">💰 TOTAL PACKAGE: ${offer.price.total.toLocaleString()}</div>
            <ul className="mt-4 space-y-1">
              <li>✅ Surgery: ${offer.price.surgery.toLocaleString()}</li>
              <li>✅ Hospital stay ({offer.price.hospitalNights} nights): ${offer.price.hospitalStay.toLocaleString()}</li>
              <li>✅ Accommodation ({offer.price.accommodationNights} nights): ${offer.price.accommodation.toLocaleString()}</li>
              <li>✅ Airport transfers: ${offer.price.transfers.toLocaleString()}</li>
              <li>✅ Pre-op tests: ${offer.price.preopTests.toLocaleString()}</li>
              <li>✅ Follow-up consultation: ${offer.price.followUp.toLocaleString()}</li>
              <li>❌ Flights: Not included</li>
              <li>❌ Meals: ${offer.price.mealsPerDay}/day extra</li>
            </ul>
          </div>
          <button className="btn btn-primary btn-block mt-4">Request Free Quote</button>
          <FavoriteButton offerId={offer.id} />
        </div>

        <div className="card bg-white shadow p-6">
          <div className="text-sm">⭐ {offer.rating} ({offer.reviews.length} recent reviews)</div>
          <div className="text-sm">📅 Next available: {offer.nextAvailable}</div>
          <div className="text-sm">📍 {offer.city} • 15min from airport</div>
        </div>
      </div>
    </div>
  )
}

function FavoriteButton({ offerId }: { offerId: string }) {
  const { ids, toggle } = useFavorites()
  const isFav = ids.includes(offerId)
  return (
    <button className={`btn btn-block mt-2 ${isFav ? 'btn-secondary' : 'btn-outline'}`} onClick={() => toggle(offerId)}>
      {isFav ? 'Saved to Favorites' : 'Save to Favorites'}
    </button>
  )
}