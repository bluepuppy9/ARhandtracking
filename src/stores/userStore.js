import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(true)
  const handleSignin = (type, email, password) => {
    isLoggedIn.value = !isLoggedIn.value
  }
  return {
    isLoggedIn,
    handleSignin,
  }
})
