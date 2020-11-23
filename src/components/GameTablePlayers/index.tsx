import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'ramda'
import {Player} from "../../api/players";


interface Props {
  title?: string;
  players?: Player[];
}

const GameTablePlayers: React.FC<Props> = ({ title, players }) => {
  if (!players || isEmpty(players)) {
    return null
  }
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ListContainer>
      {players.map((player) => (
        <li key={player._id}>
          {player.nick}
        </li>
      ))}
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

export default React.memo(GameTablePlayers)