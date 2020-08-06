import React from 'react'
import styled from 'styled-components'
import { Card } from '../../types'
import CARD_SYMBOLS from '../../constants/symbols'


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const TableCenterContainer = styled.div`
  
`


const getCards = (): Card[] => {
  const randomCardIndex = Math.floor(Math.random() * CARD_SYMBOLS.length)
  const firstCard = CARD_SYMBOLS[randomCardIndex]

}

const GameTableScreen = () => {

  const cards = getCards()

  return (
      <Wrapper>
        <TableCenterContainer>

        </TableCenterContainer>
      </Wrapper>
  )
}

export default GameTableScreen
