import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Button from '../Button'


interface Props {
  roundStartCountdown: number | null;
  handleRoundStartClick: () => void;
}

const GameDialog: React.FC<Props> = (props: Props) => {
  const { isGameInProcess, playerList } = useSelector(state => state.game)
  const { roundStartCountdown, handleRoundStartClick } = props
  const isEnoughPlayersForGame = playerList.length > 1

  const getInfoText = () => {
    if (roundStartCountdown) {
      return roundStartCountdown
    }
    if (isGameInProcess) {
      return 'Waiting for game to finish'
    }
    return 'Waiting for more players to join'
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
