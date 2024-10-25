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
  finalScore.value = 0 // Reset the final score when restarting
  finalScore2.value = 0
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
const finalScore2 = ref(0)

function calculateScore () {
  // If score is already calculated, return the stored value
  console.log('countFounded', countFounded.value)
  if (countFounded.value === 0) {
    return 0
  }
  console.log('finalScore', finalScore.value)
  if (finalScore.value > 0) {
    return finalScore.value
  }
  if (finalScore2.value > 0) {
    return finalScore2.value
  }
  console.log('isFinished', isFinished.value)
  if (countFounded.value === itens.length && !isFinished.value) {
    isFinished.value = true
    // Calculate score only once - now fewer tries = better score
    finalScore.value = (2000 / tries.value) / (elapsedTime.value / 10)
    finalScore2.value = finalScore.value
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
  text-align: center;
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
  background-color: #FF0010;
  color: #ffffff;
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

  h1, h2 {
    font-size: 1.2rem; /* Reduce font size */
  }

  .card-container {
    display: flex;
    flex-direction: column; /* Stack cards vertically */
    align-items: center;
  }
}

h1, h2, h3, h4, h5, h6 {
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
}
</style>
