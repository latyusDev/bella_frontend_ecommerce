import {create} from "zustand";
type OrderStoreState = {
  orderTab: string;
  setOrderTab: (tab: string) => void;
};

export const useOrderStore = create<OrderStoreState>((set) => ({
  orderTab: "personal-info",
  setOrderTab: (tab: string) => set({ orderTab: tab }),
}));