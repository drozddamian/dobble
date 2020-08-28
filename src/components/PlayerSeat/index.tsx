import React from 'react'
import styled from 'styled-components'
import { last } from 'ramda'
import Card, { Wrapper as CardWrapper } from '../Card'
import { SymbolName } from '../../types'

interface Props {
  cards: string[];
  handleSymbolClick: (name: SymbolName) => void;
}


const PlayerSeat: React.FC<Props> = (props: Props) => {
  const { cards, handleSymbolClick } = props

  const hasMoreThanOneCardLeft = cards.length > 1

  return (
    <Wrapper>
      <CardsContainer>
        <Card
          cardSymbols={last(cards)}
          handleSymbolClick={handleSymbolClick}
        />

        {hasMoreThanOneCardLeft && (
          <Card cardSymbols={cards[cards.length - 2]} />
        )}
      </CardsContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: firstPlayer;
  position: relative; 
`

const CardsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center; 
  
  ${CardWrapper} {
    position: absolute;
    
    :not(:first-of-type) {
      display: none;
    }
  }
`

export default PlayerSeat
