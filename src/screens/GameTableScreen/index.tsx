import React, {ReactElement, useEffect} from 'react'
import socket from '../../utils/socket'
import { isEmpty, isNil } from 'ramda'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../redux/rootReducer'
import { SymbolName, MappedGameRound, TableChangeData } from '../../types'
import GAME_SOCKET_ACTIONS from '../../constants/gameSocket'
import ROUTES from '../../constants/routes'
import { useCurrentAccount } from '../../hooks'
import {resetTable, updateTable} from '../../redux/gameTable'
import { updateGameRound, finishGameAndShowResult } from '../../redux/gameRound'
import styled from "styled-components";
import Button, {Wrapper as StyledButton} from "../../components/Button";
import GameDialog, {InfoText} from "../../components/GameDialog";
import GameTablePlayers from "../../components/GameTablePlayers";
import Card from "../../components/Card";

const {
  TABLE_CHANGE,
  PLAYER_LEAVE,
  ROUND_START,
  GAME_CHANGE,
  GAME_ERROR,
  GAME_END,
  SPOT_SHAPE,
} = GAME_SOCKET_ACTIONS

const GameTableScreen = (): ReactElement => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id: gameTableId } = useParams()
  const { currentUserId: playerId } = useCurrentAccount()

  const gameTable = useTypedSelector(state => state.gameTable[gameTableId])
  const gameRound = useTypedSelector(state => state.gameRound[gameTableId])
  const centerCard = gameRound?.centerCard

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
      //console.log("tableData", tableData)
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

  const handleSymbolClick = (spottedSymbol: SymbolName) => (event: React.MouseEvent) => {
    event.preventDefault()
    if (centerCard?.includes(spottedSymbol)) {
      socket.emit(SPOT_SHAPE, { tableId: gameTableId, playerId })
    }
  }

  if (!gameTable || gameTable?.isLoading) {
    return <p>Loading...</p>
  }

  const isGameInProcess = gameRound?.isGameRoundInProcess
  const roundPlayers = gameRound?.players
  const isWaitingForFinishTheGame = isGameInProcess && isNil(roundPlayers?.find(({ _id }) => _id == playerId))

  return (
    <>
      {!isGameInProcess && (
        <>
          <ButtonContainer>
            <Button
              isSmallButton
              text='Leave game'
              type='button'
              handleClick={handleLeaveGameClick}
            />
          </ButtonContainer>
          <StartRoundWrapper>
            <GameDialog tableId={gameTableId} handleRoundStartClick={handleRoundStartClick} />
          </StartRoundWrapper>
        </>
      )}

      <Wrapper>
        {isWaitingForFinishTheGame
          ? <InfoText>Waiting for the game to finish</InfoText>
          : (
            <>
              <CenterCardContainer>
                <Card card={gameRound?.styledCenterCard} />
              </CenterCardContainer>
              <PlayerCardContainer>
                <Card
                  card={gameRound?.styledPlayerCard}
                  handleSymbolClick={handleSymbolClick}
                />
                <CardDescriptionText>
                  Your card
                </CardDescriptionText>
              </PlayerCardContainer>
            </>
          )}

          <PlayersWrapper>
            <GameTablePlayers
              title="Round players"
              players={roundPlayers}
              cardsByPlayerId={gameRound.cardsByPlayerId}
            />

            <GameTablePlayers
              title="Table players"
              players={gameTable?.playerList}
            />
          </PlayersWrapper>
        </Wrapper>
      </>
  )
}


const CardDescriptionText = styled.h3`
  padding-top: 6px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  font-size: ${({ theme }) => theme.fontSize.s14};
  color: ${({ theme }) => theme.colors.text};
`

const ButtonContainer = styled.div`
  ${StyledButton} {
    z-index: 20;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 16px;
  }
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  min-height: 100vh;
  padding-right: 140px;
  position: relative;
  display: grid;
  grid-template: 1fr 2fr / 1fr 2fr;
  grid-gap: 20px;
  grid-template-areas: 
     "players centerCard"
     "chat playerCards";
`

const CenterCardContainer = styled.div`
  grid-area: centerCard;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlayerCardContainer = styled(CenterCardContainer)`
  grid-area: playerCards;
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

const PlayersWrapper = styled.div`
  grid-area: players;
  padding: 40px;
  
  &:first-child {
    margin-bottom: 40px;
  }
`

export default GameTableScreen
