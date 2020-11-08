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
  const { roundWinner } = useTypedSelector(state => state.gameRound)

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
      <InfoText>
        {`${roundWinner} is the winner!`}
      </InfoText>
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

const InfoText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.s23};
  color: ${({ theme }) => theme.colors.pink};
  text-align: center;
`

export default GameDialog
