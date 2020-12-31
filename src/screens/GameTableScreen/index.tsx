import React, { ReactElement, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import useSound from 'use-sound'
import gameSocket from '../../utils/gameSocket'
import { equals, isEmpty, isNil } from 'ramda'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../redux/rootReducer'
import { useCurrentAccount } from '../../hooks'
import { resetTable, updateTable } from '../../redux/gameTable'
import { updateGameRound, finishGameAndShowResult } from '../../redux/gameRound'
import { SymbolName, MappedGameRound, TableChangeData } from '../../types'
import successSound from '../../assets/sounds/success.mp3'
import errorSound from '../../assets/sounds/error.mp3'

import GAME_SOCKET_ACTIONS from '../../constants/gameSocket'
import ROUTES from '../../constants/routes'

import Button, { Wrapper as StyledButton } from '../../components/Button'
import GameDialog, { InfoText } from '../../components/GameDialog'
import GameTablePlayers from '../../components/GameTablePlayers'
import Card, { Wrapper as CardWrapper } from '../../components/Card'
import LoadingBar from '../../components/Loader/LoadingBar'

const {
  TABLE_CHANGE,
  PLAYER_LEAVE,
  ROUND_START,
  GAME_CHANGE,
  GAME_ERROR,
  GAME_END,
  SPOT_SHAPE,
} = GAME_SOCKET_ACTIONS

type ClickResult = 'success' | 'error'

const GameTableScreen = (): ReactElement => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id: gameTableId } = useParams()
  const { currentUserId: playerId } = useCurrentAccount()

  const [clickResult, setClickResult] = useState<ClickResult | null>(null)

  const [playSuccessTune] = useSound(successSound)
  const [playErrorTune] = useSound(errorSound)

  const gameTable = useTypedSelector(state => state.gameTable[gameTableId])
  const gameRound = useTypedSelector(state => state.gameRound[gameTableId])
  const centerCard = gameRound?.centerCard

  useEffect(() => {
    let timer = 0
    if (clickResult) {
      timer = setTimeout(() => setClickResult(null), 200);
    }
    return () => clearTimeout(timer);
  }, [clickResult])

  useEffect(() => {
    if (!gameTableId) {
      return
    }

    gameSocket.connect()
    gameSocket.emit('join', { gameTableId, playerId });

    return () => {
      if(gameSocket) {
        gameSocket.emit(PLAYER_LEAVE, { tableId: gameTableId, playerId })
        gameSocket.disconnect();
      }
    }
  }, [gameTableId, playerId])

  useEffect(() => {
    gameSocket.on(TABLE_CHANGE, (tableData: TableChangeData) => {
      dispatch(updateTable({ gameTableId, tableData }))
    })

    gameSocket.on(GAME_CHANGE, (gameRound: MappedGameRound) => {
      dispatch(updateGameRound(gameRound))
    })

    // @ts-ignore
    gameSocket.on(GAME_END, (result) => {
      if (isEmpty(result?.winner)) {
        dispatch(resetTable(gameTableId))
        return
      }
      result?.winner && dispatch(finishGameAndShowResult(gameTableId, result.winner))
    })

    gameSocket.on(GAME_ERROR, (error: any) => {
      console.error(error)
    })
  }, [dispatch, gameTableId])

  const handleRoundStartClick = () => {
    gameSocket.emit(ROUND_START, { tableId: gameTableId })
  }

  const handleLeaveGameClick = () => {
    gameSocket.emit(PLAYER_LEAVE, { tableId: gameTableId, playerId })
    history.push(ROUTES.MAIN)
  }

  const handleSymbolClick = (spottedSymbol: SymbolName) => async (event: React.MouseEvent) => {
    event.preventDefault()
    if (centerCard?.includes(spottedSymbol)) {
      playSuccessTune()
      setClickResult('success')
      gameSocket.emit(SPOT_SHAPE, { tableId: gameTableId, playerId })
    } else {
      playErrorTune()
      setClickResult('error')
    }
  }

  if (!gameTable || gameTable?.isLoading) {
    return <LoadingBar />
  }

  const isGameInProcess = gameRound?.isGameRoundInProcess
  const roundPlayers = gameRound?.players
  const isWaitingForFinishTheGame = isGameInProcess && isNil(roundPlayers?.find(({ _id }) => equals(_id, playerId)))

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

              <PlayerCardContainer clickResult={clickResult}>
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
              cardsByPlayerId={gameRound?.cardsByPlayerId}
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
  padding-top: 5px;
  margin: 0 auto;
  max-width: 1280px;
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-gap: 5px;
  grid-template-areas: 
     "centerCard"
     "playerCards"
     "players";
     
  @media (min-width: ${({ theme }) => theme.rwd.tablet.s}) {
    padding-top: 15px;
  }     
     
  @media (min-width: 700px) {
    padding-right: 140px;
    grid-gap: 0;
    grid-template: 
      "players centerCard"
      ". playerCards";
    grid-template-columns: 1fr 3fr;
  }
`

const CenterCardContainer = styled.div`
  grid-area: centerCard;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlayerCardContainer = styled(CenterCardContainer)<{ clickResult: ClickResult | null }>`
  grid-area: playerCards;
  
  ${CardWrapper} {
    ${({clickResult}) =>
      clickResult === 'success' && css`
        box-shadow: 0 0 19px 0 #02b875;
      `
    };
    
    ${({clickResult}) =>
      clickResult === 'error' && css`
        box-shadow: 0 0 19px 0 #ff0033;
      `
    };
  }
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
