<template>
  <div
    style="
      background-color: #1a1a2e;
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
        background-color: #16213e;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 0 15px black;
        width: 320px;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <h2 style="margin-bottom: 20px; font-size: 24px">Sign Up, my liege</h2>
      <form @submit.prevent="handleSignup" style="width: 100%">
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
          v-model="email"
          type="email"
          placeholder="Email"
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
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          style="
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
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
            background-color: #0f3460;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          "
        >
          Begin the Ratventure
        </button>
        <p v-if="error" style="margin-top: 10px; color: #ff4444; font-size: 14px">{{ error }}</p>
        <p v-if="success" style="margin-top: 10px; color: #00ff88; font-size: 14px">
          {{ success }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')

const handleSignup = () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'The passwords do not match, my liege.'
    success.value = ''
  } else {
    error.value = ''
    success.value = 'Account created, your rat army awaits!'
    // (Optional) Save to storage or emit event here
  }
}
</script>
