import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Card from '../Card'
import { SymbolName } from '../../types'

interface Props {
  handleSymbolClick?: (name: SymbolName) => void;
}

const GameTable: React.FC<Props> = (props: Props) => {
  const { handleSymbolClick } = props

  const {
    centerCard,
    playerCard,
  } = useSelector(state => state.gameRound)

  return (
    <Wrapper>
      <CenterCardContainer>
        <Card cardSymbols={centerCard} />
      </CenterCardContainer>

      <PlayerCardContainer>
        <Card
          cardSymbols={playerCard}
          handleSymbolClick={handleSymbolClick}
        />
      </PlayerCardContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(3, 1fr);
  grid-gap: 20px;
  grid-template-areas: 
     "fifthPlayer tableCenter sixthPlayer"
     "seventhPlayer firstPlayer eighthPlayer";
`

const CenterCardContainer = styled.div`
  grid-area: tableCenter;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PlayerCardContainer = styled.div`
  grid-area: firstPlayer;
`

export default GameTable
