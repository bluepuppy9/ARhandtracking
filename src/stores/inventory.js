import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
  const cheeseBanana = ref(1)
  const ratNets = ref(3)
  const ratsCaught = ref(0)

  function addCheeseBanana(amount) {
    cheeseBanana.value += amount
  }
  function useCheeseBanana() {
    if (cheeseBanana.value > 0) {
      cheeseBanana.value--
      return true
    }
    return false
  }
  function useRatNet() {
    if (ratNets.value > 0) {
      ratNets.value--
      return true
    }
    return false
  }
  function addRatNet(amount) {
    ratNets.value += amount
  }
  function addRatsCaught() {
    ratsCaught.value++
  }
  return {
    cheeseBanana,
    ratNets,
    ratsCaught,
    useCheeseBanana,
    useRatNet,
    addCheeseBanana,
    addRatNet,
    addRatsCaught,
  }
})
