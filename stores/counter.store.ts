// store/useCounter.ts
import { create } from 'zustand';

type CounterState = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

export const useCounter = create<CounterState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));
