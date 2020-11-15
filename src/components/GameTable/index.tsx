import React from 'react'
import styled from 'styled-components'
import { useTypedSelector } from "../../redux/rootReducer";
import Card from '../Card'
import { SymbolName } from '../../types'

interface Props {
  tableId: string;
  handleSymbolClick?: (name: SymbolName) => void;
}

const GameTable: React.FC<Props> = (props: Props) => {
  const { tableId, handleSymbolClick } = props

  const gameRound = useTypedSelector(state => state.gameRound[tableId])
  const centerCard = gameRound?.centerCard
  const playerCard = gameRound?.playerCard

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
