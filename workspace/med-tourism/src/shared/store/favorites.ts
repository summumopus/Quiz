import { create } from 'zustand'

type FavoritesState = {
  ids: string[]
  toggle: (id: string) => void
}

const STORAGE_KEY = 'favorites'

export const useFavorites = create<FavoritesState>((set, get) => ({
  ids: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  toggle: (id: string) => {
    const current = get().ids
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    set({ ids: next })
  }
}))