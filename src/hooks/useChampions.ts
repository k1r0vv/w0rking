import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Champion, ChampionClass } from '../types/champion';
import { nanoid } from 'nanoid';

interface ChampionsState {
  champions: Champion[];
  addChampion: (champion: Omit<Champion, 'id'>) => void;
  removeChampion: (id: string) => void;
  updateChampion: (id: string, champion: Partial<Champion>) => void;
  getChampionsByClass: (championClass: ChampionClass, starRating: '6' | '7') => Champion[];
}

export const useChampions = create<ChampionsState>()(
  persist(
    (set, get) => ({
      champions: [],
      addChampion: (champion) => 
        set((state) => ({
          champions: [...state.champions, { ...champion, id: nanoid() }]
        })),
      removeChampion: (id) =>
        set((state) => ({
          champions: state.champions.filter((c) => c.id !== id)
        })),
      updateChampion: (id, champion) =>
        set((state) => ({
          champions: state.champions.map((c) =>
            c.id === id ? { ...c, ...champion } : c
          )
        })),
      getChampionsByClass: (championClass, starRating) => {
        return get().champions.filter(
          (c) => c.class === championClass && c.starRating === starRating
        );
      },
    }),
    {
      name: 'champions-storage',
    }
  )
);