import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { GameTableStatus } from "../../types";
import Button from '../Button'

const { Joining, Waiting, Countdown, Processing } = GameTableStatus

interface Props {
  handleRoundStartClick: () => void;
}

const GameDialog: React.FC<Props> = (props: Props) => {
  const { handleRoundStartClick } = props
  const { gameStatus, roundStartCountdown } = useSelector(state => state.gameTable)
  const { roundWinner } = useSelector(state => state.gameRound)

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
