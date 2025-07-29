<template>
  <div>
    <h2 style="font-size: 24px; margin-bottom: 16px;">Ratdex</h2>
    <ul style="list-style: none; padding: 0;">
      <li
        v-for="(rat, key) in ratdexList"
        :key="key"
        :style="getItemStyle(rat.caught)"
        @click="rat.caught && showRat(rat)"
      >
        {{ rat.name }}
        <span v-if="!rat.caught" style="margin-left: 8px; color: red;">(Not caught)</span>
      </li>
    </ul>

    <div v-if="selectedRat" :style="modalStyle">
      <div :style="modalContentStyle">
        <h3 style="margin-top: 0;">{{ selectedRat.name }}</h3>
        <p>{{ selectedRat.description }}</p>
        <button @click="selectedRat = null" style="margin-top: 16px;">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  ratdex: {
    type: Object,
    required: true
  }
})

const selectedRat = ref(null)

const ratdexList = computed(() =>
  Object.entries(props.ratdex).map(([key, value]) => ({ key, ...value }))
)

function showRat(rat) {
  selectedRat.value = rat
}

function getItemStyle(caught) {
  return {
    padding: '8px',
    marginBottom: '4px',
    backgroundColor: caught ? '#e0ffe0' : '#f8f8f8',
    color: caught ? '#000' : '#aaa',
    cursor: caught ? 'pointer' : 'not-allowed',
    border: '1px solid #ccc',
    borderRadius: '4px'
  }
}

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
}

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '8px',
  width: '300px',
  textAlign: 'center'
}
</script>
