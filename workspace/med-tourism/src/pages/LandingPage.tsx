import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Select from 'react-select'
import Fuse from 'fuse.js'
import { procedures, topCountries } from '../shared/data/constants'
import type { ProcedureOption } from '../shared/data/constants'

export default function LandingPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedProcedure, setSelectedProcedure] = useState<ProcedureOption | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>('All Countries')

  const fuse = useMemo(
    () => new Fuse(procedures, { keys: ['label'], threshold: 0.3 }),
    []
  )

  const suggestions = useMemo(() => {
    if (!query) return procedures.slice(0, 8)
    return fuse.search(query).map(r => r.item).slice(0, 8)
  }, [query, fuse])

  const handleSearch = () => {
    const proc = selectedProcedure?.value || suggestions[0]?.value || ''
    const country = selectedCountry
    navigate({ pathname: '/results', search: new URLSearchParams({ q: proc, country }).toString() })
  }

  return (
    <div className="container-responsive py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
          Compare trusted hospitals worldwide and save on medical care
        </h1>
        <p className="mt-4 text-gray-600">
          Transparent prices, verified reviews, and fast availability.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-[1.5fr_1fr_auto] items-center">
        <div className="relative">
          <input
            className="input input-lg input-bordered w-full"
            placeholder="Search procedures (e.g., Dental Implants)"
            value={query || selectedProcedure?.label || ''}
            onChange={(e) => { setSelectedProcedure(null); setQuery(e.target.value) }}
            onFocus={() => setQuery(selectedProcedure?.label || query)}
          />
          {query && (
            <div className="absolute z-20 mt-2 w-full rounded-xl border bg-white shadow">
              {suggestions.map((s) => (
                <button
                  key={s.value}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50"
                  onClick={() => { setSelectedProcedure(s); setQuery('') }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Select
          classNamePrefix="react-select"
          options={[{ value: 'All Countries', label: 'All Countries' }, ...topCountries.map(c => ({ value: c, label: c }))]}
          value={{ value: selectedCountry, label: selectedCountry }}
          onChange={(opt) => setSelectedCountry(opt?.value || 'All Countries')}
          placeholder="Select country"
        />
        <button className="btn btn-primary btn-lg" onClick={handleSearch}>Search</button>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
        <div className="badge badge-lg badge-outline">Compare 500+ verified medical facilities</div>
        <div className="badge badge-lg badge-outline">Save 30-80% on medical procedures</div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {procedures.slice(0, 8).map(p => (
          <button key={p.value} className="btn btn-sm" onClick={() => { setSelectedProcedure(p); handleSearch() }}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}