import React, { ReactElement, useEffect } from 'react'
import socket from '../../utils/socket'
import { equals, isNil, isEmpty } from 'ramda'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useTypedSelector } from "../../redux/rootReducer";
import {GameTableStatus, SymbolName, MappedGameRound, TableChangeData} from '../../types'
import GAME_SOCKET_ACTIONS from '../../constants/gameSocket'
import ROUTES from '../../constants/routes'
import { useCurrentAccount } from '../../hooks'
import { updateTable } from '../../redux/gameTable'
import { updateGameRound, finishGameAndShowResult } from '../../redux/gameRound'
import Template from './template'

const {
  TABLE_CHANGE,
  PLAYER_LEAVE,
  ROUND_START,
  GAME_CHANGE,
  GAME_ERROR,
  GAME_END,
  SPOT_SHAPE,
} = GAME_SOCKET_ACTIONS

const { Processing } = GameTableStatus

const GameTableScreen = (): ReactElement => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id: gameTableId } = useParams()
  const { currentUserId: playerId } = useCurrentAccount()

  const gameTable = useTypedSelector(state => state.gameTable[gameTableId])

  if (!gameTable) {
    history.push(ROUTES.MAIN)
  }

  const { gameStatus, playerList, isLoading } = gameTable
  const { roundId, centerCard } = useTypedSelector(state => state.gameRound)

  useEffect(() => {
    if (socket && gameTableId) socket.emit('join', { gameTableId, playerId });
    return () => {
      if(socket) socket.disconnect();
    }
  }, [])

  useEffect(() => {
    socket.on(TABLE_CHANGE, (tableData: TableChangeData) => {
      console.log(tableData)
      dispatch(updateTable({ gameTableId, tableData }))
    })

    socket.on(GAME_CHANGE, (gameRound: MappedGameRound) => {
      dispatch(updateGameRound(gameRound))
    })

    // @ts-ignore
    socket.on(GAME_END, ({ winner }) => {
      console.log(winner)
      dispatch(finishGameAndShowResult(gameTableId, winner))
    })

    socket.on(GAME_ERROR, (error: any) => {
      console.error(error)
    })
  }, [])

  const handleLeaveGameClick = () => {
    socket.emit(PLAYER_LEAVE, { tableId: gameTableId, playerId })
    history.push(ROUTES.MAIN)
  }

  const handleRoundStartClick = () => {
    socket.emit(ROUND_START, { tableId: gameTableId })
  }

  const handleSymbolClick = (spottedSymbol: SymbolName) => {
    if (!centerCard) {
      return
    }
    if (!centerCard.includes(spottedSymbol)) {
      return
    }
    socket.emit(SPOT_SHAPE, { gameTableId, roundId, playerId })
  }

  if (isLoading) { return <p>Loading...</p> }
  return (
    <Template
      tableId={gameTableId}
      playerList={playerList}
      isGameInProcess={equals(gameStatus, Processing)}
      onLeaveGame={handleLeaveGameClick}
      onStartRound={handleRoundStartClick}
      onSymbolClick={handleSymbolClick}
    />
  )
}
export default GameTableScreen
