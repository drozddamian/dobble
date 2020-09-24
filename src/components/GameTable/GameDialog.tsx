import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Button from '../Button'


interface Props {
  handleRoundStartClick: () => void;
}

const GameDialog: React.FC<Props> = (props: Props) => {
  const { isGameInProcess, roundStartCountdown, playerList } = useSelector(state => state.gameTable)
  const { roundWinner } = useSelector(state => state.gameRound)
  const { handleRoundStartClick } = props
  const isEnoughPlayersForGame = playerList.length > 1

  const getInfoText = () => {
    if (!isGameInProcess) {
      return 'Waiting for more players to join'
    }
    if (roundStartCountdown) {
      return roundStartCountdown
    }
    //return 'Waiting for game to finish'
  }

  if (roundWinner) {
    return (
      <InfoText>
        {`${roundWinner} is the winner!`}
      </InfoText>
    )
  }

  if (isEnoughPlayersForGame && !isGameInProcess) {
    return (
      <Button
        text='Start new round'
        type='button'
        handleClick={handleRoundStartClick}
      />
    )
  }

  const infoText = getInfoText()
  return (
    <InfoText>
      {infoText}
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
