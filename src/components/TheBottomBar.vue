<template>
  <div class="total-container">
    <div class="top-div"></div>
    <div class="bottom-div-style">
      <div class="bg-for-btns">
        <div class="btn-div-case">
          <div class="button-div">
            <button type="submit" id="net-img" class="button-style"></button>
            <div class="btn-case-text">
              <p>Amount Left:</p>
              <h1>{{ inventory.ratNets }}</h1>
            </div>
          </div>
        </div>
        <div class="btn-div-case">
          <div class="button-div">
            <button id="cheese-banana-img" type="submit" class="button-style"></button>
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
.total-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden !important;
  touch-action: none !important;
}
.top-div {
  height: 70%;
}
.bottom-div-style {
  display: flex;
  position: relative;
  height: 25%;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--secondary);
  color: var(--primary);
  align-items: center;
  justify-content: center;
  overflow: hidden !important;
  max-width: 100vw;
  touch-action: none !important;
  overscroll-behavior: none !important;
}
.btn-div-case {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 45%;
  height: 100%;
  color: var(--primary);
  justify-content: space-around;
}
.button-div {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0.5rem;
  justify-content: space-around;
}

.btn-case-text {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0.5rem;
  h1 {
    text-align: center;
    font-family: var(--title-font);
  }
  p {
    font-family: var(--sub-title-font);
    font-weight: 400;
    font-style: Regular;
    font-size: 1.2rem;
    line-height: 120%;
    letter-spacing: 0%;
  }
}
.button-style {
  width: 100%;
  height: 100%;
  min-height: 7rem;
  min-width: 7rem;
  margin: 0.2rem;
  padding: 1.25rem 1.5rem;
  background: gray;
  color: var(--secondary);
  border: none;
  border-radius: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 1rem var(--primary);
  white-space: nowrap;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.text-no-transparent {
  opacity: 1;
}

.bg-for-btns {
  background-color: var(--primary);
  border-radius: 2rem;
  box-sizing: border-box;
  padding: 0.5rem;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
#cheese-banana-img {
  background-image: url('@/assets/images/cheeseBanana.png');
}

#net-img {
  background-image: url('@/assets/images/ratNet.png');
}
</style>
