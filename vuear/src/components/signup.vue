<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
            class="input-field"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
            class="input-field"
          />
          <input
            v-if="!isLogin"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            class="input-field"
          />
          <button
            type="submit"
            class="submit-button btn"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
          >
            {{ isLogin ? 'Login' : 'Create Account' }}
          </button>
        </div>
      </form>
      <p class="switch-text">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
        <a href="#" @click.prevent="toggleForm">{{ isLogin ? 'Sign up' : 'Login' }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const isLogin = ref(true)
const hovering = ref(false)
const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
})

function toggleForm() {
  isLogin.value = !isLogin.value
  form.value = { email: '', password: '', confirmPassword: '' }
}

function handleSubmit() {
  if (!isLogin.value && form.value.password !== form.value.confirmPassword) {
    alert("Passwords don't match")
    return
  }
  if (!isLogin.value && form.value.password.length < 6) {
    alert('Password must be at least 6 characters long')
    return
  }
  userStore.handleSignin('login', form.value.email, form.value.password)
  alert(isLogin.value ? 'Logged in successfully!' : 'Account created successfully!')
}
</script>

<style scoped>
.auth-wrapper {
  background: #000;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary);
  font-family: 'Segoe UI', sans-serif;
}

.auth-box {
  width: 22.5rem;
  padding: 2rem;
  border-radius: 12px;
  background: #111;
  box-shadow: 0 0 20px rgba(255, 234, 0, 0.15);
}

.auth-box h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-field {
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 8px;
  background: #000;
  color: var(--primary);
  outline: none;
}

.switch-text {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}
.switch-text a {
  color: var(--primary);
  text-decoration: underline;
  cursor: pointer;
}
</style>
