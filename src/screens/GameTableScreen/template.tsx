import React, {ReactElement, useEffect} from 'react'
import styled from 'styled-components'
import { isNil } from 'ramda'
import Button, { Wrapper as StyledButton } from '../../components/Button'
import GameDialog, {InfoText} from '../../components/GameDialog'
import Card from '../../components/Card'
import { Player } from '../../api/players'
import { SymbolName } from '../../types'
import { useTypedSelector } from '../../redux/rootReducer'
import GameTablePlayers from "../../components/GameTablePlayers";

interface Props {
  playerId: string;
  tableId: string;
  isGameInProcess: boolean;
  tablePlayers: Player[];
  roundPlayers?: Player[];
  onLeaveGame: () => void;
  onStartRound: () => void;
  onSymbolClick: (spottedSymbol: SymbolName) => void;
}

const GameTableScreenTemplate: React.FC<Props> = (props: Props): ReactElement => {
  const { playerId, tableId, isGameInProcess, tablePlayers, roundPlayers, onLeaveGame, onStartRound, onSymbolClick } = props
  const gameRound = useTypedSelector(state => state.gameRound[tableId])

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
            handleClick={onLeaveGame}
          />
        </ButtonContainer>
        <StartRoundWrapper>
          <GameDialog tableId={tableId} handleRoundStartClick={onStartRound} />
        </StartRoundWrapper>
      </>
    )}

    <Wrapper>
      {isWaitingForFinishTheGame
        ? <InfoText>Waiting for the game to finish</InfoText>
        : (
          <>
            <CenterCardContainer>
              <Card cardSymbols={gameRound?.centerCard} />
            </CenterCardContainer>
            <PlayerCardContainer>
              <Card
                cardSymbols={gameRound?.playerCard}
                handleSymbolClick={onSymbolClick}
              />
              <CardDescriptionText>
                Your card
              </CardDescriptionText>
            </PlayerCardContainer>
          </>
        )}


      <PlayersWrapper>
        <GameTablePlayers title="Round players" players={roundPlayers} />
        <GameTablePlayers title="Table players" players={tablePlayers} />
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

export default GameTableScreenTemplate
