import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'ramda'
import { useTypedSelector } from "../../redux/rootReducer";


const PlayersComponent = () => {
  const { playerList } = useTypedSelector(state => state.gameTable)

  if (isEmpty(playerList)) {
    return null
  }

  const renderPlayersList = () => {
    return playerList.map((player) => (
      <li key={player._id}>
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
