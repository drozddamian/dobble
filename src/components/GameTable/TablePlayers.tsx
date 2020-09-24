import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'ramda'
import { useSelector } from 'react-redux'


const PlayersComponent = () => {
  const { playerList } = useSelector(state => state.gameTable)

  if (isEmpty(playerList)) {
    return null
  }

  const renderPlayersList = () => {
    return playerList.map((player) => (
      <li key={player}>
        {player}
      </li>
    ))
  }

  const listOfPlayers = renderPlayersList()

  return (
    <Wrapper>
      {listOfPlayers}
    </Wrapper>
  )
}

const Wrapper = styled.ul``

export default PlayersComponent
