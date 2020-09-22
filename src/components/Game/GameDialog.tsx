import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import { Player } from '../../api/players'

interface Props {
  isGameInProcess: boolean;
  playerList: Player[];
}

const GameDialog: React.FC<Props> = (props: Props) => {
  const { isGameInProcess, playerList } = props
  const isEnoughPlayersForGame = playerList.length > 1

  const getInfoText = () => {
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
