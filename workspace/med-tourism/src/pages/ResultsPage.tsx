import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Select from 'react-select'
import { computeTopRecommendations, priorities, budgetRanges } from '../shared/reco/engine'
import type { PriorityOption } from '../shared/reco/engine'
import { procedures } from '../shared/data/constants'
import { useCompare } from '../shared/store/compare'

const budgetMarks = budgetRanges.reduce<Record<number, string>>((acc, cur, idx) => {
  acc[idx] = cur.label
  return acc
}, {})

export default function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const q = params.get('q') || ''
  const country = params.get('country') || 'All Countries'

  const [showPrefilter, setShowPrefilter] = useState(true)
  const [budgetIndex, setBudgetIndex] = useState(0)
  const budget = budgetRanges[budgetIndex]
  const [priority, setPriority] = useState<PriorityOption>(priorities[0])

  const recos = useMemo(() => computeTopRecommendations(q, country, budget, priority), [q, country, budget, priority])

  useEffect(() => {
    setShowPrefilter(true)
  }, [q, country])

  return (
    <div className="container-responsive py-8">
      <h2 className="text-2xl font-semibold">Top recommendations</h2>
      <p className="text-gray-600">for {procedures.find(p => p.value === q)?.label || q} {country !== 'All Countries' ? `in ${country}` : 'worldwide'}</p>

      <div className="mt-4">
        <button className="btn btn-outline btn-sm" onClick={() => navigate('/offers')}>View all detailed offers</button>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {recos.map((r) => (
          <div key={r.id} className="card bg-white shadow hover:shadow-lg transition rounded-xl overflow-hidden">
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className={`fi fi-${r.flag.toLowerCase()} rounded-sm`} aria-hidden />
                <span className="font-medium">{r.country}</span>
                <span>({r.city})</span>
              </div>
              <div className="mt-3 text-lg font-semibold">{r.hospital}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-brand-700 font-bold">
                  ${r.priceMin.toLocaleString()} - ${r.priceMax.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">⭐ {r.rating} ({r.reviews} reviews)</div>
              </div>
              <div className="mt-2 text-sm text-gray-700">{r.why}</div>
              <div className="mt-2 text-sm">✅ Available in {r.availableWeeks} weeks</div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary btn-sm" onClick={() => navigate(`/offer/${r.id}`)}>View Details</button>
                <CompareToggle id={r.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showPrefilter && (
          <motion.div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6"
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            >
              <h3 className="text-xl font-semibold">Tailor your recommendations</h3>
              <div className="mt-4 grid gap-6">
                <div>
                  <div className="font-medium mb-2">Budget Range</div>
                  <div className="px-2">
                    <Slider min={0} max={budgetRanges.length - 1} step={1} marks={budgetMarks} value={budgetIndex} onChange={(val: any) => setBudgetIndex(val)} />
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">Priority</div>
                  <Select
                    options={priorities}
                    getOptionLabel={(o) => o.label}
                    getOptionValue={(o) => o.id}
                    value={priority}
                    onChange={(v) => v && setPriority(v)}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button className="btn btn-ghost" onClick={() => setShowPrefilter(false)}>Skip</button>
                <button className="btn btn-primary" onClick={() => setShowPrefilter(false)}>Continue</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CompareToggle({ id }: { id: string }) {
  const { ids, toggle } = useCompare()
  const isOn = ids.includes(id)
  return (
    <button className={`btn btn-sm ${isOn ? 'btn-secondary' : 'btn-outline'}`} onClick={() => toggle(id)}>
      {isOn ? 'Added' : 'Compare'} ({ids.length}/3)
    </button>
  )
}