export interface CardItem {
  title: string
  isFlipped: boolean
  wasFound: boolean
  icon: string
  unique?: string
  style: { width: string, marginTop?: string }
}

export default <CardItem[]>[
  {
    title: 'Crecer',
    isFlipped: false,
    wasFound: false,
    icon: require('@/assets/card-icons/AONWhite.png'),
    style: {
      width: '80px',
      marginTop: '20px'
    }
  },
  {
    title: 'Productividad',
    isFlipped: false,
    wasFound: false,
    icon: require('@/assets/card-icons/AONRed.png'),
    style: {
      width: '80px',
      marginTop: '20px'
    }
  },
  {
    title: 'Analisis',
    isFlipped: false,
    wasFound: false,
    icon: require('@/assets/card-icons/AONEslogan.png'),
    style: {
      width: '80px',
      marginTop: '20px'
    }
  },
  {
    title: 'Interconectado',
    isFlipped: false,
    wasFound: false,
    icon: require('@/assets/card-icons/AONCerro.png'),
    style: {
      width: '80px',
      marginTop: '20px'
    }
  }
]
