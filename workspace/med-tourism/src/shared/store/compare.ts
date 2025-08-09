import { create } from 'zustand'

export type CompareState = {
  ids: string[]
  toggle: (id: string) => void
  getUrl: () => string
}

export const useCompare = create<CompareState>((set, get) => ({
  ids: [],
  toggle: (id: string) => set(state => {
    const exists = state.ids.includes(id)
    let next = state.ids
    if (exists) next = state.ids.filter(x => x !== id)
    else next = state.ids.length >= 3 ? [...state.ids.slice(1), id] : [...state.ids, id]
    return { ids: next }
  }),
  getUrl: () => `/compare?ids=${get().ids.join(',')}`,
}))