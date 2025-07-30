<template>
  <div class="ratdex-container">
    <div class="sticky-header">
      <h2 class="ratdex-title">🐀 Ratdex</h2>

      <div class="filters">
        <input v-model="searchTerm" placeholder="Search by name" class="search-input" />

        <select v-model="selectedRarity" class="rarity-select">
          <option value="all">All Rarities</option>
          <option v-for="rarity in rarities" :key="rarity.value" :value="rarity.value">
            {{ rarity.label }}
          </option>
        </select>

        <label class="caught-label">
          <input type="checkbox" v-model="onlyCaught" />
          <span>Caught Only</span>
        </label>
      </div>
    </div>

    <div class="rat-list-wrapper">
      <div v-if="filteredRats.length > 0">
        <ul class="rat-list">
          <li v-for="rat in filteredRats" :key="rat.key" :class="['rat-item', { caught: rat.caught }]"
            @click="showRat(rat)">
            {{ rat.name }}
            <span v-if="!rat.caught" class="not-caught-label">(Not caught)</span>
          </li>
        </ul>
      </div>

      <p v-else class="no-rats-msg">No rats match your filters.</p>
    </div>

    <div v-if="selectedRat" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ selectedRat.name }}</h3>
        <p>{{ selectedRat.description }}</p>
        <p><strong>Rarity:</strong> {{ selectedRat.rarity }}</p>
        <button @click="selectedRat = null" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { rarities } from '@/assets/ratdexData'
const props = defineProps({
  ratdex: {
    type: Object,
    required: true,
  },
})

const selectedRat = ref(null)
const searchTerm = ref('')
const selectedRarity = ref('all')
const onlyCaught = ref(false)

const ratdexList = computed(() =>
  Object.entries(props.ratdex).map(([key, value]) => ({ key, ...value }))
)

const filteredRats = computed(() => {
  return ratdexList.value.filter((rat) => {
    const matchesName = rat.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesRarity = selectedRarity.value === 'all' || rat.rarity === selectedRarity.value
    const matchesCaught = !onlyCaught.value || rat.caught
    return matchesName && matchesRarity && matchesCaught
  })
})

function showRat(rat) {
  if (rat.caught) selectedRat.value = rat
}
</script>

<style scoped>
.ratdex-container {
  padding: 0;
  background-color: #111;
  color: #ffd700;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: #111;
  padding: 16px 24px 12px;
  border-bottom: 1px solid #333;
}

.ratdex-title {
  font-size: 24px;
  margin: 0 0 12px 0;
  text-align: center;
  color: #ffd700;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.search-input,
.rarity-select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ffd700;
  background-color: #222;
  color: #ffd700;
  font-size: 1rem;
}

.search-input {
  flex: 1;
}

.caught-label {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffd700;
  font-weight: normal;
}

.rat-list-wrapper {
  padding: 24px;
  margin: 0;
}

.rat-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rat-item {
  padding: 10px 16px;
  margin-bottom: 8px;
  background-color: #333;
  color: #888;
  cursor: not-allowed;
  border: 1px solid #444;
  border-radius: 6px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  user-select: none;
}

.rat-item.caught {
  background-color: #222;
  color: #ffd700;
  cursor: pointer;
  user-select: auto;
}

.rat-item.caught:hover {
  background-color: #444400;
}

.not-caught-label {
  color: red;
}

.no-rats-msg {
  color: #ffd700;
  text-align: center;
  margin-top: 48px;
  font-style: italic;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #222;
  padding: 24px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  color: #ffd700;
  border: 2px solid #ffd700;
}

.close-button {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #ffd700;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #e6c200;
}
</style>
