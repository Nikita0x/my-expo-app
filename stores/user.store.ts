// store/useCounter.ts
import { create } from 'zustand';
import type { CustomerInfo } from 'react-native-purchases';

type UserState = {
  name: string;
  customerInfo?: CustomerInfo;
};

export const useUserStore = create<UserState>(() => ({
  name: 'Anonymous',
}));
