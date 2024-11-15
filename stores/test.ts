import { defineStore } from "pinia"

export const useTestStore = defineStore({
  id: "testStore",
  state: () => ({
    test: "",
  }),
  actions: {},
})
