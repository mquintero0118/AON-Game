<script setup>
import { ref, computed, onMounted } from 'vue'
import CardItem from '@/components/CardItems.vue'
import cardItems from '@/composables/useCardItems'

const {
  itens,
  countFounded,
  generateRandomItems,
  process,
  tries // Import tries
} = cardItems

// Timer variables
const elapsedTime = ref(0)
let timerId = null

// Timer functions
const startTimer = () => {
  if (timerId === null) {
    timerId = setInterval(() => {
      elapsedTime.value += 1
    }, 1000)
  }
}

const stopTimer = () => {
  if (timerId !== null) {
    clearInterval(timerId)
    timerId = null
  }
}

const resetTimer = () => {
  stopTimer()
  elapsedTime.value = 0
}

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedTime.value / 60)
  const seconds = elapsedTime.value % 60
  return `${minutes}m ${seconds}s`
})

const restartGame = () => {
  resetTimer()
  generateRandomItems()
  isFinished.value = false
}

onMounted(() => {
  generateRandomItems()
})

const originalProcess = process

const processItem = (item) => {
  // Start the timer when the first item is clicked
  if (elapsedTime.value === 0 && timerId === null) {
    startTimer()
  }

  // Call the original process function
  originalProcess(item)

  // No need to update tries here; it's reactive

  // Check if the game is completed
  if (countFounded === itens.length) {
    stopTimer()
  }
}
const isFinished = ref(false)

const finalScore = ref(0)

function calculateScore () {
  // If score is already calculated, return the stored value
  if (countFounded.value === 0) {
    return 0
  }
  if (finalScore.value > 0) {
    return finalScore.value
  }

  if (countFounded.value === itens.length && !isFinished.value) {
    isFinished.value = true
    console.log('entreo')
    // Calculate score only once
    finalScore.value = tries.value * 200 / elapsedTime.value
    return finalScore.value
  }

  return 0
}
</script>

<template>
  <div iv class="game-container" v-if="countFounded === itens.length">
    <img src="@/assets/AON/AONLogo-removebg-preview.png" width="353" height="145"  alt="AON" class="aon-logo">
    <h1 style="color: #262836; margin: 0; margin-top: 20px;">
      Felicidades! Ganaste!
    </h1>
    <h2 style="color: #262836; margin: 0; margin-top: 10px;">
      Score: {{ calculateScore().toFixed(2) }}
    </h2>
    <button class="restart-button" @click="restartGame">Restart</button>
  </div>
  <div v-else>
    <div class="data-container">
      <img src="@/assets/AON/AONLogo-removebg-preview.png" width="353" height="145"  alt="AON" class="aon-logo">
      <h1 style="color: #262836; margin: 0;">Flip Card Memory Game</h1>
      <h2 style="color: #46535E; margin: 0;">{{ tries }} moves - {{ formattedTime }}</h2>
    </div>
    <CardItem @selected="processItem" />
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #EBF6F7; /* Or any color you prefer */
  font-family: 'Helvetica', Arial, sans-serif; /* Changed from 'Roboto' to 'Helvetica' */
}
h1 {
  margin-top: 40px;
}
.data-container {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  padding-bottom: 0;
  flex-direction: column;
  text-align: center; /* Center text */
}
.game-container {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  height: 100vh; /* Use full viewport height to center vertically */
  width: 100%;
  color: #fff;
}
.restart-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #42b883;
  color: #FF0010;
  border: none;
  border-radius: 5px;
}
.aon-logo {
  width: 100%; /* Make logo responsive */
  max-width: 353px; /* Maintain original max width */
  height: auto;
}

@media (max-width: 600px) {
  .data-container {
    padding: 0.5rem; /* Reduce padding on smaller screens */
  }

  .aon-logo {
    max-width: 200px; /* Adjust logo size for smaller screens */
  }
}
</style>
