import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import styled from 'styled-components'
import { isNil } from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Card from '../../components/Card'
import { SymbolName } from '../../types'
import GameDialog from '../../components/GameTable/GameDialog'
import TablePlayers from '../../components/GameTable/TablePlayers'
import Button from '../../components/Button'
import GAME_SOCKET_ACTIONS from '../../constants/gameSocket'
import ROUTES from '../../constants/routes'
import { useCurrentAccount } from '../../hooks'
import { updateTable } from '../../redux/gameTable'
import { updateGameRound } from '../../redux/gameRound'


const {
  TABLE_CHANGE,
  PLAYER_LEAVE,
  ROUND_START,
  GAME_CHANGE,
  GAME_ERROR,
} = GAME_SOCKET_ACTIONS


const SOCKET_URL = `http://localhost:80`
let socket

const GameTableScreen = () => {
  const {
    centerCard,
    playerCard,
  } = useSelector(state => state.gameRound)

  const history = useHistory()
  const { id: gameTableId } = useParams()
  const { currentUserId } = useCurrentAccount()
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.gameTable)

  useEffect(() => {
    socket = socketIOClient(SOCKET_URL, {
      query: `tableId=${gameTableId}&playerId=${currentUserId}`
    })

    socket.on(TABLE_CHANGE, (tableData) => {
      dispatch(updateTable(tableData))
    })

    socket.on(GAME_CHANGE, (gameRound) => {
      dispatch(updateGameRound(gameRound))
    })

    socket.on(GAME_ERROR, (error) => {
      console.error(error)
    })

    return () => {
      socket.close()
    }
  }, [])

  const handleLeaveGameClick = () => {
    socket.emit(PLAYER_LEAVE, { gameId: gameTableId, playerId: currentUserId })
    history.push(ROUTES.MAIN)
  }

  const handleRoundStartClick = () => {
    socket.emit(ROUND_START, { gameId: gameTableId })
  }

  const handleSymbolClick = (symbolClicked: SymbolName) => {
    console.log(symbolClicked)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <Wrapper>
      <Button
        isSmallButton
        text='Leave game session'
        type='button'
        handleClick={handleLeaveGameClick}
      />

      <TableWrapper>
        {isNil(centerCard) && (
          <StartRoundWrapper>
            <GameDialog handleRoundStartClick={handleRoundStartClick} />
          </StartRoundWrapper>
        )}

        <TableCenterContainer>
          {centerCard && (
            <Card cardSymbols={centerCard} />
          )}
        </TableCenterContainer>

        <PlayerCardContainer>
          {playerCard && (
            <Card cardSymbols={playerCard} />
          )}
        </PlayerCardContainer>
      </TableWrapper>

      <PlayersContainer>
        <TablePlayers />
      </PlayersContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const TableWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(3, 1fr);
  grid-gap: 20px;
  grid-template-areas: 
     "fifthPlayer tableCenter sixthPlayer"
     "seventhPlayer firstPlayer eighthPlayer";
`

const StartRoundWrapper = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white08};
`

const TableCenterContainer = styled.div`
  grid-area: tableCenter;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PlayerCardContainer = styled.div`
  grid-area: firstPlayer;
`

const PlayersContainer = styled.div`

`

export default GameTableScreen
