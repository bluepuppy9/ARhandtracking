import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const isLoggedIn = ref(true)
  const handleSignin = (type, email, password) => {
    isLoggedIn.value = !isLoggedIn.value
  }

  const handleLogin = (username, password) => {
    fetch(`https://100.101.65.214:8000/api/users/${username}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Signup successful:', data)
      })
      .catch((error) => {
        console.error('Error during signup:', error)
      })
  }
  return {
    isLoggedIn,
    handleSignin,
    handleLogin,
  }
})
