import Big from 'big.js'
import PACK_OF_CARDS from '../constants/packOfCards'
import {Card, StyledCard, SymbolName} from '../types'


const shuffleCards = (cards: any) => {
  const swappingTimes = Math.floor((Math.random() * 5) + 5)
  for (let shuffleCounter = 0; shuffleCounter < swappingTimes; shuffleCounter++) {
    for (let i = cards.length - 1; i > 0; i--) {
      let j =  Math.floor(Math.random() * (cards.length - 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]
    }
  }

  return cards
}


export const getCards = () => {
  const shuffledCards = shuffleCards(PACK_OF_CARDS)

  const firstTableCard = shuffledCards[shuffledCards.length - 1]
  shuffledCards.pop()

  return {
    firstTableCard,
    cards: shuffledCards,
  }
}


export const getSymbolScales = () => new Array(8)
  .fill(1)
  .map(() => Math.round(Math.random() * 1))
  .map((number) => {
    const decimalSizeOfScale = number < 1
      ? Math.floor((Math.random() * 4) + 5)
      : Math.round(Math.random() * 20)

    const scaleDecimal = new Big(decimalSizeOfScale).times(0.1)

    if (number < 1) {
      return scaleDecimal.toFixed()
    }
    return scaleDecimal.times(0.1).add(1).toFixed()
  })


export const prepareStyledCard = (card: Card | null): StyledCard | null => {
  if (!card) { return null }
  return {
    symbols: card,
    rotation: Math.floor(Math.random() * 360),
    symbolScales: getSymbolScales(),
  }
}