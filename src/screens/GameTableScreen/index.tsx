import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { last, isEmpty, isNil } from 'ramda'
import Card from '../../components/Card'
import PlayerSeat from '../../components/PlayerSeat'
import { getCards } from '../../utils/cards'
import { SymbolName } from '../../types'


const GameTableScreen = () => {
  const [centerCard, setCenterCard] = useState(null)
  const [playerCards, setPlayerCards] = useState<string[]>([])

  useEffect(() => {
    const { firstTableCard , cards } = getCards()
    setCenterCard(firstTableCard)
    setPlayerCards(cards)
  }, [])

  const handleSymbolClick = (cardName: SymbolName) => {
    if (isEmpty(playerCards) || isNil(centerCard)) {
      return
    }
    // @ts-ignore
    if (!centerCard.hasOwnProperty(cardName)) {
      return
    }

    const currentPlayerCard = last(playerCards)
    // @ts-ignore
    setCenterCard(currentPlayerCard)

    const currentCards = [...playerCards]
    currentCards.pop()
    setPlayerCards(currentCards)
  }


  if (isEmpty(playerCards))
    return <p>Loading...</p>

  return (
    <Wrapper>
      <TableCenterContainer>
        <Card cardSymbols={centerCard} />
      </TableCenterContainer>

      <PlayerSeat
        cards={playerCards}
        handleSymbolClick={handleSymbolClick}
      />
    </Wrapper>
  )
}


const Wrapper = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(3, 1fr);
  grid-gap: 20px;
  grid-template-areas: 
     "fifthPlayer tableCenter sixthPlayer"
     "seventhPlayer firstPlayer eighthPlayer";
`

const TableCenterContainer = styled.div`
  grid-area: tableCenter;
  display: flex;
  justify-content: center;
  align-items: center;
`


export default GameTableScreen
