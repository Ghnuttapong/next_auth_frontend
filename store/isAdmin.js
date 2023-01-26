import { create } from "zustand";

const useAdminStore = create((set) => ({
  isAdmin: "",
  setIsAdmin: (input) => set({ isAdmin: input ? input : "" }),
  removeIsAdmin: () => set({ isAdmin: false }),
}));
export default useAdminStore;
