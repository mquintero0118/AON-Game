<template>
    <ul style="margin-top: 50px;">
      <li v-for="item in itens" :key="item.unique">
        <div
          class="card"
          :class="{ 'is-flipped': item.isFlipped || item.wasFound }"
          @click="selectCardItem(item)"
        >
          <div class="card__face card__face--front">
            <img
              :src="require('@/assets/card-icons/question.svg')"
              alt="Question?"
              width="100"
            />
          </div>
          <div class="card__face card__face--back">
            <img :src="item.icon" :alt="item.title" :style="item.style" />
            <div class="container">
              <h4 style="color: #556D79;">
                <b>{{ item.title }}</b>
              </h4>
            </div>
          </div>
        </div>
      </li>
    </ul>
</template>

<script setup>
import { defineEmits } from 'vue'
import useCardItems from '@/composables/useCardItems'

const emit = defineEmits(['selected'])
const { itens, generateRandomItems } = useCardItems

generateRandomItems()

const selectCardItem = (item) => {
  if (item.wasFound || item.isFlipped) return
  item.isFlipped = !item.isFlipped
  emit('selected', item)
}
</script>

<style scoped>
ul {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 10em);
  gap: 15px;
  max-width: 712px;
  padding: 0;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 1s;
  transform-style: preserve-3d;
  position: relative;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card__face {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card__face--back {
  transform: rotateY(180deg);
}

.card img {
  border-radius: 5px 5px 0 0;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

@media (min-width: 320px) and (max-width: 489px) {
  ul {
    grid-template-columns: repeat(2, 10em);
  }
}

@media (min-width: 490px) and (max-width: 761px) {
  ul {
    grid-template-columns: repeat(3, 10em);
  }
}

@media (max-width: 761px) {
  ul {
    top: 52vh;
    max-height: 75vh;
    overflow-y: auto;
  }
}

h4 {
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
}
</style>
