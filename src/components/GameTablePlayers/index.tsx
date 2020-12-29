import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'ramda'
import SwingText, { Wrapper as SwingTextWrapper } from '../SwingText'
import { Player } from '../../api/players'
import { CardsByPlayerId } from '../../types'


interface Props {
  title?: string;
  players?: Player[];
  cardsByPlayerId?: CardsByPlayerId | null;
}

const GameTablePlayers: React.FC<Props> = ({ title, players, cardsByPlayerId }) => {
  if (!players || isEmpty(players)) {
    return null
  }
  return (
    <Wrapper>
      <Title>{title}</Title>

      <ListContainer>
      {players.map(({ _id, nick }) => {
        return (
          <ListItem key={_id}>
            <Nick>{nick}</Nick>

            {cardsByPlayerId && (
              <SwingText
                height='20px'
                width='20px'
                text={cardsByPlayerId[_id].howManyCardsLeft.toString()}
              />
            )}
          </ListItem>
        )
      })}
      </ListContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fonts.smallTitle};
  color: ${({ theme }) => theme.colors.darkBlue};
`

const ListContainer = styled.ul`
`

const ListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  width: 155px;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1.8;
  
  ${SwingTextWrapper} {
    height: 20px;
    width: 20px;
    margin-left: auto;
    background-color: ${({ theme }) => theme.colors.softPink};
    
    span {
      color: ${({ theme }) => theme.colors.darkBlue};
    }
  }
`

const Nick = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
`

export default React.memo(GameTablePlayers)