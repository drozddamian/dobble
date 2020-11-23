import React from 'react'
import styled from 'styled-components'
import { useTypedSelector } from "../../redux/rootReducer";
import { GameTableStatus } from "../../types";
import Button from '../Button'

const { Joining, Waiting, Countdown, Processing } = GameTableStatus

interface Props {
  tableId: string;
  handleRoundStartClick: () => void;
}

const GameDialog: React.FC<Props> = (props: Props) => {
  const { tableId, handleRoundStartClick } = props
  const { gameStatus, roundStartCountdown } = useTypedSelector(state => state.gameTable[tableId])
  const gameRound = useTypedSelector(state => state.gameRound[tableId])
  const roundWinner = gameRound?.roundWinner

  const DIALOG_CONTENT = {
    [Joining]: <InfoText> Waiting for more players to join </InfoText>,
    [Waiting]: (
      <Button
        text='Start new round'
        type='button'
        handleClick={handleRoundStartClick}
      />
    ),
    [Countdown]: <InfoText> {`Round is starting in ${roundStartCountdown}`}  </InfoText>
  }

  if (roundWinner) {
    return (
      <WinnerContainer>
        <InfoText>
          <span>{`${roundWinner}`}</span>{' '}
          is the winner!
        </InfoText>
        <InfoText>
          Wait for the game to reset.
        </InfoText>
      </WinnerContainer>
    )
  }

  if (gameStatus === Processing) {
    return null
  }

  return (
    <InfoText>
      {DIALOG_CONTENT[gameStatus]}
    </InfoText>
  )
}

export const InfoText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.s23};
  color: ${({ theme }) => theme.colors.pink};
  text-align: center;
`

const WinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${InfoText} {
    color: ${({ theme }) => theme.colors.darkBlue};
    span {
      color: ${({ theme }) => theme.colors.pink};
    }
  }
`

export default GameDialog
