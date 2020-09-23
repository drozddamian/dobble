import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { last, isEmpty, isNil } from 'ramda'
import { useHistory, useParams } from 'react-router-dom'
import Card from '../../components/Card'
import PlayerSeat from '../../components/PlayerSeat'
import { SymbolName } from '../../types'
import GameDialog from '../../components/Game/GameDialog'
import Button from '../../components/Button'
import GAME_SOCKET_ACTIONS from '../../constants/gameSocket'
import ROUTES from '../../constants/routes'
import { useCurrentAccount } from '../../hooks'
import {
  fetchGameSession,
  setGameInProcess,
  updatePlayerList,
} from '../../redux/game'


const {
  PLAYER_JOIN,
  PLAYER_LEAVE,
  ROUND_START,
  ROUND_START_COUNTDOWN,
  GAME_ERROR,
} = GAME_SOCKET_ACTIONS


const SOCKET_URL = `http://localhost:80`
const socket = io(SOCKET_URL)

const GameTableScreen = () => {
  const [roundStartCountdown, setRoundStartCountdown] = useState<number | null>(null)

  const history = useHistory()
  const { id: gameSessionId } = useParams()
  const { currentUserId } = useCurrentAccount()
  const dispatch = useDispatch()
  const { isLoading, currentGameSession, playerList } = useSelector(state => state.game)

  socket.on('event:move-result', (move) => console.log(move))
  socket.on(PLAYER_LEAVE, (playerList) => {
    dispatch(updatePlayerList(playerList))
  })
  socket.on(PLAYER_JOIN, (playerList) => {
    dispatch(updatePlayerList(playerList))
  })
  socket.on(GAME_ERROR, (error) => {
    console.error(error)
  })
  socket.on(ROUND_START_COUNTDOWN, (countdown) => {
    setRoundStartCountdown(countdown)
    dispatch(setGameInProcess())
  })

  useEffect(() => {
    if (!isNil(currentGameSession)) { return }
    dispatch(fetchGameSession(gameSessionId))
  }, [currentGameSession])

  const handleLeaveGameClick = () => {
    socket.emit(PLAYER_LEAVE, { gameId: gameSessionId, playerId: currentUserId })
    history.push(ROUTES.MAIN)
  }

  const handleRoundStartClick = () => {
    socket.emit(ROUND_START, { gameId: gameSessionId })
  }

  const handleSymbolClick = (cardName: SymbolName) => {
    socket.emit('event:card-chosen', { card: cardName });
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
        <StartRoundWrapper>
          <GameDialog
            roundStartCountdown={roundStartCountdown}
            handleRoundStartClick={handleRoundStartClick}
          />
        </StartRoundWrapper>

{/*        <TableCenterContainer>
          <Card cardSymbols={centerCard} />
        </TableCenterContainer>

        <PlayerSeat
          cards={playerCards}
          handleSymbolClick={handleSymbolClick}
        />*/}
      </TableWrapper>

      <p>
        {JSON.stringify(playerList)}
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  
`

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


export default GameTableScreen
