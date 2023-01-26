import { create } from "zustand"

const useTokenStore = create(set => ({
    token: '',
    removeToken: () => set({ token: false}),
    setToken: (input) => set({ token: input}),
}))

export default useTokenStore;