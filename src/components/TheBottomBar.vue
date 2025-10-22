<template>
  <div class="total-container">
    <div class="top-div"></div>
    <div class="bottom-div-style">
      <div class="bg-for-btns">
        <div class="btn-div-case">
          <div class="button-div">
            <button type="submit" id="net-img" class="ui-button-style"></button>
            <div class="btn-case-text">
              <p>Amount Left:</p>
              <h1>{{ inventory.ratNets }}</h1>
            </div>
          </div>
        </div>
        <div class="btn-div-case">
          <div class="button-div">
            <button id="cheese-banana-img" type="submit" class="ui-button-style"></button>
            <div class="btn-case-text">
              <p>Amount Left:</p>
              <h1>{{ inventory.cheeseBanana }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInventoryStore } from '@/stores/inventory'

const inventory = useInventoryStore()
</script>

<style scoped>
.top-div {
  height: 70%;
}

.text-no-transparent {
  opacity: 1;
}

#cheese-banana-img {
  background-image: url('@/assets/images/cheeseBanana.png');
}

#net-img {
  background-image: url('@/assets/images/ratNet.png');
}
</style>
