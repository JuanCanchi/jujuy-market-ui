import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),

  actions: {
    async login(email, password) {
      try {
        const res = await axios.post('http://localhost:8081/login', {
          email,
          password,
        })

        this.token = res.data.token
        localStorage.setItem('token', res.data.token)
        return true
      } catch (err) {
        console.error('Login error:', err)
        return false
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },

    isAuthenticated() {
      return !!this.token
    },
  },
})
