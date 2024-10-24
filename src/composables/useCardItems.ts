import Items, { CardItem } from '@/mocks/card-items'
import { reactive, computed } from 'vue'

const itens = reactive<CardItem[]>([])
const validationItens = reactive<CardItem[]>([])
let currentItems = reactive(<CardItem>{})

// Create a reactive state object to hold triesCount
const state = reactive({
  triesCount: 0
})

// Computed property to automatically update the count of found items
const countFounded = computed(() => itens.filter(i => i.wasFound).length)

// Generate random items and reset triesCount
const generateRandomItems = (): void => {
  itens.length = 0
  state.triesCount = 0 // Reset tries count when new game starts
  ;([...Items, ...Items])
    .sort(() => Math.random() - 0.5)
    .forEach((item, i) => {
      const currentItem: CardItem = { ...item, unique: btoa(String(i)) }
      itens.push(currentItem)
    })
}

const registerCurrentItems = (items: CardItem): CardItem => (currentItems = items)

// Update triesCount and process item selection
const process = (item: CardItem): void => {
  validationItens.push(item)

  if (validationItens.length === 2) {
    // Increment tries count whenever two items are flipped
    state.triesCount++

    if (validationItens[0].title === validationItens[1].title) {
      validationItens.forEach(item => (item.wasFound = true))
      validationItens.length = 0
    } else {
      setTimeout(() => {
        validationItens.forEach(item => (item.isFlipped = false))
        validationItens.length = 0
      }, 700)
    }
  }
}

// Computed property to get tries count
const tries = computed(() => state.triesCount)

export default {
  itens,
  validationItens,
  currentItems,
  countFounded,
  generateRandomItems,
  registerCurrentItems,
  process,
  tries // Export tries as a computed property
}
