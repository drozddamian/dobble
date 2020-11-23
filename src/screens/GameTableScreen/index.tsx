import React, {ReactElement, useEffect} from 'react'
import socket from '../../utils/socket'
import { equals, isEmpty } from 'ramda'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useTypedSelector } from "../../redux/rootReducer";
import {GameTableStatus, SymbolName, MappedGameRound, TableChangeData} from '../../types'
import GAME_SOCKET_ACTIONS from '../../constants/gameSocket'
import ROUTES from '../../constants/routes'
import { useCurrentAccount } from '../../hooks'
import {resetTable, updateTable} from '../../redux/gameTable'
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
  const gameRound = useTypedSelector(state => state.gameRound[gameTableId])
  const centerCard = gameRound?.centerCard
  const roundPlayers = gameRound?.players

  useEffect(() => {
    if (!gameTableId) {
      return
    }

    socket.connect()
    socket.emit('join', { gameTableId, playerId });

    return () => {
      if(socket) {
        socket.emit(PLAYER_LEAVE, { tableId: gameTableId, playerId })
        socket.disconnect();
      }
    }
  }, [])

  useEffect(() => {
    socket.on(TABLE_CHANGE, (tableData: TableChangeData) => {
      console.log("tableData", tableData)
      dispatch(updateTable({ gameTableId, tableData }))
    })

    socket.on(GAME_CHANGE, (gameRound: MappedGameRound) => {
      console.log("gameRound", gameRound)
      dispatch(updateGameRound(gameRound))
    })

    // @ts-ignore
    socket.on(GAME_END, (result) => {
      if (isEmpty(result?.winner)) {
        dispatch(resetTable(gameTableId))
        return
      }
      result?.winner && dispatch(finishGameAndShowResult(gameTableId, result.winner))
    })

    socket.on(GAME_ERROR, (error: any) => {
      console.error(error)
    })
  }, [])

  const handleRoundStartClick = () => {
    socket.emit(ROUND_START, { tableId: gameTableId })
  }

  const handleLeaveGameClick = () => {
    socket.emit(PLAYER_LEAVE, { tableId: gameTableId, playerId })
    history.push(ROUTES.MAIN)
  }

  const handleSymbolClick = (spottedSymbol: SymbolName) => {
    if (centerCard?.includes(spottedSymbol)) {
      socket.emit(SPOT_SHAPE, { tableId: gameTableId, playerId })
    }
  }

  if (!gameTable || gameTable?.isLoading) {
    return <p>Loading...</p>
  }

  const { gameStatus, playerList } = gameTable

  return (
    <Template
      playerId={playerId}
      tableId={gameTableId}
      tablePlayers={playerList}
      roundPlayers={roundPlayers}
      isGameInProcess={equals(gameStatus, Processing)}
      onLeaveGame={handleLeaveGameClick}
      onStartRound={handleRoundStartClick}
      onSymbolClick={handleSymbolClick}
    />
  )
}
export default GameTableScreen
