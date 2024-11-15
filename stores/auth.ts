import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({ 
    name: '',
    email: '',
    password: '',
  }),
  actions: {
    async init() {
      this.name = (await getPreferences('name')).value ?? ''
      this.email = (await getPreferences('email')).value ?? ''
      this.password = (await getPreferences('password')).value ?? ''
    },
    async setName(name: string) {
      this.name = name
      setPreferences('name', name)
    },
    async setEmail(email: string) {
      this.email = email
      setPreferences('email', email)
    },
    async setPassword(password: string) {
      this.password = password
      setPreferences('password', password)
    },
  }
})
