<template>
  <div
    style="
      background-color: #111122;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
      color: white;
    "
  >
    <div
      style="
        background-color: #222233;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 0 10px black;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <h2 style="margin-bottom: 20px; font-size: 24px">Login, my liege</h2>
      <form @submit.prevent="handleLogin" style="width: 100%">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          style="
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
          "
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          style="
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
          "
          required
        />
        <button
          type="submit"
          style="
            padding: 10px;
            width: 100%;
            background-color: #4444aa;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          "
        >
          Enter the Ratdom
        </button>
        <p v-if="error" style="margin-top: 10px; color: #ff4444; font-size: 14px">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  if (username.value === 'ratking' && password.value === 'cheddar') {
    alert('Welcome, my liege.')
    error.value = ''
  } else {
    error.value = 'Wrong credentials, lowly scum.'
  }
}
</script>
